<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IntegrationEvent;
use App\Models\Setting;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class IntegrationController extends Controller
{
    public function index(): Response
    {
        $activeAiProvider = (string) Setting::get('ai_provider', config('ai.default', 'gemini'));
        $activeAiKey = Setting::get("{$activeAiProvider}_api_key", config("ai.providers.{$activeAiProvider}.key"));
        $mailDriver = (string) config('mail.default', '');
        $mailConfig = (array) config("mail.mailers.{$mailDriver}", []);
        $missingPaymentRoutes = collect([
            'checkout.preference',
            'subscription.preference',
            'admin.payments.webhook',
        ])->reject(fn (string $routeName): bool => Route::has($routeName));

        $definitions = [
            'ai' => [
                'name' => 'Inteligencia artificial',
                'description' => 'Proveedor activo para funciones asistidas por IA.',
                'configured' => filled($activeAiKey),
                'configuration' => $activeAiProvider,
            ],
            'mercado_pago' => [
                'name' => 'Mercado Pago',
                'description' => 'Cobros y notificaciones de pago.',
                'configured' => filled(Setting::get('mp_access_token')),
                'configuration' => Setting::get('mp_sandbox', 'true') === 'true' ? 'Sandbox' : 'Producción',
                'setup_issue' => $missingPaymentRoutes->isNotEmpty()
                    ? 'Faltan rutas de checkout o callback: '.$missingPaymentRoutes->implode(', ').'. Los pagos no podrán completar su ciclo.'
                    : null,
            ],
            'boostr' => [
                'name' => 'Boostr',
                'description' => 'Consulta de datos de vehículos por patente.',
                'configured' => filled(Setting::get('boostr_api_key')),
                'configuration' => (string) Setting::get('boostr_base_url', config('services.boostr.base_url')),
            ],
            'email' => [
                'name' => 'Correo saliente',
                'description' => 'Envío de avisos de acceso, renovación y actividad.',
                'configured' => $mailDriver !== '' && ($mailDriver !== 'smtp' || filled($mailConfig['host'] ?? null)),
                'configuration' => $mailDriver !== '' ? strtoupper($mailDriver) : 'Sin driver',
            ],
            'analytics' => [
                'name' => 'Google Analytics y Search Console',
                'description' => 'Medición y verificación del sitio público.',
                'configured' => filled(Setting::get('analytics_google_analytics_code'))
                    || filled(Setting::get('analytics_google_search_console_code')),
                'configuration' => 'Sitio público',
            ],
        ];

        $latestEvents = IntegrationEvent::query()
            ->whereIn('integration', array_keys($definitions))
            ->latest('checked_at')
            ->get()
            ->unique('integration')
            ->keyBy('integration');

        $integrations = collect($definitions)
            ->map(function (array $definition, string $key) use ($latestEvents): array {
                $event = $latestEvents->get($key);
                $status = ! $definition['configured']
                    ? 'missing'
                    : (filled($definition['setup_issue'] ?? null)
                        ? 'error'
                        : ($event?->status === 'error' ? 'error' : ($event?->status === 'ok' ? 'connected' : 'configured')));

                return [
                    'key' => $key,
                    ...$definition,
                    'status' => $status,
                    'last_event' => $event ? [
                        'status' => $event->status,
                        'message' => $event->message,
                        'checked_at' => $event->checked_at?->toIso8601String(),
                    ] : null,
                ];
            })
            ->values();

        $recentErrors = IntegrationEvent::query()
            ->where('status', 'error')
            ->latest('checked_at')
            ->limit(20)
            ->get(['id', 'integration', 'message', 'checked_at'])
            ->map(fn (IntegrationEvent $event): array => [
                'id' => $event->id,
                'integration' => $event->integration,
                'name' => $definitions[$event->integration]['name'] ?? $event->integration,
                'message' => $event->message,
                'checked_at' => $event->checked_at?->toIso8601String(),
            ])
            ->values();

        return Inertia::render('Admin/Integrations/Index', [
            'integrations' => $integrations,
            'recent_errors' => $recentErrors,
            'configuration_url' => route('admin.settings', ['tab' => 'internal']),
        ]);
    }
}
