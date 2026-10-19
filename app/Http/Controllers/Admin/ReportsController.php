<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminReportScheduleRequest;
use App\Http\Requests\Admin\UpdateAdminReportScheduleRequest;
use App\Models\AdminReportSchedule;
use App\Services\AdminReportService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ReportsController extends Controller
{
    public function __construct(private readonly AdminReportService $reports) {}

    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
        ]);
        $dates = [
            'date_from' => (string) ($filters['date_from'] ?? now()->subDays(29)->toDateString()),
            'date_to' => (string) ($filters['date_to'] ?? now()->toDateString()),
        ];
        $user = $request->user();
        $canSchedule = $user?->hasSuperAdminAccess('reports.schedule') ?? false;

        return Inertia::render('Admin/Reports/Index', [
            ...$this->reports->build($dates),
            'filters' => $dates,
            'schedules' => $canSchedule ? AdminReportSchedule::query()->latest()->get() : [],
            'can_schedule' => $canSchedule,
            'report_types' => [
                ['value' => 'all', 'label' => 'Resumen general'],
                ['value' => 'companies', 'label' => 'Empresas'],
                ['value' => 'payments', 'label' => 'Pagos'],
                ['value' => 'requests', 'label' => 'Solicitudes'],
            ],
        ]);
    }

    public function export(Request $request): HttpResponse
    {
        $filters = $request->validate([
            'date_from' => ['required', 'date'],
            'date_to' => ['required', 'date', 'after_or_equal:date_from'],
            'report_type' => ['required', Rule::in(['all', 'companies', 'payments', 'requests'])],
        ]);
        $filename = 'cotizaflow-'.$filters['report_type'].'-'.$filters['date_from'].'-'.$filters['date_to'].'.csv';

        return response($this->reports->csv($filters['report_type'], $filters), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    public function storeSchedule(StoreAdminReportScheduleRequest $request): RedirectResponse
    {
        $schedule = new AdminReportSchedule($request->validated());
        $schedule->next_run_at = $schedule->nextRunAfter();
        $schedule->save();

        return back()->with('success', 'Envío programado creado.');
    }

    public function updateSchedule(UpdateAdminReportScheduleRequest $request, AdminReportSchedule $schedule): RedirectResponse
    {
        $schedule->fill($request->validated());
        $schedule->next_run_at = $schedule->nextRunAfter();
        $schedule->last_error = null;
        $schedule->save();

        return back()->with('success', 'Envío programado actualizado.');
    }

    public function destroySchedule(AdminReportSchedule $schedule): RedirectResponse
    {
        $schedule->delete();

        return back()->with('success', 'Envío programado eliminado.');
    }
}
