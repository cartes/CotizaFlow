<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useIdentification } from '@/composables/useIdentification';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    hideLabel: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: null,
    },
    showStatusIcon: {
        type: Boolean,
        default: true,
    },
    showHelpText: {
        type: Boolean,
        default: true,
    },
    inputClass: {
        type: String,
        default: '',
    },
    compact: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'validate']);

const page = usePage();
const {
    cleanIdentification,
    formatIdentification,
    validateIdentification,
    getCountryConfig,
} = useIdentification();

const activeCountry = computed(() => {
    if (props.country) return props.country.toUpperCase().trim();
    return page.props.tenantContext?.country || 'CL';
});

const countryConfig = computed(() => getCountryConfig(activeCountry.value));

const fieldLabel = computed(() => props.hideLabel ? null : (props.label || countryConfig.value.docName));
const fieldPlaceholder = computed(() => props.placeholder || countryConfig.value.placeholder);

const cleanValue = computed(() => cleanIdentification(props.modelValue));

const isValid = computed(() => {
    if (!cleanValue.value) return null;
    return validateIdentification(cleanValue.value, activeCountry.value);
});

const hasValue = computed(() => cleanValue.value.length > 0);

const handleInput = (event) => {
    const raw = event.target.value;
    const formatted = formatIdentification(raw, activeCountry.value);
    emit('update:modelValue', formatted);
    emit('validate', {
        value: formatted,
        clean: cleanIdentification(formatted),
        isValid: validateIdentification(formatted, activeCountry.value),
    });
};

const handleBlur = (event) => {
    const formatted = formatIdentification(event.target.value, activeCountry.value);
    emit('update:modelValue', formatted);
    emit('blur', event);
};
</script>

<template>
    <div class="space-y-1.5 w-full">
        <div v-if="fieldLabel" class="flex items-center justify-between">
            <label :class="compact ? 'block text-sm font-medium text-gray-700' : 'block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1'">
                {{ fieldLabel }}
                <span v-if="required" class="text-rose-500">*</span>
            </label>
            <span v-if="countryConfig && !compact" class="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {{ countryConfig.flag }} {{ countryConfig.name }}
            </span>
        </div>

        <div class="relative">
            <input
                :value="modelValue"
                type="text"
                :placeholder="fieldPlaceholder"
                :disabled="disabled"
                :required="required"
                @input="handleInput"
                @blur="handleBlur"
                autocomplete="off"
                spellcheck="false"
                :class="[
                    compact
                        ? 'w-full rounded-lg border-slate-300 text-gray-900 uppercase focus:border-orange-500 focus:ring-orange-500'
                        : 'w-full bg-white border text-gray-900 text-lg font-bold rounded-2xl px-5 py-4 placeholder-gray-300 uppercase transition-all shadow-sm focus:outline-none',
                    errorMessage
                        ? 'border-rose-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent bg-rose-50/20'
                        : isValid === true
                            ? 'border-emerald-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent'
                            : 'border-gray-300 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent',
                    disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '',
                    inputClass,
                ]"
            />

            <!-- Indicador visual de estado del Dígito Verificador -->
            <div
                v-if="showStatusIcon && hasValue"
                class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
            >
                <span
                    v-if="isValid === true"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-black shadow-sm animate-in zoom-in duration-200"
                    title="Dígito verificador válido"
                >
                    ✓
                </span>
                <span
                    v-else-if="isValid === false && cleanValue.length >= 7"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs font-black shadow-sm animate-in zoom-in duration-200"
                    title="Dígito verificador o formato no válido"
                >
                    !
                </span>
            </div>
        </div>

        <!-- Mensajes de error / ayuda -->
        <p v-if="errorMessage" :class="compact ? 'text-xs text-red-600' : 'text-rose-500 text-[10px] font-medium ml-1'">
            {{ errorMessage }}
        </p>
        <p
            v-else-if="showHelpText && hasValue && isValid === false && cleanValue.length >= 7"
            class="text-amber-600 text-[9px] font-semibold ml-1 flex items-center gap-1"
        >
            <span>Revise el dígito verificador</span>
            <span class="text-slate-400 font-normal">({{ fieldPlaceholder }})</span>
        </p>
    </div>
</template>
