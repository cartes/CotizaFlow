<script setup>
import { ref, watch } from 'vue';
import { Head, Link, useForm, usePage, router } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
const props = defineProps({ clients: Object, filters: Object });
const params = { tenantBySlug: usePage().props.tenant?.slug };
const search = ref(props.filters?.search || '');
const open = ref(false);
const activeSection = ref('directorio');
watch(activeSection, (value) => {
    if (value === 'nuevo') open.value = true;
});
const form = useForm({ name: '', rut: '', email: '', phone: '', address: '' });
const submit = () =>
    form.post(route('clients.store', params), {
        onSuccess: () => {
            form.reset();
            open.value = false;
            activeSection.value = 'directorio';
        },
    });
</script>
<template>
    <CompanyLayout
        ><Head title="Clientes" />
        <div class="flex flex-wrap justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold">Clientes</h1>
                <p class="mt-2 text-slate-500">
                    Contactos y propuestas comerciales en un lugar.
                </p>
            </div>
            <button
                @click="
                    open = !open;
                    activeSection = open ? 'nuevo' : 'directorio';
                "
                class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
            >
                {{ open ? 'Cerrar formulario' : 'Agregar cliente' }}
            </button>
        </div>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'directorio', label: 'Directorio' },
                { value: 'nuevo', label: 'Nuevo cliente' },
            ]"
        />
        <form
            v-if="open"
            v-show="activeSection === 'nuevo'"
            @submit.prevent="submit"
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
                /><span
                    v-if="form.errors[field[0]]"
                    class="text-sm text-red-600"
                    >{{ form.errors[field[0]] }}</span
                ></label
            >
            <div class="flex items-end">
                <button
                    :disabled="form.processing"
                    class="rounded-lg bg-slate-900 px-5 py-3 text-white"
                >
                    Guardar cliente
                </button>
            </div>
        </form>
        <form
            v-show="activeSection === 'directorio'"
            @submit.prevent="
                router.get(route('clients.index', params), { search })
            "
            class="my-6 flex gap-3"
        >
            <input
                v-model="search"
                placeholder="Buscar por nombre o RUT"
                aria-label="Buscar clientes"
                class="w-full max-w-md rounded-lg border-slate-300"
            /><button class="rounded-lg bg-slate-900 px-5 text-white">
                Buscar
            </button>
        </form>
        <section
            v-show="activeSection === 'directorio'"
            role="tabpanel"
            aria-label="Directorio"
            class="overflow-x-auto rounded-2xl border border-slate-200 bg-white"
        >
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Cliente</th>
                        <th class="p-4">RUT</th>
                        <th class="p-4">Correo</th>
                        <th class="p-4">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="client in clients.data"
                        :key="client.id"
                        class="border-t border-slate-100"
                    >
                        <td class="p-4">
                            <Link
                                :href="
                                    route('clients.show', {
                                        ...params,
                                        client: client.id,
                                    })
                                "
                                class="font-semibold text-orange-600"
                                >{{ client.name }}</Link
                            >
                        </td>
                        <td class="p-4">{{ client.rut }}</td>
                        <td class="p-4">{{ client.email || '—' }}</td>
                        <td class="p-4">{{ client.phone || '—' }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!clients.data.length" class="p-8 text-slate-500">
                Agrega tu primer cliente para comenzar a cotizar.
            </p>
        </section>
        <div v-show="activeSection === 'directorio'" class="mt-5 flex gap-4">
            <Link v-if="clients.prev_page_url" :href="clients.prev_page_url"
                >← Anterior</Link
            ><Link v-if="clients.next_page_url" :href="clients.next_page_url"
                >Siguiente →</Link
            >
        </div></CompanyLayout
    >
</template>
