<?php

declare(strict_types=1);

namespace Tests\Feature\Admin;

use App\Models\AuditLog;
use App\Models\Plan;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantControllerLifecycleTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_suspend_and_reactivate_a_company_with_reason(): void
    {
        $admin = User::factory()->create(['is_super_admin' => true]);
        $tenant = Tenant::factory()->create(['status' => 'active', 'is_active' => true]);
        $this->actingAs($admin);

        $this->put(route('admin.tenants.suspend', $tenant), ['reason' => 'Pago de suscripción vencido'])
            ->assertRedirect();

        $this->assertDatabaseHas('tenants', ['id' => $tenant->id, 'status' => 'suspended', 'is_active' => false]);
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'company.suspended',
            'model_type' => Tenant::class,
            'model_id' => $tenant->id,
            'description' => "Empresa '{$tenant->name}' suspendida. Motivo: Pago de suscripción vencido",
        ]);

        $this->put(route('admin.tenants.suspend', $tenant), ['reason' => 'Pago regularizado y validado'])
            ->assertRedirect();

        $this->assertDatabaseHas('tenants', ['id' => $tenant->id, 'status' => 'active', 'is_active' => true]);
        $this->assertSame(2, AuditLog::query()->where('model_id', $tenant->id)->count());
    }

    public function test_lifecycle_change_requires_a_reason_and_edit_page_shows_history(): void
    {
        $admin = User::factory()->create(['is_super_admin' => true]);
        $tenant = Tenant::factory()->create(['status' => 'active']);
        $this->actingAs($admin);

        $this->put(route('admin.tenants.suspend', $tenant), ['reason' => 'abc'])
            ->assertSessionHasErrors('reason');

        $this->get(route('admin.tenants.edit', $tenant))
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Tenants/Edit')
                ->has('lifecycle_history', 0));
    }

    public function test_plan_and_subscription_changes_are_logged_with_their_reason(): void
    {
        $admin = User::factory()->create(['is_super_admin' => true]);
        $plan = Plan::factory()->create();
        $tenant = Tenant::factory()->create(['plan_id' => null, 'subscription_ends_at' => null]);
        $this->actingAs($admin);

        $payload = [
            'name' => $tenant->name,
            'country' => 'CL',
            'rut_taller' => '12345678-5',
            'domain' => $tenant->domain,
            'plan_id' => $plan->id,
            'status' => 'active',
            'change_reason' => 'Renovación anual autorizada',
            'subscription_ends_at' => now()->addYear()->toDateString(),
            'phone' => $tenant->phone,
            'seo_address' => $tenant->seo_address,
            'comuna' => $tenant->comuna,
            'whatsapp_number' => $tenant->whatsapp_number,
        ];

        $this->put(route('admin.tenants.update', $tenant), $payload)->assertSessionHasNoErrors();

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'company.lifecycle.updated',
            'model_type' => Tenant::class,
            'model_id' => $tenant->id,
        ]);
        $this->assertStringContainsString(
            'Renovación anual autorizada',
            AuditLog::query()->where('model_id', $tenant->id)->latest('created_at')->value('description')
        );
    }
}
