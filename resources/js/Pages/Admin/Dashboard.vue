<script setup>
import { Head, Link } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';

const props = defineProps({
    stats: { type: Object, required: true },
    alerts: { type: Object, required: true },
    monthly_companies: { type: Array, default: () => [] },
    recent_companies: { type: Array, default: () => [] },
    recent_payments: { type: Array, default: () => [] },
    pending_trial_requests: { type: Array, default: () => [] },
});

const currency = (amount, code = 'CLP') => new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: code || 'CLP',
    maximumFractionDigits: 0,
}).format(Number(amount || 0));

const dateLabel = (value) => value
    ? new Date(value).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
    : '—';

const monthLabel = (value) => {
    const [year, month] = value.split('-');
    return new Date(Number(year), Number(month) - 1).toLocaleDateString('es-CL', { month: 'short' });
};

const maxMonthlyCompanies = Math.max(1, ...props.monthly_companies.map((month) => month.total));

const alertsList = [
    {
        label: 'Solicitudes de acceso pendientes',
        count: props.alerts.pending_trial_requests,
        href: route('admin.trial-requests.index', { status: 'pending' }),
        detail: 'Revisar y responder',
        tone: 'amber',
    },
    {
        label: 'Suscripciones próximas a vencer',
        count: props.alerts.expiring_companies,
        href: route('admin.tenants.index', { sort_by: 'subscription_ends_at' }),
        detail: 'Vencen en los próximos 7 días',
        tone: 'orange',
    },
    {
        label: 'Empresas vencidas con acceso activo',
        count: props.alerts.expired_active_companies,
        href: route('admin.tenants.index', { sort_by: 'subscription_ends_at' }),
        detail: 'Revisar acceso y estado de pago',
        tone: 'rose',
    },
    {
        label: 'Pagos pendientes',
        count: props.alerts.pending_payments,
        href: route('admin.payments.index'),
        detail: 'Esperando confirmación',
        tone: 'sky',
    },
    {
        label: 'Pagos rechazados · últimos 30 días',
        count: props.alerts.rejected_payments_30d,
        href: route('admin.payments.index'),
        detail: 'Puede requerir seguimiento',
        tone: 'rose',
    },
];

const hasAlerts = (alert) => Number(alert.count) > 0;

const statusLabel = (status, active) => {
    if (!active || status === 'suspended') return 'Suspendida';

    return 'Activa';
};
</script>

<template>
    <Head title="Panel ejecutivo" />

    <CompanyLayout>
        <div class="space-y-6">
            <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-wide text-orange-600">CotizaFlow · Super-admin</p>
                    <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Panel ejecutivo</h1>
                    <p class="mt-1 text-sm text-slate-500">Empresas, conversión, ingresos y asuntos que requieren atención.</p>
                </div>
                <p class="text-sm text-slate-500">Actualizado {{ new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
            </header>

            <section aria-label="Indicadores principales" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p class="text-sm font-medium text-slate-500">Empresas activas</p>
                    <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">{{ stats.companies_active }}</p>
                    <p class="mt-2 text-sm text-slate-500">{{ stats.companies_total }} registradas · {{ stats.companies_new_30d }} nuevas en 30 días</p>
                </article>

                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p class="text-sm font-medium text-slate-500">Conversión de solicitudes · 30 días</p>
                    <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">{{ Number(stats.conversion_rate_30d).toFixed(1) }}%</p>
                    <p class="mt-2 text-sm text-slate-500">{{ stats.trial_requests_approved_30d }} aprobadas de {{ stats.trial_requests_resolved_30d }} resueltas</p>
                </article>

                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p class="text-sm font-medium text-slate-500">Ingresos cobrados · 30 días</p>
                    <p class="mt-3 text-3xl font-bold tracking-tight text-emerald-700">{{ currency(stats.revenue_30d) }}</p>
                    <p class="mt-2 text-sm text-slate-500">Este mes: {{ currency(stats.revenue_month_to_date) }}</p>
                </article>
            </section>

            <section class="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-base font-semibold text-slate-900">Nuevas empresas</h2>
                            <p class="mt-1 text-sm text-slate-500">Registros por mes · últimos 6 meses</p>
                        </div>
                        <Link :href="route('admin.tenants.index')" class="text-sm font-semibold text-orange-700 hover:text-orange-800">Ver empresas</Link>
                    </div>
                    <div class="mt-6 grid h-44 grid-cols-6 items-end gap-3" role="img" aria-label="Gráfico de nuevas empresas por mes">
                        <div v-for="month in monthly_companies" :key="month.month" class="flex h-full flex-col items-center justify-end gap-2">
                            <span class="text-xs font-semibold text-slate-600">{{ month.total }}</span>
                            <div class="flex h-32 w-full items-end rounded-md bg-slate-50">
                                <div
                                    class="w-full rounded-md bg-orange-500 transition-all"
                                    :style="{ height: `${Math.max(month.total > 0 ? 8 : 0, (month.total / maxMonthlyCompanies) * 100)}%` }"
                                />
                            </div>
                            <span class="text-xs capitalize text-slate-500">{{ monthLabel(month.month) }}</span>
                        </div>
                    </div>
                </article>

                <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-base font-semibold text-slate-900">Alertas operativas</h2>
                            <p class="mt-1 text-sm text-slate-500">Elementos que pueden necesitar seguimiento</p>
                        </div>
                    </div>
                    <ul class="mt-4 divide-y divide-slate-100">
                        <li v-for="alert in alertsList" :key="alert.label" class="py-3 first:pt-0 last:pb-0">
                            <Link :href="alert.href" class="flex items-center justify-between gap-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">
                                <span class="min-w-0">
                                    <span class="block truncate text-sm font-medium text-slate-800">{{ alert.label }}</span>
                                    <span class="mt-0.5 block text-xs text-slate-500">{{ alert.detail }}</span>
                                </span>
                                <span :class="hasAlerts(alert) ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-500'" class="inline-flex min-w-8 justify-center rounded-full px-2.5 py-1 text-sm font-bold tabular-nums">{{ alert.count }}</span>
                            </Link>
                        </li>
                    </ul>
                </article>
            </section>

            <section class="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div class="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
                        <div>
                            <h2 class="text-base font-semibold text-slate-900">Empresas recientes</h2>
                            <p class="mt-1 text-sm text-slate-500">Últimas cuentas creadas</p>
                        </div>
                        <Link :href="route('admin.tenants.index')" class="text-sm font-semibold text-orange-700 hover:text-orange-800">Ver todas</Link>
                    </div>
                    <div v-if="recent_companies.length" class="divide-y divide-slate-100">
                        <div v-for="company in recent_companies" :key="company.id" class="flex items-center justify-between gap-4 px-5 py-3.5">
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold text-slate-800">{{ company.name }}</p>
                                <p class="mt-0.5 text-xs text-slate-500">{{ company.plan }} · {{ dateLabel(company.created_at) }}</p>
                            </div>
                            <span :class="company.is_active && company.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">{{ statusLabel(company.status, company.is_active) }}</span>
                        </div>
                    </div>
                    <p v-else class="px-5 py-8 text-center text-sm text-slate-500">Todavía no hay empresas registradas.</p>
                </article>

                <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div class="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
                        <div>
                            <h2 class="text-base font-semibold text-slate-900">Actividad para revisar</h2>
                            <p class="mt-1 text-sm text-slate-500">Solicitudes de acceso y pagos recientes</p>
                        </div>
                        <Link :href="route('admin.payments.index')" class="text-sm font-semibold text-orange-700 hover:text-orange-800">Ver pagos</Link>
                    </div>
                    <div v-if="pending_trial_requests.length" class="divide-y divide-slate-100">
                        <Link v-for="request in pending_trial_requests" :key="request.id" :href="route('admin.trial-requests.index', { status: 'pending' })" class="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50">
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold text-slate-800">{{ request.business_name }}</p>
                                <p class="mt-0.5 truncate text-xs text-slate-500">{{ request.name }} · {{ request.email }}</p>
                            </div>
                            <span class="shrink-0 text-xs text-slate-500">{{ dateLabel(request.created_at) }}</span>
                        </Link>
                    </div>
                    <div v-else-if="recent_payments.length" class="divide-y divide-slate-100">
                        <div v-for="payment in recent_payments" :key="payment.id" class="flex items-center justify-between gap-4 px-5 py-3.5">
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold text-slate-800">{{ payment.company || 'Empresa' }}</p>
                                <p class="mt-0.5 text-xs text-slate-500">{{ payment.plan || 'Suscripción' }} · {{ dateLabel(payment.date) }}</p>
                            </div>
                            <span class="shrink-0 text-sm font-semibold text-slate-800">{{ currency(payment.amount, payment.currency) }}</span>
                        </div>
                    </div>
                    <p v-else class="px-5 py-8 text-center text-sm text-slate-500">No hay solicitudes o pagos recientes.</p>
                </article>
            </section>
        </div>
    </CompanyLayout>
</template>
