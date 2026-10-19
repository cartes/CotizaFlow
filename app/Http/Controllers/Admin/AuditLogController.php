<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'tenant_id' => ['nullable', 'integer', 'exists:tenants,id'],
        ]);

        return Inertia::render('Admin/AuditLogs/Index', [
            'logs' => AuditLog::query()
                ->with('user:id,name,email')
                ->when($filters['tenant_id'] ?? null, fn ($query, $tenantId) => $query
                    ->where('model_type', Tenant::class)
                    ->where('model_id', $tenantId))
                ->latest('created_at')
                ->paginate(50)
                ->withQueryString(),
            'tenant_id' => $filters['tenant_id'] ?? null,
        ]);
    }
}
