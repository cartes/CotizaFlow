<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class EnsureSuperAdminCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_super_admin_when_missing(): void
    {
        $password = fake()->password(24, 32);

        $this->artisan('feeto:ensure-super-admin', [
            'email' => 'superadmin@tallerflow.cl',
            '--password' => $password,
        ])->assertSuccessful();

        $user = User::query()->where('email', 'superadmin@tallerflow.cl')->first();

        $this->assertNotNull($user);
        $this->assertSame('Super Admin', $user->name);
        $this->assertTrue($user->is_super_admin);
        $this->assertNull($user->tenant_id);
        $this->assertNotNull($user->email_verified_at);
        $this->assertTrue(Hash::check($password, $user->password));
    }

    public function test_it_promotes_an_existing_user_and_updates_password_when_requested(): void
    {
        $tenant = Tenant::factory()->create();
        $password = fake()->password(24, 32);

        $user = User::factory()->create([
            'name' => 'Usuario Normal',
            'email' => 'admin@tallerflow.cl',
            'password' => 'password-anterior',
            'is_super_admin' => false,
            'tenant_id' => $tenant->id,
            'email_verified_at' => null,
        ]);

        $this->artisan('feeto:ensure-super-admin', [
            'email' => 'admin@tallerflow.cl',
            '--name' => 'Super Admin Recuperado',
            '--password' => $password,
        ])->assertSuccessful();

        $user->refresh();

        $this->assertSame('Super Admin Recuperado', $user->name);
        $this->assertTrue($user->is_super_admin);
        $this->assertNull($user->tenant_id);
        $this->assertNotNull($user->email_verified_at);
        $this->assertTrue(Hash::check($password, $user->password));
    }

    public function test_it_can_be_called_via_cotizaflow_alias(): void
    {
        $password = fake()->password(24, 32);

        $this->artisan('cotizaflow:ensure-super-admin', [
            'email' => 'nuevo-superadmin@cotizaflow.test',
            '--name' => 'Super Admin CotizaFlow',
            '--password' => $password,
        ])->assertSuccessful();

        $user = User::query()->where('email', 'nuevo-superadmin@cotizaflow.test')->first();

        $this->assertNotNull($user);
        $this->assertSame('Super Admin CotizaFlow', $user->name);
        $this->assertTrue($user->is_super_admin);
        $this->assertNull($user->tenant_id);
        $this->assertTrue(Hash::check($password, $user->password));
    }
}
