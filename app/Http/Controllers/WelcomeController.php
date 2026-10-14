<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Welcome', ['seo' => [
            'title' => 'CotizaFlow — Cotiza rápido. Haz seguimiento. Vende más.',
            'description' => 'Cotizaciones y seguimiento comercial simple para microempresas y pymes.',
            'canonical_url' => route('home'),
        ]]);
    }
}
