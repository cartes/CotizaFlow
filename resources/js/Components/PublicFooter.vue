<script setup>
import { Link } from '@inertiajs/vue3';
</script>
<template>
    <footer class="border-t border-slate-200 bg-white">
        <div
            class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 text-sm text-slate-500"
        >
            <span>CotizaFlow · Cotizaciones y seguimiento para pymes.</span
            ><Link :href="route('trial.create')">Solicitar acceso</Link>
        </div>
        <div
            class="mx-auto flex max-w-6xl flex-col gap-2 border-t border-slate-100 px-5 py-6 text-sm text-slate-500"
        >
            <h2 class="font-semibold text-slate-700">Te puede interesar</h2>
            <a
                href="https://tallerflow.cl"
                target="_blank"
                rel="noopener"
                class="transition hover:text-orange-600"
                >Taller Flow</a
            >
        </div>
    </footer>
</template>
