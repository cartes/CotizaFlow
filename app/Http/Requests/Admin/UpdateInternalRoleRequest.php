<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\InternalAdminRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInternalRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasSuperAdminAccess('internal_roles.manage') ?? false;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return ['internal_role' => ['nullable', Rule::in(array_keys(InternalAdminRole::options()))]];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return ['internal_role.in' => 'Selecciona un rol interno válido.'];
    }
}
