<script setup>
import { Head } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
import CommercialCatalog from '@/Components/CommercialCatalog.vue';
defineProps({ products: Object, filters: Object });
</script>
<template>
    <TallerLayout
        ><Head title="Productos" /><CommercialCatalog
            :records="products"
            :filters="filters"
            kind="product"
    /></TallerLayout>
</template>
