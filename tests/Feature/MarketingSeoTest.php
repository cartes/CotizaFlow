<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Exports\ProductTemplateExport;
use App\Exports\ServiceTemplateExport;
use App\Imports\ProductWorkbookImport;
use App\Models\Client;
use App\Models\Product;
use App\Models\Tenant;
use App\Models\TrialRequest;
use App\Models\User;
use App\Notifications\NewTrialRequestNotification;
use App\Services\ManualQuoteService;
use Database\Seeders\TenantRolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class MarketingSeoTest extends TestCase
{
    use CreatesTenant, RefreshDatabase;

    public function test_home_has_commercial_brand_and_seo(): void
    {
        $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Welcome')->where('seo.title', 'CotizaFlow — Cotiza rápido. Haz seguimiento. Vende más.')->missing('tenants')->missing('inventoryImportHighlight'));
        $this->get('/precios')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Pricing'));
        $this->get('/funciones')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Servicios'));
    }

    public function test_automotive_routes_are_removed(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $user->assignRole('Admin');
        $this->actingAs($user);
        foreach (['/talleres', '/orden-de-trabajo-taller-mecanico', '/taller/'.$tenant->slug, '/empresa/'.$tenant->slug.'/receptions/create', '/empresa/'.$tenant->slug.'/work-orders', '/empresa/'.$tenant->slug.'/appointments', '/empresa/'.$tenant->slug.'/invoices', '/empresa/'.$tenant->slug.'/quotes/search-plate'] as $path) {
            $this->get($path)->assertNotFound();
        }
    }

    public function test_old_dashboard_redirects_to_commercial_company_url(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user)->get('/taller/'.$tenant->slug.'/dashboard')->assertRedirect('/empresa/'.$tenant->slug.'/inicio');
    }

    public function test_commercial_pages_load_for_admin(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $user->assignRole('Admin');
        $this->actingAs($user);
        foreach (['taller.dashboard', 'quotes.index', 'quotes.create', 'quotes.follow-up', 'clients.index', 'inventory.index', 'services.index', 'taller.settings'] as $name) {
            $this->get(route($name))->assertOk();
        }
    }

    public function test_templates_use_generic_products_and_services(): void
    {
        $products = new ProductTemplateExport;
        $services = new ServiceTemplateExport;
        $this->assertSame('Productos', $products->title());
        $this->assertNotContains('tipo', $products->headings());
        $this->assertNotContains('stock', $products->headings());
        $this->assertSame('Cuaderno', $products->array()[0][1]);
        $this->assertSame('Asesoría', $services->array()[0][1]);
    }

    public function test_catalog_import_does_not_create_stock_movements(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);
        $import = new ProductWorkbookImport;
        $import->collection(collect([collect(['sku' => 'CUAD-01', 'nombre' => 'Cuaderno', 'precio_venta' => '3500', 'costo' => '2000'])]));
        $this->assertSame(1, $import->summary()['processed_rows']);
        $this->assertSame('Cuaderno', Product::query()->firstOrFail()->name);
        $this->assertDatabaseCount('stock_movements', 0);
    }

    public function test_product_and_service_can_be_created_without_automotive_fields(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $user->assignRole('Admin');
        $this->actingAs($user)->post(route('inventory.store'), ['name' => 'Cuaderno', 'sku' => 'PROD-01', 'cost_price' => 2000, 'selling_price' => 3500])->assertRedirect()->assertSessionHasNoErrors();
        $this->post(route('services.store'), ['name' => 'Asesoría', 'code' => 'SERV-01', 'cost_price' => 1000, 'selling_price' => 2500, 'is_active' => true])->assertRedirect()->assertSessionHasNoErrors();
        $this->assertDatabaseHas('products', ['name' => 'Cuaderno', 'physical_stock' => 0]);
        $this->assertDatabaseHas('services', ['name' => 'Asesoría']);
    }

    public function test_company_configuration_can_be_updated(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $user->assignRole('Admin');
        $this->actingAs($user)->patch(route('taller.settings.commercial.update'), ['name' => 'Nueva empresa', 'max_discount_without_approval' => 15])->assertRedirect()->assertSessionHasNoErrors();
        $this->assertSame('Nueva empresa', $tenant->fresh()->name);
    }

    public function test_access_request_and_notification_use_commercial_routes(): void
    {
        Notification::fake();
        $this->post(route('trial.store'), ['country' => 'CL', 'name' => 'Persona Demo', 'email' => 'solicitud@example.test', 'phone' => '+56912345678', 'business_name' => 'Empresa Demo', 'business_type' => 'Consultoría', 'terms' => true])->assertRedirect(route('trial.success'))->assertSessionHasNoErrors();
        $request = TrialRequest::query()->firstOrFail();
        $notification = new NewTrialRequestNotification($request);
        $this->assertSame(route('admin.dashboard'), $notification->toMail(new User)->actionUrl);
    }

    public function test_dashboard_does_not_expose_quotes_without_permission(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $client = Client::create(['name' => 'Cliente Privado', 'rut' => '12345678-5']);
        app(ManualQuoteService::class)->createDraft(['client_id' => $client->id]);
        $this->actingAs($user)->get(route('taller.dashboard'))->assertOk()->assertInertia(fn (Assert $page) => $page->has('recentQuotes', 0)->where('stats.clients', 0)->where('stats.drafts', 0));
    }

    public function test_role_changes_are_loaded_after_switching_company_context(): void
    {
        $tenant = $this->setUpTenant();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $user->assignRole('Admin');
        $this->assertTrue($user->can('quotes.view'));
        Tenant::forgetCurrent();
        $other = Tenant::factory()->create();
        $other->makeCurrent();
        (new TenantRolesAndPermissionsSeeder)->run();
        $tenant->makeCurrent();
        $this->assertTrue($user->fresh()->can('quotes.view'));
        $this->assertTrue($user->fresh()->can('users.manage'));
    }
}
