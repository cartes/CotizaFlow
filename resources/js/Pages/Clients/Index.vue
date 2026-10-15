<script setup>
import { ref, watch } from 'vue';
import { Head, Link, useForm, usePage, router } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import IdentificationInput from '@/Components/IdentificationInput.vue';
const props = defineProps({ clients: Object, filters: Object });
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug };
const canQuote =
    page.props.auth.user.is_super_admin ||
    page.props.auth.user.permissions.includes('quotes.manage');
const search = ref(props.filters?.search || '');
const open = ref(false);
const form = useForm({ name: '', rut: '', email: '', phone: '', address: '' });
const fields = [
    { key: 'name', label: 'Nombre', required: true, span: true },
    { key: 'rut', label: 'RUT', required: true },
    { key: 'phone', label: 'Teléfono' },
    { key: 'email', label: 'Correo', type: 'email' },
    { key: 'address', label: 'Dirección' },
];
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
let searchTimer;
watch(search, (value) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        router.get(
            route('clients.index', params),
            { search: value || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 300);
});
const submit = () =>
    form.post(route('clients.store', params), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            open.value = false;
        },
    });
const cancel = () => {
    form.reset();
    form.clearErrors();
    open.value = false;
};
</script>
<template>
    <CompanyLayout
        ><Head title="Clientes" />
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1>Clientes</h1>
                <p class="mt-1">
                    Cada cliente con lo que se le ha cotizado y vendido.
                </p>
            </div>
            <button
                v-if="!open"
                type="button"
                class="cf-btn cf-btn-primary"
                @click="open = true"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" d="M12 5v14M5 12h14" />
                </svg>
                Nuevo cliente
            </button>
        </div>

        <form
            v-if="open"
            class="mt-6 rounded-2xl border border-slate-200 bg-white p-5"
            @submit.prevent="submit"
        >
            <div class="flex items-center justify-between">
                <h2>Nuevo cliente</h2>
                <button
                    type="button"
                    class="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Cancelar"
                    @click="cancel"
                >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <label
                    v-for="field in fields"
                    :key="field.key"
                    class="flex flex-col gap-1.5"
                    :class="{ 'sm:col-span-2': field.span }"
                    >{{ field.label }}<span v-if="field.required" class="sr-only"> (obligatorio)</span>
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
                            :autofocus="field.key === 'name'"
                            class="rounded-lg border-slate-300"
                        />
                        <span v-if="form.errors[field.key]" class="text-xs text-red-600">{{ form.errors[field.key] }}</span>
                    </template>
                </label>
            </div>
            <div class="mt-5 flex justify-end gap-2">
                <button type="button" class="cf-btn cf-btn-ghost" @click="cancel">Cancelar</button>
                <button class="cf-btn cf-btn-primary" :disabled="form.processing">Guardar cliente</button>
            </div>
        </form>

        <div class="relative my-6 max-w-md">
            <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
                v-model="search"
                type="search"
                placeholder="Buscar por nombre o RUT"
                aria-label="Buscar clientes"
                class="w-full rounded-full border-slate-300 pl-10"
            />
        </div>

        <section class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Cliente</th>
                        <th class="p-4">Contacto</th>
                        <th class="p-4 text-center">Cotizaciones</th>
                        <th class="p-4 text-right">Vendido</th>
                        <th class="p-4"><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="client in clients.data" :key="client.id" class="cf-row-link border-t border-slate-100">
                        <td class="p-4">
                            <Link
                                :href="route('clients.show', { ...params, client: client.id })"
                                class="flex items-center gap-3"
                            >
                                <span class="cf-avatar" aria-hidden="true">{{ client.name.charAt(0).toUpperCase() }}</span>
                                <span>
                                    <span class="block font-semibold text-slate-900">{{ client.name }}</span>
                                    <span class="block text-xs text-slate-500">{{ client.rut }}</span>
                                </span>
                            </Link>
                        </td>
                        <td class="p-4 text-slate-600">
                            <span class="block">{{ client.email || '—' }}</span>
                            <span class="block text-xs text-slate-500">{{ client.phone || '—' }}</span>
                        </td>
                        <td class="p-4 text-center">
                            <span class="font-medium">{{ client.quotes_count }}</span>
                            <span v-if="client.pending_count" class="cf-badge ml-2 bg-amber-50 text-amber-700">
                                {{ client.pending_count }} por retomar
                            </span>
                        </td>
                        <td class="p-4 text-right font-medium">{{ money(client.sold_amount) }}</td>
                        <td class="p-4 text-right">
                            <Link
                                v-if="canQuote"
                                :href="route('quotes.create', { ...params, client: client.id })"
                                class="cf-btn cf-btn-ghost"
                                >Cotizar</Link
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!clients.data.length" class="p-8 text-center text-slate-500">
                {{ filters?.search ? 'Ningún cliente coincide con tu búsqueda.' : 'Agrega tu primer cliente para comenzar a cotizar.' }}
            </p>
        </section>
        <div class="mt-5 flex gap-4 text-sm">
            <Link v-if="clients.prev_page_url" :href="clients.prev_page_url" preserve-scroll>← Anterior</Link>
            <Link v-if="clients.next_page_url" :href="clients.next_page_url" preserve-scroll>Siguiente →</Link>
        </div></CompanyLayout
    >
</template>
