<script setup>
import { Head } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
import CommercialCatalog from '@/Components/CommercialCatalog.vue';
defineProps({ services: Object, filters: Object });
</script>
<template>
    <TallerLayout
        ><Head title="Servicios" /><CommercialCatalog
            :records="services"
            :filters="filters"
            kind="service"
    /></TallerLayout>
</template>
