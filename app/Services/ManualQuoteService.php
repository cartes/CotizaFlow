<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Quote;
use App\Models\QuoteItem;
use App\Models\TenantNotification;

class ManualQuoteService
{
    public function __construct(protected QuoteItemService $quoteItemService) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public function createDraft(array $data): Quote
    {
        return Quote::create([
            'client_id' => $data['client_id'],
            'notes' => $data['notes'] ?? null,
            'status' => Quote::STATUS_DRAFT,
        ]);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @param  array<string, mixed>  $metadata
     */
    public function addItem(
        Quote $quote,
        array $validated,
        string $description = 'Se agregó un ítem a la cotización.',
        array $metadata = []
    ): QuoteItem {
        return $this->quoteItemService->addItem($quote, $validated, $description, $metadata);
    }

    public function removeItem(
        Quote $quote,
        QuoteItem $item,
        string $description = 'Se eliminó un ítem de la cotización.'
    ): void {
        $this->quoteItemService->removeItem($quote, $item, $description);
    }

    public function send(Quote $quote, string $channel): void
    {
        $quote->update([
            'status' => Quote::STATUS_PENDING_CUSTOMER,
            'sent_at' => now(),
            'responded_at' => null,
            'customer_response_notes' => null,
        ]);

        $this->quoteItemService->recordEvent(
            $quote,
            'staff',
            'quote_sent',
            $this->sendEventDescription($channel),
            ['channel' => $channel]
        );
    }

    public function approveManually(Quote $quote, string $channel): void
    {
        $quote->update([
            'status' => Quote::STATUS_ACCEPTED,
            'responded_at' => now(),
        ]);

        $description = match ($channel) {
            'phone' => 'Cotización aprobada manualmente. El cliente confirmó por llamada telefónica.',
            'whatsapp' => 'Cotización aprobada manualmente. El cliente confirmó por WhatsApp.',
            'email' => 'Cotización aprobada manualmente. El cliente confirmó por correo electrónico.',
            default => 'Cotización aprobada manualmente por el equipo.',
        };

        $this->quoteItemService->recordEvent($quote, 'staff', 'staff_approved_manually', $description, [
            'channel' => $channel,
        ]);

    }

    public function respondPublicly(Quote $quote, string $decision, ?string $notes): void
    {
        $status = $decision === 'accepted'
            ? Quote::STATUS_ACCEPTED
            : Quote::STATUS_REJECTED;

        $quote->update([
            'status' => $status,
            'responded_at' => now(),
            'customer_response_notes' => $notes,
        ]);

        $description = $status === Quote::STATUS_ACCEPTED
            ? 'El cliente aceptó la cotización.'
            : 'El cliente rechazó la cotización.';

        $this->quoteItemService->recordEvent($quote, 'customer', 'customer_'.$decision, $description, [
            'notes' => $notes,
        ]);

        $this->notifyTenantOfCustomerResponse($quote, $status);

    }

    /**
     * Mensaje de WhatsApp con monto y enlace para aprobar la cotización desde el celular.
     */
    public function buildWhatsAppMessage(Quote $quote): string
    {
        $quote->loadMissing(['client', 'tenant']);
        $clientName = $quote->client?->name ?? 'cliente';
        $company = $quote->tenant?->name ?? config('app.name');
        $url = route('quotes.public.show', ['uuid' => $quote->uuid]);

        return "Hola {$clientName}, soy de {$company}. Puedes revisar y responder tu cotización aquí: {$url}";
    }

    private function notifyTenantOfCustomerResponse(Quote $quote, string $status): void
    {
        TenantNotification::create([
            'tenant_id' => $quote->tenant_id,
            'type' => $status === Quote::STATUS_ACCEPTED ? 'quote_accepted' : 'quote_rejected',
            'title' => $status === Quote::STATUS_ACCEPTED ? 'Cotización aceptada' : 'Cotización rechazada',
            'body' => ($quote->client?->name ?? 'El cliente').' respondió la cotización #'.$quote->id.'.',
            'data' => ['quote_id' => $quote->id],
        ]);
    }

    public function updateTax(Quote $quote, bool $applyTax, ?float $taxRate = null): Quote
    {
        return $this->quoteItemService->updateTax($quote, $applyTax, $taxRate);
    }

    private function sendEventDescription(string $channel): string
    {
        return match ($channel) {
            'whatsapp' => 'Cotización enviada al cliente para su aprobación por WhatsApp.',
            'email' => 'Cotización enviada al cliente para su aprobación por correo electrónico.',
            'both' => 'Cotización enviada al cliente para su aprobación por WhatsApp y correo electrónico.',
            default => 'Cotización enviada al cliente para su aprobación.',
        };
    }
}
