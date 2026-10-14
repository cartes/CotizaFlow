<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
</script>
<template>
    <div class="min-h-screen bg-slate-50">
        <Head title="Solicitud recibida" /><PublicNav />
        <main class="mx-auto max-w-2xl px-5 py-20">
            <h1 class="text-3xl font-bold">Recibimos tu solicitud</h1>
            <p class="mt-4 text-lg text-slate-600">
                Te contactaremos para conversar sobre tu proceso comercial y
                coordinar el acceso a CotizaFlow.
            </p>
            <Link
                :href="route('home')"
                class="mt-8 inline-block text-orange-600"
                >Volver al inicio →</Link
            >
        </main>
        <PublicFooter />
    </div>
</template>
