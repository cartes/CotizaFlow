<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
const props = defineProps({ clients: Array, selectedClientId: Number });
const params = { tenantBySlug: usePage().props.tenant?.slug };
const form = useForm({ client_id: props.selectedClientId ?? '', notes: '' });
const submit = () => {
    if (!form.client_id) {
        form.setError('client_id', 'Selecciona un cliente.');
        return;
    }
    form.post(route('quotes.store', params));
};
</script>
<template>
    <CompanyLayout
        ><Head title="Nueva cotización" />
        <nav class="text-sm text-slate-500" aria-label="Migas de pan">
            <Link :href="route('quotes.index', params)" class="hover:text-slate-900">Cotizaciones</Link>
            <span class="mx-1.5" aria-hidden="true">/</span>
            <span class="text-slate-900">Nueva</span>
        </nav>
        <h1 class="mt-4">Nueva cotización</h1>
        <p class="mt-1">Elige el cliente; los productos y servicios los agregas en el siguiente paso.</p>

        <form class="mt-6 flex max-w-xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6" @submit.prevent="submit">
            <label class="flex flex-col gap-1.5 font-medium"
                >Cliente
                <select v-model="form.client_id" class="rounded-lg border-slate-300">
                    <option value="" disabled>Selecciona un cliente</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }} · {{ client.rut }}</option>
                </select>
                <span v-if="form.errors.client_id" class="text-xs font-normal text-red-600">{{ form.errors.client_id }}</span>
            </label>
            <p v-if="!clients.length" class="-mt-2 text-sm text-slate-500">
                Aún no tienes clientes.
                <Link :href="route('clients.index', params)" class="font-semibold text-orange-600">Agrega el primero →</Link>
            </p>
            <label class="flex flex-col gap-1.5 font-medium"
                >Notas y condiciones <span class="text-xs font-normal text-slate-400">Opcional</span>
                <textarea v-model="form.notes" maxlength="1000" rows="4" class="rounded-lg border-slate-300" />
                <span v-if="form.errors.notes" class="text-xs font-normal text-red-600">{{ form.errors.notes }}</span>
            </label>
            <div class="flex justify-end gap-2">
                <Link :href="route('quotes.index', params)" class="cf-btn cf-btn-ghost">Cancelar</Link>
                <button class="cf-btn cf-btn-primary" :disabled="form.processing || !clients.length">Crear y agregar ítems</button>
            </div>
        </form></CompanyLayout
    >
</template>
