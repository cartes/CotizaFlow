<script setup>
import { Link } from '@inertiajs/vue3';
import SeoHead from '@/Components/SeoHead.vue';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
defineProps({ seo: Object });
const features = [
    {
        title: 'Cotizaciones claras',
        text: 'Organiza productos, servicios, precios y condiciones en una cotización.',
    },
    {
        title: 'Clientes en un lugar',
        text: 'Mantén tus contactos y revisa las cotizaciones de cada cliente.',
    },
    {
        title: 'Seguimiento comercial',
        text: 'Identifica las cotizaciones pendientes para volver a contactar a tus clientes.',
    },
];
</script>
<template>
    <div class="min-h-screen bg-slate-50">
        <SeoHead :seo="seo" fallback-title="CotizaFlow" /><PublicNav />
        <main>
            <section
                class="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center"
            >
                <div class="flex flex-col items-start gap-6">
                    <span
                        class="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800"
                        >Para microempresas y pymes</span
                    >
                    <h1
                        class="text-5xl font-bold leading-tight tracking-tight text-slate-900"
                    >
                        Cotiza rápido.<br />Haz seguimiento.<br /><span
                            class="text-orange-500"
                            >Vende más.</span
                        >
                    </h1>
                    <p class="max-w-lg text-xl leading-relaxed text-slate-600">
                        Cotizaciones y seguimiento comercial simple para tu
                        empresa.
                    </p>
                    <p class="text-slate-600">
                        Todo lo que necesitas para cotizar y vender. Sin pagar
                        de más.
                    </p>
                    <Link
                        :href="route('trial.create')"
                        class="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
                        >Solicitar acceso</Link
                    >
                </div>
                <div
                    class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                    <div
                        class="flex justify-between border-b border-slate-100 pb-5"
                    >
                        <span class="font-bold text-slate-900"
                            >Tu proceso comercial</span
                        ><span class="text-sm text-orange-600">CotizaFlow</span>
                    </div>
                    <ol class="mt-6 flex flex-col gap-6">
                        <li
                            v-for="(step, i) in [
                                'Organiza tus clientes y catálogo',
                                'Prepara una cotización',
                                'Comparte el enlace con el cliente',
                                'Revisa su respuesta y haz seguimiento',
                            ]"
                            :key="step"
                            class="flex items-center gap-4"
                        >
                            <span
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 font-semibold text-orange-600"
                                >{{ i + 1 }}</span
                            ><span class="text-slate-700">{{ step }}</span>
                        </li>
                    </ol>
                </div>
            </section>
            <section
                id="funciones"
                class="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-3"
            >
                <article
                    v-for="feature in features"
                    :key="feature.title"
                    class="rounded-2xl border border-slate-200 bg-white p-7"
                >
                    <h2 class="mb-3 text-xl font-semibold text-slate-900">
                        {{ feature.title }}
                    </h2>
                    <p class="leading-relaxed text-slate-600">
                        {{ feature.text }}
                    </p>
                </article>
            </section>
        </main>
        <PublicFooter />
    </div>
</template>
