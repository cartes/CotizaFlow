<?php

declare(strict_types=1);

namespace Tests\Feature\Admin;

use App\Models\Payment;
use App\Models\Tenant;
use App\Models\TrialRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_dashboard_shows_executive_metrics_and_actionable_data(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $activeCompany = Tenant::factory()->create([
            'name' => 'Empresa Nueva',
            'created_at' => now()->subDays(5),
        ]);

        Tenant::factory()->create([
            'name' => 'Empresa Anterior',
            'created_at' => now()->subMonth(),
        ]);

        Tenant::factory()->create([
            'status' => 'suspended',
            'is_active' => false,
        ]);

        TrialRequest::query()->create([
            'name' => 'Ana Aprobada',
            'email' => 'ana@empresa.cl',
            'phone' => '+56911111111',
            'business_name' => 'Empresa Aprobada',
            'business_type' => 'Servicios',
            'status' => 'approved',
            'created_at' => now()->subDays(4),
            'updated_at' => now()->subDays(4),
        ]);

        TrialRequest::query()->create([
            'name' => 'Luis Rechazado',
            'email' => 'luis@empresa.cl',
            'phone' => '+56922222222',
            'business_name' => 'Empresa Rechazada',
            'business_type' => 'Servicios',
            'status' => 'rejected',
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        TrialRequest::query()->create([
            'name' => 'Eva Pendiente',
            'email' => 'eva@empresa.cl',
            'phone' => '+56933333333',
            'business_name' => 'Empresa Pendiente',
            'business_type' => 'Servicios',
            'status' => 'pending',
        ]);

        Payment::factory()->create([
            'tenant_id' => $activeCompany->id,
            'status' => Payment::STATUS_APPROVED,
            'amount' => 25000,
            'paid_at' => now()->subDays(12),
        ]);

        Payment::factory()->create([
            'tenant_id' => $activeCompany->id,
            'status' => Payment::STATUS_PENDING,
            'paid_at' => null,
        ]);

        $this->actingAs($superAdmin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Dashboard')
                ->where('stats.companies_total', 3)
                ->where('stats.companies_active', 2)
                ->where('stats.companies_new_30d', 3)
                ->where('stats.trial_requests_resolved_30d', 2)
                ->where('stats.trial_requests_approved_30d', 1)
                ->where('stats.conversion_rate_30d', 50)
                ->where('stats.revenue_30d', 25000)
                ->where('alerts.pending_trial_requests', 1)
                ->where('alerts.pending_payments', 1)
                ->has('monthly_companies', 6)
                ->has('recent_companies', 3)
                ->has('recent_payments', 2)
                ->has('pending_trial_requests', 1)
            );

        $this->get(route('admin.payments.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Payments/Index')
                ->has('monthly_summary')
            );

        $this->get(route('admin.tenants.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Tenants/Index'));

        $this->get(route('admin.trial-requests.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/TrialRequests/Index'));

        $this->get(route('admin.users.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Users/Index'));
    }
}
