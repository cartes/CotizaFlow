<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ApiUsageLog;
use App\Models\EmailTracking;
use App\Models\LoginLog;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Tenant;
use App\Models\TrialRequest;
use App\Models\User;
use App\Models\WorkOrder;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AdminDashboardService
{
    /**
     * Build the current executive overview for the super-admin dashboard.
     *
     * @return array<string, mixed>
     */
    public function getExecutiveData(Carbon $now): array
    {
        $thirtyDaysAgo = $now->copy()->subDays(30);
        $sevenDaysFromNow = $now->copy()->addDays(7);
        $resolvedTrialRequests = TrialRequest::query()
            ->whereIn('status', ['approved', 'rejected'])
            ->where('created_at', '>=', $thirtyDaysAgo);
        $resolvedTrialRequestCount = (clone $resolvedTrialRequests)->count();
        $approvedTrialRequestCount = (clone $resolvedTrialRequests)->where('status', 'approved')->count();

        $companies = Tenant::query();
        $pendingTrialRequests = TrialRequest::query()->where('status', 'pending')->count();
        $expiringCompanies = Tenant::query()
            ->where('is_active', true)
            ->where('status', 'active')
            ->whereBetween('subscription_ends_at', [$now, $sevenDaysFromNow])
            ->count();
        $expiredActiveCompanies = Tenant::query()
            ->where('is_active', true)
            ->where('status', 'active')
            ->whereNotNull('subscription_ends_at')
            ->where('subscription_ends_at', '<', $now)
            ->count();
        $pendingPayments = Payment::query()->where('status', Payment::STATUS_PENDING)->count();
        $recentRejectedPayments = Payment::query()
            ->where('status', Payment::STATUS_REJECTED)
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->count();

        return [
            'stats' => [
                'companies_total' => (clone $companies)->count(),
                'companies_active' => (clone $companies)->where('is_active', true)->where('status', 'active')->count(),
                'companies_new_30d' => (clone $companies)->where('created_at', '>=', $thirtyDaysAgo)->count(),
                'trial_requests_resolved_30d' => $resolvedTrialRequestCount,
                'trial_requests_approved_30d' => $approvedTrialRequestCount,
                'conversion_rate_30d' => $resolvedTrialRequestCount > 0
                    ? round(($approvedTrialRequestCount / $resolvedTrialRequestCount) * 100, 1)
                    : 0.0,
                'revenue_30d' => (int) Payment::query()
                    ->where('status', Payment::STATUS_APPROVED)
                    ->where('paid_at', '>=', $thirtyDaysAgo)
                    ->sum('amount'),
                'revenue_month_to_date' => (int) Payment::query()
                    ->where('status', Payment::STATUS_APPROVED)
                    ->whereBetween('paid_at', [$now->copy()->startOfMonth(), $now])
                    ->sum('amount'),
            ],
            'alerts' => [
                'pending_trial_requests' => $pendingTrialRequests,
                'expiring_companies' => $expiringCompanies,
                'expired_active_companies' => $expiredActiveCompanies,
                'pending_payments' => $pendingPayments,
                'rejected_payments_30d' => $recentRejectedPayments,
            ],
            'monthly_companies' => $this->getExecutiveMonthlyCompanies($now),
            'recent_companies' => Tenant::query()
                ->with('plan:id,name')
                ->latest('created_at')
                ->limit(6)
                ->get(['id', 'name', 'slug', 'plan_id', 'plan', 'status', 'is_active', 'created_at'])
                ->map(static function (Tenant $company): array {
                    $plan = $company->getRelation('plan');

                    return [
                        'id' => $company->id,
                        'name' => $company->name,
                        'slug' => $company->slug,
                        'plan' => $plan instanceof Plan ? $plan->name : $company->currentPlan()->label(),
                        'status' => $company->status,
                        'is_active' => (bool) $company->is_active,
                        'created_at' => $company->created_at?->toIso8601String(),
                    ];
                })
                ->values(),
            'recent_payments' => Payment::query()
                ->with(['tenant:id,name', 'plan:id,name'])
                ->latest('created_at')
                ->limit(6)
                ->get(['id', 'tenant_id', 'plan_id', 'amount', 'currency', 'status', 'paid_at', 'created_at'])
                ->map(static fn (Payment $payment): array => [
                    'id' => $payment->id,
                    'company' => $payment->tenant?->name,
                    'plan' => $payment->plan?->name,
                    'amount' => $payment->amount,
                    'currency' => $payment->currency,
                    'status' => $payment->status,
                    'date' => ($payment->paid_at ?? $payment->created_at)?->toIso8601String(),
                ])
                ->values(),
            'pending_trial_requests' => TrialRequest::query()
                ->where('status', 'pending')
                ->latest('created_at')
                ->limit(5)
                ->get(['id', 'business_name', 'name', 'email', 'created_at'])
                ->map(static fn (TrialRequest $request): array => [
                    'id' => $request->id,
                    'business_name' => $request->business_name,
                    'name' => $request->name,
                    'email' => $request->email,
                    'created_at' => $request->created_at?->toIso8601String(),
                ])
                ->values(),
        ];
    }

    /**
     * @return Collection<int, array{month: string, total: int}>
     */
    private function getExecutiveMonthlyCompanies(Carbon $now): Collection
    {
        $firstMonth = $now->copy()->startOfMonth()->subMonths(5);
        $monthExpression = $this->monthGroupingExpression('created_at');
        $companyCounts = Tenant::query()
            ->where('created_at', '>=', $firstMonth)
            ->select(DB::raw("{$monthExpression} as month"), DB::raw('count(*) as total'))
            ->groupBy('month')
            ->pluck('total', 'month');

        return collect(range(0, 5))
            ->map(static function (int $offset) use ($firstMonth, $companyCounts): array {
                $month = $firstMonth->copy()->addMonths($offset)->format('Y-m');

                return ['month' => $month, 'total' => (int) ($companyCounts[$month] ?? 0)];
            });
    }

    /**
     * Estadísticas generales del dashboard admin.
     *
     * @return array{
     *     total_tenants: int,
     *     active_tenants: int,
     *     total_users: int,
     *     expired_subscriptions: int,
     *     expiring_soon: int,
     *     retention_percent: float|int,
     *     tenants_with_activity: int,
     *     approved_revenue_30d: int,
     * }
     */
    public function getStats(Carbon $now, Carbon $thirtyDaysAgo, Carbon $sevenDaysAgo): array
    {
        $totalTenants = Tenant::count();

        // Tenants que tuvieron al menos 1 login en los últimos 30 días
        $tenantsWithActivity = LoginLog::where('created_at', '>=', $thirtyDaysAgo)
            ->whereNotNull('tenant_id')
            ->distinct('tenant_id')
            ->count('tenant_id');

        // Ingresos aprobados (MRR aproximado)
        $approvedRevenue = Payment::query()
            ->where('status', 'approved')
            ->where('paid_at', '>=', $thirtyDaysAgo)
            ->sum('amount');

        return [
            'total_tenants' => $totalTenants,
            'active_tenants' => Tenant::where('is_active', true)->count(),
            'total_users' => User::where('is_super_admin', false)->count(),
            'expired_subscriptions' => Tenant::where('subscription_ends_at', '<', $now)->whereNotNull('subscription_ends_at')->count(),
            'expiring_soon' => Tenant::whereBetween('subscription_ends_at', [$now, $sevenDaysAgo->addDays(7)])->count(),
            'retention_percent' => $totalTenants > 0 ? round($tenantsWithActivity / $totalTenants * 100, 1) : 0,
            'tenants_with_activity' => $tenantsWithActivity,
            'approved_revenue_30d' => (int) $approvedRevenue,
        ];
    }

    /**
     * Work orders últimos 30 días por tenant (top 10).
     *
     * @return Collection<int, array{tenant: string, total: int}>
     */
    public function getWorkOrdersByTenant(Carbon $thirtyDaysAgo): Collection
    {
        return WorkOrder::query()
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->select('tenant_id', DB::raw('count(*) as total'))
            ->groupBy('tenant_id')
            ->with('tenant:id,name')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->map(fn ($row) => [
                'tenant' => $row->tenant?->name ?? 'Sin tenant',
                'total' => $row->total,
            ]);
    }

    /**
     * Llamadas OCR últimos 30 días por tenant (top 10).
     *
     * @return Collection<int, array{tenant: string, total: int}>
     */
    public function getOcrUsage(Carbon $thirtyDaysAgo): Collection
    {
        return ApiUsageLog::query()
            ->where('service', 'ocr')
            ->where('date', '>=', $thirtyDaysAgo->toDateString())
            ->select('tenant_id', DB::raw('sum(calls_count) as total'))
            ->groupBy('tenant_id')
            ->with('tenant:id,name')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->map(fn ($row) => [
                'tenant' => $row->tenant?->name ?? 'Sin tenant',
                'total' => (int) $row->total,
            ]);
    }

    /**
     * Tenants próximos a vencer (7 días) con su último tracking de renovación.
     *
     * @return Collection<int, array<string, mixed>>
     */
    public function getExpiringTenants(Carbon $now): Collection
    {
        return Tenant::query()
            ->whereBetween('subscription_ends_at', [$now, $now->copy()->addDays(7)])
            ->select('id', 'name', 'slug', 'subscription_ends_at')
            ->with(['latestRenewalTracking'])
            ->get()
            ->map(function (Tenant $tenant) use ($now): array {
                $tracking = $tenant->latestRenewalTracking;
                $daysLeft = (int) max(0, $now->diffInDays($tenant->subscription_ends_at, false));

                return [
                    'id' => $tenant->id,
                    'name' => $tenant->name,
                    'slug' => $tenant->slug,
                    'subscription_ends_at' => $tenant->subscription_ends_at?->toIso8601String(),
                    'days_left' => $daysLeft,
                    'tracking' => $tracking ? [
                        'id' => $tracking->id,
                        'type' => $tracking->type,
                        'recipient_email' => $tracking->recipient_email,
                        'sent_at' => $tracking->sent_at?->toIso8601String(),
                        'opened_at' => $tracking->opened_at?->toIso8601String(),
                        'open_count' => $tracking->open_count,
                        'clicked_at' => $tracking->clicked_at?->toIso8601String(),
                        'click_count' => $tracking->click_count,
                        'offer_discount_percent' => $tracking->offer_discount_percent,
                    ] : null,
                ];
            });
    }

    /**
     * Métricas de renovación y lectura de notificaciones (últimos 14 días).
     *
     * @return array{
     *     expiring_count: int,
     *     sent_count: int,
     *     opened_count: int,
     *     clicked_count: int,
     *     open_rate: float,
     * }
     */
    public function getRenewalMetrics(Carbon $now): array
    {
        $expiringCount = Tenant::query()
            ->whereBetween('subscription_ends_at', [$now, $now->copy()->addDays(7)])
            ->count();

        $recentTrackings = EmailTracking::query()
            ->where('sent_at', '>=', $now->copy()->subDays(14))
            ->whereIn('type', ['renewal_reminder', 'renewal_offer'])
            ->get();

        $sentCount = $recentTrackings->count();
        $openedCount = $recentTrackings->filter(static fn (EmailTracking $t): bool => $t->isOpened())->count();
        $clickedCount = $recentTrackings->filter(static fn (EmailTracking $t): bool => $t->isClicked())->count();
        $openRate = $sentCount > 0 ? round(($openedCount / $sentCount) * 100, 1) : 0.0;

        return [
            'expiring_count' => $expiringCount,
            'sent_count' => $sentCount,
            'opened_count' => $openedCount,
            'clicked_count' => $clickedCount,
            'open_rate' => $openRate,
        ];
    }

    public function getPendingTrialRequestsCount(): int
    {
        return TrialRequest::where('status', 'pending')->count();
    }

    /**
     * Últimas 5 solicitudes de prueba gratuita pendientes.
     *
     * @return Collection<int, TrialRequest>
     */
    public function getRecentTrialRequests(): Collection
    {
        return TrialRequest::query()
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'business_name', 'business_type', 'city', 'created_at']);
    }

    /**
     * Tenants más activos por logins en últimos 30 días (top 8).
     *
     * @return Collection<int, array{name: string, logins: int}>
     */
    public function getMostActiveTenants(Carbon $thirtyDaysAgo): Collection
    {
        return LoginLog::query()
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->whereNotNull('tenant_id')
            ->select('tenant_id', DB::raw('count(*) as logins'))
            ->groupBy('tenant_id')
            ->orderByDesc('logins')
            ->limit(8)
            ->with('tenant:id,name')
            ->get()
            ->map(fn ($r) => [
                'name' => $r->tenant?->name ?? 'Sin nombre',
                'logins' => (int) $r->logins,
            ]);
    }

    /**
     * Nuevos tenants por mes (últimos 6 meses).
     *
     * @return Collection<int, array{month: string, total: int}>
     */
    public function getNewTenantsByMonth(Carbon $now): Collection
    {
        $tenantMonthExpression = $this->monthGroupingExpression('created_at');

        return Tenant::query()
            ->where('created_at', '>=', $now->copy()->subMonths(6))
            ->select(DB::raw("{$tenantMonthExpression} as month"), DB::raw('count(*) as total'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($r) => ['month' => $r->month, 'total' => (int) $r->total]);
    }

    /**
     * Scatter: actividad (logins) vs. tamaño (usuarios) por tenant activo,
     * con cuadrante asignado según las medianas.
     *
     * @return array{
     *     points: Collection<int, array{id: int, name: string, plan: string, users: int, logins: int, work_orders: int, quadrant: string}>,
     *     medians: array{users: float|int, logins: float|int},
     * }
     */
    public function getTenantScatter(Carbon $thirtyDaysAgo): array
    {
        $allTenants = Tenant::query()
            ->where('status', 'active')
            ->withCount('users')
            ->get(['id', 'name', 'plan', 'status']);

        $loginsByTenant = LoginLog::query()
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->whereNotNull('tenant_id')
            ->select('tenant_id', DB::raw('count(*) as total'))
            ->groupBy('tenant_id')
            ->pluck('total', 'tenant_id');

        $workOrdersByTenant = WorkOrder::query()
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->select('tenant_id', DB::raw('count(*) as total'))
            ->groupBy('tenant_id')
            ->pluck('total', 'tenant_id');

        $scatterPoints = $allTenants->map(fn ($t) => [
            'id' => $t->id,
            'name' => $t->name,
            'plan' => $t->plan ?? 'gratuito',
            'users' => (int) $t->users_count,
            'logins' => (int) ($loginsByTenant[$t->id] ?? 0),
            'work_orders' => (int) ($workOrdersByTenant[$t->id] ?? 0),
        ]);

        // Medianas para definir cuadrantes
        $medianUsers = $scatterPoints->median('users') ?? 1;
        $medianLogins = $scatterPoints->median('logins') ?? 1;

        $points = $scatterPoints->map(fn ($p) => [
            ...$p,
            'quadrant' => match (true) {
                $p['users'] >= $medianUsers && $p['logins'] >= $medianLogins => 'champions',
                $p['users'] < $medianUsers && $p['logins'] >= $medianLogins => 'growing',
                $p['users'] >= $medianUsers && $p['logins'] < $medianLogins => 'at_risk',
                default => 'sleeping',
            },
        ])->values();

        return [
            'points' => $points,
            'medians' => ['users' => $medianUsers, 'logins' => $medianLogins],
        ];
    }

    private function monthGroupingExpression(string $column): string
    {
        return match (DB::connection()->getDriverName()) {
            'pgsql' => "TO_CHAR({$column}, 'YYYY-MM')",
            'sqlite' => "strftime('%Y-%m', {$column})",
            default => "DATE_FORMAT({$column}, '%Y-%m')",
        };
    }
}
