<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Models\Client;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        return Inertia::render('Clients/Index', [
            'clients' => Client::query()->when($search, function ($query) use ($search): void {
                $escaped = addcslashes($search, '%_');
                $query->where(function ($query) use ($escaped): void {
                    $query->where('name', 'like', "%{$escaped}%")->orWhere('rut', 'like', "%{$escaped}%");
                });
            })->orderBy('name')->paginate(15)->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        Client::create($request->validated());

        return back()->with('success', 'Cliente creado.');
    }

    public function show(Client $client): Response
    {
        return Inertia::render('Clients/Show', [
            'client' => $client,
            'quotes' => Quote::query()->where('client_id', $client->id)->latest()->get(),
        ]);
    }

    public function update(StoreClientRequest $request, Client $client): RedirectResponse
    {
        $client->update($request->validated());

        return back()->with('success', 'Datos del cliente actualizados.');
    }
}
