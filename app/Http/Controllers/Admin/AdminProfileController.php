<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAdminPasswordRequest;
use App\Http\Requests\Admin\UpdateAdminProfileRequest;
use App\Http\Requests\Admin\UpdateAnalyticsRequest;
use App\Http\Requests\Admin\UpdateApiKeysRequest;
use App\Models\AuditLog;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AdminProfileController extends Controller
{
    public function edit(): Response
    {
        return app(AdminSettingsController::class)->index(request());
    }

    public function updateProfile(UpdateAdminProfileRequest $request): RedirectResponse
    {
        $user = $request->user();
        $old = $user->only(['name', 'email']);

        $user->update($request->validated());

        AuditLog::record('profile.updated', 'Super-admin actualizó su perfil', $user, [
            'before' => $old,
            'after' => $user->only(['name', 'email']),
        ]);

        return back()->with('success', 'Perfil actualizado correctamente.');
    }

    public function updatePassword(UpdateAdminPasswordRequest $request): RedirectResponse
    {
        $request->user()->update(['password' => $request->validated('password')]);

        AuditLog::record('password.changed', 'Super-admin cambió su contraseña');

        return back()->with('success', 'Contraseña actualizada correctamente.');
    }

    public function updateApiKeys(UpdateApiKeysRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (array_key_exists('mp_sandbox', $data)) {
            $data['mp_sandbox'] = $request->boolean('mp_sandbox') ? 'true' : 'false';
        }

        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                Setting::set($key, $value);
            }
        }

        AuditLog::record('api_keys.updated', 'Super-admin actualizó las API keys del sistema');

        return back()->with('success', 'Configuración guardada correctamente.');
    }

    public function updateAnalytics(UpdateAnalyticsRequest $request): RedirectResponse
    {
        $data = $request->validated();

        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        AuditLog::record('analytics_settings.updated', 'Super-admin actualizó la configuración de Analytics y Search Console desde perfil');

        return back()->with('success', 'Configuración de Analytics guardada correctamente.');
    }
}
