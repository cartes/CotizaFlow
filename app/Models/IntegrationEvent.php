<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['integration', 'status', 'message', 'checked_at'])]
class IntegrationEvent extends Model
{
    public $timestamps = false;

    /** @var array<string, string> */
    protected $casts = [
        'checked_at' => 'datetime',
    ];

    public static function record(string $integration, string $status, string $message): void
    {
        static::query()->create([
            'integration' => $integration,
            'status' => $status,
            'message' => $message,
            'checked_at' => now(),
        ]);
    }
}
