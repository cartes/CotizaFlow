<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import StatusBadge from '@/Components/StatusBadge.vue';
defineProps({ stats: Object, recentQuotes: Array, followUps: Array });
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug };
const can = (permission) =>
    page.props.auth.user.is_super_admin ||
    page.props.auth.user.permissions.includes(permission);
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
const days = (date) =>
    date
        ? Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000))
        : 0;
</script>
<template>
    <CompanyLayout
        ><Head title="Inicio" />
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1>Tu actividad comercial</h1>
                <p class="mt-1">Cotizaciones, clientes y oportunidades por retomar.</p>
            </div>
            <div class="flex gap-2">
                <Link v-if="can('customers.manage')" :href="route('clients.index', params)" class="cf-btn cf-btn-ghost">Clientes</Link>
                <Link v-if="can('quotes.manage')" :href="route('quotes.create', params)" class="cf-btn cf-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                    Nueva cotización
                </Link>
            </div>
        </div>

        <div class="my-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <component
                :is="metric.to && can(metric.permission) ? Link : 'article'"
                v-for="metric in [
                    { label: 'Clientes', value: stats.clients, to: route('clients.index', params), permission: 'customers.manage' },
                    { label: 'Borradores', value: stats.drafts, to: route('quotes.index', { ...params, status: 'draft' }), permission: 'quotes.view' },
                    { label: 'Por retomar', value: stats.pending, to: route('quotes.follow-up', params), permission: 'quotes.view' },
                    { label: 'Aceptadas', value: stats.accepted, to: route('quotes.index', { ...params, status: 'accepted' }), permission: 'quotes.view' },
                    { label: 'Monto aceptado', value: money(stats.accepted_amount) },
                ]"
                :key="metric.label"
                :href="metric.to && can(metric.permission) ? metric.to : undefined"
                class="cf-metric-card block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200"
            >
                <p>{{ metric.label }}</p>
                <p class="mt-2">{{ metric.value }}</p>
            </component>
        </div>

        <div class="grid items-start gap-6 lg:grid-cols-2">
            <section class="rounded-2xl border border-slate-200 bg-white p-5">
                <div class="flex items-center justify-between gap-4">
                    <h2>Por retomar</h2>
                    <Link v-if="can('quotes.view')" :href="route('quotes.follow-up', params)" class="text-sm font-semibold text-orange-600">Ver todas →</Link>
                </div>
                <ul v-if="followUps.length" class="mt-3 divide-y divide-slate-100">
                    <li v-for="quote in followUps" :key="quote.id" class="flex items-center justify-between gap-3 py-3">
                        <div class="min-w-0">
                            <Link
                                v-if="can('customers.manage') && quote.client"
                                :href="route('clients.show', { ...params, client: quote.client.id })"
                                class="block truncate font-medium text-slate-900"
                                >{{ quote.client.name }}</Link
                            >
                            <span v-else class="block truncate font-medium">{{ quote.client?.name }}</span>
                            <span class="text-xs text-slate-500">#{{ quote.id }} · {{ money(quote.total_amount) }} · hace {{ days(quote.sent_at) }} días</span>
                        </div>
                        <Link :href="route('quotes.show', { ...params, quote: quote.id })" class="cf-btn cf-btn-ghost shrink-0">Retomar</Link>
                    </li>
                </ul>
                <p v-else class="py-8 text-center text-sm text-slate-500">Todo al día: ninguna cotización espera respuesta.</p>
            </section>

            <section class="rounded-2xl border border-slate-200 bg-white p-5">
                <div class="flex items-center justify-between gap-4">
                    <h2>Cotizaciones recientes</h2>
                    <Link v-if="can('quotes.view')" :href="route('quotes.index', params)" class="text-sm font-semibold text-orange-600">Ver todas →</Link>
                </div>
                <ul v-if="recentQuotes.length" class="mt-3 divide-y divide-slate-100">
                    <li v-for="quote in recentQuotes" :key="quote.id" class="flex items-center justify-between gap-3 py-3">
                        <div class="min-w-0">
                            <Link
                                v-if="can('quotes.view')"
                                :href="route('quotes.show', { ...params, quote: quote.id })"
                                class="block truncate font-medium text-slate-900"
                                >#{{ quote.id }} · {{ quote.client?.name }}</Link
                            >
                            <span v-else class="block truncate font-medium">#{{ quote.id }} · {{ quote.client?.name }}</span>
                            <span class="text-xs text-slate-500">{{ money(quote.total_amount) }}</span>
                        </div>
                        <StatusBadge :status="quote.status" />
                    </li>
                </ul>
                <p v-else class="py-8 text-center text-sm text-slate-500">Aún no hay cotizaciones. Agrega un cliente y prepara la primera.</p>
            </section>
        </div></CompanyLayout
    >
</template>
