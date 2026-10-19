<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingsController extends Controller
{
    /**
     * Muestra la vista unificada de configuración para el super-admin.
     */
    public function index(Request $request): Response
    {
        $currentTab = (string) $request->query('tab', 'users');
        if (! in_array($currentTab, ['users', 'profile', 'internal'], true)) {
            $currentTab = 'users';
        }

        $users = User::query()
            ->with('tenant')
            ->orderByRaw('is_super_admin DESC')
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $aiSettings = $this->buildSettingsPayload('ai', [
            'ai_provider' => [
                'config' => 'ai.default',
                'default' => 'gemini',
                'description' => 'Proveedor IA activo para texto',
                'is_secret' => false,
            ],
            'ai_image_provider' => [
                'config' => 'ai.default_for_images',
                'default' => 'gemini',
                'description' => 'Proveedor IA activo para procesamiento de imágenes',
                'is_secret' => false,
            ],
            'gemini_api_key' => [
                'config' => 'ai.providers.gemini.key',
                'description' => 'Google Gemini API Key',
                'is_secret' => true,
            ],
            'openai_api_key' => [
                'config' => 'ai.providers.openai.key',
                'description' => 'OpenAI API Key',
                'is_secret' => true,
            ],
            'anthropic_api_key' => [
                'config' => 'ai.providers.anthropic.key',
                'description' => 'Anthropic API Key',
                'is_secret' => true,
            ],
        ]);

        $paymentSettings = $this->buildSettingsPayload('payments', [
            'mp_access_token' => [
                'description' => 'Mercado Pago Access Token',
                'is_secret' => true,
            ],
            'mp_public_key' => [
                'description' => 'Mercado Pago Public Key',
                'is_secret' => true,
            ],
            'mp_webhook_secret' => [
                'description' => 'Mercado Pago Webhook Secret',
                'is_secret' => true,
            ],
            'mp_sandbox' => [
                'default' => 'true',
                'description' => 'Modo sandbox de Mercado Pago',
                'is_secret' => false,
            ],
            'vat_rate' => [
                'config' => 'billing.vat_rate',
                'default' => '0.19',
                'description' => 'Tasa de IVA general aplicada a facturación y comisiones',
                'is_secret' => false,
            ],
        ]);

        $analyticsSettings = $this->buildSettingsPayload('analytics', [
            'analytics_google_analytics_code' => [
                'description' => 'Código de Google Analytics (Script de seguimiento)',
                'is_secret' => false,
            ],
            'analytics_google_search_console_code' => [
                'description' => 'Código de Verificación de Google Search Console (Meta Tag o HTML)',
                'is_secret' => false,
            ],
        ]);

        $inactivitySettings = $this->buildSettingsPayload('inactivity', [
            'inactivity_days' => [
                'config' => 'services.inactivity.days',
                'default' => '10',
                'description' => 'Días de inactividad tolerados antes del recordatorio',
                'is_secret' => false,
            ],
            'inactivity_spam_days' => [
                'config' => 'services.inactivity.spam_days',
                'default' => '7',
                'description' => 'Días mínimos para no repetir el recordatorio de inactividad',
                'is_secret' => false,
            ],
        ]);

        return Inertia::render('Admin/Settings', [
            'current_tab' => $currentTab,
            'users' => $users,
            'ai_settings' => $aiSettings,
            'payment_settings' => $paymentSettings,
            'analytics_settings' => $analyticsSettings,
            'inactivity_settings' => $inactivitySettings,
        ]);
    }

    /**
     * Construye la estructura de configuraciones para la respuesta Inertia.
     *
     * @param  array<string, array{config?: string, default?: mixed, description: string, is_secret: bool}>  $definitions
     * @return Collection<string, array{value: mixed, description: string, is_secret: bool, has_value: bool}>
     */
    private function buildSettingsPayload(string $group, array $definitions): Collection
    {
        $storedSettings = Setting::getGroup($group)->keyBy('key');
        $payload = collect();

        foreach ($definitions as $key => $definition) {
            /** @var Setting|null $setting */
            $setting = $storedSettings->get($key);
            $configValue = array_key_exists('config', $definition) ? config($definition['config']) : null;
            $defaultValue = $definition['default'] ?? null;
            $resolvedValue = $setting?->value ?? $configValue ?? $defaultValue;
            $isSecret = $setting?->is_secret ?? $definition['is_secret'];

            $payload->put($key, [
                'value' => $isSecret ? (filled($resolvedValue) ? '••••••••' : null) : $resolvedValue,
                'description' => $setting?->description ?? $definition['description'],
                'is_secret' => $isSecret,
                'has_value' => filled($resolvedValue),
            ]);
        }

        return $payload;
    }
}
