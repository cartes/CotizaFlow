<script setup>
import { ref } from 'vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
defineProps({ clients: Array });
const params = { tenantBySlug: usePage().props.tenant?.slug };
const activeSection = ref('cliente');
const submit = () => {
    if (!form.client_id) {
        activeSection.value = 'cliente';
        form.setError('client_id', 'Selecciona un cliente.');
        return;
    }
    form.post(route('quotes.store', params), {
        onError: (errors) => {
            activeSection.value = errors.client_id ? 'cliente' : 'condiciones';
        },
    });
};
const form = useForm({ client_id: '', notes: '' });
</script>
<template>
    <CompanyLayout
        ><Head title="Nueva cotización" />
        <h1 class="text-3xl font-bold">Nueva cotización</h1>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'cliente', label: 'Cliente' },
                { value: 'condiciones', label: 'Condiciones' },
            ]"
        />
        <form
            @submit.prevent="submit"
            class="mt-6 flex max-w-2xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7"
        >
            <label
                v-show="activeSection === 'cliente'"
                class="flex flex-col gap-2 font-medium"
                >Cliente<select
                    v-model="form.client_id"
                    class="rounded-lg border-slate-300"
                >
                    <option value="" disabled>Selecciona un cliente</option>
                    <option
                        v-for="client in clients"
                        :key="client.id"
                        :value="client.id"
                    >
                        {{ client.name }} · {{ client.rut }}
                    </option>
                </select></label
            ><Link
                v-show="activeSection === 'cliente'"
                :href="route('clients.index', params)"
                class="text-sm text-orange-600"
                >Agregar o revisar clientes →</Link
            ><label
                v-show="activeSection === 'condiciones'"
                class="flex flex-col gap-2 font-medium"
                >Notas y condiciones<textarea
                    v-model="form.notes"
                    maxlength="1000"
                    rows="4"
                    class="rounded-lg border-slate-300"
                />
            </label>
            <p
                v-for="(error, key) in form.errors"
                :key="key"
                class="text-sm text-red-600"
            >
                {{ error }}
            </p>
            <button
                :disabled="form.processing || !clients.length"
                class="self-start rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
                Crear cotización
            </button>
        </form></CompanyLayout
    >
</template>
