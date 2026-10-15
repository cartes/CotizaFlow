<?php

declare(strict_types=1);

namespace Tests\Feature;

use Database\Seeders\DefaultServiceSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\CreatesTenant;

class DefaultServiceSeederTest extends TestCase
{
    use CreatesTenant;
    use RefreshDatabase;

    public function test_seeder_runs_cleanly(): void
    {
        $tenant = $this->setUpTenant();

        $seeder = new DefaultServiceSeeder;
        $seeder->run();

        $this->assertNotNull($tenant);
    }
}
