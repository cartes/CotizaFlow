<script setup>
import { ref, nextTick, useId } from 'vue';
const props = defineProps({
    modelValue: String,
    items: Array,
    label: { type: String, default: 'Secciones de la vista' },
});
const emit = defineEmits(['update:modelValue']);
const id = useId();
const buttons = ref([]);
const select = (value) => emit('update:modelValue', value);
function onKey(event, index) {
    let target = index;
    if (event.key === 'ArrowRight') target = (index + 1) % props.items.length;
    else if (event.key === 'ArrowLeft')
        target = (index - 1 + props.items.length) % props.items.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = props.items.length - 1;
    else return;
    event.preventDefault();
    select(props.items[target].value);
    nextTick(() => buttons.value[target]?.focus());
}
</script>
<template>
    <div class="cf-section-tabs" role="tablist" :aria-label="label">
        <button
            v-for="(item, index) in items"
            :key="item.value"
            :ref="(el) => (buttons[index] = el)"
            :id="`${id}-${item.value}`"
            type="button"
            role="tab"
            :aria-selected="modelValue === item.value"
            :tabindex="modelValue === item.value ? 0 : -1"
            :class="{ 'is-selected': modelValue === item.value }"
            @click="select(item.value)"
            @keydown="onKey($event, index)"
        >
            {{ item.label }}
        </button>
    </div>
</template>
