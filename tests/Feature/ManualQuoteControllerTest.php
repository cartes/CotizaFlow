<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Product;
use App\Models\Quote;
use App\Models\Tenant;
use App\Models\User;
use App\Models\WorkOrder;
use App\Services\ManualQuoteService;
use App\Services\TenantSetupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class ManualQuoteControllerTest extends TestCase
{
    use CreatesTenant, RefreshDatabase;

    private User $admin;

    private Client $client;

    protected function setUp(): void
    {
        parent::setUp();
        $tenant = $this->setUpTenant();
        $this->admin = User::factory()->create(['tenant_id' => $tenant->id, 'needs_password_change' => false]);
        $this->admin->assignRole('Admin');
        $this->client = Client::create(['name' => 'Cliente Demo', 'rut' => '12345678-5']);
    }

    private function draft(): Quote
    {
        return app(ManualQuoteService::class)->createDraft(['client_id' => $this->client->id]);
    }

    private function pricedQuote(): Quote
    {
        $quote = $this->draft();
        app(ManualQuoteService::class)->addItem($quote, ['description' => 'Asesoría', 'quantity' => 2, 'unit_price' => 10000, 'discount_percent' => 10]);

        return $quote->refresh();
    }

    public function test_quote_can_be_created_without_vehicle_or_work_order(): void
    {
        $this->actingAs($this->admin)->post(route('quotes.store'), ['client_id' => $this->client->id])->assertRedirect();
        $quote = Quote::query()->firstOrFail();
        $this->assertNull($quote->vehicle_id);
        $this->assertNull($quote->work_order_id);
        $this->assertSame('draft', $quote->status);
    }

    public function test_items_and_taxes_are_calculated(): void
    {
        $quote = $this->pricedQuote();
        $this->assertEquals(18000, $quote->subtotal_amount);
        $this->assertEquals(3420, $quote->tax_amount);
        $this->assertEquals(21420, $quote->total_amount);
    }

    public function test_accepting_does_not_create_work_order(): void
    {
        $quote = $this->pricedQuote();
        $this->actingAs($this->admin)->from(route('quotes.show', $quote))->post(route('quotes.approve-manually', $quote))->assertRedirect(route('quotes.show', $quote));
        $this->assertSame('accepted', $quote->fresh()->status);
        $this->assertSame(0, WorkOrder::query()->count());
    }

    public function test_client_can_accept_and_cannot_respond_twice(): void
    {
        $quote = $this->pricedQuote();
        app(ManualQuoteService::class)->send($quote, 'manual');
        Tenant::forgetCurrent();
        $url = route('quotes.public.respond', ['uuid' => $quote->uuid]);
        $this->post($url, ['decision' => 'accepted'])->assertRedirect();
        $this->assertSame('accepted', $quote->fresh()->status);
        $this->assertSame(0, WorkOrder::withoutGlobalScopes()->count());
        $this->post($url, ['decision' => 'rejected'])->assertStatus(409);
    }

    public function test_client_can_reject(): void
    {
        $quote = $this->pricedQuote();
        app(ManualQuoteService::class)->send($quote, 'manual');
        Tenant::forgetCurrent();
        $this->post(route('quotes.public.respond', ['uuid' => $quote->uuid]), ['decision' => 'rejected', 'notes' => 'Lo revisaré después'])->assertRedirect();
        $this->assertSame('rejected', $quote->fresh()->status);
    }

    public function test_draft_is_not_visible_publicly(): void
    {
        $quote = $this->draft();
        Tenant::forgetCurrent();
        $this->get(route('quotes.public.show', ['uuid' => $quote->uuid]))->assertNotFound();
    }

    public function test_public_quote_exposes_only_commercial_data(): void
    {
        $quote = $this->pricedQuote();
        app(ManualQuoteService::class)->send($quote, 'manual');
        Tenant::forgetCurrent();
        $this->get(route('quotes.public.show', ['uuid' => $quote->uuid]))->assertOk()->assertInertia(fn (Assert $page) => $page->component('Quotes/PublicShow')->where('clientName', 'Cliente Demo')->missing('quote.vehicle')->missing('quote.client')->missing('quote.tenant')->missing('quote.work_order_id'));
    }

    public function test_empty_quote_cannot_be_shared(): void
    {
        $quote = $this->draft();
        $this->actingAs($this->admin)->post(route('quotes.send', $quote), ['channel' => 'manual'])->assertSessionHasErrors('quote');
        $this->assertSame('draft', $quote->fresh()->status);
    }

    public function test_accepted_quote_cannot_be_changed(): void
    {
        $quote = $this->pricedQuote();
        app(ManualQuoteService::class)->approveManually($quote, 'other');
        $this->actingAs($this->admin)->post(route('quotes.items.store', $quote), ['description' => 'Otro', 'quantity' => 1, 'unit_price' => 100])->assertStatus(409);
    }

    public function test_other_company_cannot_read_or_search_quote(): void
    {
        $quote = $this->pricedQuote();
        $other = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $other->id]);
        app(TenantSetupService::class)->provisionTenant($other, $user);
        $other->makeCurrent();
        $this->actingAs($user)->get(route('quotes.show', ['tenantBySlug' => $other->slug, 'quote' => $quote->id]))->assertNotFound();
        $this->get(route('quotes.index', ['tenantBySlug' => $other->slug, 'search' => 'Cliente']))->assertOk()->assertInertia(fn (Assert $page) => $page->has('quotes.data', 0));
    }

    public function test_cannot_create_quote_for_another_company_client(): void
    {
        $other = Tenant::factory()->create();
        $other->makeCurrent();
        $client = Client::create(['name' => 'Otra empresa', 'rut' => '11111111-1']);
        $this->admin->tenant->makeCurrent();
        $this->actingAs($this->admin)->post(route('quotes.store'), ['client_id' => $client->id])->assertSessionHasErrors('client_id');
    }

    public function test_cannot_add_another_company_product(): void
    {
        $quote = $this->draft();
        $other = Tenant::factory()->create();
        $other->makeCurrent();
        $product = Product::factory()->create(['tenant_id' => $other->id]);
        $this->admin->tenant->makeCurrent();
        $this->actingAs($this->admin)->post(route('quotes.items.store', $quote), ['product_id' => $product->id, 'quantity' => 1])->assertSessionHasErrors('product_id');
    }

    public function test_user_without_quote_permission_cannot_access_quotes(): void
    {
        $user = User::factory()->create(['tenant_id' => $this->admin->tenant_id]);
        $this->actingAs($user)->get(route('quotes.index'))->assertForbidden();
    }

    public function test_index_filters_by_status_and_returns_counts(): void
    {
        $this->draft();
        $accepted = $this->draft();
        $accepted->update(['status' => Quote::STATUS_ACCEPTED]);

        $this->actingAs($this->admin)->get(route('quotes.index', ['status' => 'accepted']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Quotes/Index')
                ->has('quotes.data', 1)
                ->where('quotes.data.0.id', $accepted->id)
                ->where('filters.status', 'accepted')
                ->where('counts.draft', 1)
                ->where('counts.accepted', 1)
            );

        $this->actingAs($this->admin)->get(route('quotes.index', ['status' => 'invalid']))
            ->assertInertia(fn (Assert $page) => $page->has('quotes.data', 2)->where('filters.status', ''));
    }

    public function test_create_preselects_only_a_client_of_the_company(): void
    {
        $this->actingAs($this->admin)->get(route('quotes.create', ['client' => $this->client->id]))
            ->assertInertia(fn (Assert $page) => $page->where('selectedClientId', $this->client->id));

        $this->actingAs($this->admin)->get(route('quotes.create', ['client' => 999999]))
            ->assertInertia(fn (Assert $page) => $page->where('selectedClientId', null));
    }

    public function test_dashboard_lists_oldest_pending_quotes_for_follow_up(): void
    {
        $older = $this->draft();
        $older->update(['status' => Quote::STATUS_PENDING_CUSTOMER, 'sent_at' => now()->subDays(6)]);
        $newer = $this->draft();
        $newer->update(['status' => Quote::STATUS_PENDING_CUSTOMER, 'sent_at' => now()->subDay()]);

        $this->actingAs($this->admin)->get(route('company.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('followUps', 2)
                ->where('followUps.0.id', $older->id)
            );
    }
}
