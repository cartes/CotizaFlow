<script setup>
import { computed } from 'vue';
const props = defineProps({ status: { type: String, required: true } });
const config = {
    draft: { label: 'Borrador', classes: 'bg-slate-100 text-slate-600' },
    pending_customer: {
        label: 'Pendiente',
        classes: 'bg-amber-50 text-amber-700',
    },
    accepted: { label: 'Aceptada', classes: 'bg-emerald-50 text-emerald-700' },
    rejected: { label: 'Rechazada', classes: 'bg-rose-50 text-rose-700' },
};
const current = computed(
    () => config[props.status] ?? { label: props.status, classes: 'bg-slate-100 text-slate-600' },
);
</script>
<template>
    <span class="cf-badge" :class="current.classes">{{ current.label }}</span>
</template>
