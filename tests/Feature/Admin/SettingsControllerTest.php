<?php

declare(strict_types=1);

namespace Tests\Feature\Admin;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $superAdmin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->superAdmin = User::factory()->superAdmin()->create();
    }

    public function test_settings_page_is_accessible_to_super_admin(): void
    {
        $response = $this->actingAs($this->superAdmin)->get(route('admin.settings'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Settings')
            ->has('users')
            ->has('ai_settings')
            ->has('payment_settings')
            ->has('analytics_settings')
            ->has('inactivity_settings')
            ->where('current_tab', 'users')
        );
    }

    public function test_settings_page_respects_tab_parameter(): void
    {
        $response = $this->actingAs($this->superAdmin)->get(route('admin.settings', ['tab' => 'internal']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Settings')
            ->where('current_tab', 'internal')
        );
    }

    public function test_settings_page_is_forbidden_for_regular_user(): void
    {
        $user = User::factory()->create(['is_super_admin' => false]);

        $response = $this->actingAs($user)->get(route('admin.settings'));

        $response->assertForbidden();
    }

    public function test_super_admin_can_change_any_user_password(): void
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create([
            'tenant_id' => $tenant->id,
            'password' => 'clave-vieja-1234',
        ]);

        $response = $this->actingAs($this->superAdmin)
            ->put(route('admin.users.change-password', $user), [
                'password' => 'NuevaClaveSegura2026!',
                'password_confirmation' => 'NuevaClaveSegura2026!',
            ]);

        $response->assertRedirect();
        $user->refresh();
        $this->assertTrue(Hash::check('NuevaClaveSegura2026!', $user->password));
    }
}
