<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
const props = defineProps({
    quote: Object,
    company: Object,
    clientName: String,
    items: Array,
    taxName: String,
});
const page = usePage();
const form = useForm({ decision: 'accepted', notes: '' });
const respond = (decision) => {
    form.decision = decision;
    form.post(route('quotes.public.respond', { uuid: props.quote.uuid }));
};
const labels = {
    pending_customer: 'Pendiente de respuesta',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
};
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Number(value));
</script>
<template>
    <div class="min-h-screen bg-slate-50 px-5 py-12">
        <Head :title="`Cotización #${quote.id}`" />
        <main
            class="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10"
        >
            <header class="flex items-center gap-4">
                <img
                    v-if="company.logo_url"
                    :src="company.logo_url"
                    :alt="company.name"
                    class="h-14 w-14 object-contain"
                /><ApplicationLogo v-else class="h-12 w-12" />
                <div>
                    <p class="font-semibold">{{ company.name }}</p>
                    <p class="text-sm text-slate-500">
                        Cotización preparada con CotizaFlow
                    </p>
                </div>
            </header>
            <h1 class="mt-8 text-3xl font-bold">Cotización #{{ quote.id }}</h1>
            <p class="mt-3 text-slate-600">Preparada para {{ clientName }}</p>
            <p class="mt-2 font-semibold text-orange-600">
                {{ labels[quote.status] }}
            </p>
            <div class="my-8 overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr>
                            <th class="py-3">Descripción</th>
                            <th class="p-3">Cantidad</th>
                            <th class="p-3">Descuento</th>
                            <th class="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in items"
                            :key="item.id"
                            class="border-t border-slate-100"
                        >
                            <td class="py-4">{{ item.description }}</td>
                            <td class="p-3">{{ item.quantity }}</td>
                            <td class="p-3">{{ item.discount_percent }}%</td>
                            <td class="p-3">{{ money(item.total_price) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-3 border-t pt-5">
                <p class="flex justify-between">
                    <span>Subtotal</span
                    ><span>{{ money(quote.subtotal_amount) }}</span>
                </p>
                <p class="flex justify-between">
                    <span
                        >{{ taxName }} ({{
                            quote.apply_tax ? quote.tax_rate : 0
                        }}%)</span
                    ><span>{{ money(quote.tax_amount) }}</span>
                </p>
                <p class="flex justify-between text-xl font-bold">
                    <span>Total</span
                    ><span>{{ money(quote.total_amount) }}</span>
                </p>
            </div>
            <p class="mt-6 whitespace-pre-wrap text-slate-600">
                {{ quote.notes }}
            </p>
            <section
                v-if="quote.status === 'pending_customer'"
                class="mt-8 border-t pt-6"
            >
                <label class="flex flex-col gap-2"
                    >Comentario (opcional)<textarea
                        v-model="form.notes"
                        maxlength="1000"
                        rows="3"
                        class="rounded-lg border-slate-300"
                    />
                </label>
                <div class="mt-4 flex flex-wrap gap-3">
                    <button
                        :disabled="form.processing"
                        @click="respond('accepted')"
                        class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
                    >
                        Aceptar cotización</button
                    ><button
                        :disabled="form.processing"
                        @click="respond('rejected')"
                        class="rounded-xl border border-slate-300 px-5 py-3"
                    >
                        Rechazar
                    </button>
                </div>
                <p
                    v-for="(error, key) in form.errors"
                    :key="key"
                    class="mt-3 text-red-600"
                >
                    {{ error }}
                </p>
            </section>
            <p v-if="page.props.flash?.success" class="mt-5 text-green-700">
                {{ page.props.flash.success }}
            </p>
        </main>
    </div>
</template>
