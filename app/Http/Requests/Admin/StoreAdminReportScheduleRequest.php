<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAdminReportScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasSuperAdminAccess('reports.schedule') ?? false;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'report_type' => ['required', Rule::in(['all', 'companies', 'payments', 'requests'])],
            'frequency' => ['required', Rule::in(['weekly', 'monthly'])],
            'day_of_week' => ['nullable', 'required_if:frequency,weekly', 'integer', 'between:1,7'],
            'day_of_month' => ['nullable', 'required_if:frequency,monthly', 'integer', 'between:1,28'],
            'send_time' => ['required', 'date_format:H:i'],
            'timezone' => ['required', Rule::in(timezone_identifiers_list())],
            'enabled' => ['sometimes', 'boolean'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'day_of_week.required_if' => 'Selecciona el día de envío semanal.',
            'day_of_month.required_if' => 'Selecciona el día de envío mensual.',
        ];
    }
}
