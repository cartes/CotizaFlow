<script setup>
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from './ApplicationLogo.vue';
</script>
<template>
    <footer class="mt-auto border-t border-slate-200 bg-white">
        <div
            class="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm sm:grid-cols-[1fr_auto_auto] sm:gap-16"
        >
            <div class="max-w-xs">
                <Link
                    :href="route('home')"
                    class="flex items-center gap-2.5 text-lg font-bold text-slate-900"
                    ><ApplicationLogo class="h-8 w-8" /><span
                        >Cotiza<span class="text-orange-500">Flow</span></span
                    ></Link
                >
                <p class="mt-3 leading-relaxed text-slate-500">
                    Cotizaciones y seguimiento comercial para pymes.
                </p>
            </div>
            <nav aria-label="Producto" class="flex flex-col gap-2.5">
                <h2 class="font-semibold text-slate-900">Producto</h2>
                <Link
                    :href="route('servicios')"
                    class="text-slate-600 transition hover:text-orange-600"
                    >Funciones</Link
                >
                <Link
                    :href="route('pricing')"
                    class="text-slate-600 transition hover:text-orange-600"
                    >Planes</Link
                >
                <Link
                    :href="route('trial.create')"
                    class="text-slate-600 transition hover:text-orange-600"
                    >Solicitar acceso</Link
                >
            </nav>
            <nav aria-label="Te puede interesar" class="flex flex-col gap-2.5">
                <h2 class="font-semibold text-slate-900">Te puede interesar</h2>
                <a
                    href="https://tallerflow.cl"
                    target="_blank"
                    rel="noopener"
                    class="text-slate-600 transition hover:text-orange-600"
                    >Taller Flow</a
                >
            </nav>
        </div>
    </footer>
</template>
