<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class TenantCommercialSettingsTest extends TestCase
{
    use CreatesTenant, RefreshDatabase;

    public function test_admin_can_update_tenant_discount_threshold(): void
    {
        $tenant = $this->setUpTenant();

        $admin = User::factory()->create(['tenant_id' => $tenant->id]);
        $admin->assignRole('Admin');

        $this->actingAs($admin)
            ->patch(route('taller.settings.commercial.update', ['tenantBySlug' => $tenant->slug]), [
                'max_discount_without_approval' => 18.5,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('tenants', [
            'id' => $tenant->id,
            'max_discount_without_approval' => 18.5,
        ]);
    }

    public function test_dashboard_shows_commercial_quote_metrics(): void
    {
        $tenant = $this->setUpTenant();

        $client = Client::create([
            'name' => 'Cliente Comercial',
            'rut' => '11111111-1',
            'phone' => '+56912345678',
            'email' => 'cliente@example.com',
        ]);

        Quote::create([
            'tenant_id' => $tenant->id,
            'client_id' => $client->id,
            'status' => Quote::STATUS_DRAFT,
            'total_amount' => 50000,
        ]);

        Quote::create([
            'tenant_id' => $tenant->id,
            'client_id' => $client->id,
            'status' => Quote::STATUS_ACCEPTED,
            'total_amount' => 120000,
        ]);

        $admin = User::factory()->create(['tenant_id' => $tenant->id]);
        $admin->assignRole('Admin');

        $this->actingAs($admin)
            ->get(route('taller.dashboard', ['tenantBySlug' => $tenant->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('stats.clients', 1)
                ->where('stats.drafts', 1)
                ->where('stats.accepted', 1)
                ->where('stats.accepted_amount', 120000)
                ->has('recentQuotes', 2)
            );
    }

    public function test_follow_up_shows_pending_quotes(): void
    {
        $tenant = $this->setUpTenant();

        $client = Client::create([
            'name' => 'Cliente Seguimiento',
            'rut' => '22222222-2',
        ]);

        Quote::create([
            'tenant_id' => $tenant->id,
            'client_id' => $client->id,
            'status' => Quote::STATUS_PENDING_CUSTOMER,
            'sent_at' => now(),
            'total_amount' => 80000,
        ]);

        $admin = User::factory()->create(['tenant_id' => $tenant->id]);
        $admin->assignRole('Admin');

        $this->actingAs($admin)
            ->get(route('quotes.follow-up', ['tenantBySlug' => $tenant->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Quotes/Index')
                ->where('followUp', true)
                ->has('quotes.data', 1)
                ->where('quotes.data.0.client.name', 'Cliente Seguimiento')
            );
    }
}
