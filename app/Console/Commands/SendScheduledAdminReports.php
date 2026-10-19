<?php

namespace App\Console\Commands;

use App\Mail\AdminScheduledReportMail;
use App\Models\AdminReportSchedule;
use App\Services\AdminReportService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Throwable;

#[Signature('admin:send-scheduled-reports')]
#[Description('Send due super-admin reports by email')]
class SendScheduledAdminReports extends Command
{
    public function handle(AdminReportService $reports): int
    {
        $sent = 0;
        $failed = 0;

        AdminReportSchedule::query()
            ->where('enabled', true)
            ->where('next_run_at', '<=', now())
            ->orderBy('next_run_at')
            ->get()
            ->each(function (AdminReportSchedule $schedule) use ($reports, &$sent, &$failed): void {
                $now = now($schedule->timezone);
                if ($schedule->frequency === 'monthly') {
                    $to = $now->copy()->subMonthNoOverflow()->endOfMonth();
                    $from = $to->copy()->startOfMonth();
                } else {
                    $to = $now->copy()->subDay()->endOfDay();
                    $from = $to->copy()->subDays(6)->startOfDay();
                }
                $filters = ['date_from' => $from->toDateString(), 'date_to' => $to->toDateString()];
                $reportName = $schedule->frequency === 'monthly' ? 'mensual' : 'semanal';

                try {
                    Mail::to($schedule->email)->send(new AdminScheduledReportMail(
                        "{$reportName} · {$schedule->report_type}",
                        $reports->csv($schedule->report_type, $filters),
                    ));
                    $schedule->last_sent_at = now();
                    $schedule->last_error = null;
                    $sent++;
                } catch (Throwable $exception) {
                    $schedule->last_error = mb_substr($exception->getMessage(), 0, 2000);
                    report($exception);
                    $failed++;
                }

                $schedule->next_run_at = $schedule->nextRunAfter($now);
                $schedule->save();
            });

        $this->info("Reportes enviados: {$sent}; errores: {$failed}.");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }
}
