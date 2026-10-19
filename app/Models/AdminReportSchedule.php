<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['email', 'report_type', 'frequency', 'day_of_week', 'day_of_month', 'send_time', 'timezone', 'enabled', 'next_run_at', 'last_sent_at', 'last_error'])]
class AdminReportSchedule extends Model
{
    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'next_run_at' => 'datetime',
            'last_sent_at' => 'datetime',
        ];
    }

    public function nextRunAfter(?Carbon $after = null): Carbon
    {
        $timezone = $this->timezone ?: config('app.timezone');
        $after = ($after ?? now())->copy()->setTimezone($timezone);
        $time = $this->send_time ?: '08:00:00';

        if ($this->frequency === 'monthly') {
            $day = min((int) ($this->day_of_month ?: 1), $after->daysInMonth);
            $candidate = $after->copy()->startOfMonth()->day($day)->setTimeFromTimeString($time);

            if ($candidate->lessThanOrEqualTo($after)) {
                $nextMonth = $after->copy()->addMonthNoOverflow()->startOfMonth();
                $candidate = $nextMonth->day(min((int) ($this->day_of_month ?: 1), $nextMonth->daysInMonth))->setTimeFromTimeString($time);
            }

            return $candidate->setTimezone('UTC');
        }

        $dayOfWeek = (int) ($this->day_of_week ?? 1);
        $candidate = $after->copy()->startOfWeek()->addDays($dayOfWeek - 1)->setTimeFromTimeString($time);

        if ($candidate->lessThanOrEqualTo($after)) {
            $candidate->addWeek();
        }

        return $candidate->setTimezone('UTC');
    }
}
