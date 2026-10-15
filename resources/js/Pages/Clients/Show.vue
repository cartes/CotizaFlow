<script setup>
import { computed, ref } from 'vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import StatusBadge from '@/Components/StatusBadge.vue';
import IdentificationInput from '@/Components/IdentificationInput.vue';
const props = defineProps({ client: Object, quotes: Array, stats: Object });
const page = usePage();
const params = {
    tenantBySlug: page.props.tenant?.slug,
    client: props.client.id,
};
const permissions = page.props.auth.user.permissions;
const can = (permission) =>
    page.props.auth.user.is_super_admin || permissions.includes(permission);
const form = useForm({
    name: props.client.name,
    rut: props.client.rut,
    email: props.client.email,
    phone: props.client.phone,
    address: props.client.address,
});
const fields = [
    { key: 'name', label: 'Nombre', required: true },
    { key: 'rut', label: 'RUT', required: true },
    { key: 'phone', label: 'Teléfono' },
    { key: 'email', label: 'Correo', type: 'email' },
    { key: 'address', label: 'Dirección' },
];
const editing = ref(false);
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
const date = (value) =>
    value
        ? new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
        : '—';
const closeRate = computed(() =>
    props.stats.quoted_amount
        ? Math.round((props.stats.sold_amount / props.stats.quoted_amount) * 100)
        : 0,
);
const kpis = computed(() => [
    { label: 'Cotizado', value: money(props.stats.quoted_amount), hint: 'Sin contar borradores' },
    { label: 'Vendido', value: money(props.stats.sold_amount), hint: `${closeRate.value}% concretado`, accent: true },
    { label: 'Por retomar', value: props.stats.pending_count, hint: 'Esperando respuesta' },
    { label: 'Cotizaciones', value: props.stats.quotes_count, hint: 'En total' },
]);
const save = () =>
    form.put(route('clients.update', params), {
        preserveScroll: true,
        onSuccess: () => (editing.value = false),
    });
const cancelEdit = () => {
    form.reset();
    form.clearErrors();
    editing.value = false;
};
const phoneDigits = computed(() => (props.client.phone || '').replace(/\D/g, ''));
</script>
<template>
    <CompanyLayout
        ><Head :title="client.name" />
        <nav class="text-sm text-slate-500" aria-label="Migas de pan">
            <Link :href="route('clients.index', { tenantBySlug: params.tenantBySlug })" class="hover:text-slate-900">Clientes</Link>
            <span class="mx-1.5" aria-hidden="true">/</span>
            <span class="text-slate-900">{{ client.name }}</span>
        </nav>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <span class="cf-avatar !h-12 !w-12 !text-lg" aria-hidden="true">{{ client.name.charAt(0).toUpperCase() }}</span>
                <div>
                    <h1>{{ client.name }}</h1>
                    <p class="mt-0.5">{{ client.rut }}</p>
                </div>
            </div>
            <Link
                v-if="can('quotes.manage')"
                :href="route('quotes.create', { tenantBySlug: params.tenantBySlug, client: client.id })"
                class="cf-btn cf-btn-primary"
                >Nueva cotización</Link
            >
        </div>

        <div class="my-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article
                v-for="kpi in kpis"
                :key="kpi.label"
                class="rounded-2xl border border-slate-200 bg-white p-5"
                :class="kpi.accent ? '!border-orange-100 !bg-orange-50/60' : ''"
            >
                <p class="text-xs text-slate-500">{{ kpi.label }}</p>
                <p class="mt-2 text-2xl font-semibold tracking-tight">{{ kpi.value }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ kpi.hint }}</p>
            </article>
        </div>

        <div class="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
            <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between p-5 pb-3">
                    <h2>Historial de cotizaciones</h2>
                    <Link
                        v-if="stats.pending_count && can('quotes.view')"
                        :href="route('quotes.follow-up', { tenantBySlug: params.tenantBySlug })"
                        class="text-sm font-semibold text-orange-600"
                        >Ver seguimiento →</Link
                    >
                </div>
                <table v-if="quotes.length" class="w-full text-left text-sm">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="p-4">Cotización</th>
                            <th class="p-4">Estado</th>
                            <th class="p-4">Fecha</th>
                            <th class="p-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="quote in quotes" :key="quote.id" class="cf-row-link border-t border-slate-100">
                            <td class="p-4">
                                <Link
                                    v-if="can('quotes.view')"
                                    :href="route('quotes.show', { tenantBySlug: params.tenantBySlug, quote: quote.id })"
                                    class="font-semibold text-orange-600"
                                    >#{{ quote.id }}</Link
                                >
                                <span v-else class="font-semibold">#{{ quote.id }}</span>
                            </td>
                            <td class="p-4"><StatusBadge :status="quote.status" /></td>
                            <td class="p-4 text-slate-500">{{ date(quote.sent_at || quote.created_at) }}</td>
                            <td class="p-4 text-right font-medium">{{ money(quote.total_amount) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="px-5 pb-8 pt-2 text-slate-500">
                    <p>Este cliente aún no tiene cotizaciones.</p>
                    <Link
                        v-if="can('quotes.manage')"
                        :href="route('quotes.create', { tenantBySlug: params.tenantBySlug, client: client.id })"
                        class="cf-btn cf-btn-ghost mt-4"
                        >Crear la primera</Link
                    >
                </div>
            </section>

            <section class="rounded-2xl border border-slate-200 bg-white p-5">
                <div class="flex items-center justify-between">
                    <h2>Datos de contacto</h2>
                    <button v-if="!editing" type="button" class="text-sm font-semibold text-orange-600" @click="editing = true">Editar</button>
                </div>
                <dl v-if="!editing" class="mt-4 flex flex-col gap-3 text-sm">
                    <div>
                        <dt class="text-xs text-slate-500">Teléfono</dt>
                        <dd>
                            <template v-if="client.phone">
                                <a :href="`tel:${client.phone}`" class="font-medium">{{ client.phone }}</a>
                                <a
                                    v-if="phoneDigits"
                                    :href="`https://wa.me/${phoneDigits}`"
                                    target="_blank"
                                    rel="noopener"
                                    class="ml-2 text-xs font-semibold text-orange-600"
                                    >WhatsApp</a
                                >
                            </template>
                            <span v-else class="text-slate-400">—</span>
                        </dd>
                    </div>
                    <div>
                        <dt class="text-xs text-slate-500">Correo</dt>
                        <dd>
                            <a v-if="client.email" :href="`mailto:${client.email}`" class="break-all font-medium">{{ client.email }}</a>
                            <span v-else class="text-slate-400">—</span>
                        </dd>
                    </div>
                    <div>
                        <dt class="text-xs text-slate-500">Dirección</dt>
                        <dd>{{ client.address || '—' }}</dd>
                    </div>
                </dl>
                <form v-else class="mt-4 flex flex-col gap-3" @submit.prevent="save">
                    <label v-for="field in fields" :key="field.key" class="flex flex-col gap-1.5"
                        >{{ field.label }}
                        <IdentificationInput
                            v-if="field.key === 'rut'"
                            v-model="form.rut"
                            hide-label
                            placeholder="11.111.111-1"
                            compact
                            :required="field.required"
                            :error-message="form.errors.rut"
                        />
                        <template v-else>
                            <input
                                v-model="form[field.key]"
                                :required="field.required"
                                :type="field.type || 'text'"
                                class="rounded-lg border-slate-300"
                            />
                            <span v-if="form.errors[field.key]" class="text-xs text-red-600">{{ form.errors[field.key] }}</span>
                        </template>
                    </label>
                    <div class="mt-1 flex justify-end gap-2">
                        <button type="button" class="cf-btn cf-btn-ghost" @click="cancelEdit">Cancelar</button>
                        <button class="cf-btn cf-btn-primary" :disabled="form.processing">Guardar</button>
                    </div>
                </form>
            </section></div
        ></CompanyLayout
    >
</template>
