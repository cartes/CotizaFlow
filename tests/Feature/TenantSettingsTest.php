<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantSetupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class TenantSettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->withoutVite();
    }

    public function test_admin_can_access_settings_page(): void
    {
        $tenant = Tenant::factory()->create();
        $admin = User::factory()->create(['tenant_id' => $tenant->id]);

        app(TenantSetupService::class)->provisionTenant($tenant, $admin);

        $tenant->makeCurrent();
        $this->actingAs($admin);

        $response = $this->get(route('company.settings', ['tenantBySlug' => $tenant->slug]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Settings/Index'));

        Tenant::forgetCurrent();
    }

    public function test_settings_page_contains_required_props(): void
    {
        $tenant = Tenant::factory()->create([
            'name' => 'Empresa Test',
            'phone' => '+56912345678',
            'comuna' => 'Santiago',
            'max_discount_without_approval' => 10,
        ]);
        $admin = User::factory()->create(['tenant_id' => $tenant->id]);

        app(TenantSetupService::class)->provisionTenant($tenant, $admin);

        $tenant->makeCurrent();
        $this->actingAs($admin);

        $response = $this->get(route('company.settings', ['tenantBySlug' => $tenant->slug]));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Settings/Index')
            ->has('company')
            ->where('company.name', 'Empresa Test')
            ->where('company.phone', '+56912345678')
            ->where('company.comuna', 'Santiago')
            ->has('users')
        );

        Tenant::forgetCurrent();
    }

    public function test_seller_cannot_access_settings_page(): void
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        app(TenantSetupService::class)->provisionTenant($tenant);

        $tenant->makeCurrent();

        $user->assignRole('Vendedor');
        $this->actingAs($user);

        $response = $this->get(route('company.settings', ['tenantBySlug' => $tenant->slug]));

        $response->assertStatus(403);

        Tenant::forgetCurrent();
    }

    public function test_settings_shows_only_current_tenant_users(): void
    {
        $tenantA = Tenant::factory()->create();
        $tenantB = Tenant::factory()->create();

        $adminA = User::factory()->create(['tenant_id' => $tenantA->id]);
        User::factory()->create(['tenant_id' => $tenantB->id, 'name' => 'Usuario Otra Empresa']);

        app(TenantSetupService::class)->provisionTenant($tenantA, $adminA);
        app(TenantSetupService::class)->provisionTenant($tenantB);

        $tenantA->makeCurrent();
        $this->actingAs($adminA);

        $response = $this->get(route('company.settings', ['tenantBySlug' => $tenantA->slug]));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Settings/Index')
            ->where('users', fn ($users) => collect($users)->every(
                fn ($u) => $u['name'] !== 'Usuario Otra Empresa'
            ))
        );

        Tenant::forgetCurrent();
    }

    public function test_admin_can_update_commercial_settings(): void
    {
        $tenant = Tenant::factory()->create();
        $admin = User::factory()->create(['tenant_id' => $tenant->id]);

        app(TenantSetupService::class)->provisionTenant($tenant, $admin);

        $tenant->makeCurrent();
        $this->actingAs($admin);

        $response = $this->patch(route('company.settings.commercial.update', ['tenantBySlug' => $tenant->slug]), [
            'name' => 'Nuevo Nombre SpA',
            'phone' => '+56987654321',
            'comuna' => 'Providencia',
            'max_discount_without_approval' => 15,
        ]);

        $response->assertRedirect();
        $tenant->refresh();
        $this->assertSame('Nuevo Nombre SpA', $tenant->name);
        $this->assertSame('+56987654321', $tenant->phone);
        $this->assertSame('Providencia', $tenant->comuna);

        Tenant::forgetCurrent();
    }
}
