<script setup>
import { ref } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
const props = defineProps({ stats: Object, recentQuotes: Array });
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug };
const can = (permission) =>
    page.props.auth.user.is_super_admin ||
    page.props.auth.user.permissions.includes(permission);
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Number(value));
const labels = {
    draft: 'Borrador',
    pending_customer: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
};
const activeSection = ref('resumen');
</script>
<template>
    <CompanyLayout
        ><Head title="Inicio" />
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold">Tu actividad comercial</h1>
                <p class="mt-2 text-slate-500">
                    Cotizaciones, clientes y oportunidades por retomar.
                </p>
            </div>
            <Link
                v-if="can('quotes.manage')"
                :href="route('quotes.create', params)"
                class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
                >Nueva cotización</Link
            >
        </div>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'resumen', label: 'Resumen' },
                { value: 'actividad', label: 'Actividad' },
            ]"
        />
        <div
            v-show="activeSection === 'resumen'"
            role="tabpanel"
            aria-label="Resumen"
            class="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
            <article
                v-for="metric in [
                    ['Clientes', stats.clients],
                    ['Borradores', stats.drafts],
                    ['Pendientes', stats.pending],
                    ['Aceptadas', stats.accepted],
                    ['Monto aceptado', money(stats.accepted_amount)],
                ]"
                :key="metric[0]"
                class="cf-metric-card rounded-2xl border border-slate-200 bg-white p-6"
            >
                <p class="text-sm text-slate-500">{{ metric[0] }}</p>
                <p class="mt-3 text-2xl font-semibold">{{ metric[1] }}</p>
            </article>
        </div>
        <section
            v-show="activeSection === 'actividad'"
            role="tabpanel"
            aria-label="Actividad"
            class="rounded-2xl border border-slate-200 bg-white p-6"
        >
            <div class="flex items-center justify-between gap-4">
                <h2 class="text-xl font-semibold">Cotizaciones recientes</h2>
                <Link
                    v-if="can('quotes.view')"
                    :href="route('quotes.follow-up', params)"
                    class="text-sm font-semibold text-orange-600"
                    >Revisar pendientes →</Link
                >
            </div>
            <ul
                v-if="recentQuotes.length"
                class="mt-5 divide-y divide-slate-100"
            >
                <li
                    v-for="quote in recentQuotes"
                    :key="quote.id"
                    class="flex flex-wrap justify-between gap-3 py-4"
                >
                    <Link
                        v-if="can('quotes.view')"
                        :href="
                            route('quotes.show', { ...params, quote: quote.id })
                        "
                        class="font-medium"
                        >#{{ quote.id }} · {{ quote.client?.name }}</Link
                    ><span v-else class="font-medium"
                        >#{{ quote.id }} · {{ quote.client?.name }}</span
                    ><span
                        >{{ labels[quote.status] }} ·
                        {{ money(quote.total_amount) }}</span
                    >
                </li>
            </ul>
            <p v-else class="py-10 text-slate-500">
                Aún no hay cotizaciones. Agrega un cliente y prepara la primera.
            </p>
        </section></CompanyLayout
    >
</template>
