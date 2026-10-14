<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AddQuoteItemRequest;
use App\Http\Requests\RespondToQuoteRequest;
use App\Http\Requests\SendQuoteRequest;
use App\Http\Requests\StoreManualQuoteRequest;
use App\Http\Requests\UpdateQuoteTaxRequest;
use App\Models\Client;
use App\Models\Product;
use App\Models\Quote;
use App\Models\QuoteItem;
use App\Models\Service;
use App\Models\Tenant;
use App\Services\ManualQuoteService;
use App\Services\QuoteItemService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ManualQuoteController extends Controller
{
    public function __construct(protected ManualQuoteService $manualQuoteService, protected QuoteItemService $quoteItemService) {}

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        return Inertia::render('Quotes/Index', [
            'quotes' => Quote::query()->whereNotNull('client_id')->with('client:id,name,rut')->when($search, function ($query) use ($search): void {
                $escaped = addcslashes($search, '%_');
                $query->whereHas('client', function ($query) use ($escaped): void {
                    $query->where(function ($query) use ($escaped): void {
                        $query->where('name', 'like', "%{$escaped}%")->orWhere('rut', 'like', "%{$escaped}%");
                    });
                });
            })->latest()->paginate(15)->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Quotes/Create', ['clients' => Client::query()->orderBy('name')->get(['id', 'name', 'rut'])]);
    }

    public function store(StoreManualQuoteRequest $request): RedirectResponse
    {
        $quote = $this->manualQuoteService->createDraft($request->validated());

        return redirect()->route('quotes.show', $quote)->with('success', 'Cotización creada. Agrega los productos o servicios.');
    }

    public function show(Quote $quote): Response
    {
        $this->authorizeQuoteAccess($quote);
        $quote->load(['client', 'items.product', 'items.service', 'events', 'tenant']);

        return Inertia::render('Quotes/Show', [
            'quote' => $quote->makeHidden('tenant'),
            'taxName' => $quote->taxName(),
            'products' => Product::query()->orderBy('name')->get(['id', 'name', 'selling_price']),
            'services' => Service::query()->where('is_active', true)->orderBy('name')->get(['id', 'name', 'selling_price']),
            'publicUrl' => route('quotes.public.show', ['uuid' => $quote->uuid]),
            'whatsAppMessage' => $this->manualQuoteService->buildWhatsAppMessage($quote),
        ]);
    }

    public function addItem(AddQuoteItemRequest $request, Quote $quote): RedirectResponse
    {
        $this->authorizeQuoteAccess($quote);
        $this->ensureEditable($quote);
        $validated = $request->validated();
        $discount = (float) ($validated['discount_percent'] ?? 0);
        $tenant = Tenant::current();
        if ($discount > $tenant->maxDiscountWithoutApproval() && ! $request->user()->is_super_admin && ! $request->user()->hasAnyRole(['Admin', 'Supervisor'])) {
            throw ValidationException::withMessages(['discount_percent' => 'Este descuento requiere aprobación de un administrador o supervisor.']);
        }
        $this->manualQuoteService->addItem($quote, $validated);

        return back();
    }

    public function removeItem(Quote $quote, QuoteItem $item): RedirectResponse
    {
        $this->authorizeQuoteAccess($quote);
        $this->ensureEditable($quote);
        $this->manualQuoteService->removeItem($quote, $item);

        return back();
    }

    public function updateTax(UpdateQuoteTaxRequest $request, Quote $quote): RedirectResponse
    {
        $this->authorizeQuoteAccess($quote);
        $this->ensureEditable($quote);
        $this->manualQuoteService->updateTax($quote, $request->boolean('apply_tax'), $request->filled('tax_rate') ? (float) $request->validated('tax_rate') : null);

        return back();
    }

    public function send(SendQuoteRequest $request, Quote $quote): RedirectResponse
    {
        $this->authorizeQuoteAccess($quote);
        $this->ensureEditable($quote);
        if (! $quote->items()->exists()) {
            return back()->withErrors(['quote' => 'Agrega al menos un ítem antes de compartir la cotización.']);
        }
        $this->manualQuoteService->send($quote, 'manual');

        return back()->with('success', 'Enlace habilitado para compartir con el cliente.');
    }

    public function approveManually(Request $request, Quote $quote): RedirectResponse
    {
        $this->authorizeQuoteAccess($quote);
        $this->ensureEditable($quote);
        if (! $quote->items()->exists()) {
            return back()->withErrors(['quote' => 'Agrega al menos un ítem antes de aceptar la cotización.']);
        }
        $this->manualQuoteService->approveManually($quote, 'other');

        return back()->with('success', 'Cotización aceptada.');
    }

    public function respond(RespondToQuoteRequest $request, string $uuid): RedirectResponse
    {
        $quote = Quote::withoutGlobalScope('tenant')->where('uuid', $uuid)->whereNotNull('client_id')->firstOrFail();
        abort_unless($quote->status === Quote::STATUS_PENDING_CUSTOMER, 409, 'La cotización no está disponible para respuesta.');
        $this->manualQuoteService->respondPublicly($quote, $request->validated('decision'), $request->validated('notes'));

        return back()->with('success', 'Tu respuesta fue registrada.');
    }

    private function ensureEditable(Quote $quote): void
    {
        abort_if(in_array($quote->status, [Quote::STATUS_ACCEPTED, Quote::STATUS_REJECTED], true), 409, 'La cotización ya tiene una respuesta.');
    }

    private function authorizeQuoteAccess(Quote $quote): void
    {
        abort_unless($quote->isManual(), 404);
        abort_unless(request()->user()->is_super_admin || request()->user()->tenant_id === $quote->tenant_id, 403);
    }
}
