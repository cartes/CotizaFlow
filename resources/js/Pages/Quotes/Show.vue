<script setup>
import { ref, computed } from 'vue';
import { Head, Link, useForm, usePage, router } from '@inertiajs/vue3';
import TallerLayout from '@/Layouts/TallerLayout.vue';
import ViewTabs from '@/Components/ViewTabs.vue';
const props = defineProps({
    quote: Object,
    products: Array,
    services: Array,
    taxName: String,
    publicUrl: String,
    whatsAppMessage: String,
});
const page = usePage();
const params = { tenantBySlug: page.props.tenant?.slug, quote: props.quote.id };
const can = (permission) =>
    page.props.auth.user.is_super_admin ||
    page.props.auth.user.permissions.includes(permission);
const editable = computed(
    () => !['accepted', 'rejected'].includes(props.quote.status),
);
const labels = {
    draft: 'Borrador',
    pending_customer: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
};
const money = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(Number(value));
const item = useForm({
    product_id: null,
    service_id: null,
    description: '',
    quantity: 1,
    unit_price: null,
    discount_percent: 0,
});
const tax = useForm({
    apply_tax: props.quote.apply_tax,
    tax_rate: props.quote.tax_rate,
});
const send = useForm({ channel: 'manual' });
const source = ref('manual');
const copied = ref(false);
const selectSource = () => {
    item.product_id = null;
    item.service_id = null;
    item.description = '';
    item.unit_price = null;
};
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(props.publicUrl);
        copied.value = true;
    } catch {
        copied.value = false;
    }
};
const addItem = () =>
    item.post(route('quotes.items.store', params), {
        onSuccess: () => {
            item.reset();
            source.value = 'manual';
        },
    });
const whatsapp = computed(() => {
    const phone = (props.quote.client?.phone || '').replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(props.whatsAppMessage)}`;
});
const activeSection = ref('items');
</script>
<template>
    <TallerLayout
        ><Head :title="`Cotización #${quote.id}`" />
        <div class="flex flex-wrap justify-between gap-4">
            <div>
                <Link
                    :href="
                        route('quotes.index', {
                            tenantBySlug: params.tenantBySlug,
                        })
                    "
                    class="text-sm text-slate-500"
                    >← Cotizaciones</Link
                >
                <h1 class="mt-3 text-3xl font-bold">
                    Cotización #{{ quote.id }}
                </h1>
                <p class="mt-2 text-slate-600">
                    {{ quote.client?.name }} · {{ labels[quote.status] }}
                </p>
            </div>
            <div
                v-if="can('quotes.send') && editable"
                class="flex items-center gap-3"
            >
                <button
                    :disabled="send.processing || !quote.items.length"
                    @click="send.post(route('quotes.send', params))"
                    class="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-50"
                >
                    Habilitar enlace</button
                ><button
                    :disabled="!quote.items.length"
                    @click="
                        router.post(route('quotes.approve-manually', params))
                    "
                    class="rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                    Registrar aceptación
                </button>
            </div>
        </div>
        <p
            v-for="(error, key) in send.errors"
            :key="key"
            class="mt-3 text-red-600"
        >
            {{ error }}
        </p>
        <p v-if="$page.props.errors?.quote" class="mt-3 text-red-600">
            {{ $page.props.errors.quote }}
        </p>
        <section
            v-if="quote.status !== 'draft'"
            class="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5"
        >
            <a
                :href="publicUrl"
                target="_blank"
                rel="noopener"
                class="font-semibold text-orange-700"
                >Ver enlace público</a
            ><button @click="copyLink" class="font-semibold text-orange-700">
                {{ copied ? 'Enlace copiado' : 'Copiar enlace' }}</button
            ><a
                :href="whatsapp"
                target="_blank"
                rel="noopener"
                class="font-semibold text-orange-700"
                >Compartir por WhatsApp</a
            ><input
                :value="publicUrl"
                readonly
                aria-label="Enlace público"
                class="min-w-0 flex-1 rounded-lg border-orange-200 text-sm"
            />
        </section>
        <ViewTabs
            v-model="activeSection"
            :items="[
                { value: 'items', label: 'Ítems' },
                { value: 'condiciones', label: 'Condiciones e impuestos' },
                { value: 'historial', label: 'Historial' },
            ]"
        />
        <section
            v-show="activeSection === 'items'"
            role="tabpanel"
            aria-label="Ítems"
            class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"
        >
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="p-4">Descripción</th>
                        <th class="p-4">Cantidad</th>
                        <th class="p-4">Precio</th>
                        <th class="p-4">Descuento</th>
                        <th class="p-4">Total</th>
                        <th class="p-4"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="row in quote.items"
                        :key="row.id"
                        class="border-t border-slate-100"
                    >
                        <td class="p-4">{{ row.description }}</td>
                        <td class="p-4">{{ row.quantity }}</td>
                        <td class="p-4">
                            {{ money(row.original_unit_price) }}
                        </td>
                        <td class="p-4">{{ row.discount_percent }}%</td>
                        <td class="p-4">{{ money(row.total_price) }}</td>
                        <td class="p-4">
                            <button
                                v-if="editable && can('quotes.manage')"
                                @click="
                                    router.delete(
                                        route('quotes.items.destroy', {
                                            ...params,
                                            item: row.id,
                                        }),
                                    )
                                "
                                class="text-red-600"
                            >
                                Quitar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="!quote.items.length" class="p-6 text-slate-500">
                Agrega el primer producto o servicio.
            </p>
        </section>
        <form
            v-if="editable && can('quotes.manage')"
            v-show="activeSection === 'items'"
            @submit.prevent="addItem"
            class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            <label class="flex flex-col gap-2"
                >Origen<select
                    v-model="source"
                    @change="selectSource"
                    class="rounded-lg border-slate-300"
                >
                    <option value="manual">Ítem libre</option>
                    <option value="product">Producto</option>
                    <option value="service">Servicio</option>
                </select></label
            ><label v-if="source === 'product'" class="flex flex-col gap-2"
                >Producto<select
                    v-model="item.product_id"
                    required
                    class="rounded-lg border-slate-300"
                >
                    <option :value="null" disabled>Selecciona</option>
                    <option
                        v-for="product in products"
                        :key="product.id"
                        :value="product.id"
                    >
                        {{ product.name }}
                    </option>
                </select></label
            ><label v-else-if="source === 'service'" class="flex flex-col gap-2"
                >Servicio<select
                    v-model="item.service_id"
                    required
                    class="rounded-lg border-slate-300"
                >
                    <option :value="null" disabled>Selecciona</option>
                    <option
                        v-for="service in services"
                        :key="service.id"
                        :value="service.id"
                    >
                        {{ service.name }}
                    </option>
                </select></label
            ><label v-else class="flex flex-col gap-2"
                >Descripción<input
                    v-model="item.description"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Cantidad<input
                    v-model="item.quantity"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Precio unitario<input
                    v-model="item.unit_price"
                    :required="source === 'manual'"
                    :placeholder="
                        source === 'manual'
                            ? 'Precio'
                            : 'Usar precio del catálogo'
                    "
                    type="number"
                    min="0"
                    step="0.01"
                    class="rounded-lg border-slate-300" /></label
            ><label class="flex flex-col gap-2"
                >Descuento (%)<input
                    v-model="item.discount_percent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    class="rounded-lg border-slate-300"
            /></label>
            <div class="flex items-end">
                <button
                    :disabled="item.processing"
                    class="rounded-xl bg-slate-900 px-5 py-3 text-white"
                >
                    Agregar ítem
                </button>
            </div>
            <p
                v-for="(error, key) in item.errors"
                :key="key"
                class="text-sm text-red-600"
            >
                {{ error }}
            </p>
        </form>
        <div
            v-show="activeSection === 'condiciones'"
            role="tabpanel"
            aria-label="Condiciones e impuestos"
            class="mt-6 grid gap-6 md:grid-cols-2"
        >
            <section class="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 class="text-lg font-semibold">Notas y condiciones</h2>
                <p class="mt-3 whitespace-pre-wrap text-slate-600">
                    {{ quote.notes || 'Sin notas adicionales.' }}
                </p>
            </section>
            <section
                class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6"
            >
                <div class="flex justify-between">
                    <span>Subtotal</span
                    ><span>{{ money(quote.subtotal_amount) }}</span>
                </div>
                <div class="flex justify-between">
                    <span
                        >{{ taxName }} ({{
                            quote.apply_tax ? quote.tax_rate : 0
                        }}%)</span
                    ><span>{{ money(quote.tax_amount) }}</span>
                </div>
                <div
                    class="flex justify-between border-t pt-3 text-xl font-bold"
                >
                    <span>Total</span
                    ><span>{{ money(quote.total_amount) }}</span>
                </div>
                <form
                    v-if="editable && can('quotes.manage')"
                    @submit.prevent="
                        tax.patch(route('quotes.tax.update', params))
                    "
                    class="mt-3 flex flex-wrap items-center gap-3"
                >
                    <label class="flex items-center gap-2"
                        ><input
                            v-model="tax.apply_tax"
                            type="checkbox"
                        />Aplicar impuesto</label
                    ><input
                        v-model="tax.tax_rate"
                        aria-label="Tasa de impuesto"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        class="w-24 rounded-lg border-slate-300"
                    /><button class="text-sm font-semibold text-orange-600">
                        Actualizar
                    </button>
                    <p
                        v-for="(error, key) in tax.errors"
                        :key="key"
                        class="text-sm text-red-600"
                    >
                        {{ error }}
                    </p>
                </form>
            </section>
        </div>
        <section
            v-show="activeSection === 'historial'"
            role="tabpanel"
            aria-label="Historial"
            class="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
        >
            <h2 class="text-xl font-semibold">Historial</h2>
            <ul class="mt-4 flex flex-col gap-3">
                <li
                    v-for="event in quote.events"
                    :key="event.id"
                    class="text-sm text-slate-600"
                >
                    <time>{{
                        new Date(event.created_at).toLocaleString('es-CL')
                    }}</time>
                    · {{ event.description }}
                </li>
            </ul>
        </section></TallerLayout
    >
</template>
