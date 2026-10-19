<?php

declare(strict_types=1);

namespace Tests\Feature\Admin;

use App\Enums\InternalAdminRole;
use App\Mail\AdminScheduledReportMail;
use App\Models\AdminReportSchedule;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\TrialRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InternalAdminFeaturesTest extends TestCase
{
    use RefreshDatabase;

    public function test_internal_roles_limit_super_admin_routes(): void
    {
        $financeUser = User::factory()->superAdmin()->create(['internal_role' => InternalAdminRole::Finance]);

        $this->actingAs($financeUser)
            ->get(route('admin.dashboard'))
            ->assertOk();

        $this->get(route('admin.payments.index'))->assertOk();
        $this->get(route('admin.reports.index'))->assertOk();
        $this->get(route('admin.tenants.index'))->assertForbidden();
        $this->get(route('admin.users.index'))->assertForbidden();
    }

    public function test_owner_can_assign_internal_roles_and_cannot_remove_last_owner(): void
    {
        $owner = User::factory()->superAdmin()->create(['internal_role' => InternalAdminRole::Owner]);
        $staff = User::factory()->create();

        $this->actingAs($owner)
            ->patch(route('admin.users.internal-role', $staff), ['internal_role' => 'support'])
            ->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $staff->id,
            'is_super_admin' => true,
            'internal_role' => 'support',
        ]);

        $this->patch(route('admin.users.internal-role', $owner), ['internal_role' => null])
            ->assertUnprocessable();
    }

    public function test_advanced_report_filters_and_exports_aggregated_data(): void
    {
        $analyst = User::factory()->superAdmin()->create(['internal_role' => InternalAdminRole::Analyst]);
        $tenant = Tenant::factory()->create(['name' => 'Empresa Reporte']);
        Payment::factory()->create([
            'tenant_id' => $tenant->id,
            'status' => Payment::STATUS_APPROVED,
            'amount' => 35000,
            'paid_at' => now()->subDays(2),
        ]);
        TrialRequest::query()->create([
            'name' => 'Contacto Reporte',
            'email' => 'contacto@reporte.cl',
            'phone' => '+56911111111',
            'business_name' => 'Negocio Reporte',
            'business_type' => 'Servicios',
            'status' => 'approved',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);

        $this->actingAs($analyst)
            ->get(route('admin.reports.index', [
                'date_from' => now()->subDays(7)->toDateString(),
                'date_to' => now()->toDateString(),
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Reports/Index')
                ->where('summary.revenue', 35000)
                ->where('summary.requests_approved', 1)
                ->where('companies.0.name', 'Empresa Reporte'));

        $this->get(route('admin.reports.export', [
            'date_from' => now()->subDays(7)->toDateString(),
            'date_to' => now()->toDateString(),
            'report_type' => 'companies',
        ]))->assertOk()->assertSee('Empresa Reporte');
    }

    public function test_owner_can_schedule_and_send_a_report(): void
    {
        Mail::fake();
        $owner = User::factory()->superAdmin()->create(['internal_role' => InternalAdminRole::Owner]);

        $this->actingAs($owner)
            ->post(route('admin.reports.schedules.store'), [
                'email' => 'reportes@cotizaflow.cl',
                'report_type' => 'all',
                'frequency' => 'weekly',
                'day_of_week' => now()->dayOfWeekIso,
                'send_time' => '08:00',
                'timezone' => 'America/Santiago',
            ])
            ->assertRedirect();

        $schedule = AdminReportSchedule::query()->firstOrFail();
        $schedule->update(['next_run_at' => now()->subMinute()]);

        $this->artisan('admin:send-scheduled-reports')->assertSuccessful();

        Mail::assertSent(AdminScheduledReportMail::class, fn (AdminScheduledReportMail $mail): bool => str_contains($mail->reportName, 'semanal'));
        $this->assertNotNull($schedule->fresh()->last_sent_at);
        $this->assertTrue($schedule->fresh()->next_run_at->isFuture());
    }
}
