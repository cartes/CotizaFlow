<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AdminScheduledReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $reportName, public string $csv) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: "Reporte CotizaFlow: {$this->reportName}");
    }

    public function content(): Content
    {
        return new Content(view: 'emails.admin-scheduled-report', with: ['reportName' => $this->reportName]);
    }

    /** @return array<int, Attachment> */
    public function attachments(): array
    {
        return [Attachment::fromData(fn (): string => $this->csv, 'reporte-cotizaflow.csv')->withMime('text/csv')];
    }
}
