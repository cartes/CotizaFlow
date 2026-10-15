<script setup>
import { Head } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import CommercialCatalog from '@/Components/CommercialCatalog.vue';
defineProps({ services: Object, filters: Object });
</script>
<template>
    <CompanyLayout
        ><Head title="Servicios" /><CommercialCatalog
            :records="services"
            :filters="filters"
            kind="service"
    /></CompanyLayout>
</template>
