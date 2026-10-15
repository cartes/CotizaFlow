<script setup>
import { ref } from 'vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
const props = defineProps({ client: Object, quotes: Array });
const params = {
    tenantBySlug: usePage().props.tenant?.slug,
    client: props.client.id,
};
const form = useForm({
    name: props.client.name,
    rut: props.client.rut,
    email: props.client.email,
    phone: props.client.phone,
    address: props.client.address,
});
const labels = {
    draft: 'Borrador',
    pending_customer: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
};
const activeSection = ref('datos');
</script>
<template>
    <CompanyLayout
        ><Head :title="client.name" /><Link
            :href="
                route('clients.index', { tenantBySlug: params.tenantBySlug })
            "
            class="text-sm text-slate-500"
            >← Clientes</Link
        >
        <h1 class="mt-4 text-3xl font-bold">{{ client.name }}</h1>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'datos', label: 'Datos de contacto' },
                { value: 'cotizaciones', label: 'Cotizaciones' },
            ]"
        />
        <form
            v-show="activeSection === 'datos'"
            role="tabpanel"
            aria-label="Datos de contacto"
            @submit.prevent="form.put(route('clients.update', params))"
            class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        >
            <label
                v-for="field in [
                    ['name', 'Nombre'],
                    ['rut', 'RUT'],
                    ['email', 'Correo'],
                    ['phone', 'Teléfono'],
                    ['address', 'Dirección'],
                ]"
                :key="field[0]"
                class="flex flex-col gap-2"
                >{{ field[1]
                }}<input
                    v-model="form[field[0]]"
                    :required="['name', 'rut'].includes(field[0])"
                    :type="field[0] === 'email' ? 'email' : 'text'"
                    class="rounded-lg border-slate-300"
                /><span class="text-sm text-red-600">{{
                    form.errors[field[0]]
                }}</span></label
            >
            <div class="flex items-end">
                <button
                    :disabled="form.processing"
                    class="rounded-lg bg-orange-500 px-5 py-3 text-white"
                >
                    Guardar cambios
                </button>
            </div>
        </form>
        <section
            v-show="activeSection === 'cotizaciones'"
            role="tabpanel"
            aria-label="Cotizaciones"
            class="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
        >
            <h2 class="text-xl font-semibold">Cotizaciones del cliente</h2>
            <ul class="mt-4 flex flex-col gap-4">
                <li v-for="quote in quotes" :key="quote.id">
                    <Link
                        :href="
                            route('quotes.show', {
                                tenantBySlug: params.tenantBySlug,
                                quote: quote.id,
                            })
                        "
                        class="font-medium text-orange-600"
                        >#{{ quote.id }}</Link
                    >
                    · {{ labels[quote.status] }}
                </li>
            </ul>
            <p v-if="!quotes.length" class="mt-4 text-slate-500">
                Este cliente aún no tiene cotizaciones.
            </p>
        </section></CompanyLayout
    >
</template>
