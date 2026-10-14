<?php

namespace Tests\Traits;

use App\Models\Tenant;
use App\Services\TenantSetupService;
use Illuminate\Support\Facades\URL;

trait CreatesTenant
{
    /**
     * Creates a dummy tenant, provisions roles/permissions, and makes it current.
     */
    protected function setUpTenant(): Tenant
    {
        $tenant = Tenant::firstOrCreate(
            ['rut_taller' => '12345678-9'],
            [
                'name' => 'Empresa Test',
                'slug' => 'empresa-test',
                'domain' => 'test.cotizaflow.test',
                'comuna' => 'Santiago',
                'phone' => '+56912345678',
                'seo_description' => 'Empresa de pruebas.',
            ]
        );

        $tenant->makeCurrent();
        URL::defaults(['tenantBySlug' => $tenant->slug]);

        app(TenantSetupService::class)->provisionTenant($tenant);

        return $tenant;
    }
}
