<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProductRequest;
use App\Models\Product;
use App\Models\Tenant;
use App\Services\QuoteItemService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        return Inertia::render('Inventory/Index', [
            'products' => Product::query()->when($search, fn ($query) => $query->where('name', 'like', '%'.addcslashes($search, '%_').'%'))->orderBy('name')->paginate(20)->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function store(UpsertProductRequest $request): RedirectResponse
    {
        Product::create([
            ...$request->validated(),
            'type' => 'insumo',
            'branch_id' => Tenant::current()?->branches()->where('is_main', true)->value('id'),
            'physical_stock' => 0,
            'reserved_stock' => 0,
            'min_stock' => 0,
        ]);

        return back()->with('success', 'Producto agregado al catálogo.');
    }

    public function update(UpsertProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());
        app(QuoteItemService::class)->syncCatalogItemUpdates($product);

        return back()->with('success', 'Producto actualizado.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return back()->with('success', 'Producto retirado del catálogo.');
    }
}
