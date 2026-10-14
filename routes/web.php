<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ManualQuoteController;
use App\Http\Controllers\ManualQuoteTrackingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPricingController;
use App\Http\Controllers\PublicServicesController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TallerDashboardController;
use App\Http\Controllers\TenantBrandingController;
use App\Http\Controllers\TenantSettingsController;
use App\Http\Controllers\TrialRequestController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\WorkbookImportController;
use App\Http\Middleware\IsSuperAdmin;
use App\Http\Middleware\SetTenantRouteDefaults;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Multitenancy\Http\Middleware\NeedsTenant;

Route::get('/', WelcomeController::class)->name('home');
Route::get('/precios', PublicPricingController::class)->name('pricing');
Route::get('/funciones', PublicServicesController::class)->name('servicios');
Route::redirect('/servicios', '/funciones');
Route::get('/solicitar-acceso', [TrialRequestController::class, 'create'])->name('trial.create');
Route::post('/solicitar-acceso', [TrialRequestController::class, 'store'])->middleware('throttle:5,1')->name('trial.store');
Route::get('/solicitud-recibida', [TrialRequestController::class, 'success'])->name('trial.success');
Route::get('/cotizacion/{uuid}', [ManualQuoteTrackingController::class, 'show'])->name('quotes.public.show');
Route::post('/cotizacion/{uuid}/respuesta', [ManualQuoteController::class, 'respond'])->middleware('throttle:20,1')->name('quotes.public.respond');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/dashboard', function (Request $request): RedirectResponse {
        if ($request->user()->is_super_admin) {
            return redirect()->route('admin.dashboard');
        }
        $tenant = $request->user()->tenant;
        abort_unless($tenant, 403, 'No tienes una empresa asignada.');

        return redirect()->route('taller.dashboard', ['tenantBySlug' => $tenant->slug]);
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/taller/{tenantBySlug}/dashboard', function (Tenant $tenantBySlug): RedirectResponse {
    return redirect()->route('taller.dashboard', ['tenantBySlug' => $tenantBySlug->slug]);
})->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified', NeedsTenant::class, SetTenantRouteDefaults::class])
    ->prefix('/empresa/{tenantBySlug}')
    ->group(function (): void {
        Route::get('/inicio', TallerDashboardController::class)->name('taller.dashboard');
        Route::get('/seguimiento', [TallerDashboardController::class, 'followUp'])->middleware('permission:quotes.view')->name('quotes.follow-up');
        Route::get('/cotizaciones', [ManualQuoteController::class, 'index'])->middleware('permission:quotes.view')->name('quotes.index');
        Route::get('/cotizaciones/crear', [ManualQuoteController::class, 'create'])->middleware('permission:quotes.manage')->name('quotes.create');
        Route::post('/cotizaciones', [ManualQuoteController::class, 'store'])->middleware('permission:quotes.manage')->name('quotes.store');
        Route::get('/cotizaciones/{quote}', [ManualQuoteController::class, 'show'])->middleware('permission:quotes.view')->name('quotes.show');
        Route::post('/cotizaciones/{quote}/items', [ManualQuoteController::class, 'addItem'])->middleware('permission:quotes.manage')->name('quotes.items.store');
        Route::delete('/cotizaciones/{quote}/items/{item}', [ManualQuoteController::class, 'removeItem'])->middleware('permission:quotes.manage')->name('quotes.items.destroy');
        Route::patch('/cotizaciones/{quote}/impuestos', [ManualQuoteController::class, 'updateTax'])->middleware('permission:quotes.manage')->name('quotes.tax.update');
        Route::post('/cotizaciones/{quote}/compartir', [ManualQuoteController::class, 'send'])->middleware('permission:quotes.send')->name('quotes.send');
        Route::post('/cotizaciones/{quote}/aceptar', [ManualQuoteController::class, 'approveManually'])->middleware('permission:quotes.send')->name('quotes.approve-manually');
        Route::resource('clientes', ClientController::class)->only(['index', 'store', 'show', 'update'])->names('clients')->parameters(['clientes' => 'client'])->middleware('permission:customers.manage');
        Route::resource('productos', InventoryController::class)->only(['index', 'store', 'update', 'destroy'])->names('inventory')->parameters(['productos' => 'product'])->middleware('permission:inventory.manage');
        Route::resource('servicios', ServiceController::class)->only(['index', 'store', 'update', 'destroy'])->names('services')->parameters(['servicios' => 'service'])->middleware('permission:inventory.manage');
        Route::get('/productos/plantilla/excel', [WorkbookImportController::class, 'downloadProductsTemplate'])->middleware('permission:inventory.manage')->name('inventory.import.template');
        Route::post('/productos/importar', [WorkbookImportController::class, 'importProducts'])->middleware('permission:inventory.manage')->name('inventory.import');
        Route::get('/servicios/plantilla/excel', [WorkbookImportController::class, 'downloadServicesTemplate'])->middleware('permission:inventory.manage')->name('services.import.template');
        Route::post('/servicios/importar', [WorkbookImportController::class, 'importServices'])->middleware('permission:inventory.manage')->name('services.import');
        Route::get('/configuracion', [TenantSettingsController::class, 'index'])->middleware('permission:users.manage')->name('taller.settings');
        Route::patch('/configuracion', [TenantSettingsController::class, 'updateCommercial'])->middleware('permission:users.manage')->name('taller.settings.commercial.update');
        Route::patch('/configuracion/color', [TenantBrandingController::class, 'updateColor'])->middleware('permission:users.manage')->name('taller.settings.branding.color');
        Route::post('/configuracion/logo', [TenantBrandingController::class, 'uploadLogo'])->middleware('permission:users.manage')->name('taller.settings.branding.logo');
        Route::delete('/configuracion/logo', [TenantBrandingController::class, 'deleteLogo'])->middleware('permission:users.manage')->name('taller.settings.branding.logo.delete');
    });

Route::get('/admin', AdminDashboardController::class)->middleware(['auth', 'verified', IsSuperAdmin::class])->name('admin.dashboard');
require __DIR__.'/auth.php';
