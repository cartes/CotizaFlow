<script setup>
import { computed, ref, watch } from 'vue';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import StatusBadge from '@/Components/StatusBadge.vue';
const props = defineProps({
    quotes: Object,
    filters: Object,
    counts: { type: Object, default: () => ({}) },
    followUp: { type: Boolean, default: false },
});
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug };
const user = page.props.auth.user;
const can = (permission) =>
    user.is_super_admin || user.permissions.includes(permission);
const search = ref(props.filters?.search || '');
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
const urgency = (value) => {
    const waiting = days(value);
    if (waiting >= 5) return 'bg-rose-50 text-rose-700';
    if (waiting >= 3) return 'bg-amber-50 text-amber-700';
    return 'bg-slate-100 text-slate-600';
};
const total = computed(() =>
    Object.values(props.counts).reduce((sum, value) => sum + Number(value), 0),
);
const tabs = computed(() => [
    { label: 'Todas', count: total.value, href: route('quotes.index', params), selected: !props.followUp && !props.filters?.status },
    { label: 'Borradores', count: props.counts.draft || 0, href: route('quotes.index', { ...params, status: 'draft' }), selected: !props.followUp && props.filters?.status === 'draft' },
    { label: 'Por retomar', count: props.counts.pending_customer || 0, href: route('quotes.follow-up', params), selected: props.followUp },
    { label: 'Aceptadas', count: props.counts.accepted || 0, href: route('quotes.index', { ...params, status: 'accepted' }), selected: !props.followUp && props.filters?.status === 'accepted' },
    { label: 'Rechazadas', count: props.counts.rejected || 0, href: route('quotes.index', { ...params, status: 'rejected' }), selected: !props.followUp && props.filters?.status === 'rejected' },
]);
let searchTimer;
watch(search, (value) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        router.get(
            route('quotes.index', params),
            { search: value || undefined, status: props.filters?.status || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 300);
});
</script>
<template>
    <CompanyLayout
        ><Head :title="followUp ? 'Por retomar' : 'Cotizaciones'" />
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1>{{ followUp ? 'Cotizaciones por retomar' : 'Cotizaciones' }}</h1>
                <p class="mt-1">
                    {{
                        followUp
                            ? 'Esperan respuesta del cliente. Las más antiguas primero.'
                            : 'Prepara, envía y sigue cada propuesta.'
                    }}
                </p>
            </div>
            <Link v-if="can('quotes.manage')" :href="route('quotes.create', params)" class="cf-btn cf-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" d="M12 5v14M5 12h14" />
                </svg>
                Nueva cotización
            </Link>
        </div>

        <nav class="cf-section-tabs" aria-label="Estados de cotización">
            <Link
                v-for="tab in tabs"
                :key="tab.label"
                :href="tab.href"
                :class="{ 'is-selected': tab.selected }"
                :aria-current="tab.selected ? 'page' : undefined"
                >{{ tab.label }}<span class="ml-1.5 text-slate-400">{{ tab.count }}</span></Link
            >
        </nav>

        <div v-if="!followUp" class="relative mb-5 max-w-md">
            <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
                v-model="search"
                type="search"
                aria-label="Buscar cotizaciones"
                placeholder="Buscar por cliente o RUT"
                class="w-full rounded-full border-slate-300 pl-10"
            />
        </div>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Cotización</th>
                        <th class="p-4">Cliente</th>
                        <th class="p-4">Estado</th>
                        <th v-if="followUp" class="p-4">Esperando</th>
                        <th class="p-4 text-right">Total</th>
                        <th class="p-4"><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="quote in quotes.data" :key="quote.id" class="cf-row-link border-t border-slate-100">
                        <td class="p-4 font-semibold">
                            <Link :href="route('quotes.show', { ...params, quote: quote.id })" class="text-orange-600">#{{ quote.id }}</Link>
                        </td>
                        <td class="p-4">
                            <Link
                                v-if="can('customers.manage') && quote.client"
                                :href="route('clients.show', { ...params, client: quote.client.id })"
                                class="flex items-center gap-2.5"
                            >
                                <span class="cf-avatar !h-8 !w-8 !text-xs" aria-hidden="true">{{ quote.client.name.charAt(0).toUpperCase() }}</span>
                                <span class="font-medium text-slate-900">{{ quote.client.name }}</span>
                            </Link>
                            <span v-else>{{ quote.client?.name }}</span>
                        </td>
                        <td class="p-4"><StatusBadge :status="quote.status" /></td>
                        <td v-if="followUp" class="p-4">
                            <span class="cf-badge" :class="urgency(quote.sent_at)">{{ days(quote.sent_at) }} días</span>
                        </td>
                        <td class="p-4 text-right font-medium">{{ money(quote.total_amount) }}</td>
                        <td class="p-4 text-right">
                            <Link :href="route('quotes.show', { ...params, quote: quote.id })" class="cf-btn cf-btn-ghost">
                                {{ followUp ? 'Retomar' : 'Abrir' }}
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!quotes.data.length" class="p-8 text-center text-slate-500">
                {{
                    followUp
                        ? 'Todo al día: no hay cotizaciones esperando respuesta.'
                        : 'No hay cotizaciones para mostrar con este filtro.'
                }}
            </p>
        </div>
        <div class="mt-5 flex gap-4 text-sm">
            <Link v-if="quotes.prev_page_url" :href="quotes.prev_page_url" preserve-scroll>← Anterior</Link>
            <Link v-if="quotes.next_page_url" :href="quotes.next_page_url" preserve-scroll>Siguiente →</Link>
        </div></CompanyLayout
    >
</template>
