<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Quote;
use Inertia\Inertia;
use Inertia\Response;

class ManualQuoteTrackingController extends Controller
{
    public function show(string $uuid): Response
    {
        $quote = Quote::withoutGlobalScope('tenant')->with(['client', 'tenant', 'items'])->where('uuid', $uuid)->whereNotNull('client_id')->firstOrFail();
        abort_if($quote->status === Quote::STATUS_DRAFT, 404);

        return Inertia::render('Quotes/PublicShow', [
            'quote' => $quote->only('id', 'uuid', 'status', 'subtotal_amount', 'apply_tax', 'tax_rate', 'tax_amount', 'total_amount', 'notes'),
            'clientName' => $quote->client?->name,
            'company' => ['name' => $quote->tenant->name, 'logo_url' => $quote->tenant->logoUrl()],
            'items' => $quote->items->map(fn ($item): array => $item->only('id', 'description', 'quantity', 'unit_price', 'discount_percent', 'total_price')),
            'taxName' => $quote->taxName(),
        ]);
    }
}
