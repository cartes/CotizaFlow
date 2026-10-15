<script setup>
import { Head } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import CommercialCatalog from '@/Components/CommercialCatalog.vue';
defineProps({ products: Object, filters: Object });
</script>
<template>
    <CompanyLayout
        ><Head title="Productos" /><CommercialCatalog
            :records="products"
            :filters="filters"
            kind="product"
    /></CompanyLayout>
</template>
