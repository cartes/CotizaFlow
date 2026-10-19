<?php

use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\IntegrationController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\ReportsController as AdminReportsController;
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
        Route::get('/', AdminDashboardController::class)->middleware('admin.permission:dashboard.view')->name('dashboard');

        Route::get('/tenants', [AdminTenantController::class, 'index'])->middleware('admin.permission:companies.manage')->name('tenants.index');
        Route::get('/tenants/create', [AdminTenantController::class, 'create'])->middleware('admin.permission:companies.manage')->name('tenants.create');
        Route::post('/tenants', [AdminTenantController::class, 'store'])->middleware('admin.permission:companies.manage')->name('tenants.store');
        Route::get('/tenants/{tenant}/edit', [AdminTenantController::class, 'edit'])->middleware('admin.permission:companies.manage')->name('tenants.edit');
        Route::put('/tenants/{tenant}', [AdminTenantController::class, 'update'])->middleware('admin.permission:companies.manage')->name('tenants.update');
        Route::put('/tenants/{tenant}/admin', [AdminTenantController::class, 'updateAdmin'])->middleware('admin.permission:companies.manage')->name('tenants.update_admin');
        Route::put('/tenants/{tenant}/suspend', [AdminTenantController::class, 'suspend'])->middleware('admin.permission:companies.manage')->name('tenants.suspend');
        Route::get('/tenants/{tenant}/activity', [TenantActivityController::class, 'show'])->middleware('admin.permission:history.view')->name('tenants.activity');

        Route::get('/trial-requests', [AdminTrialRequestController::class, 'index'])->middleware('admin.permission:requests.manage')->name('trial-requests.index');
        Route::post('/trial-requests/{trialRequest}/approve', [AdminTrialRequestController::class, 'approve'])->middleware('admin.permission:requests.manage')->name('trial-requests.approve');
        Route::post('/trial-requests/{trialRequest}/reject', [AdminTrialRequestController::class, 'reject'])->middleware('admin.permission:requests.manage')->name('trial-requests.reject');
        Route::delete('/trial-requests/{trialRequest}', [AdminTrialRequestController::class, 'destroy'])->middleware('admin.permission:requests.manage')->name('trial-requests.destroy');

        Route::get('/payments', [AdminPaymentController::class, 'index'])->middleware('admin.permission:payments.view')->name('payments.index');
        Route::get('/integraciones', [IntegrationController::class, 'index'])->middleware('admin.permission:integrations.manage')->name('integrations.index');
        Route::get('/audit-logs', [AuditLogController::class, 'index'])->middleware('admin.permission:history.view')->name('audit-logs.index');

        Route::get('/reports/export', [AdminReportsController::class, 'export'])->middleware('admin.permission:reports.view')->name('reports.export');
        Route::get('/reports', [AdminReportsController::class, 'index'])->middleware('admin.permission:reports.view')->name('reports.index');
        Route::post('/reports/schedules', [AdminReportsController::class, 'storeSchedule'])->middleware('admin.permission:reports.schedule')->name('reports.schedules.store');
        Route::put('/reports/schedules/{schedule}', [AdminReportsController::class, 'updateSchedule'])->middleware('admin.permission:reports.schedule')->name('reports.schedules.update');
        Route::delete('/reports/schedules/{schedule}', [AdminReportsController::class, 'destroySchedule'])->middleware('admin.permission:reports.schedule')->name('reports.schedules.destroy');

        // Configuración Super Admin (Usuarios, Perfil, Configuraciones Internas)
        Route::get('/configuracion', [AdminSettingsController::class, 'index'])->middleware('admin.permission:settings.manage')->name('settings');

        // Rutas de Perfil y Configuraciones Internas
        Route::get('/profile', [AdminSettingsController::class, 'index'])->middleware('admin.permission:settings.manage')->name('profile');
        Route::put('/profile', [AdminProfileController::class, 'updateProfile'])->middleware('admin.permission:settings.manage')->name('profile.update');
        Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->middleware('admin.permission:settings.manage')->name('profile.password');
        Route::put('/profile/api-keys', [AdminProfileController::class, 'updateApiKeys'])->middleware('admin.permission:settings.manage')->name('profile.api-keys');
        Route::put('/profile/analytics', [AdminProfileController::class, 'updateAnalytics'])->middleware('admin.permission:settings.manage')->name('profile.analytics');

        // Usuarios Globales
        Route::get('/users', [AdminUserController::class, 'index'])->middleware('admin.permission:internal_roles.manage')->name('users.index');
        Route::put('/users/{user}/password', [AdminUserController::class, 'changePassword'])->middleware('admin.permission:internal_roles.manage')->name('users.change-password');
        Route::patch('/users/{user}/internal-role', [AdminUserController::class, 'updateInternalRole'])->middleware('admin.permission:internal_roles.manage')->name('users.internal-role');
    });
require __DIR__.'/auth.php';
