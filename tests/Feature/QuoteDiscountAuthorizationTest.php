<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Quote;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class QuoteDiscountAuthorizationTest extends TestCase
{
    use CreatesTenant, RefreshDatabase;

    public function test_admin_can_apply_discount_above_tenant_threshold(): void
    {
        [$tenant, $quote] = $this->prepareQuote();
        $tenant->update([
            'max_discount_without_approval' => 5,
        ]);

        $admin = User::factory()->create(['tenant_id' => $tenant->id]);
        $admin->assignRole('Admin');

        $this->actingAs($admin)
            ->post(route('quotes.items.store', [
                'tenantBySlug' => $tenant->slug,
                'quote' => $quote->id,
            ]), [
                'description' => 'Servicio especializado',
                'quantity' => 1,
                'unit_price' => 100000,
                'discount_percent' => 12,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('quote_items', [
            'quote_id' => $quote->id,
            'description' => 'Servicio especializado',
            'discount_percent' => 12,
            'discount_amount' => 12000,
            'unit_price' => 88000,
            'total_price' => 88000,
        ]);
    }

    public function test_seller_cannot_apply_discount_above_tenant_threshold_without_approval(): void
    {
        [$tenant, $quote] = $this->prepareQuote();
        $tenant->update([
            'max_discount_without_approval' => 5,
        ]);

        $seller = User::factory()->create(['tenant_id' => $tenant->id]);
        $seller->assignRole('Vendedor');

        $this->actingAs($seller)
            ->from(route('quotes.show', ['tenantBySlug' => $tenant->slug, 'quote' => $quote->id]))
            ->post(route('quotes.items.store', [
                'tenantBySlug' => $tenant->slug,
                'quote' => $quote->id,
            ]), [
                'description' => 'Servicio especializado',
                'quantity' => 1,
                'unit_price' => 100000,
                'discount_percent' => 12,
            ])
            ->assertRedirect(route('quotes.show', ['tenantBySlug' => $tenant->slug, 'quote' => $quote->id]))
            ->assertSessionHasErrors(['discount_percent']);

        $this->assertDatabaseCount('quote_items', 0);
    }

    /**
     * @return array{0: Tenant, 1: Quote}
     */
    private function prepareQuote(): array
    {
        $tenant = $this->setUpTenant();

        $client = Client::create([
            'name' => 'Cliente Comercial',
            'rut' => '12345678-5',
            'phone' => '+56911111111',
            'email' => 'cliente@cotizaflow.test',
        ]);

        $quote = Quote::create([
            'tenant_id' => $tenant->id,
            'client_id' => $client->id,
            'status' => Quote::STATUS_DRAFT,
            'subtotal_amount' => 0,
            'total_amount' => 0,
        ]);

        return [$tenant, $quote];
    }
}
