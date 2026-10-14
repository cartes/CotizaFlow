<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTenantCommercialSettingsRequest;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TenantSettingsController extends Controller
{
    public function index(): Response
    {
        $tenant = Tenant::current();

        return Inertia::render('Settings/Index', [
            'company' => [...$tenant->only('name', 'phone', 'comuna', 'max_discount_without_approval', 'primary_color'), 'logo_url' => $tenant->logoUrl()],
            'users' => $tenant->users()->get(['id', 'name', 'email']),
        ]);
    }

    public function updateCommercial(UpdateTenantCommercialSettingsRequest $request): RedirectResponse
    {
        Tenant::current()->update($request->validated());

        return back()->with('success', 'Configuración de la empresa actualizada.');
    }
}
