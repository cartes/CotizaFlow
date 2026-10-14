<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from './ApplicationLogo.vue';
import LoginModal from './LoginModal.vue';
const page = usePage();
const loginOpen = ref(
    new URLSearchParams(window.location.search).get('login') === '1',
);
</script>
<template>
    <header class="border-b border-slate-200 bg-white">
        <nav
            aria-label="Navegación principal"
            class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5"
        >
            <Link
                :href="route('home')"
                class="flex items-center gap-3 text-2xl font-bold"
                ><ApplicationLogo class="h-10 w-10" /><span
                    >Cotiza<span class="text-orange-500">Flow</span></span
                ></Link
            >
            <div class="flex flex-wrap items-center gap-5 text-sm">
                <Link :href="route('servicios')">Funciones</Link
                ><Link :href="route('pricing')">Planes</Link
                ><Link
                    v-if="page.props.auth?.user"
                    :href="route('dashboard')"
                    class="rounded-lg bg-orange-500 px-4 py-2 text-white"
                    >Ir a mi cuenta</Link
                ><button
                    v-else
                    @click="loginOpen = true"
                    class="rounded-lg bg-orange-500 px-4 py-2 text-white"
                >
                    Iniciar sesión
                </button>
            </div>
        </nav>
        <LoginModal
            :show="loginOpen"
            @close="loginOpen = false"
            @open-login="loginOpen = true"
        />
    </header>
</template>
