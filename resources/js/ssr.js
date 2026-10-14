import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = 'CotizaFlow';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob(
                    [
                        './Pages/Welcome.vue',
                        './Pages/Pricing.vue',
                        './Pages/Servicios.vue',
                        './Pages/Dashboard.vue',
                        './Pages/Quotes/*.vue',
                        './Pages/Clients/*.vue',
                        './Pages/Inventory/Index.vue',
                        './Pages/Services/Index.vue',
                        './Pages/Settings/Index.vue',
                        './Pages/Trial/*.vue',
                        './Pages/Profile/**/*.vue',
                        './Pages/Auth/*.vue',
                        './Pages/Admin/Dashboard.vue',
                    ],
                    { eager: true },
                ),
            ),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...(props.initialPage.props.ziggy ?? {}),
                    location: new URL(props.initialPage.url),
                });
        },
    }),
);
