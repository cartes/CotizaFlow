<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class ExampleTest extends TestCase
{
    use CreatesTenant, RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Welcome')
                ->has('seo')
                ->where('seo.title', 'CotizaFlow — Cotiza rápido. Haz seguimiento. Vende más.'));
    }

    public function test_authenticated_user_can_visit_homepage(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create([
            'tenant_id' => $tenant->id,
        ]);

        $response = $this->actingAs($user)->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Welcome')
                ->where('auth.user.id', $user->id));
    }

    public function test_super_admin_can_visit_homepage(): void
    {
        $user = User::factory()->create([
            'is_super_admin' => true,
        ]);

        $response = $this->actingAs($user)->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Welcome')
                ->where('auth.user.id', $user->id));
    }

    public function test_ziggy_public_group_includes_dashboard(): void
    {
        $publicGroup = config('ziggy.groups.public', []);
        $this->assertContains('dashboard', $publicGroup);
        $this->assertContains('home', $publicGroup);
        $this->assertContains('quotes.public.*', $publicGroup);
    }

    public function test_ziggy_tenant_group_includes_commercial_routes(): void
    {
        $tenantGroup = config('ziggy.groups.tenant', []);
        $this->assertContains('quotes.*', $tenantGroup);
        $this->assertContains('clients.*', $tenantGroup);
        $this->assertContains('inventory.*', $tenantGroup);
    }
}
