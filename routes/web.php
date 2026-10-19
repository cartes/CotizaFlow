<?php

use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\TenantActivityController;
use App\Http\Controllers\Admin\TenantController as AdminTenantController;
use App\Http\Controllers\Admin\TrialRequestController as AdminTrialRequestController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ManualQuoteController;
use App\Http\Controllers\ManualQuoteTrackingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPricingController;
use App\Http\Controllers\PublicServicesController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TenantBrandingController;
use App\Http\Controllers\TenantSettingsController;
use App\Http\Controllers\TrialRequestController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\WorkbookImportController;
use App\Http\Middleware\IsSuperAdmin;
use App\Http\Middleware\SetTenantRouteDefaults;
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

        return redirect()->route('company.dashboard', ['tenantBySlug' => $tenant->slug]);
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', NeedsTenant::class, SetTenantRouteDefaults::class])
    ->prefix('/empresa/{tenantBySlug}')
    ->group(function (): void {
        Route::get('/inicio', CompanyDashboardController::class)->name('company.dashboard');
        Route::get('/seguimiento', [CompanyDashboardController::class, 'followUp'])->middleware('permission:quotes.view')->name('quotes.follow-up');
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
        Route::get('/configuracion', [TenantSettingsController::class, 'index'])->middleware('permission:users.manage')->name('company.settings');
        Route::patch('/configuracion', [TenantSettingsController::class, 'updateCommercial'])->middleware('permission:users.manage')->name('company.settings.commercial.update');
        Route::patch('/configuracion/color', [TenantBrandingController::class, 'updateColor'])->middleware('permission:users.manage')->name('company.settings.branding.color');
        Route::post('/configuracion/logo', [TenantBrandingController::class, 'uploadLogo'])->middleware('permission:users.manage')->name('company.settings.branding.logo');
        Route::delete('/configuracion/logo', [TenantBrandingController::class, 'deleteLogo'])->middleware('permission:users.manage')->name('company.settings.branding.logo.delete');
    });

Route::middleware(['auth', 'verified', IsSuperAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', AdminDashboardController::class)->name('dashboard');

        Route::get('/tenants', [AdminTenantController::class, 'index'])->name('tenants.index');
        Route::get('/tenants/create', [AdminTenantController::class, 'create'])->name('tenants.create');
        Route::post('/tenants', [AdminTenantController::class, 'store'])->name('tenants.store');
        Route::get('/tenants/{tenant}/edit', [AdminTenantController::class, 'edit'])->name('tenants.edit');
        Route::put('/tenants/{tenant}', [AdminTenantController::class, 'update'])->name('tenants.update');
        Route::put('/tenants/{tenant}/admin', [AdminTenantController::class, 'updateAdmin'])->name('tenants.update_admin');
        Route::put('/tenants/{tenant}/suspend', [AdminTenantController::class, 'suspend'])->name('tenants.suspend');
        Route::get('/tenants/{tenant}/activity', [TenantActivityController::class, 'show'])->name('tenants.activity');

        Route::get('/trial-requests', [AdminTrialRequestController::class, 'index'])->name('trial-requests.index');
        Route::post('/trial-requests/{trialRequest}/approve', [AdminTrialRequestController::class, 'approve'])->name('trial-requests.approve');
        Route::post('/trial-requests/{trialRequest}/reject', [AdminTrialRequestController::class, 'reject'])->name('trial-requests.reject');
        Route::delete('/trial-requests/{trialRequest}', [AdminTrialRequestController::class, 'destroy'])->name('trial-requests.destroy');

        Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');

        // Configuración Super Admin (Usuarios, Perfil, Configuraciones Internas)
        Route::get('/configuracion', [AdminSettingsController::class, 'index'])->name('settings');

        // Rutas de Perfil y Configuraciones Internas
        Route::get('/profile', [AdminSettingsController::class, 'index'])->name('profile');
        Route::put('/profile', [AdminProfileController::class, 'updateProfile'])->name('profile.update');
        Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password');
        Route::put('/profile/api-keys', [AdminProfileController::class, 'updateApiKeys'])->name('profile.api-keys');
        Route::put('/profile/analytics', [AdminProfileController::class, 'updateAnalytics'])->name('profile.analytics');

        // Usuarios Globales
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::put('/users/{user}/password', [AdminUserController::class, 'changePassword'])->name('users.change-password');
    });
require __DIR__.'/auth.php';
