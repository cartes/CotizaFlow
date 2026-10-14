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
    </footer>
</template>
