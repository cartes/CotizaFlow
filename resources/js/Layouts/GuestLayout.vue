<script setup>
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
</script>
<template>
    <div
        class="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-50 px-5"
    >
        <Link
            :href="route('home')"
            class="flex items-center gap-3 text-2xl font-bold"
            ><ApplicationLogo class="h-12 w-12" />CotizaFlow</Link
        >
        <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
            <slot />
        </div>
    </div>
</template>
