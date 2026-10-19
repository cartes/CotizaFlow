<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admin_report_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('report_type')->default('all');
            $table->string('frequency')->default('weekly');
            $table->unsignedTinyInteger('day_of_week')->nullable();
            $table->unsignedTinyInteger('day_of_month')->nullable();
            $table->time('send_time')->default('08:00:00');
            $table->string('timezone')->default('America/Santiago');
            $table->boolean('enabled')->default(true);
            $table->timestamp('next_run_at')->index();
            $table->timestamp('last_sent_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_report_schedules');
    }
};
