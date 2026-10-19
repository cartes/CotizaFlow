<script setup>
import { computed } from 'vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';

const props = defineProps({
    summary: Object,
    companies: Array,
    request_statuses: Array,
    monthly_revenue: Array,
    filters: Object,
    schedules: Array,
    can_schedule: Boolean,
    can_manage_roles: Boolean,
    report_types: Array,
});

const scheduleForm = useForm({
    email: '',
    report_type: 'all',
    frequency: 'weekly',
    day_of_week: 1,
    day_of_month: 1,
    send_time: '08:00',
    timezone: 'America/Santiago',
});

const maxRevenue = computed(() => Math.max(1, ...props.monthly_revenue.map((item) => Number(item.revenue))));
const formatCurrency = (value) => new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
}).format(Number(value || 0));
const statusLabel = (status) => ({ pending: 'Pendiente', approved: 'Aprobada', rejected: 'Rechazada' }[status] || status);

const applyFilters = (event) => {
    const data = new FormData(event.target);
    router.get(route('admin.reports.index'), Object.fromEntries(data.entries()), {
        preserveState: true,
        preserveScroll: true,
    });
};

const exportUrl = (reportType = 'all') => route('admin.reports.export', {
    ...props.filters,
    report_type: reportType,
});

const createSchedule = () => scheduleForm.post(route('admin.reports.schedules.store'), {
    preserveScroll: true,
    onSuccess: () => scheduleForm.reset('email'),
});

const toggleSchedule = (schedule) => router.put(route('admin.reports.schedules.update', schedule.id), {
    email: schedule.email,
    report_type: schedule.report_type,
    frequency: schedule.frequency,
    day_of_week: schedule.day_of_week,
    day_of_month: schedule.day_of_month,
    send_time: schedule.send_time.slice(0, 5),
    timezone: schedule.timezone,
    enabled: !schedule.enabled,
}, { preserveScroll: true });

const deleteSchedule = (schedule) => router.delete(route('admin.reports.schedules.destroy', schedule.id), {
    preserveScroll: true,
});
</script>

<template>
    <Head title="Reportería avanzada" />

    <CompanyLayout>
        <div class="space-y-6">
            <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-wide text-orange-600">CotizaFlow · Super-admin</p>
                    <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Reportería avanzada</h1>
                    <p class="mt-1 text-sm text-slate-500">Actividad, conversión, cotizaciones e ingresos por empresa.</p>
                </div>
                <a :href="exportUrl()" class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Exportar resumen CSV</a>
            </header>

            <form class="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" @submit.prevent="applyFilters">
                <label class="grid gap-1 text-xs font-medium text-slate-600">Desde
                    <input name="date_from" type="date" :value="filters.date_from" class="rounded-lg border-slate-300 text-sm" />
                </label>
                <label class="grid gap-1 text-xs font-medium text-slate-600">Hasta
                    <input name="date_to" type="date" :value="filters.date_to" class="rounded-lg border-slate-300 text-sm" />
                </label>
                <button class="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">Aplicar período</button>
                <a :href="exportUrl('companies')" class="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Empresas CSV</a>
                <a :href="exportUrl('payments')" class="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Pagos CSV</a>
                <a :href="exportUrl('requests')" class="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Solicitudes CSV</a>
            </form>

            <section aria-label="Indicadores del período" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <article v-for="metric in [
                    { label: 'Empresas nuevas', value: summary.companies_created },
                    { label: 'Empresas activas', value: summary.companies_active },
                    { label: 'Solicitudes aprobadas', value: `${summary.requests_approved} · ${summary.conversion_rate}%` },
                    { label: 'Ingresos cobrados', value: formatCurrency(summary.revenue) },
                    { label: 'Cotizaciones aceptadas', value: `${summary.quotes_accepted} / ${summary.quotes_total}` },
                ]" :key="metric.label" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p class="text-sm font-medium text-slate-500">{{ metric.label }}</p>
                    <p class="mt-3 text-2xl font-bold tracking-tight text-slate-900">{{ metric.value }}</p>
                </article>
            </section>

            <section class="grid gap-6 xl:grid-cols-3">
                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                    <div class="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 class="font-semibold text-slate-900">Ingresos mensuales</h2>
                            <p class="mt-1 text-sm text-slate-500">Pagos aprobados dentro del período filtrado.</p>
                        </div>
                        <span class="text-xs text-slate-400">{{ summary.transactions }} transacciones</span>
                    </div>
                    <div v-if="monthly_revenue.length" class="space-y-4">
                        <div v-for="month in monthly_revenue" :key="month.month" class="grid grid-cols-[5rem_1fr_auto] items-center gap-3 text-sm">
                            <span class="font-medium text-slate-600">{{ month.month }}</span>
                            <div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-orange-500" :style="{ width: `${Math.max(3, month.revenue / maxRevenue * 100)}%` }" /></div>
                            <span class="text-right font-semibold text-slate-800">{{ formatCurrency(month.revenue) }}</span>
                        </div>
                    </div>
                    <p v-else class="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">No hay pagos aprobados en este período.</p>
                </article>

                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 class="font-semibold text-slate-900">Solicitudes por estado</h2>
                    <p class="mt-1 text-sm text-slate-500">{{ summary.requests_total }} recibidas en el período.</p>
                    <div class="mt-5 space-y-3">
                        <div v-for="item in request_statuses" :key="item.status" class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                            <span class="text-sm text-slate-600">{{ statusLabel(item.status) }}</span>
                            <span class="font-semibold text-slate-900">{{ item.total }}</span>
                        </div>
                        <p v-if="!request_statuses.length" class="text-sm text-slate-500">Sin solicitudes.</p>
                    </div>
                </article>
            </section>

            <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 p-5">
                    <div>
                        <h2 class="font-semibold text-slate-900">Desempeño por empresa</h2>
                        <p class="mt-1 text-sm text-slate-500">Actividad acumulada en las fechas elegidas.</p>
                    </div>
                    <span class="text-xs text-slate-400">{{ companies.length }} empresas</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-slate-200 text-sm">
                        <thead class="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                            <tr><th class="px-5 py-3">Empresa</th><th class="px-4 py-3">Estado</th><th class="px-4 py-3">Plan</th><th class="px-4 py-3 text-right">Usuarios</th><th class="px-4 py-3 text-right">Cotizaciones</th><th class="px-4 py-3 text-right">Aceptadas</th><th class="px-5 py-3 text-right">Ingresos</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="company in companies" :key="company.id">
                                <td class="whitespace-nowrap px-5 py-3 font-medium text-slate-900">{{ company.name }}</td>
                                <td class="px-4 py-3 text-slate-600">{{ company.is_active ? 'Activa' : 'Suspendida' }}</td>
                                <td class="px-4 py-3 text-slate-600">{{ company.plan || '—' }}</td>
                                <td class="px-4 py-3 text-right text-slate-600">{{ company.users }}</td>
                                <td class="px-4 py-3 text-right text-slate-600">{{ company.quotes }}</td>
                                <td class="px-4 py-3 text-right text-slate-600">{{ company.accepted_quotes }}</td>
                                <td class="whitespace-nowrap px-5 py-3 text-right font-semibold text-slate-800">{{ formatCurrency(company.revenue) }}</td>
                            </tr>
                            <tr v-if="!companies.length"><td colspan="7" class="px-5 py-10 text-center text-slate-500">No hay empresas registradas.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section v-if="can_schedule" class="grid gap-6 xl:grid-cols-2">
                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 class="font-semibold text-slate-900">Programar envío</h2>
                    <p class="mt-1 text-sm text-slate-500">El reporte se adjunta como CSV y se envía según la zona horaria elegida.</p>
                    <form class="mt-5 grid gap-4 sm:grid-cols-2" @submit.prevent="createSchedule">
                        <label class="grid gap-1 text-sm font-medium text-slate-700 sm:col-span-2">Correo destinatario
                            <input v-model="scheduleForm.email" type="email" required class="rounded-lg border-slate-300 text-sm" placeholder="equipo@empresa.cl" />
                            <span v-if="scheduleForm.errors.email" class="text-xs text-rose-600">{{ scheduleForm.errors.email }}</span>
                        </label>
                        <label class="grid gap-1 text-sm font-medium text-slate-700">Contenido
                            <select v-model="scheduleForm.report_type" class="rounded-lg border-slate-300 text-sm"><option v-for="type in report_types" :key="type.value" :value="type.value">{{ type.label }}</option></select>
                        </label>
                        <label class="grid gap-1 text-sm font-medium text-slate-700">Frecuencia
                            <select v-model="scheduleForm.frequency" class="rounded-lg border-slate-300 text-sm"><option value="weekly">Semanal</option><option value="monthly">Mensual</option></select>
                        </label>
                        <label v-if="scheduleForm.frequency === 'weekly'" class="grid gap-1 text-sm font-medium text-slate-700">Día de envío
                            <select v-model="scheduleForm.day_of_week" class="rounded-lg border-slate-300 text-sm"><option :value="1">Lunes</option><option :value="2">Martes</option><option :value="3">Miércoles</option><option :value="4">Jueves</option><option :value="5">Viernes</option><option :value="6">Sábado</option><option :value="7">Domingo</option></select>
                        </label>
                        <label v-else class="grid gap-1 text-sm font-medium text-slate-700">Día del mes
                            <select v-model="scheduleForm.day_of_month" class="rounded-lg border-slate-300 text-sm"><option v-for="day in 28" :key="day" :value="day">{{ day }}</option></select>
                        </label>
                        <label class="grid gap-1 text-sm font-medium text-slate-700">Hora local
                            <input v-model="scheduleForm.send_time" type="time" required class="rounded-lg border-slate-300 text-sm" />
                        </label>
                        <div class="sm:col-span-2">
                            <button :disabled="scheduleForm.processing" class="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">{{ scheduleForm.processing ? 'Guardando…' : 'Programar envío' }}</button>
                        </div>
                    </form>
                </article>

                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 class="font-semibold text-slate-900">Envíos configurados</h2>
                    <div v-if="schedules.length" class="mt-4 space-y-3">
                        <div v-for="schedule in schedules" :key="schedule.id" class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4">
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold text-slate-800">{{ schedule.email }}</p>
                                <p class="mt-1 text-xs text-slate-500">{{ schedule.frequency === 'weekly' ? 'Semanal' : 'Mensual' }} · {{ schedule.report_type }} · Próximo: {{ new Date(schedule.next_run_at).toLocaleString('es-CL') }}</p>
                                <p v-if="schedule.last_error" class="mt-1 text-xs text-rose-600">Último error: {{ schedule.last_error }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700" @click="toggleSchedule(schedule)">{{ schedule.enabled ? 'Pausar' : 'Reanudar' }}</button>
                                <button class="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50" @click="deleteSchedule(schedule)">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <p v-else class="mt-4 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Todavía no hay envíos configurados.</p>
                </article>
            </section>
        </div>
    </CompanyLayout>
</template>
