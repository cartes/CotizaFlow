<script setup>
import { ref } from 'vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
const props = defineProps({ company: Object, users: Array });
const params = { tenantBySlug: usePage().props.tenant?.slug };
const form = useForm({
    name: props.company.name,
    phone: props.company.phone,
    comuna: props.company.comuna,
    max_discount_without_approval: props.company.max_discount_without_approval,
});
const logo = useForm({ logo: null });
const activeSection = ref('empresa');
</script>
<template>
    <TallerLayout
        ><Head title="Configuración" />
        <h1 class="text-3xl font-bold">Configuración de tu empresa</h1>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'empresa', label: 'Empresa' },
                { value: 'identidad', label: 'Identidad' },
                { value: 'equipo', label: 'Equipo' },
            ]"
        />
        <form
            v-show="activeSection === 'empresa'"
            role="tabpanel"
            aria-label="Empresa"
            @submit.prevent="
                form.patch(route('taller.settings.commercial.update', params))
            "
            class="mt-6 grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        >
            <label class="flex flex-col gap-2"
                >Nombre de la empresa<input
                    v-model="form.name"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Teléfono<input
                    v-model="form.phone"
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Ciudad o comuna<input
                    v-model="form.comuna"
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Descuento máximo sin aprobación (%)<input
                    v-model="form.max_discount_without_approval"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    required
                    class="rounded-lg border-slate-300"
            /></label>
            <p
                v-for="(error, key) in form.errors"
                :key="key"
                class="text-red-600"
            >
                {{ error }}
            </p>
            <button
                :disabled="form.processing"
                class="justify-self-start rounded-xl bg-orange-500 px-5 py-3 text-white"
            >
                Guardar cambios
            </button>
        </form>
        <section
            v-show="activeSection === 'identidad'"
            role="tabpanel"
            aria-label="Identidad"
            class="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"
        >
            <h2 class="text-xl font-semibold">Logo de la empresa</h2>
            <img
                v-if="company.logo_url"
                :src="company.logo_url"
                :alt="company.name"
                class="my-4 h-16 object-contain"
            />
            <form
                @submit.prevent="
                    logo.post(route('taller.settings.branding.logo', params), {
                        forceFormData: true,
                    })
                "
                class="mt-4 flex flex-wrap items-center gap-3"
            >
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    aria-label="Logo de la empresa"
                    @change="logo.logo = $event.target.files[0]"
                /><button
                    :disabled="!logo.logo || logo.processing"
                    class="rounded-lg border border-slate-300 px-4 py-2"
                >
                    Subir logo
                </button>
                <p
                    v-for="(error, key) in logo.errors"
                    :key="key"
                    class="text-red-600"
                >
                    {{ error }}
                </p>
            </form>
        </section>
        <section
            v-show="activeSection === 'equipo'"
            role="tabpanel"
            aria-label="Equipo"
            class="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"
        >
            <h2 class="text-xl font-semibold">Personas de tu empresa</h2>
            <ul class="mt-4 flex flex-col gap-3">
                <li v-for="user in users" :key="user.id">
                    {{ user.name }} · {{ user.email }}
                </li>
            </ul>
        </section></TallerLayout
    >
</template>
