<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiciosTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the features page renders successfully with Inertia.
     */
    public function test_servicios_page_renders_successfully(): void
    {
        $response = $this->get('/funciones');

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Servicios')
            );

        $this->get('/servicios')->assertRedirect('/funciones');
    }
}
