<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompanyDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $canViewQuotes = $request->user()->can('quotes.view');
        $quotes = Quote::query()->whereNotNull('client_id')->when(! $canViewQuotes, fn ($query) => $query->whereRaw('1 = 0'));

        return Inertia::render('Dashboard', [
            'stats' => [
                'clients' => $request->user()->can('customers.manage') ? Client::query()->count() : 0,
                'drafts' => (clone $quotes)->where('status', Quote::STATUS_DRAFT)->count(),
                'pending' => (clone $quotes)->where('status', Quote::STATUS_PENDING_CUSTOMER)->count(),
                'accepted' => (clone $quotes)->where('status', Quote::STATUS_ACCEPTED)->count(),
                'accepted_amount' => (clone $quotes)->where('status', Quote::STATUS_ACCEPTED)->sum('total_amount'),
            ],
            'recentQuotes' => (clone $quotes)->with('client:id,name')->latest()->limit(8)->get(),
        ]);
    }

    public function followUp(): Response
    {
        return Inertia::render('Quotes/Index', [
            'quotes' => Quote::query()->whereNotNull('client_id')->where('status', Quote::STATUS_PENDING_CUSTOMER)->with('client:id,name,rut')->orderBy('sent_at')->paginate(15),
            'filters' => ['search' => ''],
            'followUp' => true,
        ]);
    }
}
