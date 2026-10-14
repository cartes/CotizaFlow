<script setup>
import { Head, Link } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
defineProps({ companies: Array });
</script>
<template>
    <TallerLayout
        ><Head title="Administración" />
        <h1 class="text-3xl font-bold">Empresas de CotizaFlow</h1>
        <section
            class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"
        >
            <table class="w-full text-left text-sm">
                <thead>
                    <tr>
                        <th class="p-4">Empresa</th>
                        <th class="p-4">Usuarios</th>
                        <th class="p-4">Estado</th>
                        <th class="p-4">Acceso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="company in companies"
                        :key="company.id"
                        class="border-t border-slate-100"
                    >
                        <td class="p-4">{{ company.name }}</td>
                        <td class="p-4">{{ company.users_count }}</td>
                        <td class="p-4">
                            {{ company.is_active ? 'Activa' : 'Inactiva' }}
                        </td>
                        <td class="p-4">
                            <Link
                                :href="
                                    route('taller.dashboard', {
                                        tenantBySlug: company.slug,
                                    })
                                "
                                class="text-orange-600"
                                >Abrir empresa</Link
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </section></TallerLayout
    >
</template>
