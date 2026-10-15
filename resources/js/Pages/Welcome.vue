<script setup>
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import SeoHead from '@/Components/SeoHead.vue';
import PublicNav from '@/Components/PublicNav.vue';
import PublicFooter from '@/Components/PublicFooter.vue';
defineProps({ seo: Object });
const statuses = ['Enviada', 'Vista', 'Aceptada'];
const statusStyles = {
    Enviada: 'bg-white/15 text-white',
    Vista: 'bg-amber-300/30 text-amber-100',
    Aceptada: 'bg-emerald-400/30 text-emerald-100',
};
const quotes = ref([
    { id: 1, client: 'Ferretería Los Andes', amount: 480000, status: 0 },
    { id: 2, client: 'Boutique Aurora', amount: 215000, status: 1 },
    { id: 3, client: 'Taller Mecánico Rojas', amount: 890000, status: 0 },
]);
const formatClp = (value) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(value);
const pendingTotal = computed(() =>
    quotes.value
        .filter((quote) => quote.status < 2)
        .reduce((sum, quote) => sum + quote.amount, 0),
);
const closedTotal = computed(() =>
    quotes.value
        .filter((quote) => quote.status === 2)
        .reduce((sum, quote) => sum + quote.amount, 0),
);
const allClosed = computed(() =>
    quotes.value.every((quote) => quote.status === 2),
);
const advanceQuote = (quote) => {
    if (quote.status < 2) {
        quote.status += 1;
    }
};
const resetQuotes = () => {
    quotes.value.forEach((quote, index) => {
        quote.status = index === 1 ? 1 : 0;
    });
};
const parallax = ref({ x: 0, y: 0 });
const onHeroMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    parallax.value = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * -16,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * -10,
    };
};
const onHeroLeave = () => {
    parallax.value = { x: 0, y: 0 };
};
const pillars = [
    'Clientes y contactos',
    'Cotizaciones en un enlace',
    'Seguimiento comercial',
];
const features = [
    {
        title: 'Clientes en un lugar',
        text: 'Mantén tus contactos, su historial y todas sus cotizaciones a mano.',
    },
    {
        title: 'Cotizaciones claras',
        text: 'Organiza productos, servicios, precios y condiciones, y compártelas con un enlace.',
    },
    {
        title: 'Seguimiento comercial',
        text: 'Identifica las cotizaciones pendientes para volver a contactar a tus clientes a tiempo.',
    },
];
</script>
<template>
    <div class="min-h-screen bg-slate-50">
        <SeoHead :seo="seo" fallback-title="CotizaFlow" /><PublicNav />
        <main>
            <section
                class="relative isolate min-h-[680px] overflow-hidden bg-slate-950 sm:min-h-[700px]"
                @mousemove="onHeroMove"
                @mouseleave="onHeroLeave"
            >
                <img
                    src="/images/cotizaflow-hero.jpg"
                    alt=""
                    aria-hidden="true"
                    class="absolute inset-0 h-full w-full scale-110 object-cover object-[44%_44%] transition-transform duration-300 ease-out motion-reduce:transition-none"
                    :style="{
                        transform: `scale(1.06) translate(${parallax.x}px, ${parallax.y}px)`,
                    }"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-slate-950/25 to-slate-950/75"
                    aria-hidden="true"
                ></div>
                <div class="relative mx-auto flex min-h-[680px] max-w-6xl items-center px-5 py-20 sm:min-h-[700px]">
                    <div
                        class="hero-rise absolute bottom-10 left-5 hidden w-[340px] rounded-2xl border border-white/25 bg-slate-950/45 p-5 text-white shadow-2xl backdrop-blur-md lg:block"
                        style="animation-delay: 0.25s"
                    >
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-semibold">
                                Seguimiento de cotizaciones
                            </p>
                            <button
                                v-if="allClosed"
                                type="button"
                                class="text-xs text-orange-300 underline-offset-2 hover:underline"
                                @click="resetQuotes"
                            >
                                Reiniciar
                            </button>
                        </div>
                        <ul class="mt-4 flex flex-col gap-2">
                            <li v-for="quote in quotes" :key="quote.id">
                                <button
                                    type="button"
                                    class="flex w-full items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 disabled:cursor-default disabled:hover:bg-white/10"
                                    :disabled="quote.status === 2"
                                    :aria-label="`${quote.client}, ${statuses[quote.status]}. Avanzar estado`"
                                    @click="advanceQuote(quote)"
                                >
                                    <span class="min-w-0">
                                        <span class="block truncate text-sm font-medium">{{ quote.client }}</span>
                                        <span class="block text-xs text-white/70">{{ formatClp(quote.amount) }}</span>
                                    </span>
                                    <span
                                        class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
                                        :class="statusStyles[statuses[quote.status]]"
                                        >{{ statuses[quote.status] }}<template v-if="quote.status === 2"> ✓</template></span
                                    >
                                </button>
                            </li>
                        </ul>
                        <div class="mt-4 grid grid-cols-2 gap-3 border-t border-white/15 pt-3 text-xs text-white/70">
                            <p>
                                Por cerrar
                                <span class="block text-base font-semibold text-white">{{ formatClp(pendingTotal) }}</span>
                            </p>
                            <p>
                                Cerrado
                                <span class="block text-base font-semibold text-emerald-300">{{ formatClp(closedTotal) }}</span>
                            </p>
                        </div>
                        <p class="mt-3 text-xs text-white/60">
                            Haz clic en una cotización para avanzar su estado.
                        </p>
                    </div>
                    <div class="hero-rise ml-auto max-w-xl text-white">
                        <p class="hero-badge relative mb-5 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-500/40 via-orange-400/25 to-white/10 py-2 pl-3 pr-5 text-sm font-bold tracking-wide text-white shadow-lg shadow-orange-500/30 backdrop-blur-md">
                            <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75 motion-reduce:animate-none"></span>
                                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-300"></span>
                            </span>
                            De la cotización al <span class="text-orange-200">sí</span>
                            <span class="text-orange-200" aria-hidden="true">✨</span>
                        </p>
                        <h1 class="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                            Que tus cotizaciones no se queden
                            <span class="text-orange-300">esperando.</span>
                        </h1>
                        <p class="mt-6 max-w-lg text-lg leading-relaxed text-white/90">
                            Cotiza, comparte una propuesta clara y recuerda a quién contactar. CotizaFlow te ayuda a ordenar cada oportunidad y dar el siguiente paso para cerrar más ventas.
                        </p>
                        <div class="mt-8 flex flex-wrap gap-3">
                            <Link
                                :href="route('trial.create')"
                                class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                                >Solicitar acceso <span aria-hidden="true">→</span></Link
                            >
                            <Link
                                :href="route('servicios')"
                                class="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                                >Ver cómo funciona <span aria-hidden="true">→</span></Link
                            >
                        </div>
                        <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
                            <li v-for="pillar in pillars" :key="pillar" class="flex items-center gap-2">
                                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white" aria-hidden="true">✓</span>
                                {{ pillar }}
                            </li>
                        </ul>
                        <p class="mt-5 text-sm text-white/75">Hecho para microempresas y pymes de Chile.</p>
                    </div>
                </div>
            </section>
            <section
                id="funciones"
                class="mx-auto grid max-w-6xl gap-6 px-5 pb-20 pt-10 md:grid-cols-3"
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
<style scoped>
@keyframes hero-rise {
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.hero-rise {
    animation: hero-rise 0.7s ease-out both;
}
@property --hero-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}
@keyframes hero-border-spin {
    to {
        --hero-angle: 360deg;
    }
}
.hero-badge::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.5px;
    background: conic-gradient(
        from var(--hero-angle),
        #ff7a00,
        #ffe7d1,
        rgba(255, 255, 255, 0.1) 40%,
        #ffab61 70%,
        #ff7a00
    );
    -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
        linear-gradient(#000 0 0) content-box exclude,
        linear-gradient(#000 0 0);
    animation: hero-border-spin 5s linear infinite;
    pointer-events: none;
}
@keyframes hero-shine {
    0%,
    60% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
.hero-badge {
    background-image: linear-gradient(
        110deg,
        transparent 35%,
        rgba(255, 255, 255, 0.28) 50%,
        transparent 65%
    );
    background-size: 200% 100%;
    animation: hero-shine 4s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
    .hero-badge,
    .hero-badge::before {
        animation: none;
    }
    .hero-rise {
        animation: none;
    }
}
</style>
