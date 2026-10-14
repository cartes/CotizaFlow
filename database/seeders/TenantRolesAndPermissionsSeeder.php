<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class TenantRolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $commercial = ['customers.manage', 'inventory.manage', 'quotes.view', 'quotes.manage', 'quotes.send'];
        $all = [...$commercial, 'users.manage'];
        foreach ($all as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
        foreach (['Admin' => $all, 'Supervisor' => $commercial, 'Vendedor' => $commercial] as $name => $permissions) {
            Role::firstOrCreate(['name' => $name, 'guard_name' => 'web'])->syncPermissions($permissions);
        }
    }
}
