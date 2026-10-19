<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
const props = defineProps({ countries: Array });
const form = useForm({
    country: props.countries[0]?.value || 'CL',
    name: '',
    email: '',
    phone: '',
    business_name: '',
    business_type: '',
    city: '',
    users_estimate: 1,
    message: '',
    terms: false,
});
</script>
<template>
    <div class="flex min-h-screen flex-col bg-slate-50">
        <Head title="Solicitar acceso" /><PublicNav />
        <main class="mx-auto max-w-2xl px-5 py-12">
            <h1 class="text-3xl font-bold">Conversemos sobre tu empresa</h1>
            <p class="mt-3 text-slate-600">
                Cuéntanos cómo cotizas hoy y te contactaremos para coordinar
                acceso a CotizaFlow.
            </p>
            <form
                @submit.prevent="form.post(route('trial.store'))"
                class="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-7"
            >
                <label
                    v-for="field in [
                        ['name', 'Tu nombre'],
                        ['email', 'Correo'],
                        ['phone', 'Teléfono'],
                        ['business_name', 'Empresa'],
                        ['business_type', 'Rubro'],
                        ['city', 'Ciudad'],
                    ]"
                    :key="field[0]"
                    class="flex flex-col gap-2"
                    >{{ field[1]
                    }}<input
                        v-model="form[field[0]]"
                        :required="field[0] !== 'city'"
                        :type="field[0] === 'email' ? 'email' : 'text'"
                        class="rounded-lg border-slate-300" /></label
                ><label class="flex flex-col gap-2"
                    >País<select
                        v-model="form.country"
                        class="rounded-lg border-slate-300"
                    >
                        <option
                            v-for="country in countries"
                            :key="country.value"
                            :value="country.value"
                        >
                            {{ country.label }}
                        </option>
                    </select></label
                ><label class="flex flex-col gap-2"
                    >¿Qué necesitas simplificar?<textarea
                        v-model="form.message"
                        maxlength="1000"
                        rows="3"
                        class="rounded-lg border-slate-300"
                    /></label
                ><label class="flex items-start gap-2 text-sm text-slate-500"
                    ><input
                        v-model="form.terms"
                        type="checkbox"
                        required
                        class="mt-1"
                    />Acepto que utilicen estos datos para responder mi
                    solicitud.</label
                >
                <p
                    v-for="(error, key) in form.errors"
                    :key="key"
                    class="text-sm text-red-600"
                >
                    {{ error }}
                </p>
                <button
                    :disabled="form.processing"
                    class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
                >
                    Enviar solicitud
                </button>
            </form>
        </main>
        <PublicFooter />
    </div>
</template>
