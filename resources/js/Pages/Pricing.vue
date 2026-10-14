<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
const plans = [
    {
        name: 'Emprendedor',
        text: 'Para independientes y microempresas que comienzan a ordenar sus cotizaciones.',
    },
    {
        name: 'Pyme',
        text: 'Para empresas que cotizan con frecuencia y necesitan hacer seguimiento.',
    },
    {
        name: 'Equipo',
        text: 'Para empresas con varias personas en su proceso comercial.',
    },
];
</script>
<template>
    <div class="min-h-screen bg-slate-50">
        <Head title="Planes" /><PublicNav />
        <main class="mx-auto max-w-6xl px-5 py-16">
            <h1 class="text-4xl font-bold">
                Un plan para cada etapa de tu empresa
            </h1>
            <p class="mt-4 text-lg text-slate-600">
                Estamos preparando los planes y sus límites. Puedes solicitar
                acceso a la versión inicial.
            </p>
            <div class="mt-10 grid gap-6 md:grid-cols-3">
                <article
                    v-for="plan in plans"
                    :key="plan.name"
                    class="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-8"
                >
                    <h2 class="text-2xl font-semibold">{{ plan.name }}</h2>
                    <p class="text-slate-600">{{ plan.text }}</p>
                    <span class="text-sm text-slate-500"
                        >Precio e inclusiones por confirmar</span
                    ><Link
                        :href="route('trial.create')"
                        class="font-semibold text-orange-600"
                        >Solicitar información →</Link
                    >
                </article>
            </div>
        </main>
        <PublicFooter />
    </div>
</template>
