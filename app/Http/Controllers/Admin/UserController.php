<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InternalAdminRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInternalRoleRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->with('tenant')
            ->latest()
            ->paginate(20)
            ->through(fn (User $user): array => [
                ...$user->toArray(),
                'internal_role' => $user->internal_role?->value
                    ?? ($user->is_super_admin ? InternalAdminRole::Owner->value : null),
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'internal_roles' => InternalAdminRole::options(),
        ]);
    }

    public function updateInternalRole(UpdateInternalRoleRequest $request, User $user): RedirectResponse
    {
        abort_if($user->tenant_id !== null, 422, 'Los usuarios de una empresa no pueden recibir roles internos.');

        $newRole = $request->validated('internal_role');
        $currentRole = $user->internal_role ?? ($user->is_super_admin ? InternalAdminRole::Owner : null);
        $isLastOwner = $user->is_super_admin
            && $currentRole === InternalAdminRole::Owner
            && $newRole !== InternalAdminRole::Owner->value
            && User::query()->where('is_super_admin', true)
                ->where(fn ($query) => $query->where('internal_role', InternalAdminRole::Owner->value)->orWhereNull('internal_role'))
                ->count() <= 1;

        abort_if($isLastOwner, 422, 'Debe existir al menos un propietario del super-admin.');

        $user->forceFill([
            'is_super_admin' => filled($newRole),
            'internal_role' => $newRole,
        ])->save();

        return back()->with('success', filled($newRole)
            ? "Rol interno de {$user->name} actualizado."
            : "Acceso interno de {$user->name} retirado.");
    }

    public function changePassword(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', "Contraseña de {$user->name} actualizada correctamente.");
    }
}
