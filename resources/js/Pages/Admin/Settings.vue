<script setup>
import { computed, ref, watch } from 'vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import CompanyLayout from '@/Layouts/CompanyLayout.vue';
import PasswordInput from '@/Components/PasswordInput.vue';

const props = defineProps({
    current_tab: {
        type: String,
        default: 'users',
    },
    users: {
        type: Object,
        default: () => ({ data: [] }),
    },
    ai_settings: {
        type: Object,
        default: () => ({}),
    },
    payment_settings: {
        type: Object,
        default: () => ({}),
    },
    analytics_settings: {
        type: Object,
        default: () => ({}),
    },
    inactivity_settings: {
        type: Object,
        default: () => ({}),
    },
});

const page = usePage();
const currentUser = computed(() => page.props.auth?.user);

const activeTab = ref(props.current_tab || 'users');

const selectTab = (tab) => {
    activeTab.value = tab;
    router.get(
        route('admin.settings'),
        { tab },
        { preserveState: true, replace: true, preserveScroll: true }
    );
};

// ==========================================
// 1. CONFIGURACIÓN DE USUARIO (Users Tab)
// ==========================================
const userSearch = ref('');
const filteredUsers = computed(() => {
    const list = props.users?.data || [];
    if (!userSearch.value.trim()) {
        return list;
    }
    const q = userSearch.value.toLowerCase().trim();
    return list.filter(
        (u) =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.tenant?.name?.toLowerCase().includes(q)
    );
});

const selectedUserForPassword = ref(null);
const showPasswordModal = ref(false);

const changeUserPasswordForm = useForm({
    password: '',
    password_confirmation: '',
});

const openChangePasswordModal = (user) => {
    selectedUserForPassword.value = user;
    changeUserPasswordForm.reset();
    changeUserPasswordForm.clearErrors();
    showPasswordModal.value = true;
};

const closeChangePasswordModal = () => {
    showPasswordModal.value = false;
    selectedUserForPassword.value = null;
    changeUserPasswordForm.reset();
    changeUserPasswordForm.clearErrors();
};

const submitChangeUserPassword = () => {
    if (!selectedUserForPassword.value) return;

    changeUserPasswordForm.put(
        route('admin.users.change-password', selectedUserForPassword.value.id),
        {
            preserveScroll: true,
            onSuccess: () => closeChangePasswordModal(),
        }
    );
};

// ==========================================
// 2. PERFIL DE USUARIO (Profile Tab)
// ==========================================
const profileForm = useForm({
    name: currentUser.value?.name || '',
    email: currentUser.value?.email || '',
});

watch(
    () => currentUser.value,
    (newUser) => {
        if (newUser) {
            profileForm.name = newUser.name;
            profileForm.email = newUser.email;
        }
    }
);

const submitProfile = () => {
    profileForm.put(route('admin.profile.update'), {
        preserveScroll: true,
    });
};

const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const submitSelfPassword = () => {
    passwordForm.put(route('admin.profile.password'), {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset(),
    });
};

// ==========================================
// 3. CONFIGURACIONES INTERNAS (Internal Tab)
// ==========================================
const mpSandboxRaw = props.payment_settings?.mp_sandbox?.value;

const apiForm = useForm({
    ai_provider: props.ai_settings?.ai_provider?.value || 'gemini',
    ai_image_provider: props.ai_settings?.ai_image_provider?.value || 'gemini',
    gemini_api_key: '',
    openai_api_key: '',
    anthropic_api_key: '',
    mp_sandbox:
        mpSandboxRaw === true || mpSandboxRaw === 'true' || mpSandboxRaw === '1',
    mp_access_token: '',
    mp_public_key: '',
    mp_webhook_secret: '',
    vat_rate: props.payment_settings?.vat_rate?.value || '0.19',
    inactivity_days: props.inactivity_settings?.inactivity_days?.value || '10',
    inactivity_spam_days:
        props.inactivity_settings?.inactivity_spam_days?.value || '7',
});

const submitApiSettings = () => {
    apiForm.put(route('admin.profile.api-keys'), {
        preserveScroll: true,
    });
};

const analyticsForm = useForm({
    analytics_google_analytics_code:
        props.analytics_settings?.analytics_google_analytics_code?.value || '',
    analytics_google_search_console_code:
        props.analytics_settings?.analytics_google_search_console_code?.value || '',
});

const submitAnalyticsSettings = () => {
    analyticsForm.put(route('admin.profile.analytics'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <CompanyLayout>
        <Head title="Configuración del Sistema" />

        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-slate-900">Configuración</h1>
                    <p class="text-sm text-slate-500 mt-1">
                        Administración centralizada de usuarios, tu perfil de acceso y credenciales del sistema CotizaFlow.
                    </p>
                </div>

                <div class="inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3.5 py-1.5 text-xs font-semibold text-orange-700">
                    <span class="h-2 w-2 rounded-full bg-orange-500"></span>
                    Super-Administrador
                </div>
            </div>

            <!-- Tab Buttons -->
            <div class="border-b border-slate-200">
                <nav class="-mb-px flex flex-wrap gap-2 sm:gap-6" aria-label="Secciones de configuración">
                    <button
                        type="button"
                        @click="selectTab('users')"
                        :class="[
                            activeTab === 'users'
                                ? 'border-orange-500 text-orange-600 font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 font-medium',
                            'inline-flex items-center gap-2.5 py-3.5 px-2 border-b-2 text-sm transition-colors'
                        ]"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Configuración de usuario</span>
                        <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                            {{ users?.total || users?.data?.length || 0 }}
                        </span>
                    </button>

                    <button
                        type="button"
                        @click="selectTab('profile')"
                        :class="[
                            activeTab === 'profile'
                                ? 'border-orange-500 text-orange-600 font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 font-medium',
                            'inline-flex items-center gap-2.5 py-3.5 px-2 border-b-2 text-sm transition-colors'
                        ]"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Perfil de usuario</span>
                    </button>

                    <button
                        type="button"
                        @click="selectTab('internal')"
                        :class="[
                            activeTab === 'internal'
                                ? 'border-orange-500 text-orange-600 font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 font-medium',
                            'inline-flex items-center gap-2.5 py-3.5 px-2 border-b-2 text-sm transition-colors'
                        ]"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Configuraciones internas</span>
                    </button>
                </nav>
            </div>

            <!-- ========================================== -->
            <!-- TAB 1: CONFIGURACIÓN DE USUARIO -->
            <!-- ========================================== -->
            <div v-show="activeTab === 'users'" class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900">Usuarios del Sistema</h2>
                        <p class="text-xs text-slate-500">
                            Listado completo de cuentas registradas en las empresas de CotizaFlow y administradores.
                        </p>
                    </div>

                    <div class="relative w-full sm:w-72">
                        <input
                            v-model="userSearch"
                            type="text"
                            placeholder="Buscar por nombre, email o empresa..."
                            class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-sm"
                        />
                        <svg class="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th class="py-3.5 px-4">Usuario</th>
                                    <th class="py-3.5 px-4">Empresa</th>
                                    <th class="py-3.5 px-4">Rol / Tipo</th>
                                    <th class="py-3.5 px-4">Estado</th>
                                    <th class="py-3.5 px-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-slate-700">
                                <tr
                                    v-for="u in filteredUsers"
                                    :key="u.id"
                                    class="hover:bg-slate-50/60 transition-colors"
                                >
                                    <td class="py-3.5 px-4">
                                        <div class="flex items-center gap-3">
                                            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 text-xs shrink-0 ring-1 ring-slate-200">
                                                {{ u.name?.charAt(0).toUpperCase() || 'U' }}
                                            </div>
                                            <div>
                                                <div class="font-semibold text-slate-900">{{ u.name }}</div>
                                                <div class="text-xs text-slate-500">{{ u.email }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <span v-if="u.tenant" class="inline-flex items-center gap-1.5 font-medium text-slate-800">
                                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            {{ u.tenant.name }}
                                        </span>
                                        <span v-else class="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-medium">
                                            Sin empresa (Global)
                                        </span>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <span
                                            v-if="u.is_super_admin"
                                            class="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20"
                                        >
                                            Super-Admin
                                        </span>
                                        <span
                                            v-else
                                            class="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                                        >
                                            Usuario Empresa
                                        </span>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <span
                                            v-if="u.email_verified_at"
                                            class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700"
                                        >
                                            <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                            Verificado
                                        </span>
                                        <span v-else class="text-xs text-amber-600">Pendiente</span>
                                    </td>
                                    <td class="py-3.5 px-4 text-right">
                                        <button
                                            type="button"
                                            @click="openChangePasswordModal(u)"
                                            class="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
                                        >
                                            Cambiar clave
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="filteredUsers.length === 0">
                                    <td colspan="5" class="py-8 text-center text-sm text-slate-400">
                                        No se encontraron usuarios que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal para cambiar contraseña de usuario -->
                <div
                    v-if="showPasswordModal && selectedUserForPassword"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                >
                    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 class="text-base font-bold text-slate-900">Cambiar Contraseña</h3>
                                <p class="text-xs text-slate-500 mt-0.5">
                                    Usuario: <strong class="text-slate-800">{{ selectedUserForPassword.name }}</strong> ({{ selectedUserForPassword.email }})
                                </p>
                            </div>
                            <button
                                type="button"
                                @click="closeChangePasswordModal"
                                class="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            >
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form @submit.prevent="submitChangeUserPassword" class="mt-4 space-y-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Nueva Contraseña</label>
                                <PasswordInput
                                    v-model="changeUserPasswordForm.password"
                                    placeholder="Mínimo 8 caracteres"
                                    required
                                />
                                <p v-if="changeUserPasswordForm.errors.password" class="text-xs text-rose-600 mt-1">
                                    {{ changeUserPasswordForm.errors.password }}
                                </p>
                            </div>

                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Confirmar Contraseña</label>
                                <PasswordInput
                                    v-model="changeUserPasswordForm.password_confirmation"
                                    placeholder="Repite la contraseña"
                                    required
                                />
                            </div>

                            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    @click="closeChangePasswordModal"
                                    class="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    :disabled="changeUserPasswordForm.processing"
                                    class="rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50 transition-colors"
                                >
                                    {{ changeUserPasswordForm.processing ? 'Guardando...' : 'Actualizar Clave' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- TAB 2: PERFIL DE USUARIO -->
            <!-- ========================================== -->
            <div v-show="activeTab === 'profile'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Tarjeta: Datos Personales -->
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-slate-900">Información Personal</h2>
                            <p class="text-xs text-slate-500">Actualiza tus datos de contacto como Super-Admin.</p>
                        </div>
                    </div>

                    <form @submit.prevent="submitProfile" class="mt-5 space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
                            <input
                                v-model="profileForm.name"
                                type="text"
                                required
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <p v-if="profileForm.errors.name" class="text-xs text-rose-600 mt-1">
                                {{ profileForm.errors.name }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                            <input
                                v-model="profileForm.email"
                                type="email"
                                required
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <p v-if="profileForm.errors.email" class="text-xs text-rose-600 mt-1">
                                {{ profileForm.errors.email }}
                            </p>
                        </div>

                        <div class="pt-2">
                            <button
                                type="submit"
                                :disabled="profileForm.processing"
                                class="rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50 transition-colors"
                            >
                                {{ profileForm.processing ? 'Guardando cambios...' : 'Guardar Datos Personales' }}
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Tarjeta: Cambio de Contraseña -->
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-slate-900">Seguridad & Contraseña</h2>
                            <p class="text-xs text-slate-500">Mantén protegida tu cuenta con una clave segura.</p>
                        </div>
                    </div>

                    <form @submit.prevent="submitSelfPassword" class="mt-5 space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Contraseña Actual</label>
                            <PasswordInput
                                v-model="passwordForm.current_password"
                                required
                            />
                            <p v-if="passwordForm.errors.current_password" class="text-xs text-rose-600 mt-1">
                                {{ passwordForm.errors.current_password }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Nueva Contraseña</label>
                            <PasswordInput
                                v-model="passwordForm.password"
                                required
                            />
                            <p v-if="passwordForm.errors.password" class="text-xs text-rose-600 mt-1">
                                {{ passwordForm.errors.password }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
                            <PasswordInput
                                v-model="passwordForm.password_confirmation"
                                required
                            />
                        </div>

                        <div class="pt-2">
                            <button
                                type="submit"
                                :disabled="passwordForm.processing"
                                class="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                {{ passwordForm.processing ? 'Actualizando...' : 'Actualizar Contraseña' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- TAB 3: CONFIGURACIONES INTERNAS -->
            <!-- ========================================== -->
            <div v-show="activeTab === 'internal'" class="space-y-6">
                <!-- Tarjeta 1: Inteligencia Artificial & Modelos -->
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-slate-900">Inteligencia Artificial (Laravel AI SDK)</h2>
                            <p class="text-xs text-slate-500">Configura los proveedores de IA que utiliza la plataforma.</p>
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Proveedor Principal de Texto</label>
                            <select
                                v-model="apiForm.ai_provider"
                                class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                                <option value="gemini">Google Gemini</option>
                                <option value="openai">OpenAI (ChatGPT)</option>
                                <option value="anthropic">Anthropic (Claude)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Proveedor para imágenes</label>
                            <select
                                v-model="apiForm.ai_image_provider"
                                class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                                <option value="gemini">Google Gemini Vision</option>
                                <option value="openai">OpenAI GPT-4o Vision</option>
                                <option value="anthropic">Anthropic Claude Vision</option>
                            </select>
                        </div>

                        <div class="md:col-span-2 space-y-3 pt-2">
                            <div>
                                <label class="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                                    <span>Google Gemini API Key</span>
                                    <span v-if="ai_settings?.gemini_api_key?.has_value" class="text-emerald-600 font-normal">Configurada ({{ ai_settings?.gemini_api_key?.value }})</span>
                                    <span v-else class="text-slate-400 font-normal">Sin configurar</span>
                                </label>
                                <input
                                    v-model="apiForm.gemini_api_key"
                                    type="password"
                                    placeholder="Ingresa nueva clave para actualizar..."
                                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                            </div>

                            <div>
                                <label class="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                                    <span>OpenAI API Key</span>
                                    <span v-if="ai_settings?.openai_api_key?.has_value" class="text-emerald-600 font-normal">Configurada ({{ ai_settings?.openai_api_key?.value }})</span>
                                    <span v-else class="text-slate-400 font-normal">Sin configurar</span>
                                </label>
                                <input
                                    v-model="apiForm.openai_api_key"
                                    type="password"
                                    placeholder="sk-..."
                                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                            </div>

                            <div>
                                <label class="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                                    <span>Anthropic API Key</span>
                                    <span v-if="ai_settings?.anthropic_api_key?.has_value" class="text-emerald-600 font-normal">Configurada ({{ ai_settings?.anthropic_api_key?.value }})</span>
                                    <span v-else class="text-slate-400 font-normal">Sin configurar</span>
                                </label>
                                <input
                                    v-model="apiForm.anthropic_api_key"
                                    type="password"
                                    placeholder="sk-ant-..."
                                    class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tarjeta 3: Pasarela de Pagos & Facturación -->
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-slate-900">Pagos & Facturación (Mercado Pago)</h2>
                            <p class="text-xs text-slate-500">Credenciales de cobro y parámetros fiscales de la plataforma.</p>
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Mercado Pago Public Key</label>
                            <input
                                v-model="apiForm.mp_public_key"
                                type="password"
                                placeholder="APP_USR-..."
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Mercado Pago Access Token</label>
                            <input
                                v-model="apiForm.mp_access_token"
                                type="password"
                                placeholder="APP_USR-..."
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Webhook Secret</label>
                            <input
                                v-model="apiForm.mp_webhook_secret"
                                type="password"
                                placeholder="Firma de webhook..."
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Tasa de IVA (Chile: 0.19 = 19%)</label>
                            <input
                                v-model="apiForm.vat_rate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="1"
                                class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div class="md:col-span-2 pt-1">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input
                                    v-model="apiForm.mp_sandbox"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span class="text-sm font-semibold text-slate-800">Habilitar Modo Sandbox (Pruebas de pago)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Botón guardar API Keys y Pagos -->
                <div class="flex justify-end">
                    <button
                        type="button"
                        @click="submitApiSettings"
                        :disabled="apiForm.processing"
                        class="rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50 transition-colors"
                    >
                        {{ apiForm.processing ? 'Guardando cambios...' : 'Guardar Credenciales del Sistema' }}
                    </button>
                </div>

                <!-- Tarjeta 4: Seguimiento & Analítica -->
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-slate-900">Seguimiento Web (Google Analytics & Search Console)</h2>
                            <p class="text-xs text-slate-500">Inyecta scripts de analítica y verificación para las páginas públicas de CotizaFlow.</p>
                        </div>
                    </div>

                    <form @submit.prevent="submitAnalyticsSettings" class="mt-5 space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Código Google Analytics (Script gtag)</label>
                            <textarea
                                v-model="analyticsForm.analytics_google_analytics_code"
                                rows="3"
                                placeholder="<!-- Google tag (gtag.js) --> ..."
                                class="w-full font-mono text-xs rounded-xl border border-slate-200 p-3 text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            ></textarea>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Google Search Console (Meta tag o verificación)</label>
                            <textarea
                                v-model="analyticsForm.analytics_google_search_console_code"
                                rows="2"
                                placeholder='<meta name="google-site-verification" content="..." />'
                                class="w-full font-mono text-xs rounded-xl border border-slate-200 p-3 text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            ></textarea>
                        </div>

                        <div class="flex justify-end pt-2">
                            <button
                                type="submit"
                                :disabled="analyticsForm.processing"
                                class="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                {{ analyticsForm.processing ? 'Guardando...' : 'Guardar Analítica Web' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </CompanyLayout>
</template>
