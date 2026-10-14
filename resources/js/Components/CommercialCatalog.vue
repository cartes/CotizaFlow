<script setup>
import { ref, computed, watch } from 'vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import ViewTabs from './ViewTabs.vue';
const props = defineProps({ records: Object, filters: Object, kind: String });
const params = { tenantBySlug: usePage().props.tenant?.slug };
const isProduct = computed(() => props.kind === 'product');
const prefix = computed(() => (isProduct.value ? 'inventory' : 'services'));
const search = ref(props.filters?.search || '');
const open = ref(false);
const activeSection = ref('catalogo');
watch(activeSection, (value) => {
    if (value === 'editar') open.value = true;
});
const editing = ref(null);
const form = useForm({
    name: '',
    sku: '',
    code: '',
    description: '',
    cost_price: 0,
    selling_price: 0,
    tax_included: false,
    is_active: true,
});
const upload = useForm({ workbook: null });
const start = (record = null) => {
    form.reset();
    form.clearErrors();
    editing.value = record?.id || null;
    if (record) {
        for (const key of Object.keys(form.data())) {
            if (record[key] !== undefined) form[key] = record[key];
        }
    }
    open.value = true;
    activeSection.value = 'editar';
};
const submit = () => {
    const options = {
        onSuccess: () => {
            form.reset();
            open.value = false;
            editing.value = null;
            activeSection.value = 'catalogo';
        },
    };
    if (editing.value) {
        form.put(
            route(`${prefix.value}.update`, {
                ...params,
                [isProduct.value ? 'product' : 'service']: editing.value,
            }),
            options,
        );
    } else {
        form.post(route(`${prefix.value}.store`, params), options);
    }
};
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Number(value));
</script>
<template>
    <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold">
                    {{ isProduct ? 'Productos' : 'Servicios' }}
                </h1>
                <p class="mt-2 text-slate-500">
                    Tu catálogo de precios para preparar cotizaciones.
                </p>
            </div>
            <button
                @click="start()"
                class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
            >
                {{ isProduct ? 'Agregar producto' : 'Agregar servicio' }}
            </button>
        </div>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'catalogo', label: 'Catálogo' },
                { value: 'importar', label: 'Importar Excel' },
                {
                    value: 'editar',
                    label: editing ? 'Editar ítem' : 'Nuevo ítem',
                },
            ]"
        />
        <form
            v-if="open"
            v-show="activeSection === 'editar'"
            @submit.prevent="submit"
            class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
        >
            <label class="flex flex-col gap-2"
                >Nombre<input
                    v-model="form.name"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Código<input
                    v-if="isProduct"
                    v-model="form.sku"
                    required
                    class="rounded-lg border-slate-300" /><input
                    v-else
                    v-model="form.code"
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Costo<input
                    v-model="form.cost_price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Precio de venta<input
                    v-model="form.selling_price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Descripción<textarea
                    v-model="form.description"
                    class="rounded-lg border-slate-300"
                />
            </label>
            <div class="flex flex-col justify-center gap-3">
                <label class="flex items-center gap-2"
                    ><input v-model="form.tax_included" type="checkbox" />Precio
                    incluye impuesto</label
                ><label v-if="!isProduct" class="flex items-center gap-2"
                    ><input v-model="form.is_active" type="checkbox" />Servicio
                    activo</label
                >
            </div>
            <p
                v-for="(error, key) in form.errors"
                :key="key"
                class="text-sm text-red-600"
            >
                {{ error }}
            </p>
            <div class="flex gap-3">
                <button
                    :disabled="form.processing"
                    class="rounded-lg bg-slate-900 px-5 py-3 text-white"
                >
                    Guardar</button
                ><button
                    type="button"
                    @click="
                        open = false;
                        activeSection = 'catalogo';
                    "
                    class="rounded-lg border px-5 py-3"
                >
                    Cancelar
                </button>
            </div>
        </form>
        <div class="my-6 flex flex-wrap gap-5">
            <form
                v-show="activeSection === 'catalogo'"
                @submit.prevent="
                    router.get(route(`${prefix}.index`, params), { search })
                "
                class="flex gap-3"
            >
                <input
                    v-model="search"
                    placeholder="Buscar en el catálogo"
                    aria-label="Buscar en el catálogo"
                    class="rounded-lg border-slate-300"
                /><button class="rounded-lg bg-slate-900 px-4 text-white">
                    Buscar
                </button>
            </form>
            <form
                v-show="activeSection === 'importar'"
                role="tabpanel"
                aria-label="Importar Excel"
                @submit.prevent="
                    upload.post(route(`${prefix}.import`, params), {
                        forceFormData: true,
                        onSuccess: () => upload.reset(),
                    })
                "
                class="flex flex-wrap items-center gap-3"
            >
                <a
                    :href="route(`${prefix}.import.template`, params)"
                    class="text-sm text-orange-600"
                    >Descargar plantilla</a
                ><input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    aria-label="Archivo de catálogo"
                    @change="upload.workbook = $event.target.files[0]"
                    class="max-w-xs text-sm"
                /><button
                    :disabled="!upload.workbook || upload.processing"
                    class="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
                >
                    Importar Excel
                </button>
                <p
                    v-for="(error, key) in upload.errors"
                    :key="key"
                    class="text-red-600"
                >
                    {{ error }}
                </p>
            </form>
        </div>
        <div
            v-if="$page.props.flash?.import_summary?.error_rows"
            class="mb-5 rounded-xl bg-amber-50 p-4 text-sm"
        >
            <p
                v-for="(error, i) in $page.props.flash.import_summary.errors"
                :key="i"
            >
                Fila {{ error.row }}: {{ error.message }}
            </p>
        </div>
        <section
            v-show="activeSection === 'catalogo'"
            role="tabpanel"
            aria-label="Catálogo"
            class="overflow-x-auto rounded-2xl border border-slate-200 bg-white"
        >
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Nombre</th>
                        <th class="p-4">Código</th>
                        <th class="p-4">Precio</th>
                        <th class="p-4">Impuesto</th>
                        <th class="p-4">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="record in records.data"
                        :key="record.id"
                        class="border-t border-slate-100"
                    >
                        <td class="p-4">{{ record.name }}</td>
                        <td class="p-4">
                            {{ record.sku || record.code || '—' }}
                        </td>
                        <td class="p-4">{{ money(record.selling_price) }}</td>
                        <td class="p-4">
                            {{
                                record.tax_included
                                    ? 'Incluido'
                                    : 'Se agrega al cotizar'
                            }}
                        </td>
                        <td class="p-4">
                            <button
                                @click="start(record)"
                                class="text-orange-600"
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!records.data.length" class="p-8 text-slate-500">
                Agrega un ítem o importa tu catálogo desde Excel.
            </p>
        </section>
        <div v-show="activeSection === 'catalogo'" class="mt-5 flex gap-4">
            <Link v-if="records.prev_page_url" :href="records.prev_page_url"
                >← Anterior</Link
            ><Link v-if="records.next_page_url" :href="records.next_page_url"
                >Siguiente →</Link
            >
        </div>
    </div>
</template>
