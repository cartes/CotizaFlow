<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';

defineProps({
    integrations: { type: Array, default: () => [] },
    recent_errors: { type: Array, default: () => [] },
    configuration_url: { type: String, required: true },
});

const statusLabels = {
    connected: 'Conectada',
    configured: 'Configurada · sin prueba reciente',
    missing: 'Falta configuración',
    error: 'Requiere atención',
};

const statusClasses = {
    connected: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    configured: 'bg-sky-50 text-sky-700 ring-sky-600/20',
    missing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    error: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

const formatDate = (value) => value
    ? new Date(value).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' })
    : '—';

const refresh = () => router.reload({ only: ['integrations', 'recent_errors'] });
</script>

<template>
    <Head title="Integraciones" />

    <CompanyLayout>
        <div class="space-y-6">
            <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-wide text-amber-600">CotizaFlow · Super-admin</p>
                    <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Integraciones</h1>
                    <p class="mt-1 text-sm text-slate-500">Configuración detectada, actividad reciente y errores operativos.</p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <button type="button" class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50" @click="refresh">Actualizar estado</button>
                    <Link :href="configuration_url" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Configurar credenciales</Link>
                </div>
            </header>

            <section aria-label="Estado de integraciones" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <article v-for="integration in integrations" :key="integration.key" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 class="text-base font-semibold text-slate-900">{{ integration.name }}</h2>
                            <p class="mt-1 text-sm text-slate-500">{{ integration.description }}</p>
                        </div>
                        <span :class="statusClasses[integration.status]" class="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset">
                            {{ statusLabels[integration.status] }}
                        </span>
                    </div>
                    <dl class="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
                        <div>
                            <dt class="text-xs font-medium uppercase tracking-wide text-slate-400">Configuración</dt>
                            <dd class="mt-1 break-all text-sm text-slate-700">{{ integration.configuration || '—' }}</dd>
                        </div>
                        <div>
                            <dt class="text-xs font-medium uppercase tracking-wide text-slate-400">Última actividad</dt>
                            <dd class="mt-1 text-sm text-slate-700">{{ formatDate(integration.last_event?.checked_at) }}</dd>
                        </div>
                    </dl>
                    <p v-if="integration.setup_issue" class="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                        {{ integration.setup_issue }}
                    </p>
                    <p v-if="integration.last_event" :class="integration.last_event.status === 'error' ? 'text-rose-700' : 'text-emerald-700'" class="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                        {{ integration.last_event.message }}
                    </p>
                    <p v-else-if="!integration.setup_issue" class="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
                        {{ integration.configured ? 'Configurada. El estado de conexión se confirmará con la próxima operación real.' : 'Completa las credenciales para habilitar esta integración.' }}
                    </p>
                </article>
            </section>

            <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-100 px-5 py-4 sm:px-6">
                    <h2 class="text-base font-semibold text-slate-900">Errores recientes</h2>
                    <p class="mt-1 text-sm text-slate-500">Últimos errores registrados en operaciones de integraciones.</p>
                </div>
                <div v-if="recent_errors.length" class="divide-y divide-slate-100">
                    <article v-for="error in recent_errors" :key="error.id" class="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                        <div>
                            <p class="text-sm font-semibold text-rose-700">{{ error.name }}</p>
                            <p class="mt-1 text-sm text-slate-600">{{ error.message }}</p>
                        </div>
                        <time class="shrink-0 text-xs text-slate-400">{{ formatDate(error.checked_at) }}</time>
                    </article>
                </div>
                <div v-else class="px-6 py-10 text-center">
                    <p class="text-sm font-medium text-slate-700">No hay errores registrados</p>
                    <p class="mt-1 text-sm text-slate-500">Los fallos de conexión y respuesta aparecerán aquí.</p>
                </div>
            </section>
        </div>
    </CompanyLayout>
</template>
