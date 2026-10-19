<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Payment;
use App\Models\Quote;
use App\Models\Tenant;
use App\Models\TrialRequest;
use Illuminate\Support\Facades\DB;

class AdminReportService
{
    /** @param array{date_from: string, date_to: string} $filters
     * @return array<string, mixed>
     */
    public function build(array $filters): array
    {
        $from = $filters['date_from'].' 00:00:00';
        $to = $filters['date_to'].' 23:59:59';
        $payments = Payment::query()
            ->where('status', Payment::STATUS_APPROVED)
            ->whereBetween('paid_at', [$from, $to]);
        $requests = TrialRequest::query()->whereBetween('created_at', [$from, $to]);
        $quotes = Quote::query()->withoutGlobalScope('tenant')->whereBetween('created_at', [$from, $to]);

        $paymentsByTenant = (clone $payments)
            ->selectRaw('tenant_id, count(*) as transactions, sum(amount) as revenue')
            ->groupBy('tenant_id')
            ->get()
            ->keyBy('tenant_id');
        $quotesByTenant = (clone $quotes)
            ->selectRaw('tenant_id, count(*) as quotes, sum(case when status = ? then 1 else 0 end) as accepted', [Quote::STATUS_ACCEPTED])
            ->groupBy('tenant_id')
            ->get()
            ->keyBy('tenant_id');

        $companies = Tenant::query()
            ->withCount('users')
            ->orderBy('name')
            ->get(['id', 'name', 'status', 'is_active', 'plan', 'created_at'])
            ->map(function (Tenant $tenant) use ($paymentsByTenant, $quotesByTenant): array {
                $payment = $paymentsByTenant->get($tenant->id);
                $quote = $quotesByTenant->get($tenant->id);

                return [
                    'id' => $tenant->id,
                    'name' => $tenant->name,
                    'status' => $tenant->status,
                    'is_active' => $tenant->is_active,
                    'plan' => $tenant->plan,
                    'users' => $tenant->users_count,
                    'revenue' => (int) ($payment?->revenue ?? 0),
                    'transactions' => (int) ($payment?->transactions ?? 0),
                    'quotes' => (int) ($quote?->quotes ?? 0),
                    'accepted_quotes' => (int) ($quote?->accepted ?? 0),
                    'created_at' => $tenant->created_at?->toDateString(),
                ];
            });

        $resolvedRequests = (clone $requests)->whereIn('status', ['approved', 'rejected'])->count();
        $approvedRequests = (clone $requests)->where('status', 'approved')->count();

        return [
            'summary' => [
                'companies_created' => Tenant::query()->whereBetween('created_at', [$from, $to])->count(),
                'companies_active' => Tenant::query()->where('is_active', true)->where('status', 'active')->count(),
                'companies_suspended' => Tenant::query()->where('status', 'suspended')->count(),
                'requests_total' => (clone $requests)->count(),
                'requests_approved' => $approvedRequests,
                'conversion_rate' => $resolvedRequests > 0 ? round($approvedRequests / $resolvedRequests * 100, 1) : 0,
                'revenue' => (int) ((clone $payments)->sum('amount') ?? 0),
                'transactions' => (clone $payments)->count(),
                'quotes_total' => (clone $quotes)->count(),
                'quotes_accepted' => (clone $quotes)->where('status', Quote::STATUS_ACCEPTED)->count(),
            ],
            'companies' => $companies->values()->all(),
            'request_statuses' => (clone $requests)
                ->selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->orderBy('status')
                ->get()
                ->map(fn ($row): array => ['status' => $row->status, 'total' => (int) $row->total])
                ->all(),
            'monthly_revenue' => $this->monthlyRevenue($from, $to),
        ];
    }

    /** @param array{date_from: string, date_to: string} $filters */
    public function csv(string $reportType, array $filters): string
    {
        $stream = fopen('php://temp', 'r+');
        fwrite($stream, "\xEF\xBB\xBF");

        match ($reportType) {
            'companies' => $this->writeCompanies($stream, $filters),
            'payments' => $this->writePayments($stream, $filters),
            'requests' => $this->writeRequests($stream, $filters),
            default => $this->writeSummary($stream, $filters),
        };

        rewind($stream);
        $csv = stream_get_contents($stream) ?: '';
        fclose($stream);

        return $csv;
    }

    /** @param resource $stream
     * @param  array{date_from: string, date_to: string}  $filters
     */
    private function writeCompanies($stream, array $filters): void
    {
        fputcsv($stream, ['Empresa', 'Estado', 'Plan', 'Usuarios', 'Ingresos CLP', 'Pagos', 'Cotizaciones', 'Aceptadas', 'Registro']);

        foreach ($this->build($filters)['companies'] as $company) {
            fputcsv($stream, [$company['name'], $company['status'], $company['plan'], $company['users'], $company['revenue'], $company['transactions'], $company['quotes'], $company['accepted_quotes'], $company['created_at']]);
        }
    }

    /** @param resource $stream
     * @param  array{date_from: string, date_to: string}  $filters
     */
    private function writePayments($stream, array $filters): void
    {
        fputcsv($stream, ['Fecha de pago', 'Empresa', 'Estado', 'Monto', 'Moneda', 'Método', 'Transacción']);
        Payment::query()->with('tenant:id,name')->whereBetween('created_at', [$filters['date_from'].' 00:00:00', $filters['date_to'].' 23:59:59'])
            ->orderBy('created_at')->get()->each(fn (Payment $payment) => fputcsv($stream, [$payment->paid_at?->toDateTimeString(), $payment->tenant?->name, $payment->status, $payment->amount, $payment->currency, $payment->method, $payment->transaction_id]));
    }

    /** @param resource $stream
     * @param  array{date_from: string, date_to: string}  $filters
     */
    private function writeRequests($stream, array $filters): void
    {
        fputcsv($stream, ['Fecha', 'Empresa solicitante', 'Contacto', 'Correo', 'Tipo de negocio', 'Estado', 'Plan solicitado']);
        TrialRequest::query()->whereBetween('created_at', [$filters['date_from'].' 00:00:00', $filters['date_to'].' 23:59:59'])
            ->orderBy('created_at')->get()->each(fn (TrialRequest $request) => fputcsv($stream, [$request->created_at?->toDateTimeString(), $request->business_name, $request->name, $request->email, $request->business_type, $request->status, $request->requested_plan]));
    }

    /** @param resource $stream
     * @param  array{date_from: string, date_to: string}  $filters
     */
    private function writeSummary($stream, array $filters): void
    {
        $summary = $this->build($filters)['summary'];
        fputcsv($stream, ['Indicador', 'Valor']);
        foreach ($summary as $key => $value) {
            fputcsv($stream, [$key, $value]);
        }

        fputcsv($stream, []);
        fputcsv($stream, ['Detalle de empresas']);
        $this->writeCompanies($stream, $filters);
        fputcsv($stream, []);
        fputcsv($stream, ['Detalle de pagos']);
        $this->writePayments($stream, $filters);
        fputcsv($stream, []);
        fputcsv($stream, ['Detalle de solicitudes']);
        $this->writeRequests($stream, $filters);
    }

    /** @return list<array{month: string, transactions: int, revenue: int}> */
    private function monthlyRevenue(string $from, string $to): array
    {
        $monthExpression = match (DB::connection()->getDriverName()) {
            'pgsql' => "TO_CHAR(paid_at, 'YYYY-MM')",
            'sqlite' => "strftime('%Y-%m', paid_at)",
            default => 'DATE_FORMAT(paid_at, "%Y-%m")',
        };

        return Payment::query()
            ->where('status', Payment::STATUS_APPROVED)
            ->whereBetween('paid_at', [$from, $to])
            ->selectRaw("{$monthExpression} as month, count(*) as transactions, sum(amount) as revenue")
            ->groupBy('month')->orderBy('month')->get()
            ->map(fn ($row): array => ['month' => (string) $row->month, 'transactions' => (int) $row->transactions, 'revenue' => (int) $row->revenue])
            ->all();
    }
}
