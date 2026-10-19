<?php

namespace Tests\Feature\Admin;

use App\Models\IntegrationEvent;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IntegrationControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_sees_integration_configuration_status_and_safe_recent_errors(): void
    {
        $admin = User::factory()->create(['is_super_admin' => true]);
        Setting::set('ai_provider', 'gemini');
        Setting::set('gemini_api_key', 'sensitive-gemini-key');
        Setting::set('boostr_api_key', 'sensitive-boostr-key');
        Setting::set('mp_access_token', 'sensitive-mercado-pago-token');
        IntegrationEvent::record('ai', 'ok', 'El proveedor de IA respondió correctamente.');
        IntegrationEvent::record('boostr', 'error', 'Boostr respondió con HTTP 503.');

        $this->actingAs($admin)
            ->get(route('admin.integrations.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Integrations/Index')
                ->where('integrations.0.key', 'ai')
                ->where('integrations.0.status', 'connected')
                ->where('integrations.1.key', 'mercado_pago')
                ->where('integrations.1.status', 'error')
                ->where('integrations.1.setup_issue', 'Faltan rutas de checkout o callback: checkout.preference, subscription.preference, admin.payments.webhook. Los pagos no podrán completar su ciclo.')
                ->where('integrations.2.key', 'boostr')
                ->where('integrations.2.status', 'error')
                ->where('recent_errors.0.name', 'Boostr')
                ->where('recent_errors.0.message', 'Boostr respondió con HTTP 503.')
                ->where('configuration_url', route('admin.settings', ['tab' => 'internal']))
            )
            ->assertDontSee('sensitive-gemini-key')
            ->assertDontSee('sensitive-boostr-key');

        $this->assertDatabaseHas('integration_events', [
            'integration' => 'boostr',
            'status' => 'error',
            'message' => 'Boostr respondió con HTTP 503.',
        ]);
    }
}
