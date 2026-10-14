<script setup>
import { ref } from 'vue';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
const props = defineProps({
    quotes: Object,
    filters: Object,
    followUp: { type: Boolean, default: false },
});
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug };
const search = ref(props.filters?.search || '');
const labels = {
    draft: 'Borrador',
    pending_customer: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
};
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Number(value));
const canManage =
    page.props.auth.user.is_super_admin ||
    page.props.auth.user.permissions.includes('quotes.manage');
const days = (date) =>
    date
        ? Math.max(
              0,
              Math.floor((Date.now() - new Date(date).getTime()) / 86400000),
          )
        : 0;
</script>
<template>
    <TallerLayout
        ><Head :title="followUp ? 'Seguimiento' : 'Cotizaciones'" />
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold">
                    {{ followUp ? 'Seguimiento comercial' : 'Cotizaciones' }}
                </h1>
                <p class="mt-2 text-slate-500">
                    {{
                        followUp
                            ? 'Cotizaciones que esperan respuesta, ordenadas desde la más antigua.'
                            : 'Prepara y consulta las propuestas para tus clientes.'
                    }}
                </p>
            </div>
            <Link
                v-if="canManage"
                :href="route('quotes.create', params)"
                class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
                >Nueva cotización</Link
            >
        </div>
        <nav class="cf-section-tabs" aria-label="Vistas de cotización">
            <Link
                :href="route('quotes.index', params)"
                :class="{ 'is-selected': !followUp }"
                :aria-current="!followUp ? 'page' : undefined"
                >Todas las cotizaciones</Link
            ><Link
                :href="route('quotes.follow-up', params)"
                :class="{ 'is-selected': followUp }"
                :aria-current="followUp ? 'page' : undefined"
                >Pendientes de respuesta</Link
            >
        </nav>
        <form
            v-if="!followUp"
            @submit.prevent="
                router.get(route('quotes.index', params), { search })
            "
            class="my-6 flex gap-3"
        >
            <input
                v-model="search"
                aria-label="Buscar cotizaciones"
                placeholder="Buscar por cliente o RUT"
                class="w-full max-w-md rounded-lg border-slate-300"
            /><button class="rounded-lg bg-slate-900 px-5 text-white">
                Buscar
            </button>
        </form>
        <div
            class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"
        >
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Número</th>
                        <th class="p-4">Cliente</th>
                        <th class="p-4">Estado</th>
                        <th v-if="followUp" class="p-4">Días pendiente</th>
                        <th class="p-4">Total</th>
                        <th class="p-4">Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="quote in quotes.data"
                        :key="quote.id"
                        class="border-t border-slate-100"
                    >
                        <td class="p-4">#{{ quote.id }}</td>
                        <td class="p-4">{{ quote.client?.name }}</td>
                        <td class="p-4">{{ labels[quote.status] }}</td>
                        <td v-if="followUp" class="p-4">
                            {{ days(quote.sent_at) }}
                        </td>
                        <td class="p-4">{{ money(quote.total_amount) }}</td>
                        <td class="p-4">
                            <Link
                                :href="
                                    route('quotes.show', {
                                        ...params,
                                        quote: quote.id,
                                    })
                                "
                                class="font-medium text-orange-600"
                                >Abrir</Link
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!quotes.data.length" class="p-8 text-slate-500">
                {{
                    followUp
                        ? 'No hay cotizaciones pendientes de respuesta.'
                        : 'Aún no hay cotizaciones para mostrar.'
                }}
            </p>
        </div>
        <div class="mt-5 flex gap-4">
            <Link v-if="quotes.prev_page_url" :href="quotes.prev_page_url"
                >← Anterior</Link
            ><Link v-if="quotes.next_page_url" :href="quotes.next_page_url"
                >Siguiente →</Link
            >
        </div></TallerLayout
    >
</template>
