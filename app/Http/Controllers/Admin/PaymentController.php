<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Setting;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class PaymentController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'tenant_id' => ['nullable', 'integer', 'exists:tenants,id'],
            'status' => ['nullable', Rule::in([
                Payment::STATUS_PENDING,
                Payment::STATUS_APPROVED,
                Payment::STATUS_REJECTED,
                Payment::STATUS_CANCELLED,
                Payment::STATUS_REFUNDED,
            ])],
        ]);

        $payments = Payment::query()
            ->with(['tenant:id,name', 'plan:id,name'])
            ->when($filters['tenant_id'] ?? null, fn ($query, $tenantId) => $query->where('tenant_id', $tenantId))
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(50)
            ->withQueryString()
            ->through(fn (Payment $p) => [
                'id' => $p->id,
                'tenant' => $p->tenant?->name,
                'plan' => $p->plan?->name,
                'amount' => $p->amount,
                'mp_fee_net' => $p->mp_fee_net,
                'mp_fee_vat' => $p->mp_fee_vat,
                'mp_fee_total' => $p->mpFeeTotal(),
                'net_amount' => $p->net_amount,
                'currency' => $p->currency,
                'status' => $p->status,
                'method' => $p->method,
                'mp_payment_type' => $p->mp_payment_type,
                'mp_installments' => $p->mp_installments,
                'transaction_id' => $p->transaction_id,
                'paid_at' => $p->paid_at?->toIso8601String(),
                'created_at' => $p->created_at->toIso8601String(),
            ]);

        // Resumen mensual últimos 6 meses (solo aprobados)
        $monthExpr = match (DB::connection()->getDriverName()) {
            'pgsql' => "TO_CHAR(paid_at, 'YYYY-MM')",
            'sqlite' => "strftime('%Y-%m', paid_at)",
            default => "DATE_FORMAT(paid_at, '%Y-%m')",
        };

        $monthlySummary = Payment::query()
            ->where('status', 'approved')
            ->where('paid_at', '>=', now()->subMonths(6))
            ->when($filters['tenant_id'] ?? null, fn ($query, $tenantId) => $query->where('tenant_id', $tenantId))
            ->select(
                DB::raw("{$monthExpr} as month"),
                DB::raw('count(*) as transactions'),
                DB::raw('sum(amount) as gross'),
                DB::raw('sum(mp_fee_net) as fees_net'),
                DB::raw('sum(mp_fee_vat) as fees_vat'),
                DB::raw('sum(net_amount) as net'),
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Totales generales
        $totals = Payment::query()
            ->where('status', 'approved')
            ->when($filters['tenant_id'] ?? null, fn ($query, $tenantId) => $query->where('tenant_id', $tenantId))
            ->selectRaw('sum(amount) as gross, sum(mp_fee_net) as fees_net, sum(mp_fee_vat) as fees_vat, sum(net_amount) as net, count(*) as transactions')
            ->first();

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'monthly_summary' => $monthlySummary,
            'totals' => $totals,
            'companies' => Tenant::query()->orderBy('name')->get(['id', 'name']),
            'filters' => [
                'tenant_id' => $filters['tenant_id'] ?? null,
                'status' => $filters['status'] ?? null,
            ],
        ]);
    }

    public function createPreference(Request $request): RedirectResponse
    {
        $request->validate([
            'tenant_id' => ['required', 'exists:tenants,id'],
            'plan_id' => ['required', 'exists:plans,id'],
        ]);

        $tenant = Tenant::findOrFail($request->tenant_id);
        $plan = Plan::findOrFail($request->plan_id);

        $accessToken = Setting::get('mp_access_token');
        $isSandbox = Setting::get('mp_sandbox', 'true') === 'true';

        if (! $accessToken) {
            return back()->withErrors(['mp' => 'No hay Access Token de Mercado Pago configurado.']);
        }

        MercadoPagoConfig::setAccessToken($accessToken);

        if ($isSandbox) {
            MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
        }

        $client = new PreferenceClient;

        $preference = $client->create([
            'items' => [
                [
                    'title' => "Suscripción {$plan->name} - {$tenant->name}",
                    'quantity' => 1,
                    'unit_price' => (float) $plan->price_monthly,
                    'currency_id' => 'CLP',
                ],
            ],
            'back_urls' => [
                'success' => route('admin.payments.success'),
                'failure' => route('admin.payments.failure'),
                'pending' => route('admin.payments.pending'),
            ],
            'auto_return' => 'approved',
            'external_reference' => "tenant_{$tenant->id}_plan_{$plan->id}",
            'notification_url' => route('admin.payments.webhook'),
        ]);

        Payment::create([
            'tenant_id' => $tenant->id,
            'plan_id' => $plan->id,
            'amount' => $plan->price_monthly,
            'currency' => 'CLP',
            'status' => Payment::STATUS_PENDING,
            'method' => 'mercadopago',
            'mp_preference_id' => $preference->id,
        ]);

        AuditLog::record(
            'payment.preference_created',
            "Preferencia MP creada para {$tenant->name} ({$plan->name})",
            $tenant
        );

        return redirect($isSandbox ? $preference->sandbox_init_point : $preference->init_point);
    }

    public function success(Request $request): RedirectResponse
    {
        return redirect()->route('admin.payments.index')->with('success', 'Pago procesado correctamente.');
    }

    public function failure(Request $request): RedirectResponse
    {
        return redirect()->route('admin.payments.index')->with('error', 'El pago fue rechazado o cancelado.');
    }

    public function pending(Request $request): RedirectResponse
    {
        return redirect()->route('admin.payments.index')->with('info', 'El pago está pendiente de confirmación.');
    }
}
