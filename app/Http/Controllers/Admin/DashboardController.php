<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', ['companies' => Tenant::query()->withCount('users')->orderBy('name')->get(['id', 'name', 'slug', 'is_active'])]);
    }
}
