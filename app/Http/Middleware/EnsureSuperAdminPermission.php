<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdminPermission
{
    /** @param Closure(Request): Response $next */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        abort_unless($request->user()?->hasSuperAdminAccess($permission), 403, 'No tienes permiso para acceder a esta sección.');

        return $next($request);
    }
}
