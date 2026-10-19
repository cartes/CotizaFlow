<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
const features = [
    ['Clientes', 'Contactos y cotizaciones organizados por cliente.'],
    [
        'Catálogo',
        'Productos y servicios con precios e importación desde Excel.',
    ],
    [
        'Cotizaciones',
        'Ítems, descuentos, impuestos y un enlace para que el cliente responda.',
    ],
    [
        'Seguimiento',
        'Una vista de cotizaciones pendientes para retomar el contacto.',
    ],
];
</script>
<template>
    <div class="flex min-h-screen flex-col bg-slate-50">
        <Head title="Funciones" /><PublicNav />
        <main class="mx-auto max-w-6xl px-5 py-16">
            <h1 class="text-4xl font-bold">
                Las herramientas para cotizar y vender
            </h1>
            <div class="mt-10 grid gap-6 md:grid-cols-2">
                <article
                    v-for="feature in features"
                    :key="feature[0]"
                    class="rounded-2xl border border-slate-200 bg-white p-8"
                >
                    <h2 class="text-2xl font-semibold">{{ feature[0] }}</h2>
                    <p class="mt-3 text-slate-600">{{ feature[1] }}</p>
                </article>
            </div>
            <Link
                :href="route('trial.create')"
                class="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
                >Solicitar acceso</Link
            >
        </main>
        <PublicFooter />
    </div>
</template>
