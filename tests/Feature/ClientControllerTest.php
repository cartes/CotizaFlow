<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Quote;
use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantSetupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class ClientControllerTest extends TestCase
{
    use CreatesTenant;
    use RefreshDatabase;

    public function test_index_displays_clients_list_and_filters(): void
    {
        $tenant = $this->setUpTenant();
        $admin = $this->createAdmin($tenant);
        $clientA = $this->createClient([
            'tenant_id' => $tenant->id,
            'name' => 'Maria Cliente',
            'rut' => '22222222-2',
        ]);
        $clientB = $this->createClient([
            'tenant_id' => $tenant->id,
            'name' => 'Pedro Gomez',
            'rut' => '33333333-3',
        ]);

        $this->actingAs($admin)
            ->get(route('clients.index', ['tenantBySlug' => $tenant->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Clients/Index')
                ->has('clients.data', 2)
                ->where('clients.data.0.name', 'Maria Cliente')
                ->where('clients.data.1.name', 'Pedro Gomez')
            );

        $this->actingAs($admin)
            ->get(route('clients.index', [
                'tenantBySlug' => $tenant->slug,
                'search' => 'Pedro',
            ]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Clients/Index')
                ->has('clients.data', 1)
                ->where('clients.data.0.name', 'Pedro Gomez')
            );
    }

    public function test_store_creates_a_new_client(): void
    {
        $tenant = $this->setUpTenant();
        $admin = $this->createAdmin($tenant);

        $this->actingAs($admin)
            ->from(route('clients.index', ['tenantBySlug' => $tenant->slug]))
            ->post(route('clients.store', ['tenantBySlug' => $tenant->slug]), [
                'name' => 'Nuevo Cliente',
                'rut' => '12345678-5',
                'phone' => '+56912345678',
                'email' => 'nuevo@cliente.com',
            ])
            ->assertRedirect(route('clients.index', ['tenantBySlug' => $tenant->slug]));

        $this->assertDatabaseHas('clients', [
            'tenant_id' => $tenant->id,
            'name' => 'Nuevo Cliente',
            'rut' => '12345678-5',
            'phone' => '+56912345678',
            'email' => 'nuevo@cliente.com',
        ]);
    }

    public function test_show_displays_client_profile_and_quotes(): void
    {
        $tenant = $this->setUpTenant();
        $admin = $this->createAdmin($tenant);
        $client = $this->createClient([
            'tenant_id' => $tenant->id,
            'name' => 'Juan Cliente',
            'rut' => '11111111-1',
            'phone' => '+56912345678',
            'email' => 'juan@example.com',
        ]);

        $quote = Quote::create([
            'tenant_id' => $tenant->id,
            'client_id' => $client->id,
            'status' => Quote::STATUS_DRAFT,
            'subtotal_amount' => 185000,
        ]);

        $this->actingAs($admin)
            ->get(route('clients.show', [
                'tenantBySlug' => $tenant->slug,
                'client' => $client->id,
            ]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Clients/Show')
                ->where('client.id', $client->id)
                ->where('client.name', 'Juan Cliente')
                ->has('quotes', 1)
                ->where('quotes.0.id', $quote->id)
            );
    }

    public function test_index_and_show_expose_commercial_totals_per_client(): void
    {
        $tenant = $this->setUpTenant();
        $admin = $this->createAdmin($tenant);
        $client = $this->createClient(['tenant_id' => $tenant->id, 'name' => 'Ana Cliente', 'rut' => '44444444-4']);

        foreach ([
            [Quote::STATUS_DRAFT, 1000],
            [Quote::STATUS_PENDING_CUSTOMER, 2000],
            [Quote::STATUS_ACCEPTED, 5000],
        ] as [$status, $total]) {
            Quote::create([
                'tenant_id' => $tenant->id,
                'client_id' => $client->id,
                'status' => $status,
                'total_amount' => $total,
            ]);
        }

        $this->actingAs($admin)
            ->get(route('clients.index', ['tenantBySlug' => $tenant->slug]))
            ->assertInertia(fn (Assert $page) => $page
                ->where('clients.data.0.quotes_count', 3)
                ->where('clients.data.0.pending_count', 1)
                ->where('clients.data.0.sold_amount', 5000)
            );

        $this->actingAs($admin)
            ->get(route('clients.show', ['tenantBySlug' => $tenant->slug, 'client' => $client->id]))
            ->assertInertia(fn (Assert $page) => $page
                ->where('stats.quoted_amount', 7000)
                ->where('stats.sold_amount', 5000)
                ->where('stats.pending_count', 1)
                ->where('stats.quotes_count', 3)
            );
    }

    public function test_update_modifies_existing_client(): void
    {
        $tenant = $this->setUpTenant();
        $admin = $this->createAdmin($tenant);
        $client = $this->createClient([
            'tenant_id' => $tenant->id,
            'name' => 'Nombre Antiguo',
            'rut' => '11111111-1',
        ]);

        $this->actingAs($admin)
            ->from(route('clients.show', ['tenantBySlug' => $tenant->slug, 'client' => $client->id]))
            ->put(route('clients.update', ['tenantBySlug' => $tenant->slug, 'client' => $client->id]), [
                'name' => 'Nombre Actualizado',
                'rut' => '11111111-1',
                'phone' => '+56999998888',
                'email' => 'actualizado@example.com',
            ])
            ->assertRedirect(route('clients.show', ['tenantBySlug' => $tenant->slug, 'client' => $client->id]));

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'name' => 'Nombre Actualizado',
            'phone' => '+56999998888',
        ]);
    }

    public function test_a_client_from_another_tenant_cannot_be_accessed(): void
    {
        $tenantA = $this->setUpTenant();
        $admin = $this->createAdmin($tenantA);

        $tenantB = $this->createTenant([
            'name' => 'Empresa Dos',
            'slug' => 'empresa-dos',
            'domain' => 'dos.cotizaflow.test',
            'rut_taller' => '99999999-9',
        ]);

        $tenantB->makeCurrent();
        URL::defaults(['tenantBySlug' => $tenantB->slug]);

        $foreignClient = $this->createClient([
            'tenant_id' => $tenantB->id,
            'rut' => '44444444-4',
            'name' => 'Cliente Externo',
        ]);

        $tenantA->makeCurrent();
        URL::defaults(['tenantBySlug' => $tenantA->slug]);

        $this->actingAs($admin)
            ->get(route('clients.show', [
                'tenantBySlug' => $tenantA->slug,
                'client' => $foreignClient->id,
            ]))
            ->assertNotFound();
    }

    private function createAdmin(Tenant $tenant): User
    {
        $admin = User::factory()->create([
            'tenant_id' => $tenant->id,
        ]);

        $admin->assignRole('Admin');

        return $admin;
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function createClient(array $attributes): Client
    {
        return Client::create(array_merge([
            'rut' => '99999999-9',
            'name' => 'Cliente Test',
            'phone' => null,
            'email' => null,
        ], $attributes));
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function createTenant(array $attributes): Tenant
    {
        $tenant = Tenant::create($attributes);

        app(TenantSetupService::class)->provisionTenant($tenant);

        return $tenant;
    }
}
