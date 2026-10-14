<script setup>
import { computed, watch, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import PasswordChangeModal from '@/Components/PasswordChangeModal.vue';
import Toast from '@/Components/Toast.vue';
const page = usePage();
const user = computed(() => page.props.auth?.user);
const tenant = computed(() => page.props.tenant);
const permissions = computed(() => user.value?.permissions ?? []);
const can = (permission) =>
    user.value?.is_super_admin || permissions.value.includes(permission);
const params = computed(() =>
    tenant.value ? { tenantBySlug: tenant.value.slug } : {},
);
const items = computed(() =>
    tenant.value
        ? [
              { label: 'Inicio', name: 'taller.dashboard', show: true },
              {
                  label: 'Cotizaciones',
                  name: 'quotes.index',
                  show: can('quotes.view'),
              },
              {
                  label: 'Seguimiento',
                  name: 'quotes.follow-up',
                  show: can('quotes.view'),
              },
              {
                  label: 'Clientes',
                  name: 'clients.index',
                  show: can('customers.manage'),
              },
              {
                  label: 'Productos',
                  name: 'inventory.index',
                  show: can('inventory.manage'),
              },
              {
                  label: 'Servicios',
                  name: 'services.index',
                  show: can('inventory.manage'),
              },
              {
                  label: 'Configuración',
                  name: 'taller.settings',
                  show: can('users.manage'),
              },
          ].filter((item) => item.show)
        : [],
);
const toast = ref({ message: '', type: 'success' });
watch(
    () => page.props.flash,
    (flash) => {
        for (const type of ['error', 'warning', 'success', 'info', 'status']) {
            if (flash?.[type]) {
                toast.value = {
                    message: flash[type],
                    type: type === 'status' ? 'info' : type,
                };
                break;
            }
        }
    },
    { immediate: true },
);
</script>
<template>
    <div class="cf-workspace">
        <div class="cf-shell">
            <header class="cf-topbar">
                <Link
                    :href="
                        tenant
                            ? route('taller.dashboard', params)
                            : route('home')
                    "
                    class="cf-brand"
                    ><ApplicationLogo class="h-9 w-9" /><span
                        >CotizaFlow</span
                    ></Link
                >
                <nav aria-label="Navegación principal" class="cf-main-tabs">
                    <Link
                        v-for="item in items"
                        :key="item.name"
                        :href="route(item.name, params)"
                        :aria-current="
                            route().current(item.name) ? 'page' : undefined
                        "
                        :class="{
                            'is-active':
                                route().current(item.name) ||
                                (item.name === 'quotes.index' &&
                                    route().current('quotes.*') &&
                                    !route().current('quotes.follow-up')),
                        }"
                        >{{ item.label }}</Link
                    >
                    <Link
                        v-if="user?.is_super_admin"
                        :href="route('admin.dashboard')"
                        :class="{
                            'is-active': route().current('admin.dashboard'),
                        }"
                        >Administración</Link
                    >
                </nav>
                <div class="cf-user-actions">
                    <Link
                        :href="route('profile.edit')"
                        class="cf-profile"
                        title="Mi perfil"
                        aria-label="Mi perfil"
                        ><span>{{ user?.name?.charAt(0) || 'U' }}</span></Link
                    >
                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="cf-sign-out"
                        title="Cerrar sesión"
                        aria-label="Cerrar sesión"
                        ><svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14 8l4 4-4 4m4-4H7m3-7H5v14h5"
                            /></svg
                    ></Link>
                </div>
            </header>
            <main class="cf-content">
                <p class="cf-company-label">
                    {{ tenant?.name || 'Administración' }}
                </p>
                <slot />
            </main>
        </div>
        <PasswordChangeModal v-if="user?.needs_password_change" />
        <Toast
            :message="toast.message"
            :type="toast.type"
            @dismiss="toast.message = ''"
        />
    </div>
</template>
