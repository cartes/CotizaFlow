<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        Tenant::firstOrCreate(['slug' => 'demo'], ['name' => 'Empresa Demo', 'domain' => 'demo', 'database' => config('database.connections.sqlite.database'), 'rut_taller' => null, 'is_active' => true]);
    }
}
