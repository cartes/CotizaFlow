import { Fragment, computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, h, mergeProps, nextTick, onMounted, onUnmounted, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useId, useModel, useSSRContext, vModelCheckbox, vModelDynamic, vModelSelect, vModelText, vShow, watch, withCtx, withDirectives, withKeys, withModifiers } from "vue";
import { ssrGetDynamicModelProps, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderDynamicModel, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Head, Link, createInertiaApp, router, useForm, usePage } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region resources/js/Components/ApplicationLogo.vue
var _sfc_main$47 = {
	__name: "ApplicationLogo",
	__ssrInlineRender: true,
	props: { alt: {
		type: String,
		default: "CotizaFlow"
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				viewBox: "0 0 48 48",
				role: "img",
				"aria-label": __props.alt,
				xmlns: "http://www.w3.org/2000/svg"
			}, _attrs))}><rect width="48" height="48" rx="14" fill="#ff7a00"></rect><path d="M14 12h14l7 7v17H14z" fill="white"></path><path d="M20 23h10M20 29h7" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"></path></svg>`);
		};
	}
};
var _sfc_setup$47 = _sfc_main$47.setup;
_sfc_main$47.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
	return _sfc_setup$47 ? _sfc_setup$47(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/PasswordInput.vue
var _sfc_main$46 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "PasswordInput",
	__ssrInlineRender: true,
	props: {
		"modelValue": {
			type: String,
			required: true
		},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose }) {
		const model = useModel(__props, "modelValue");
		const input = ref(null);
		const showPassword = ref(false);
		onMounted(() => {
			if (input.value && input.value.hasAttribute("autofocus")) input.value.focus();
		});
		__expose({ focus: () => input.value?.focus() });
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full" }, _attrs))}><input${ssrRenderAttrs((_temp0 = mergeProps({
				type: showPassword.value ? "text" : "password",
				class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10 w-full text-slate-900",
				ref_key: "input",
				ref: input
			}, _ctx.$attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}><button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none">`);
			if (showPassword.value) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>`);
			else _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>`);
			_push(`</button></div>`);
		};
	}
});
var _sfc_setup$46 = _sfc_main$46.setup;
_sfc_main$46.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PasswordInput.vue");
	return _sfc_setup$46 ? _sfc_setup$46(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/InputLabel.vue
var _sfc_main$45 = {
	__name: "InputLabel",
	__ssrInlineRender: true,
	props: { value: { type: String } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<label${ssrRenderAttrs(mergeProps({ class: "block text-sm font-medium text-gray-700" }, _attrs))}>`);
			if (__props.value) _push(`<span>${ssrInterpolate(__props.value)}</span>`);
			else {
				_push(`<span>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</span>`);
			}
			_push(`</label>`);
		};
	}
};
var _sfc_setup$45 = _sfc_main$45.setup;
_sfc_main$45.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
	return _sfc_setup$45 ? _sfc_setup$45(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/InputError.vue
var _sfc_main$44 = {
	__name: "InputError",
	__ssrInlineRender: true,
	props: { message: { type: String } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps(_attrs, { style: __props.message ? null : { display: "none" } }))}><p class="text-sm text-red-600">${ssrInterpolate(__props.message)}</p></div>`);
		};
	}
};
var _sfc_setup$44 = _sfc_main$44.setup;
_sfc_main$44.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
	return _sfc_setup$44 ? _sfc_setup$44(props, ctx) : void 0;
};
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region resources/js/Components/PasswordChangeModal.vue
var _sfc_main$43 = {
	__name: "PasswordChangeModal",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({
			password: "",
			password_confirmation: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-slate-900/80 backdrop-blur-lg flex items-center justify-center z-[9999] p-4 animate-fade-in" }, _attrs))} data-v-60d6b883><div class="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 max-w-md w-full border border-slate-100/50 flex flex-col relative transform transition-all scale-100" data-v-60d6b883><div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-50 mb-6 border border-orange-100" data-v-60d6b883><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#FF7A00]" data-v-60d6b883><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" data-v-60d6b883></path></svg></div><h2 class="text-2xl font-bold text-center text-slate-800 mb-2" data-v-60d6b883>Actualiza tu contraseña</h2><p class="text-sm text-slate-500 text-center mb-6 leading-relaxed" data-v-60d6b883> Por motivos de seguridad, debes actualizar la contraseña temporal asignada a tu cuenta antes de continuar navegando. </p><form class="space-y-5" data-v-60d6b883><div data-v-60d6b883>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "force_password",
				value: "Nueva contraseña",
				class: "font-semibold text-slate-700 mb-1"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$46, {
				id: "force_password",
				modelValue: unref(form).password,
				"onUpdate:modelValue": ($event) => unref(form).password = $event,
				placeholder: "Mínimo 8 caracteres",
				class: "mt-1 block w-full rounded-xl border-slate-200 focus:border-[#FF7A00] focus:ring-[#FF7A00]",
				required: "",
				autocomplete: "new-password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				message: unref(form).errors.password,
				class: "mt-1 text-xs"
			}, null, _parent));
			_push(`</div><div data-v-60d6b883>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "force_password_confirmation",
				value: "Confirmar nueva contraseña",
				class: "font-semibold text-slate-700 mb-1"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$46, {
				id: "force_password_confirmation",
				modelValue: unref(form).password_confirmation,
				"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
				placeholder: "Repite la contraseña",
				class: "mt-1 block w-full rounded-xl border-slate-200 focus:border-[#FF7A00] focus:ring-[#FF7A00]",
				required: "",
				autocomplete: "new-password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				message: unref(form).errors.password_confirmation,
				class: "mt-1 text-xs"
			}, null, _parent));
			_push(`</div><div class="pt-2 flex flex-col gap-3" data-v-60d6b883><button type="submit" class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": unref(form).processing }, "w-full bg-[#FF7A00] hover:bg-[#e06c00] text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 flex items-center justify-center gap-2"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-60d6b883>`);
			if (unref(form).processing) _push(`<span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" data-v-60d6b883></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-60d6b883>Actualizar Contraseña</span></button>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("logout"),
				method: "post",
				as: "button",
				class: "w-full text-center text-sm font-semibold text-slate-400 hover:text-slate-600 transition py-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Cerrar sesión `);
					else return [createTextVNode(" Cerrar sesión ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></form></div></div>`);
		};
	}
};
var _sfc_setup$43 = _sfc_main$43.setup;
_sfc_main$43.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PasswordChangeModal.vue");
	return _sfc_setup$43 ? _sfc_setup$43(props, ctx) : void 0;
};
var PasswordChangeModal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$43, [["__scopeId", "data-v-60d6b883"]]);
//#endregion
//#region resources/js/Components/Toast.vue
var _sfc_main$42 = {
	__name: "Toast",
	__ssrInlineRender: true,
	props: {
		message: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "success"
		},
		duration: {
			type: Number,
			default: 4e3
		},
		actionLabel: {
			type: String,
			default: ""
		}
	},
	emits: ["dismiss", "action"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const visible = ref(false);
		let timer = null;
		watch(() => props.message, (msg) => {
			if (!msg) return;
			visible.value = true;
			clearTimeout(timer);
			timer = setTimeout(() => dismiss(), props.duration);
		});
		function dismiss() {
			visible.value = false;
			clearTimeout(timer);
			emit("dismiss");
		}
		const STYLES = {
			success: "bg-emerald-600 text-white",
			error: "bg-rose-600 text-white",
			warning: "bg-amber-500 text-white",
			info: "bg-blue-600 text-white"
		};
		const ICONS = {
			success: "M5 13l4 4L19 7",
			error: "M6 18L18 6M6 6l12 12",
			warning: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
			info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		};
		return (_ctx, _push, _parent, _attrs) => {
			if (visible.value && __props.message) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: ["fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg text-sm font-medium max-w-sm w-full", STYLES[__props.type] ?? STYLES.info],
					role: "alert"
				}, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", ICONS[__props.type] ?? ICONS.info)}></path></svg><span class="flex-1">${ssrInterpolate(__props.message)}</span>`);
				if (__props.actionLabel) _push(`<button class="shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide bg-white/20 hover:bg-white/30 transition-colors">${ssrInterpolate(__props.actionLabel)}</button>`);
				else _push(`<!---->`);
				_push(`<button class="ml-1 rounded-full p-0.5 hover:bg-white/20 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$42 = _sfc_main$42.setup;
_sfc_main$42.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toast.vue");
	return _sfc_setup$42 ? _sfc_setup$42(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/TallerLayout.vue
var _sfc_main$41 = {
	__name: "TallerLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const user = computed(() => page.props.auth?.user);
		const tenant = computed(() => page.props.tenant);
		const permissions = computed(() => user.value?.permissions ?? []);
		const can = (permission) => user.value?.is_super_admin || permissions.value.includes(permission);
		const params = computed(() => tenant.value ? { tenantBySlug: tenant.value.slug } : {});
		const items = computed(() => tenant.value ? [
			{
				label: "Inicio",
				name: "taller.dashboard",
				show: true
			},
			{
				label: "Cotizaciones",
				name: "quotes.index",
				show: can("quotes.view")
			},
			{
				label: "Seguimiento",
				name: "quotes.follow-up",
				show: can("quotes.view")
			},
			{
				label: "Clientes",
				name: "clients.index",
				show: can("customers.manage")
			},
			{
				label: "Productos",
				name: "inventory.index",
				show: can("inventory.manage")
			},
			{
				label: "Servicios",
				name: "services.index",
				show: can("inventory.manage")
			},
			{
				label: "Configuración",
				name: "taller.settings",
				show: can("users.manage")
			}
		].filter((item) => item.show) : []);
		const toast = ref({
			message: "",
			type: "success"
		});
		watch(() => page.props.flash, (flash) => {
			for (const type of [
				"error",
				"warning",
				"success",
				"info",
				"status"
			]) if (flash?.[type]) {
				toast.value = {
					message: flash[type],
					type: type === "status" ? "info" : type
				};
				break;
			}
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "cf-workspace" }, _attrs))}><div class="cf-shell"><header class="cf-topbar">`);
			_push(ssrRenderComponent(unref(Link), {
				href: tenant.value ? _ctx.route("taller.dashboard", params.value) : _ctx.route("home"),
				class: "cf-brand"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$47, { class: "h-9 w-9" }, null, _parent, _scopeId));
						_push(`<span${_scopeId}>CotizaFlow</span>`);
					} else return [createVNode(_sfc_main$47, { class: "h-9 w-9" }), createVNode("span", null, "CotizaFlow")];
				}),
				_: 1
			}, _parent));
			_push(`<nav aria-label="Navegación principal" class="cf-main-tabs"><!--[-->`);
			ssrRenderList(items.value, (item) => {
				_push(ssrRenderComponent(unref(Link), {
					key: item.name,
					href: _ctx.route(item.name, params.value),
					"aria-current": _ctx.route().current(item.name) ? "page" : void 0,
					class: { "is-active": _ctx.route().current(item.name) || item.name === "quotes.index" && _ctx.route().current("quotes.*") && !_ctx.route().current("quotes.follow-up") }
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]-->`);
			if (user.value?.is_super_admin) _push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("admin.dashboard"),
				class: { "is-active": _ctx.route().current("admin.dashboard") }
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Administración`);
					else return [createTextVNode("Administración")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</nav><div class="cf-user-actions">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("profile.edit"),
				class: "cf-profile",
				title: "Mi perfil",
				"aria-label": "Mi perfil"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>${ssrInterpolate(user.value?.name?.charAt(0) || "U")}</span>`);
					else return [createVNode("span", null, toDisplayString(user.value?.name?.charAt(0) || "U"), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("logout"),
				method: "post",
				as: "button",
				class: "cf-sign-out",
				title: "Cerrar sesión",
				"aria-label": "Cerrar sesión"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14 8l4 4-4 4m4-4H7m3-7H5v14h5"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "1.5",
						"aria-hidden": "true"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M14 8l4 4-4 4m4-4H7m3-7H5v14h5"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div></header><main class="cf-content"><p class="cf-company-label">${ssrInterpolate(tenant.value?.name || "Administración")}</p>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main></div>`);
			if (user.value?.needs_password_change) _push(ssrRenderComponent(PasswordChangeModal_default, null, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(_sfc_main$42, {
				message: toast.value.message,
				type: toast.value.type,
				onDismiss: ($event) => toast.value.message = ""
			}, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$41 = _sfc_main$41.setup;
_sfc_main$41.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/TallerLayout.vue");
	return _sfc_setup$41 ? _sfc_setup$41(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Dashboard.vue
var Dashboard_exports$1 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$40 });
var _sfc_main$40 = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: { companies: Array },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Administración" }, null, _parent, _scopeId));
						_push(`<h1 class="text-3xl font-bold"${_scopeId}>Empresas de CotizaFlow</h1><section class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="p-4"${_scopeId}>Empresa</th><th class="p-4"${_scopeId}>Usuarios</th><th class="p-4"${_scopeId}>Estado</th><th class="p-4"${_scopeId}>Acceso</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.companies, (company) => {
							_push(`<tr class="border-t border-slate-100"${_scopeId}><td class="p-4"${_scopeId}>${ssrInterpolate(company.name)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(company.users_count)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(company.is_active ? "Activa" : "Inactiva")}</td><td class="p-4"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("taller.dashboard", { tenantBySlug: company.slug }),
								class: "text-orange-600"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Abrir empresa`);
									else return [createTextVNode("Abrir empresa")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</td></tr>`);
						});
						_push(`<!--]--></tbody></table></section>`);
					} else return [
						createVNode(unref(Head), { title: "Administración" }),
						createVNode("h1", { class: "text-3xl font-bold" }, "Empresas de CotizaFlow"),
						createVNode("section", { class: "mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white" }, [createVNode("table", { class: "w-full text-left text-sm" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", { class: "p-4" }, "Empresa"),
							createVNode("th", { class: "p-4" }, "Usuarios"),
							createVNode("th", { class: "p-4" }, "Estado"),
							createVNode("th", { class: "p-4" }, "Acceso")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.companies, (company) => {
							return openBlock(), createBlock("tr", {
								key: company.id,
								class: "border-t border-slate-100"
							}, [
								createVNode("td", { class: "p-4" }, toDisplayString(company.name), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(company.users_count), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(company.is_active ? "Activa" : "Inactiva"), 1),
								createVNode("td", { class: "p-4" }, [createVNode(unref(Link), {
									href: _ctx.route("taller.dashboard", { tenantBySlug: company.slug }),
									class: "text-orange-600"
								}, {
									default: withCtx(() => [createTextVNode("Abrir empresa")]),
									_: 1
								}, 8, ["href"])])
							]);
						}), 128))])])])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$40 = _sfc_main$40.setup;
_sfc_main$40.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
	return _sfc_setup$40 ? _sfc_setup$40(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/GuestLayout.vue
var _sfc_main$39 = {
	__name: "GuestLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-50 px-5" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "flex items-center gap-3 text-2xl font-bold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$47, { class: "h-12 w-12" }, null, _parent, _scopeId));
						_push(`CotizaFlow`);
					} else return [createVNode(_sfc_main$47, { class: "h-12 w-12" }), createTextVNode("CotizaFlow")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$39 = _sfc_main$39.setup;
_sfc_main$39.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
	return _sfc_setup$39 ? _sfc_setup$39(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/PrimaryButton.vue
var _sfc_main$38 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</button>`);
}
var _sfc_setup$38 = _sfc_main$38.setup;
_sfc_main$38.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
	return _sfc_setup$38 ? _sfc_setup$38(props, ctx) : void 0;
};
var PrimaryButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$38, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region resources/js/Components/TextInput.vue
var _sfc_main$37 = {
	__name: "TextInput",
	__ssrInlineRender: true,
	props: {
		"modelValue": {
			type: String,
			required: true
		},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose }) {
		const model = useModel(__props, "modelValue");
		const input = ref(null);
		onMounted(() => {
			if (input.value.hasAttribute("autofocus")) input.value.focus();
		});
		__expose({ focus: () => input.value.focus() });
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
				class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
				ref_key: "input",
				ref: input
			}, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
		};
	}
};
var _sfc_setup$37 = _sfc_main$37.setup;
_sfc_main$37.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
	return _sfc_setup$37 ? _sfc_setup$37(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/ConfirmPassword.vue
var ConfirmPassword_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$36 });
var _sfc_main$36 = {
	__name: "ConfirmPassword",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({ password: "" });
		const submit = () => {
			form.post(route("password.confirm"), { onFinish: () => form.reset() });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Confirm Password" }, null, _parent, _scopeId));
						_push(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password",
							value: "Password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password",
							class: "mt-1 block w-full",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password",
							autofocus: ""
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4 flex justify-end"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["ms-4", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Confirm `);
								else return [createTextVNode(" Confirm ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [
						createVNode(unref(Head), { title: "Confirm Password" }),
						createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " This is a secure area of the application. Please confirm your password before continuing. "),
						createVNode("form", { onSubmit: withModifiers(submit, ["prevent"]) }, [createVNode("div", null, [
							createVNode(_sfc_main$45, {
								for: "password",
								value: "Password"
							}),
							createVNode(_sfc_main$46, {
								id: "password",
								class: "mt-1 block w-full",
								modelValue: unref(form).password,
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								required: "",
								autocomplete: "current-password",
								autofocus: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.password
							}, null, 8, ["message"])
						]), createVNode("div", { class: "mt-4 flex justify-end" }, [createVNode(PrimaryButton_default, {
							class: ["ms-4", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [createTextVNode(" Confirm ")]),
							_: 1
						}, 8, ["class", "disabled"])])], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$36 = _sfc_main$36.setup;
_sfc_main$36.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
	return _sfc_setup$36 ? _sfc_setup$36(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/ForgotPassword.vue
var ForgotPassword_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$35 });
var _sfc_main$35 = {
	__name: "ForgotPassword",
	__ssrInlineRender: true,
	props: { status: { type: String } },
	setup(__props) {
		const form = useForm({ email: "" });
		const submit = () => {
			form.post(route("password.email"));
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent, _scopeId));
						_push(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
						if (__props.status) _push(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
						else _push(`<!---->`);
						_push(`<form${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "email",
							value: "Email"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "email",
							type: "email",
							class: "mt-1 block w-full",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Email Password Reset Link `);
								else return [createTextVNode(" Email Password Reset Link ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [
						createVNode(unref(Head), { title: "Forgot Password" }),
						createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
						__props.status ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-4 text-sm font-medium text-green-600"
						}, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
						createVNode("form", { onSubmit: withModifiers(submit, ["prevent"]) }, [createVNode("div", null, [
							createVNode(_sfc_main$45, {
								for: "email",
								value: "Email"
							}),
							createVNode(_sfc_main$37, {
								id: "email",
								type: "email",
								class: "mt-1 block w-full",
								modelValue: unref(form).email,
								"onUpdate:modelValue": ($event) => unref(form).email = $event,
								required: "",
								autofocus: "",
								autocomplete: "username"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.email
							}, null, 8, ["message"])
						]), createVNode("div", { class: "mt-4 flex items-center justify-end" }, [createVNode(PrimaryButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [createTextVNode(" Email Password Reset Link ")]),
							_: 1
						}, 8, ["class", "disabled"])])], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$35 = _sfc_main$35.setup;
_sfc_main$35.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
	return _sfc_setup$35 ? _sfc_setup$35(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Checkbox.vue
var _sfc_main$34 = {
	__name: "Checkbox",
	__ssrInlineRender: true,
	props: {
		checked: {
			type: [Array, Boolean],
			required: true
		},
		value: { default: null }
	},
	emits: ["update:checked"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const props = __props;
		const proxyChecked = computed({
			get() {
				return props.checked;
			},
			set(val) {
				emit("update:checked", val);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
				type: "checkbox",
				value: __props.value,
				checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
				class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
			}, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
		};
	}
};
var _sfc_setup$34 = _sfc_main$34.setup;
_sfc_main$34.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
	return _sfc_setup$34 ? _sfc_setup$34(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/Login.vue
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$33 });
var _sfc_main$33 = {
	__name: "Login",
	__ssrInlineRender: true,
	props: {
		canResetPassword: { type: Boolean },
		status: { type: String }
	},
	setup(__props) {
		const form = useForm({
			email: "",
			password: "",
			remember: false
		});
		const submit = () => {
			form.post(route("login"), { onFinish: () => form.reset("password") });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent, _scopeId));
						if (__props.status) _push(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
						else _push(`<!---->`);
						_push(`<form${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "email",
							value: "Email"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "email",
							type: "email",
							class: "mt-1 block w-full",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password",
							value: "Password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password",
							class: "mt-1 block w-full",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4 block"${_scopeId}><label class="flex items-center"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$34, {
							name: "remember",
							checked: unref(form).remember,
							"onUpdate:checked": ($event) => unref(form).remember = $event
						}, null, _parent, _scopeId));
						_push(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>Remember me</span></label></div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
						if (__props.canResetPassword) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("password.request"),
							class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Forgot your password? `);
								else return [createTextVNode(" Forgot your password? ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["ms-4", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Log in `);
								else return [createTextVNode(" Log in ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [
						createVNode(unref(Head), { title: "Log in" }),
						__props.status ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-4 text-sm font-medium text-green-600"
						}, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
						createVNode("form", { onSubmit: withModifiers(submit, ["prevent"]) }, [
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "email",
									value: "Email"
								}),
								createVNode(_sfc_main$37, {
									id: "email",
									type: "email",
									class: "mt-1 block w-full",
									modelValue: unref(form).email,
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									required: "",
									autofocus: "",
									autocomplete: "username"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.email
								}, null, 8, ["message"])
							]),
							createVNode("div", { class: "mt-4" }, [
								createVNode(_sfc_main$45, {
									for: "password",
									value: "Password"
								}),
								createVNode(_sfc_main$46, {
									id: "password",
									class: "mt-1 block w-full",
									modelValue: unref(form).password,
									"onUpdate:modelValue": ($event) => unref(form).password = $event,
									required: "",
									autocomplete: "current-password"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.password
								}, null, 8, ["message"])
							]),
							createVNode("div", { class: "mt-4 block" }, [createVNode("label", { class: "flex items-center" }, [createVNode(_sfc_main$34, {
								name: "remember",
								checked: unref(form).remember,
								"onUpdate:checked": ($event) => unref(form).remember = $event
							}, null, 8, ["checked", "onUpdate:checked"]), createVNode("span", { class: "ms-2 text-sm text-gray-600" }, "Remember me")])]),
							createVNode("div", { class: "mt-4 flex items-center justify-end" }, [__props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("password.request"),
								class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							}, {
								default: withCtx(() => [createTextVNode(" Forgot your password? ")]),
								_: 1
							}, 8, ["href"])) : createCommentVNode("", true), createVNode(PrimaryButton_default, {
								class: ["ms-4", { "opacity-25": unref(form).processing }],
								disabled: unref(form).processing
							}, {
								default: withCtx(() => [createTextVNode(" Log in ")]),
								_: 1
							}, 8, ["class", "disabled"])])
						], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$33 = _sfc_main$33.setup;
_sfc_main$33.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
	return _sfc_setup$33 ? _sfc_setup$33(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/Register.vue
var Register_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$32 });
var _sfc_main$32 = {
	__name: "Register",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({
			name: "",
			email: "",
			password: "",
			password_confirmation: ""
		});
		const submit = () => {
			form.post(route("register"), { onFinish: () => form.reset("password", "password_confirmation") });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent, _scopeId));
						_push(`<form${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "name",
							value: "Name"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "name",
							type: "text",
							class: "mt-1 block w-full",
							modelValue: unref(form).name,
							"onUpdate:modelValue": ($event) => unref(form).name = $event,
							required: "",
							autofocus: "",
							autocomplete: "name"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.name
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "email",
							value: "Email"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "email",
							type: "email",
							class: "mt-1 block w-full",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autocomplete: "username"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password",
							value: "Password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password",
							class: "mt-1 block w-full",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "new-password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password_confirmation",
							value: "Confirm Password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password_confirmation",
							class: "mt-1 block w-full",
							modelValue: unref(form).password_confirmation,
							"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
							required: "",
							autocomplete: "new-password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password_confirmation
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("login"),
							class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Already registered? `);
								else return [createTextVNode(" Already registered? ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["ms-4", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Register `);
								else return [createTextVNode(" Register ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [createVNode(unref(Head), { title: "Register" }), createVNode("form", { onSubmit: withModifiers(submit, ["prevent"]) }, [
						createVNode("div", null, [
							createVNode(_sfc_main$45, {
								for: "name",
								value: "Name"
							}),
							createVNode(_sfc_main$37, {
								id: "name",
								type: "text",
								class: "mt-1 block w-full",
								modelValue: unref(form).name,
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								required: "",
								autofocus: "",
								autocomplete: "name"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.name
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-4" }, [
							createVNode(_sfc_main$45, {
								for: "email",
								value: "Email"
							}),
							createVNode(_sfc_main$37, {
								id: "email",
								type: "email",
								class: "mt-1 block w-full",
								modelValue: unref(form).email,
								"onUpdate:modelValue": ($event) => unref(form).email = $event,
								required: "",
								autocomplete: "username"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.email
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-4" }, [
							createVNode(_sfc_main$45, {
								for: "password",
								value: "Password"
							}),
							createVNode(_sfc_main$46, {
								id: "password",
								class: "mt-1 block w-full",
								modelValue: unref(form).password,
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								required: "",
								autocomplete: "new-password"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.password
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-4" }, [
							createVNode(_sfc_main$45, {
								for: "password_confirmation",
								value: "Confirm Password"
							}),
							createVNode(_sfc_main$46, {
								id: "password_confirmation",
								class: "mt-1 block w-full",
								modelValue: unref(form).password_confirmation,
								"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
								required: "",
								autocomplete: "new-password"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2",
								message: unref(form).errors.password_confirmation
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-4 flex items-center justify-end" }, [createVNode(unref(Link), {
							href: _ctx.route("login"),
							class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						}, {
							default: withCtx(() => [createTextVNode(" Already registered? ")]),
							_: 1
						}, 8, ["href"]), createVNode(PrimaryButton_default, {
							class: ["ms-4", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [createTextVNode(" Register ")]),
							_: 1
						}, 8, ["class", "disabled"])])
					], 32)];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$32 = _sfc_main$32.setup;
_sfc_main$32.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
	return _sfc_setup$32 ? _sfc_setup$32(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/ResetPassword.vue
var ResetPassword_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$31 });
var _sfc_main$31 = {
	__name: "ResetPassword",
	__ssrInlineRender: true,
	props: {
		email: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			token: props.token,
			email: props.email,
			password: "",
			password_confirmation: ""
		});
		const submit = () => {
			form.post(route("password.store"), { onFinish: () => form.reset("password", "password_confirmation") });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Restablecer Contraseña" }, null, _parent, _scopeId));
						_push(`<div class="mb-6 text-center"${_scopeId}><h2 class="text-2xl font-black text-gray-900"${_scopeId}>Restablecer Contraseña</h2><p class="text-sm text-gray-500 mt-1"${_scopeId}>Ingresa tu nueva contraseña para actualizar el acceso a tu cuenta.</p></div><form class="space-y-4"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "token",
							value: "Código / Token de verificación",
							class: "font-semibold text-gray-700"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "token",
							type: "text",
							class: "mt-1 block w-full bg-gray-50 font-mono text-sm border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
							modelValue: unref(form).token,
							"onUpdate:modelValue": ($event) => unref(form).token = $event,
							required: "",
							readonly: ""
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.token
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "email",
							value: "Correo electrónico",
							class: "font-semibold text-gray-700"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "email",
							type: "email",
							class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password",
							value: "Nueva contraseña",
							class: "font-semibold text-gray-700"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password",
							class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "new-password",
							placeholder: "••••••••"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password_confirmation",
							value: "Confirmar nueva contraseña",
							class: "font-semibold text-gray-700"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password_confirmation",
							class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
							modelValue: unref(form).password_confirmation,
							"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
							required: "",
							autocomplete: "new-password",
							placeholder: "••••••••"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password_confirmation
						}, null, _parent, _scopeId));
						_push(`</div><div class="pt-4"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span${_scopeId}>Guardando nueva contraseña...</span>`);
								else _push(`<span${_scopeId}>Restablecer Contraseña</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Guardando nueva contraseña...")) : (openBlock(), createBlock("span", { key: 1 }, "Restablecer Contraseña"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [
						createVNode(unref(Head), { title: "Restablecer Contraseña" }),
						createVNode("div", { class: "mb-6 text-center" }, [createVNode("h2", { class: "text-2xl font-black text-gray-900" }, "Restablecer Contraseña"), createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Ingresa tu nueva contraseña para actualizar el acceso a tu cuenta.")]),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-4"
						}, [
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "token",
									value: "Código / Token de verificación",
									class: "font-semibold text-gray-700"
								}),
								createVNode(_sfc_main$37, {
									id: "token",
									type: "text",
									class: "mt-1 block w-full bg-gray-50 font-mono text-sm border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
									modelValue: unref(form).token,
									"onUpdate:modelValue": ($event) => unref(form).token = $event,
									required: "",
									readonly: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.token
								}, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "email",
									value: "Correo electrónico",
									class: "font-semibold text-gray-700"
								}),
								createVNode(_sfc_main$37, {
									id: "email",
									type: "email",
									class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
									modelValue: unref(form).email,
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									required: "",
									autofocus: "",
									autocomplete: "username"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.email
								}, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "password",
									value: "Nueva contraseña",
									class: "font-semibold text-gray-700"
								}),
								createVNode(_sfc_main$46, {
									id: "password",
									class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
									modelValue: unref(form).password,
									"onUpdate:modelValue": ($event) => unref(form).password = $event,
									required: "",
									autocomplete: "new-password",
									placeholder: "••••••••"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.password
								}, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "password_confirmation",
									value: "Confirmar nueva contraseña",
									class: "font-semibold text-gray-700"
								}),
								createVNode(_sfc_main$46, {
									id: "password_confirmation",
									class: "mt-1 block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-11",
									modelValue: unref(form).password_confirmation,
									"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
									required: "",
									autocomplete: "new-password",
									placeholder: "••••••••"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.password_confirmation
								}, null, 8, ["message"])
							]),
							createVNode("div", { class: "pt-4" }, [createVNode(PrimaryButton_default, {
								class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
								disabled: unref(form).processing
							}, {
								default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Guardando nueva contraseña...")) : (openBlock(), createBlock("span", { key: 1 }, "Restablecer Contraseña"))]),
								_: 1
							}, 8, ["class", "disabled"])])
						], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$31 = _sfc_main$31.setup;
_sfc_main$31.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
	return _sfc_setup$31 ? _sfc_setup$31(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/VerifyEmail.vue
var VerifyEmail_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$30 });
var _sfc_main$30 = {
	__name: "VerifyEmail",
	__ssrInlineRender: true,
	props: { status: { type: String } },
	setup(__props) {
		const props = __props;
		const form = useForm({});
		const submit = () => {
			form.post(route("verification.send"));
		};
		const verificationLinkSent = computed(() => props.status === "verification-link-sent");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$39, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent, _scopeId));
						_push(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
						if (verificationLinkSent.value) _push(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
						else _push(`<!---->`);
						_push(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Resend Verification Email `);
								else return [createTextVNode(" Resend Verification Email ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("logout"),
							method: "post",
							as: "button",
							class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Log Out`);
								else return [createTextVNode("Log Out")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form>`);
					} else return [
						createVNode(unref(Head), { title: "Email Verification" }),
						createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
						verificationLinkSent.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-4 text-sm font-medium text-green-600"
						}, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
						createVNode("form", { onSubmit: withModifiers(submit, ["prevent"]) }, [createVNode("div", { class: "mt-4 flex items-center justify-between" }, [createVNode(PrimaryButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [createTextVNode(" Resend Verification Email ")]),
							_: 1
						}, 8, ["class", "disabled"]), createVNode(unref(Link), {
							href: _ctx.route("logout"),
							method: "post",
							as: "button",
							class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						}, {
							default: withCtx(() => [createTextVNode("Log Out")]),
							_: 1
						}, 8, ["href"])])], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$30 = _sfc_main$30.setup;
_sfc_main$30.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
	return _sfc_setup$30 ? _sfc_setup$30(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ViewTabs.vue
var _sfc_main$29 = {
	__name: "ViewTabs",
	__ssrInlineRender: true,
	props: {
		modelValue: String,
		items: Array,
		label: {
			type: String,
			default: "Secciones de la vista"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const id = useId();
		ref([]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "cf-section-tabs",
				role: "tablist",
				"aria-label": __props.label
			}, _attrs))}><!--[-->`);
			ssrRenderList(__props.items, (item, index) => {
				_push(`<button${ssrRenderAttr("id", `${unref(id)}-${item.value}`)} type="button" role="tab"${ssrRenderAttr("aria-selected", __props.modelValue === item.value)}${ssrRenderAttr("tabindex", __props.modelValue === item.value ? 0 : -1)} class="${ssrRenderClass({ "is-selected": __props.modelValue === item.value })}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$29 = _sfc_main$29.setup;
_sfc_main$29.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ViewTabs.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Clients/Index.vue
var Index_exports$4 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$28 });
var _sfc_main$28 = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		clients: Object,
		filters: Object
	},
	setup(__props) {
		const props = __props;
		const params = { tenantBySlug: usePage().props.tenant?.slug };
		const search = ref(props.filters?.search || "");
		const open = ref(false);
		const activeSection = ref("directorio");
		watch(activeSection, (value) => {
			if (value === "nuevo") open.value = true;
		});
		const form = useForm({
			name: "",
			rut: "",
			email: "",
			phone: "",
			address: ""
		});
		const submit = () => form.post(route("clients.store", params), { onSuccess: () => {
			form.reset();
			open.value = false;
			activeSection.value = "directorio";
		} });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Clientes" }, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Clientes</h1><p class="mt-2 text-slate-500"${_scopeId}> Contactos y propuestas comerciales en un lugar. </p></div><button class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"${_scopeId}>${ssrInterpolate(open.value ? "Cerrar formulario" : "Agregar cliente")}</button></div>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "directorio",
								label: "Directorio"
							}, {
								value: "nuevo",
								label: "Nuevo cliente"
							}]
						}, null, _parent, _scopeId));
						if (open.value) {
							_push(`<form class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2" style="${ssrRenderStyle(activeSection.value === "nuevo" ? null : { display: "none" })}"${_scopeId}><!--[-->`);
							ssrRenderList([
								["name", "Nombre"],
								["rut", "RUT"],
								["email", "Correo"],
								["phone", "Teléfono"],
								["address", "Dirección"]
							], (field) => {
								_push(`<label class="flex flex-col gap-2"${_scopeId}>${ssrInterpolate(field[1])}<input${ssrRenderDynamicModel(field[0] === "email" ? "email" : "text", unref(form)[field[0]], null)}${ssrIncludeBooleanAttr(["name", "rut"].includes(field[0])) ? " required" : ""}${ssrRenderAttr("type", field[0] === "email" ? "email" : "text")} class="rounded-lg border-slate-300"${_scopeId}>`);
								if (unref(form).errors[field[0]]) _push(`<span class="text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors[field[0]])}</span>`);
								else _push(`<!---->`);
								_push(`</label>`);
							});
							_push(`<!--]--><div class="flex items-end"${_scopeId}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-slate-900 px-5 py-3 text-white"${_scopeId}> Guardar cliente </button></div></form>`);
						} else _push(`<!---->`);
						_push(`<form class="my-6 flex gap-3" style="${ssrRenderStyle(activeSection.value === "directorio" ? null : { display: "none" })}"${_scopeId}><input${ssrRenderAttr("value", search.value)} placeholder="Buscar por nombre o RUT" aria-label="Buscar clientes" class="w-full max-w-md rounded-lg border-slate-300"${_scopeId}><button class="rounded-lg bg-slate-900 px-5 text-white"${_scopeId}> Buscar </button></form><section role="tabpanel" aria-label="Directorio" class="overflow-x-auto rounded-2xl border border-slate-200 bg-white" style="${ssrRenderStyle(activeSection.value === "directorio" ? null : { display: "none" })}"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-slate-50"${_scopeId}><tr${_scopeId}><th class="p-4"${_scopeId}>Cliente</th><th class="p-4"${_scopeId}>RUT</th><th class="p-4"${_scopeId}>Correo</th><th class="p-4"${_scopeId}>Teléfono</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.clients.data, (client) => {
							_push(`<tr class="border-t border-slate-100"${_scopeId}><td class="p-4"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("clients.show", {
									...params,
									client: client.id
								}),
								class: "font-semibold text-orange-600"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(client.name)}`);
									else return [createTextVNode(toDisplayString(client.name), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</td><td class="p-4"${_scopeId}>${ssrInterpolate(client.rut)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(client.email || "—")}</td><td class="p-4"${_scopeId}>${ssrInterpolate(client.phone || "—")}</td></tr>`);
						});
						_push(`<!--]--></tbody></table>`);
						if (!__props.clients.data.length) _push(`<p class="p-8 text-slate-500"${_scopeId}> Agrega tu primer cliente para comenzar a cotizar. </p>`);
						else _push(`<!---->`);
						_push(`</section><div class="mt-5 flex gap-4" style="${ssrRenderStyle(activeSection.value === "directorio" ? null : { display: "none" })}"${_scopeId}>`);
						if (__props.clients.prev_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.clients.prev_page_url }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`← Anterior`);
								else return [createTextVNode("← Anterior")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if (__props.clients.next_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.clients.next_page_url }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Siguiente →`);
								else return [createTextVNode("Siguiente →")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [
						createVNode(unref(Head), { title: "Clientes" }),
						createVNode("div", { class: "flex flex-wrap justify-between gap-4" }, [createVNode("div", null, [createVNode("h1", { class: "text-3xl font-bold" }, "Clientes"), createVNode("p", { class: "mt-2 text-slate-500" }, " Contactos y propuestas comerciales en un lugar. ")]), createVNode("button", {
							onClick: ($event) => {
								open.value = !open.value;
								activeSection.value = open.value ? "nuevo" : "directorio";
							},
							class: "rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
						}, toDisplayString(open.value ? "Cerrar formulario" : "Agregar cliente"), 9, ["onClick"])]),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "directorio",
								label: "Directorio"
							}, {
								value: "nuevo",
								label: "Nuevo cliente"
							}]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						open.value ? withDirectives((openBlock(), createBlock("form", {
							key: 0,
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
						}, [(openBlock(), createBlock(Fragment, null, renderList([
							["name", "Nombre"],
							["rut", "RUT"],
							["email", "Correo"],
							["phone", "Teléfono"],
							["address", "Dirección"]
						], (field) => {
							return createVNode("label", {
								key: field[0],
								class: "flex flex-col gap-2"
							}, [
								createTextVNode(toDisplayString(field[1]), 1),
								withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form)[field[0]] = $event,
									required: ["name", "rut"].includes(field[0]),
									type: field[0] === "email" ? "email" : "text",
									class: "rounded-lg border-slate-300"
								}, null, 8, [
									"onUpdate:modelValue",
									"required",
									"type"
								]), [[vModelDynamic, unref(form)[field[0]]]]),
								unref(form).errors[field[0]] ? (openBlock(), createBlock("span", {
									key: 0,
									class: "text-sm text-red-600"
								}, toDisplayString(unref(form).errors[field[0]]), 1)) : createCommentVNode("", true)
							]);
						}), 64)), createVNode("div", { class: "flex items-end" }, [createVNode("button", {
							disabled: unref(form).processing,
							class: "rounded-lg bg-slate-900 px-5 py-3 text-white"
						}, " Guardar cliente ", 8, ["disabled"])])], 544)), [[vShow, activeSection.value === "nuevo"]]) : createCommentVNode("", true),
						withDirectives(createVNode("form", {
							onSubmit: withModifiers(($event) => unref(router).get(_ctx.route("clients.index", params), { search: search.value }), ["prevent"]),
							class: "my-6 flex gap-3"
						}, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => search.value = $event,
							placeholder: "Buscar por nombre o RUT",
							"aria-label": "Buscar clientes",
							class: "w-full max-w-md rounded-lg border-slate-300"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]]), createVNode("button", { class: "rounded-lg bg-slate-900 px-5 text-white" }, " Buscar ")], 40, ["onSubmit"]), [[vShow, activeSection.value === "directorio"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Directorio",
							class: "overflow-x-auto rounded-2xl border border-slate-200 bg-white"
						}, [createVNode("table", { class: "w-full text-left text-sm" }, [createVNode("thead", { class: "bg-slate-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "p-4" }, "Cliente"),
							createVNode("th", { class: "p-4" }, "RUT"),
							createVNode("th", { class: "p-4" }, "Correo"),
							createVNode("th", { class: "p-4" }, "Teléfono")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.clients.data, (client) => {
							return openBlock(), createBlock("tr", {
								key: client.id,
								class: "border-t border-slate-100"
							}, [
								createVNode("td", { class: "p-4" }, [createVNode(unref(Link), {
									href: _ctx.route("clients.show", {
										...params,
										client: client.id
									}),
									class: "font-semibold text-orange-600"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(client.name), 1)]),
									_: 2
								}, 1032, ["href"])]),
								createVNode("td", { class: "p-4" }, toDisplayString(client.rut), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(client.email || "—"), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(client.phone || "—"), 1)
							]);
						}), 128))])]), !__props.clients.data.length ? (openBlock(), createBlock("p", {
							key: 0,
							class: "p-8 text-slate-500"
						}, " Agrega tu primer cliente para comenzar a cotizar. ")) : createCommentVNode("", true)], 512), [[vShow, activeSection.value === "directorio"]]),
						withDirectives(createVNode("div", { class: "mt-5 flex gap-4" }, [__props.clients.prev_page_url ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: __props.clients.prev_page_url
						}, {
							default: withCtx(() => [createTextVNode("← Anterior")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true), __props.clients.next_page_url ? (openBlock(), createBlock(unref(Link), {
							key: 1,
							href: __props.clients.next_page_url
						}, {
							default: withCtx(() => [createTextVNode("Siguiente →")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)], 512), [[vShow, activeSection.value === "directorio"]])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$28 = _sfc_main$28.setup;
_sfc_main$28.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Clients/Index.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Clients/Show.vue
var Show_exports$1 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$27 });
var _sfc_main$27 = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		client: Object,
		quotes: Array
	},
	setup(__props) {
		const props = __props;
		const params = {
			tenantBySlug: usePage().props.tenant?.slug,
			client: props.client.id
		};
		const form = useForm({
			name: props.client.name,
			rut: props.client.rut,
			email: props.client.email,
			phone: props.client.phone,
			address: props.client.address
		});
		const labels = {
			draft: "Borrador",
			pending_customer: "Pendiente",
			accepted: "Aceptada",
			rejected: "Rechazada"
		};
		const activeSection = ref("datos");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: __props.client.name }, null, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("clients.index", { tenantBySlug: params.tenantBySlug }),
							class: "text-sm text-slate-500"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`← Clientes`);
								else return [createTextVNode("← Clientes")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<h1 class="mt-4 text-3xl font-bold"${_scopeId}>${ssrInterpolate(__props.client.name)}</h1>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "datos",
								label: "Datos de contacto"
							}, {
								value: "cotizaciones",
								label: "Cotizaciones"
							}]
						}, null, _parent, _scopeId));
						_push(`<form role="tabpanel" aria-label="Datos de contacto" class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2" style="${ssrRenderStyle(activeSection.value === "datos" ? null : { display: "none" })}"${_scopeId}><!--[-->`);
						ssrRenderList([
							["name", "Nombre"],
							["rut", "RUT"],
							["email", "Correo"],
							["phone", "Teléfono"],
							["address", "Dirección"]
						], (field) => {
							_push(`<label class="flex flex-col gap-2"${_scopeId}>${ssrInterpolate(field[1])}<input${ssrRenderDynamicModel(field[0] === "email" ? "email" : "text", unref(form)[field[0]], null)}${ssrIncludeBooleanAttr(["name", "rut"].includes(field[0])) ? " required" : ""}${ssrRenderAttr("type", field[0] === "email" ? "email" : "text")} class="rounded-lg border-slate-300"${_scopeId}><span class="text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors[field[0]])}</span></label>`);
						});
						_push(`<!--]--><div class="flex items-end"${_scopeId}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-orange-500 px-5 py-3 text-white"${_scopeId}> Guardar cambios </button></div></form><section role="tabpanel" aria-label="Cotizaciones" class="mt-6 rounded-2xl border border-slate-200 bg-white p-6" style="${ssrRenderStyle(activeSection.value === "cotizaciones" ? null : { display: "none" })}"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Cotizaciones del cliente</h2><ul class="mt-4 flex flex-col gap-4"${_scopeId}><!--[-->`);
						ssrRenderList(__props.quotes, (quote) => {
							_push(`<li${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("quotes.show", {
									tenantBySlug: params.tenantBySlug,
									quote: quote.id
								}),
								class: "font-medium text-orange-600"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`#${ssrInterpolate(quote.id)}`);
									else return [createTextVNode("#" + toDisplayString(quote.id), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(` · ${ssrInterpolate(labels[quote.status])}</li>`);
						});
						_push(`<!--]--></ul>`);
						if (!__props.quotes.length) _push(`<p class="mt-4 text-slate-500"${_scopeId}> Este cliente aún no tiene cotizaciones. </p>`);
						else _push(`<!---->`);
						_push(`</section>`);
					} else return [
						createVNode(unref(Head), { title: __props.client.name }, null, 8, ["title"]),
						createVNode(unref(Link), {
							href: _ctx.route("clients.index", { tenantBySlug: params.tenantBySlug }),
							class: "text-sm text-slate-500"
						}, {
							default: withCtx(() => [createTextVNode("← Clientes")]),
							_: 1
						}, 8, ["href"]),
						createVNode("h1", { class: "mt-4 text-3xl font-bold" }, toDisplayString(__props.client.name), 1),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "datos",
								label: "Datos de contacto"
							}, {
								value: "cotizaciones",
								label: "Cotizaciones"
							}]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						withDirectives(createVNode("form", {
							role: "tabpanel",
							"aria-label": "Datos de contacto",
							onSubmit: withModifiers(($event) => unref(form).put(_ctx.route("clients.update", params)), ["prevent"]),
							class: "mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
						}, [(openBlock(), createBlock(Fragment, null, renderList([
							["name", "Nombre"],
							["rut", "RUT"],
							["email", "Correo"],
							["phone", "Teléfono"],
							["address", "Dirección"]
						], (field) => {
							return createVNode("label", {
								key: field[0],
								class: "flex flex-col gap-2"
							}, [
								createTextVNode(toDisplayString(field[1]), 1),
								withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form)[field[0]] = $event,
									required: ["name", "rut"].includes(field[0]),
									type: field[0] === "email" ? "email" : "text",
									class: "rounded-lg border-slate-300"
								}, null, 8, [
									"onUpdate:modelValue",
									"required",
									"type"
								]), [[vModelDynamic, unref(form)[field[0]]]]),
								createVNode("span", { class: "text-sm text-red-600" }, toDisplayString(unref(form).errors[field[0]]), 1)
							]);
						}), 64)), createVNode("div", { class: "flex items-end" }, [createVNode("button", {
							disabled: unref(form).processing,
							class: "rounded-lg bg-orange-500 px-5 py-3 text-white"
						}, " Guardar cambios ", 8, ["disabled"])])], 40, ["onSubmit"]), [[vShow, activeSection.value === "datos"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Cotizaciones",
							class: "mt-6 rounded-2xl border border-slate-200 bg-white p-6"
						}, [
							createVNode("h2", { class: "text-xl font-semibold" }, "Cotizaciones del cliente"),
							createVNode("ul", { class: "mt-4 flex flex-col gap-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.quotes, (quote) => {
								return openBlock(), createBlock("li", { key: quote.id }, [createVNode(unref(Link), {
									href: _ctx.route("quotes.show", {
										tenantBySlug: params.tenantBySlug,
										quote: quote.id
									}),
									class: "font-medium text-orange-600"
								}, {
									default: withCtx(() => [createTextVNode("#" + toDisplayString(quote.id), 1)]),
									_: 2
								}, 1032, ["href"]), createTextVNode(" · " + toDisplayString(labels[quote.status]), 1)]);
							}), 128))]),
							!__props.quotes.length ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-4 text-slate-500"
							}, " Este cliente aún no tiene cotizaciones. ")) : createCommentVNode("", true)
						], 512), [[vShow, activeSection.value === "cotizaciones"]])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$27 = _sfc_main$27.setup;
_sfc_main$27.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Clients/Show.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Dashboard.vue
var Dashboard_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$26 });
var _sfc_main$26 = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: {
		stats: Object,
		recentQuotes: Array
	},
	setup(__props) {
		const page = usePage();
		const params = { tenantBySlug: page.props.tenant?.slug };
		const can = (permission) => page.props.auth.user.is_super_admin || page.props.auth.user.permissions.includes(permission);
		const money = (value) => new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP"
		}).format(Number(value));
		const labels = {
			draft: "Borrador",
			pending_customer: "Pendiente",
			accepted: "Aceptada",
			rejected: "Rechazada"
		};
		const activeSection = ref("resumen");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Inicio" }, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tu actividad comercial</h1><p class="mt-2 text-slate-500"${_scopeId}> Cotizaciones, clientes y oportunidades por retomar. </p></div>`);
						if (can("quotes.manage")) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.create", params),
							class: "rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva cotización`);
								else return [createTextVNode("Nueva cotización")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "resumen",
								label: "Resumen"
							}, {
								value: "actividad",
								label: "Actividad"
							}]
						}, null, _parent, _scopeId));
						_push(`<div role="tabpanel" aria-label="Resumen" class="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" style="${ssrRenderStyle(activeSection.value === "resumen" ? null : { display: "none" })}"${_scopeId}><!--[-->`);
						ssrRenderList([
							["Clientes", __props.stats.clients],
							["Borradores", __props.stats.drafts],
							["Pendientes", __props.stats.pending],
							["Aceptadas", __props.stats.accepted],
							["Monto aceptado", money(__props.stats.accepted_amount)]
						], (metric) => {
							_push(`<article class="cf-metric-card rounded-2xl border border-slate-200 bg-white p-6"${_scopeId}><p class="text-sm text-slate-500"${_scopeId}>${ssrInterpolate(metric[0])}</p><p class="mt-3 text-2xl font-semibold"${_scopeId}>${ssrInterpolate(metric[1])}</p></article>`);
						});
						_push(`<!--]--></div><section role="tabpanel" aria-label="Actividad" class="rounded-2xl border border-slate-200 bg-white p-6" style="${ssrRenderStyle(activeSection.value === "actividad" ? null : { display: "none" })}"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Cotizaciones recientes</h2>`);
						if (can("quotes.view")) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.follow-up", params),
							class: "text-sm font-semibold text-orange-600"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Revisar pendientes →`);
								else return [createTextVNode("Revisar pendientes →")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
						if (__props.recentQuotes.length) {
							_push(`<ul class="mt-5 divide-y divide-slate-100"${_scopeId}><!--[-->`);
							ssrRenderList(__props.recentQuotes, (quote) => {
								_push(`<li class="flex flex-wrap justify-between gap-3 py-4"${_scopeId}>`);
								if (can("quotes.view")) _push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("quotes.show", {
										...params,
										quote: quote.id
									}),
									class: "font-medium"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`#${ssrInterpolate(quote.id)} · ${ssrInterpolate(quote.client?.name)}`);
										else return [createTextVNode("#" + toDisplayString(quote.id) + " · " + toDisplayString(quote.client?.name), 1)];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<span class="font-medium"${_scopeId}>#${ssrInterpolate(quote.id)} · ${ssrInterpolate(quote.client?.name)}</span>`);
								_push(`<span${_scopeId}>${ssrInterpolate(labels[quote.status])} · ${ssrInterpolate(money(quote.total_amount))}</span></li>`);
							});
							_push(`<!--]--></ul>`);
						} else _push(`<p class="py-10 text-slate-500"${_scopeId}> Aún no hay cotizaciones. Agrega un cliente y prepara la primera. </p>`);
						_push(`</section>`);
					} else return [
						createVNode(unref(Head), { title: "Inicio" }),
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [createVNode("div", null, [createVNode("h1", { class: "text-3xl font-bold" }, "Tu actividad comercial"), createVNode("p", { class: "mt-2 text-slate-500" }, " Cotizaciones, clientes y oportunidades por retomar. ")]), can("quotes.manage") ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: _ctx.route("quotes.create", params),
							class: "rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
						}, {
							default: withCtx(() => [createTextVNode("Nueva cotización")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)]),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "resumen",
								label: "Resumen"
							}, {
								value: "actividad",
								label: "Actividad"
							}]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						withDirectives(createVNode("div", {
							role: "tabpanel",
							"aria-label": "Resumen",
							class: "my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
						}, [(openBlock(true), createBlock(Fragment, null, renderList([
							["Clientes", __props.stats.clients],
							["Borradores", __props.stats.drafts],
							["Pendientes", __props.stats.pending],
							["Aceptadas", __props.stats.accepted],
							["Monto aceptado", money(__props.stats.accepted_amount)]
						], (metric) => {
							return openBlock(), createBlock("article", {
								key: metric[0],
								class: "cf-metric-card rounded-2xl border border-slate-200 bg-white p-6"
							}, [createVNode("p", { class: "text-sm text-slate-500" }, toDisplayString(metric[0]), 1), createVNode("p", { class: "mt-3 text-2xl font-semibold" }, toDisplayString(metric[1]), 1)]);
						}), 128))], 512), [[vShow, activeSection.value === "resumen"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Actividad",
							class: "rounded-2xl border border-slate-200 bg-white p-6"
						}, [createVNode("div", { class: "flex items-center justify-between gap-4" }, [createVNode("h2", { class: "text-xl font-semibold" }, "Cotizaciones recientes"), can("quotes.view") ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: _ctx.route("quotes.follow-up", params),
							class: "text-sm font-semibold text-orange-600"
						}, {
							default: withCtx(() => [createTextVNode("Revisar pendientes →")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)]), __props.recentQuotes.length ? (openBlock(), createBlock("ul", {
							key: 0,
							class: "mt-5 divide-y divide-slate-100"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.recentQuotes, (quote) => {
							return openBlock(), createBlock("li", {
								key: quote.id,
								class: "flex flex-wrap justify-between gap-3 py-4"
							}, [can("quotes.view") ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("quotes.show", {
									...params,
									quote: quote.id
								}),
								class: "font-medium"
							}, {
								default: withCtx(() => [createTextVNode("#" + toDisplayString(quote.id) + " · " + toDisplayString(quote.client?.name), 1)]),
								_: 2
							}, 1032, ["href"])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "font-medium"
							}, "#" + toDisplayString(quote.id) + " · " + toDisplayString(quote.client?.name), 1)), createVNode("span", null, toDisplayString(labels[quote.status]) + " · " + toDisplayString(money(quote.total_amount)), 1)]);
						}), 128))])) : (openBlock(), createBlock("p", {
							key: 1,
							class: "py-10 text-slate-500"
						}, " Aún no hay cotizaciones. Agrega un cliente y prepara la primera. "))], 512), [[vShow, activeSection.value === "actividad"]])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$26 = _sfc_main$26.setup;
_sfc_main$26.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/CommercialCatalog.vue
var _sfc_main$25 = {
	__name: "CommercialCatalog",
	__ssrInlineRender: true,
	props: {
		records: Object,
		filters: Object,
		kind: String
	},
	setup(__props) {
		const props = __props;
		const params = { tenantBySlug: usePage().props.tenant?.slug };
		const isProduct = computed(() => props.kind === "product");
		const prefix = computed(() => isProduct.value ? "inventory" : "services");
		const search = ref(props.filters?.search || "");
		const open = ref(false);
		const activeSection = ref("catalogo");
		watch(activeSection, (value) => {
			if (value === "editar") open.value = true;
		});
		const editing = ref(null);
		const form = useForm({
			name: "",
			sku: "",
			code: "",
			description: "",
			cost_price: 0,
			selling_price: 0,
			tax_included: false,
			is_active: true
		});
		const upload = useForm({ workbook: null });
		const money = (value) => new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP"
		}).format(Number(value));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4"><div><h1 class="text-3xl font-bold">${ssrInterpolate(isProduct.value ? "Productos" : "Servicios")}</h1><p class="mt-2 text-slate-500"> Tu catálogo de precios para preparar cotizaciones. </p></div><button class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white">${ssrInterpolate(isProduct.value ? "Agregar producto" : "Agregar servicio")}</button></div>`);
			_push(ssrRenderComponent(_sfc_main$29, {
				modelValue: activeSection.value,
				"onUpdate:modelValue": ($event) => activeSection.value = $event,
				items: [
					{
						value: "catalogo",
						label: "Catálogo"
					},
					{
						value: "importar",
						label: "Importar Excel"
					},
					{
						value: "editar",
						label: editing.value ? "Editar ítem" : "Nuevo ítem"
					}
				]
			}, null, _parent));
			if (open.value) {
				_push(`<form class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2" style="${ssrRenderStyle(activeSection.value === "editar" ? null : { display: "none" })}"><label class="flex flex-col gap-2">Nombre<input${ssrRenderAttr("value", unref(form).name)} required class="rounded-lg border-slate-300"></label><label class="flex flex-col gap-2">Código`);
				if (isProduct.value) _push(`<input${ssrRenderAttr("value", unref(form).sku)} required class="rounded-lg border-slate-300">`);
				else _push(`<input${ssrRenderAttr("value", unref(form).code)} class="rounded-lg border-slate-300">`);
				_push(`</label><label class="flex flex-col gap-2">Costo<input${ssrRenderAttr("value", unref(form).cost_price)} type="number" min="0" step="0.01" required class="rounded-lg border-slate-300"></label><label class="flex flex-col gap-2">Precio de venta<input${ssrRenderAttr("value", unref(form).selling_price)} type="number" min="0" step="0.01" required class="rounded-lg border-slate-300"></label><label class="flex flex-col gap-2">Descripción<textarea class="rounded-lg border-slate-300">${ssrInterpolate(unref(form).description)}</textarea></label><div class="flex flex-col justify-center gap-3"><label class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).tax_included) ? ssrLooseContain(unref(form).tax_included, null) : unref(form).tax_included) ? " checked" : ""} type="checkbox">Precio incluye impuesto</label>`);
				if (!isProduct.value) _push(`<label class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox">Servicio activo</label>`);
				else _push(`<!---->`);
				_push(`</div><!--[-->`);
				ssrRenderList(unref(form).errors, (error, key) => {
					_push(`<p class="text-sm text-red-600">${ssrInterpolate(error)}</p>`);
				});
				_push(`<!--]--><div class="flex gap-3"><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-slate-900 px-5 py-3 text-white"> Guardar</button><button type="button" class="rounded-lg border px-5 py-3"> Cancelar </button></div></form>`);
			} else _push(`<!---->`);
			_push(`<div class="my-6 flex flex-wrap gap-5"><form class="flex gap-3" style="${ssrRenderStyle(activeSection.value === "catalogo" ? null : { display: "none" })}"><input${ssrRenderAttr("value", search.value)} placeholder="Buscar en el catálogo" aria-label="Buscar en el catálogo" class="rounded-lg border-slate-300"><button class="rounded-lg bg-slate-900 px-4 text-white"> Buscar </button></form><form role="tabpanel" aria-label="Importar Excel" class="flex flex-wrap items-center gap-3" style="${ssrRenderStyle(activeSection.value === "importar" ? null : { display: "none" })}"><a${ssrRenderAttr("href", _ctx.route(`${prefix.value}.import.template`, params))} class="text-sm text-orange-600">Descargar plantilla</a><input type="file" accept=".xlsx,.xls,.csv" aria-label="Archivo de catálogo" class="max-w-xs text-sm"><button${ssrIncludeBooleanAttr(!unref(upload).workbook || unref(upload).processing) ? " disabled" : ""} class="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"> Importar Excel </button><!--[-->`);
			ssrRenderList(unref(upload).errors, (error, key) => {
				_push(`<p class="text-red-600">${ssrInterpolate(error)}</p>`);
			});
			_push(`<!--]--></form></div>`);
			if (_ctx.$page.props.flash?.import_summary?.error_rows) {
				_push(`<div class="mb-5 rounded-xl bg-amber-50 p-4 text-sm"><!--[-->`);
				ssrRenderList(_ctx.$page.props.flash.import_summary.errors, (error, i) => {
					_push(`<p> Fila ${ssrInterpolate(error.row)}: ${ssrInterpolate(error.message)}</p>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<section role="tabpanel" aria-label="Catálogo" class="overflow-x-auto rounded-2xl border border-slate-200 bg-white" style="${ssrRenderStyle(activeSection.value === "catalogo" ? null : { display: "none" })}"><table class="w-full text-left text-sm"><thead class="bg-slate-50"><tr><th class="p-4">Nombre</th><th class="p-4">Código</th><th class="p-4">Precio</th><th class="p-4">Impuesto</th><th class="p-4">Editar</th></tr></thead><tbody><!--[-->`);
			ssrRenderList(__props.records.data, (record) => {
				_push(`<tr class="border-t border-slate-100"><td class="p-4">${ssrInterpolate(record.name)}</td><td class="p-4">${ssrInterpolate(record.sku || record.code || "—")}</td><td class="p-4">${ssrInterpolate(money(record.selling_price))}</td><td class="p-4">${ssrInterpolate(record.tax_included ? "Incluido" : "Se agrega al cotizar")}</td><td class="p-4"><button class="text-orange-600"> Editar </button></td></tr>`);
			});
			_push(`<!--]--></tbody></table>`);
			if (!__props.records.data.length) _push(`<p class="p-8 text-slate-500"> Agrega un ítem o importa tu catálogo desde Excel. </p>`);
			else _push(`<!---->`);
			_push(`</section><div class="mt-5 flex gap-4" style="${ssrRenderStyle(activeSection.value === "catalogo" ? null : { display: "none" })}">`);
			if (__props.records.prev_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.records.prev_page_url }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Anterior`);
					else return [createTextVNode("← Anterior")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			if (__props.records.next_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.records.next_page_url }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Siguiente →`);
					else return [createTextVNode("Siguiente →")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$25 = _sfc_main$25.setup;
_sfc_main$25.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommercialCatalog.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Inventory/Index.vue
var Index_exports$3 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$24 });
var _sfc_main$24 = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		products: Object,
		filters: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Productos" }, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$25, {
							records: __props.products,
							filters: __props.filters,
							kind: "product"
						}, null, _parent, _scopeId));
					} else return [createVNode(unref(Head), { title: "Productos" }), createVNode(_sfc_main$25, {
						records: __props.products,
						filters: __props.filters,
						kind: "product"
					}, null, 8, ["records", "filters"])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$24 = _sfc_main$24.setup;
_sfc_main$24.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inventory/Index.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Modal.vue
var _sfc_main$23 = {
	__name: "Modal",
	__ssrInlineRender: true,
	props: {
		show: {
			type: Boolean,
			default: false
		},
		maxWidth: {
			type: String,
			default: "2xl"
		},
		closeable: {
			type: Boolean,
			default: true
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const dialog = ref();
		const showSlot = ref(props.show);
		watch(() => props.show, () => {
			if (props.show) {
				document.body.style.overflow = "hidden";
				showSlot.value = true;
				dialog.value?.showModal();
			} else {
				document.body.style.overflow = "";
				setTimeout(() => {
					dialog.value?.close();
					showSlot.value = false;
				}, 200);
			}
		});
		const close = () => {
			if (props.closeable) emit("close");
		};
		const closeOnEscape = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				if (props.show) close();
			}
		};
		onMounted(() => document.addEventListener("keydown", closeOnEscape));
		onUnmounted(() => {
			document.removeEventListener("keydown", closeOnEscape);
			document.body.style.overflow = "";
		});
		const maxWidthClass = computed(() => {
			return {
				sm: "sm:max-w-sm",
				md: "sm:max-w-md",
				lg: "sm:max-w-lg",
				xl: "sm:max-w-xl",
				"2xl": "sm:max-w-2xl"
			}[props.maxWidth];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<dialog${ssrRenderAttrs(mergeProps({
				class: "z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent",
				ref_key: "dialog",
				ref: dialog
			}, _attrs))}><div class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0" scroll-region><div class="fixed inset-0 transform transition-all" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div class="${ssrRenderClass([maxWidthClass.value, "mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full"])}" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}">`);
			if (showSlot.value) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else _push(`<!---->`);
			_push(`</div></div></dialog>`);
		};
	}
};
var _sfc_setup$23 = _sfc_main$23.setup;
_sfc_main$23.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ForgotPasswordModal.vue
var _sfc_main$22 = {
	__name: "ForgotPasswordModal",
	__ssrInlineRender: true,
	props: {
		show: {
			type: Boolean,
			default: false
		},
		maxWidth: {
			type: String,
			default: "md"
		},
		closeable: {
			type: Boolean,
			default: true
		},
		initialEmail: {
			type: String,
			default: ""
		}
	},
	emits: ["close", "back-to-login"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const statusMessage = ref("");
		const form = useForm({ email: props.initialEmail });
		watch(() => props.show, (newVal) => {
			if (newVal) {
				statusMessage.value = "";
				if (props.initialEmail) form.email = props.initialEmail;
			}
		});
		const submit = () => {
			statusMessage.value = "";
			form.post(route("password.email"), { onSuccess: (page) => {
				statusMessage.value = page.props.flash?.status || "Hemos enviado el código y enlace de recuperación a tu correo electrónico.";
			} });
		};
		const close = () => {
			emit("close");
			form.reset();
			form.clearErrors();
			statusMessage.value = "";
		};
		const handleBackToLogin = () => {
			close();
			emit("back-to-login");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$23, mergeProps({
				show: __props.show,
				"max-width": __props.maxWidth,
				closeable: __props.closeable,
				onClose: close
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-8"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-black text-gray-900 tracking-tight"${_scopeId}>Recuperar Contraseña</h2><p class="text-sm text-gray-500 mt-1"${_scopeId}>Ingresa tu correo para enviarte un código y enlace de recuperación</p></div><button class="text-gray-400 hover:text-gray-600 transition-colors"${_scopeId}><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
						if (statusMessage.value) _push(`<div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3"${_scopeId}><svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><div${_scopeId}><p class="font-semibold"${_scopeId}>¡Correo enviado con éxito!</p><p class="mt-0.5 text-emerald-700"${_scopeId}>${ssrInterpolate(statusMessage.value)}</p></div></div>`);
						else _push(`<!---->`);
						_push(`<form class="space-y-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "recovery_email",
							value: "Correo electrónico",
							class: "text-gray-700 font-semibold mb-1.5"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "recovery_email",
							type: "email",
							class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username",
							placeholder: "ej: usuario@empresa.com"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2 text-sm text-red-600 font-medium",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-3 pt-2"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all active:scale-[0.98] text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Verificando y enviando... </span>`);
								else _push(`<span${_scopeId}>Enviar código y enlace</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", {
									key: 0,
									class: "flex items-center gap-2"
								}, [(openBlock(), createBlock("svg", {
									class: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24"
								}, [createVNode("circle", {
									class: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									"stroke-width": "4"
								}), createVNode("path", {
									class: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								})])), createTextVNode(" Verificando y enviando... ")])) : (openBlock(), createBlock("span", { key: 1 }, "Enviar código y enlace"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<button type="button" class="w-full py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors text-center block"${_scopeId}> ← Volver a iniciar sesión </button></div></form></div>`);
					} else return [createVNode("div", { class: "p-8" }, [
						createVNode("div", { class: "flex items-center justify-between mb-6" }, [createVNode("div", null, [createVNode("h2", { class: "text-2xl font-black text-gray-900 tracking-tight" }, "Recuperar Contraseña"), createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Ingresa tu correo para enviarte un código y enlace de recuperación")]), createVNode("button", {
							onClick: close,
							class: "text-gray-400 hover:text-gray-600 transition-colors"
						}, [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M6 18L18 6M6 6l12 12"
						})]))])]),
						statusMessage.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3"
						}, [(openBlock(), createBlock("svg", {
							class: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						})])), createVNode("div", null, [createVNode("p", { class: "font-semibold" }, "¡Correo enviado con éxito!"), createVNode("p", { class: "mt-0.5 text-emerald-700" }, toDisplayString(statusMessage.value), 1)])])) : createCommentVNode("", true),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-6"
						}, [createVNode("div", null, [
							createVNode(_sfc_main$45, {
								for: "recovery_email",
								value: "Correo electrónico",
								class: "text-gray-700 font-semibold mb-1.5"
							}),
							createVNode(_sfc_main$37, {
								id: "recovery_email",
								type: "email",
								class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
								modelValue: unref(form).email,
								"onUpdate:modelValue": ($event) => unref(form).email = $event,
								required: "",
								autofocus: "",
								autocomplete: "username",
								placeholder: "ej: usuario@empresa.com"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								class: "mt-2 text-sm text-red-600 font-medium",
								message: unref(form).errors.email
							}, null, 8, ["message"])
						]), createVNode("div", { class: "space-y-3 pt-2" }, [createVNode(PrimaryButton_default, {
							class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all active:scale-[0.98] text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", {
								key: 0,
								class: "flex items-center gap-2"
							}, [(openBlock(), createBlock("svg", {
								class: "animate-spin h-5 w-5 text-white",
								xmlns: "http://www.w3.org/2000/svg",
								fill: "none",
								viewBox: "0 0 24 24"
							}, [createVNode("circle", {
								class: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								"stroke-width": "4"
							}), createVNode("path", {
								class: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})])), createTextVNode(" Verificando y enviando... ")])) : (openBlock(), createBlock("span", { key: 1 }, "Enviar código y enlace"))]),
							_: 1
						}, 8, ["class", "disabled"]), createVNode("button", {
							type: "button",
							onClick: handleBackToLogin,
							class: "w-full py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors text-center block"
						}, " ← Volver a iniciar sesión ")])], 32)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$22 = _sfc_main$22.setup;
_sfc_main$22.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ForgotPasswordModal.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/LoginModal.vue
var _sfc_main$21 = {
	__name: "LoginModal",
	__ssrInlineRender: true,
	props: {
		show: {
			type: Boolean,
			default: false
		},
		maxWidth: {
			type: String,
			default: "md"
		},
		closeable: {
			type: Boolean,
			default: true
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const showForgotPasswordModal = ref(false);
		const form = useForm({
			email: "",
			password: "",
			remember: false
		});
		const submit = () => {
			form.post(route("login"), {
				onFinish: () => form.reset("password"),
				onSuccess: () => {
					close();
				}
			});
		};
		const close = () => {
			emit("close");
			form.reset();
			form.clearErrors();
		};
		const openForgotPassword = () => {
			const currentEmail = form.email;
			close();
			form.email = currentEmail;
			showForgotPasswordModal.value = true;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$23, {
				show: __props.show,
				"max-width": __props.maxWidth,
				closeable: __props.closeable,
				onClose: close
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-8"${_scopeId}><div class="flex items-center justify-between mb-8"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-black text-gray-900 tracking-tight"${_scopeId}> Iniciar Sesión </h2><p class="text-sm text-gray-500 mt-1"${_scopeId}> Ingresa tus credenciales para continuar </p></div><button class="text-gray-400 hover:text-gray-600 transition-colors"${_scopeId}><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "modal_email",
							value: "Correo electrónico",
							class: "text-gray-700 font-semibold mb-1.5"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$37, {
							id: "modal_email",
							type: "email",
							class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username",
							placeholder: "ej: nombre@empresa.com"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}><div class="flex items-center justify-between mb-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "modal_password",
							value: "Contraseña",
							class: "text-gray-700 font-semibold"
						}, null, _parent, _scopeId));
						_push(`<button type="button" class="text-xs font-semibold text-tech-orange hover:text-[#CC6200] transition-colors focus:outline-none"${_scopeId}> Recuperar contraseña </button></div>`);
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "modal_password",
							class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password",
							placeholder: "••••••••"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="flex items-center"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$34, {
							name: "remember",
							checked: unref(form).remember,
							"onUpdate:checked": ($event) => unref(form).remember = $event,
							id: "modal_remember"
						}, null, _parent, _scopeId));
						_push(`<label for="modal_remember" class="ms-2 text-sm text-gray-600 font-medium cursor-pointer selection:bg-transparent"${_scopeId}> Recordar sesión </label></div><div class="pt-2"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all active:scale-[0.98] text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span class="flex items-center gap-2"${_scopeId}><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Iniciando... </span>`);
								else _push(`<span${_scopeId}>Entrar a mi cuenta</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", {
									key: 0,
									class: "flex items-center gap-2"
								}, [(openBlock(), createBlock("svg", {
									class: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24"
								}, [createVNode("circle", {
									class: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									"stroke-width": "4"
								}), createVNode("path", {
									class: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								})])), createTextVNode(" Iniciando... ")])) : (openBlock(), createBlock("span", { key: 1 }, "Entrar a mi cuenta"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form><div class="mt-8 pt-6 border-t border-gray-100 text-center"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}> ¿No tienes una cuenta? <a href="#" class="font-bold text-gray-900 hover:text-tech-orange transition-colors"${_scopeId}>Solicitar acceso</a></p></div></div>`);
					} else return [createVNode("div", { class: "p-8" }, [
						createVNode("div", { class: "flex items-center justify-between mb-8" }, [createVNode("div", null, [createVNode("h2", { class: "text-2xl font-black text-gray-900 tracking-tight" }, " Iniciar Sesión "), createVNode("p", { class: "text-sm text-gray-500 mt-1" }, " Ingresa tus credenciales para continuar ")]), createVNode("button", {
							onClick: close,
							class: "text-gray-400 hover:text-gray-600 transition-colors"
						}, [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M6 18L18 6M6 6l12 12"
						})]))])]),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-6"
						}, [
							createVNode("div", null, [
								createVNode(_sfc_main$45, {
									for: "modal_email",
									value: "Correo electrónico",
									class: "text-gray-700 font-semibold mb-1.5"
								}),
								createVNode(_sfc_main$37, {
									id: "modal_email",
									type: "email",
									class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
									modelValue: unref(form).email,
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									required: "",
									autofocus: "",
									autocomplete: "username",
									placeholder: "ej: nombre@empresa.com"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.email
								}, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode("div", { class: "flex items-center justify-between mb-1.5" }, [createVNode(_sfc_main$45, {
									for: "modal_password",
									value: "Contraseña",
									class: "text-gray-700 font-semibold"
								}), createVNode("button", {
									type: "button",
									onClick: openForgotPassword,
									class: "text-xs font-semibold text-tech-orange hover:text-[#CC6200] transition-colors focus:outline-none"
								}, " Recuperar contraseña ")]),
								createVNode(_sfc_main$46, {
									id: "modal_password",
									class: "block w-full border-gray-200 focus:border-tech-orange focus:ring-tech-orange rounded-xl shadow-sm h-12",
									modelValue: unref(form).password,
									"onUpdate:modelValue": ($event) => unref(form).password = $event,
									required: "",
									autocomplete: "current-password",
									placeholder: "••••••••"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$44, {
									class: "mt-2",
									message: unref(form).errors.password
								}, null, 8, ["message"])
							]),
							createVNode("div", { class: "flex items-center" }, [createVNode(_sfc_main$34, {
								name: "remember",
								checked: unref(form).remember,
								"onUpdate:checked": ($event) => unref(form).remember = $event,
								id: "modal_remember"
							}, null, 8, ["checked", "onUpdate:checked"]), createVNode("label", {
								for: "modal_remember",
								class: "ms-2 text-sm text-gray-600 font-medium cursor-pointer selection:bg-transparent"
							}, " Recordar sesión ")]),
							createVNode("div", { class: "pt-2" }, [createVNode(PrimaryButton_default, {
								class: ["w-full h-12 justify-center bg-tech-orange hover:bg-[#CC6200] text-white font-bold rounded-xl shadow-lg shadow-tech-orange/20 transition-all active:scale-[0.98] text-base", { "opacity-25 pointer-events-none": unref(form).processing }],
								disabled: unref(form).processing
							}, {
								default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", {
									key: 0,
									class: "flex items-center gap-2"
								}, [(openBlock(), createBlock("svg", {
									class: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24"
								}, [createVNode("circle", {
									class: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									"stroke-width": "4"
								}), createVNode("path", {
									class: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								})])), createTextVNode(" Iniciando... ")])) : (openBlock(), createBlock("span", { key: 1 }, "Entrar a mi cuenta"))]),
								_: 1
							}, 8, ["class", "disabled"])])
						], 32),
						createVNode("div", { class: "mt-8 pt-6 border-t border-gray-100 text-center" }, [createVNode("p", { class: "text-sm text-gray-500" }, [createTextVNode(" ¿No tienes una cuenta? "), createVNode("a", {
							href: "#",
							class: "font-bold text-gray-900 hover:text-tech-orange transition-colors"
						}, "Solicitar acceso")])])
					])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$22, {
				show: showForgotPasswordModal.value,
				"initial-email": unref(form).email,
				onClose: ($event) => showForgotPasswordModal.value = false,
				onBackToLogin: ($event) => {
					showForgotPasswordModal.value = false;
					emit("open-login");
				}
			}, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$21 = _sfc_main$21.setup;
_sfc_main$21.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LoginModal.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/PublicNav.vue
var _sfc_main$20 = {
	__name: "PublicNav",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const loginOpen = ref(new URLSearchParams(window.location.search).get("login") === "1");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "border-b border-slate-200 bg-white" }, _attrs))}><nav aria-label="Navegación principal" class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "flex items-center gap-3 text-2xl font-bold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$47, { class: "h-10 w-10" }, null, _parent, _scopeId));
						_push(`<span${_scopeId}>Cotiza<span class="text-orange-500"${_scopeId}>Flow</span></span>`);
					} else return [createVNode(_sfc_main$47, { class: "h-10 w-10" }), createVNode("span", null, [createTextVNode("Cotiza"), createVNode("span", { class: "text-orange-500" }, "Flow")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex flex-wrap items-center gap-5 text-sm">`);
			_push(ssrRenderComponent(unref(Link), { href: _ctx.route("servicios") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Funciones`);
					else return [createTextVNode("Funciones")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), { href: _ctx.route("pricing") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Planes`);
					else return [createTextVNode("Planes")];
				}),
				_: 1
			}, _parent));
			if (unref(page).props.auth?.user) _push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("dashboard"),
				class: "rounded-lg bg-orange-500 px-4 py-2 text-white"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Ir a mi cuenta`);
					else return [createTextVNode("Ir a mi cuenta")];
				}),
				_: 1
			}, _parent));
			else _push(`<button class="rounded-lg bg-orange-500 px-4 py-2 text-white"> Iniciar sesión </button>`);
			_push(`</div></nav>`);
			_push(ssrRenderComponent(_sfc_main$21, {
				show: loginOpen.value,
				onClose: ($event) => loginOpen.value = false,
				onOpenLogin: ($event) => loginOpen.value = true
			}, null, _parent));
			_push(`</header>`);
		};
	}
};
var _sfc_setup$20 = _sfc_main$20.setup;
_sfc_main$20.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PublicNav.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/PublicFooter.vue
var _sfc_main$19 = {
	__name: "PublicFooter",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-slate-200 bg-white" }, _attrs))}><div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 text-sm text-slate-500"><span>CotizaFlow · Cotizaciones y seguimiento para pymes.</span>`);
			_push(ssrRenderComponent(unref(Link), { href: _ctx.route("trial.create") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Solicitar acceso`);
					else return [createTextVNode("Solicitar acceso")];
				}),
				_: 1
			}, _parent));
			_push(`</div></footer>`);
		};
	}
};
var _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PublicFooter.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Pricing.vue
var Pricing_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$18 });
var _sfc_main$18 = {
	__name: "Pricing",
	__ssrInlineRender: true,
	setup(__props) {
		const plans = [
			{
				name: "Emprendedor",
				text: "Para independientes y microempresas que comienzan a ordenar sus cotizaciones."
			},
			{
				name: "Pyme",
				text: "Para empresas que cotizan con frecuencia y necesitan hacer seguimiento."
			},
			{
				name: "Equipo",
				text: "Para empresas con varias personas en su proceso comercial."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Head), { title: "Planes" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$20, null, null, _parent));
			_push(`<main class="mx-auto max-w-6xl px-5 py-16"><h1 class="text-4xl font-bold"> Un plan para cada etapa de tu empresa </h1><p class="mt-4 text-lg text-slate-600"> Estamos preparando los planes y sus límites. Puedes solicitar acceso a la versión inicial. </p><div class="mt-10 grid gap-6 md:grid-cols-3"><!--[-->`);
			ssrRenderList(plans, (plan) => {
				_push(`<article class="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-8"><h2 class="text-2xl font-semibold">${ssrInterpolate(plan.name)}</h2><p class="text-slate-600">${ssrInterpolate(plan.text)}</p><span class="text-sm text-slate-500">Precio e inclusiones por confirmar</span>`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("trial.create"),
					class: "font-semibold text-orange-600"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Solicitar información →`);
						else return [createTextVNode("Solicitar información →")];
					}),
					_: 2
				}, _parent));
				_push(`</article>`);
			});
			_push(`<!--]--></div></main>`);
			_push(ssrRenderComponent(_sfc_main$19, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Pricing.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/AuthenticatedLayout.vue
var _sfc_main$17 = {
	__name: "AuthenticatedLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent, _scopeId);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					} else return [renderSlot(_ctx.$slots, "header"), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/DangerButton.vue
var _sfc_main$16 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</button>`);
}
var _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var DangerButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$16, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region resources/js/Components/SecondaryButton.vue
var _sfc_main$15 = {
	__name: "SecondaryButton",
	__ssrInlineRender: true,
	props: { type: {
		type: String,
		default: "button"
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: __props.type,
				class: "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</button>`);
		};
	}
};
var _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryButton.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Profile/Partials/DeleteUserForm.vue
var DeleteUserForm_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$14 });
var _sfc_main$14 = {
	__name: "DeleteUserForm",
	__ssrInlineRender: true,
	setup(__props) {
		const confirmingUserDeletion = ref(false);
		const passwordInput = ref(null);
		const form = useForm({ password: "" });
		const confirmUserDeletion = () => {
			confirmingUserDeletion.value = true;
			nextTick(() => passwordInput.value.focus());
		};
		const deleteUser = () => {
			form.delete(route("profile.destroy"), {
				preserveScroll: true,
				onSuccess: () => closeModal(),
				onError: () => passwordInput.value.focus(),
				onFinish: () => form.reset()
			});
		};
		const closeModal = () => {
			confirmingUserDeletion.value = false;
			form.clearErrors();
			form.reset();
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-medium text-gray-900"> Delete Account </h2><p class="mt-1 text-sm text-gray-600"> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </p></header>`);
			_push(ssrRenderComponent(DangerButton_default, { onClick: confirmUserDeletion }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Delete Account`);
					else return [createTextVNode("Delete Account")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$23, {
				show: confirmingUserDeletion.value,
				onClose: closeModal
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}> Are you sure you want to delete your account? </h2><p class="mt-1 text-sm text-gray-600"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. </p><div class="mt-6"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$45, {
							for: "password",
							value: "Password",
							class: "sr-only"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$46, {
							id: "password",
							ref_key: "passwordInput",
							ref: passwordInput,
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							class: "mt-1 block w-3/4",
							placeholder: "Password",
							onKeyup: deleteUser
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$44, {
							message: unref(form).errors.password,
							class: "mt-2"
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-6 flex justify-end"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$15, { onClick: closeModal }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Cancel `);
								else return [createTextVNode(" Cancel ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(DangerButton_default, {
							class: ["ms-3", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing,
							onClick: deleteUser
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Delete Account `);
								else return [createTextVNode(" Delete Account ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "p-6" }, [
						createVNode("h2", { class: "text-lg font-medium text-gray-900" }, " Are you sure you want to delete your account? "),
						createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
						createVNode("div", { class: "mt-6" }, [
							createVNode(_sfc_main$45, {
								for: "password",
								value: "Password",
								class: "sr-only"
							}),
							createVNode(_sfc_main$46, {
								id: "password",
								ref_key: "passwordInput",
								ref: passwordInput,
								modelValue: unref(form).password,
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								class: "mt-1 block w-3/4",
								placeholder: "Password",
								onKeyup: withKeys(deleteUser, ["enter"])
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$44, {
								message: unref(form).errors.password,
								class: "mt-2"
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-6 flex justify-end" }, [createVNode(_sfc_main$15, { onClick: closeModal }, {
							default: withCtx(() => [createTextVNode(" Cancel ")]),
							_: 1
						}), createVNode(DangerButton_default, {
							class: ["ms-3", { "opacity-25": unref(form).processing }],
							disabled: unref(form).processing,
							onClick: deleteUser
						}, {
							default: withCtx(() => [createTextVNode(" Delete Account ")]),
							_: 1
						}, 8, ["class", "disabled"])])
					])];
				}),
				_: 1
			}, _parent));
			_push(`</section>`);
		};
	}
};
var _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue
var UpdatePasswordForm_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$13 });
var _sfc_main$13 = {
	__name: "UpdatePasswordForm",
	__ssrInlineRender: true,
	setup(__props) {
		const passwordInput = ref(null);
		const currentPasswordInput = ref(null);
		const form = useForm({
			current_password: "",
			password: "",
			password_confirmation: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-gray-900"> Update Password </h2><p class="mt-1 text-sm text-gray-600"> Ensure your account is using a long, random password to stay secure. </p></header><form class="mt-6 space-y-6"><div>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "current_password",
				value: "Current Password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$46, {
				id: "current_password",
				ref_key: "currentPasswordInput",
				ref: currentPasswordInput,
				modelValue: unref(form).current_password,
				"onUpdate:modelValue": ($event) => unref(form).current_password = $event,
				class: "mt-1 block w-full",
				autocomplete: "current-password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				message: unref(form).errors.current_password,
				class: "mt-2"
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "password",
				value: "New Password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$46, {
				id: "password",
				ref_key: "passwordInput",
				ref: passwordInput,
				modelValue: unref(form).password,
				"onUpdate:modelValue": ($event) => unref(form).password = $event,
				class: "mt-1 block w-full",
				autocomplete: "new-password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				message: unref(form).errors.password,
				class: "mt-2"
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "password_confirmation",
				value: "Confirm Password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$46, {
				id: "password_confirmation",
				modelValue: unref(form).password_confirmation,
				"onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
				class: "mt-1 block w-full",
				autocomplete: "new-password"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				message: unref(form).errors.password_confirmation,
				class: "mt-2"
			}, null, _parent));
			_push(`</div><div class="flex items-center gap-4">`);
			_push(ssrRenderComponent(PrimaryButton_default, { disabled: unref(form).processing }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Save`);
					else return [createTextVNode("Save")];
				}),
				_: 1
			}, _parent));
			if (unref(form).recentlySuccessful) _push(`<p class="text-sm text-gray-600"> Saved. </p>`);
			else _push(`<!---->`);
			_push(`</div></form></section>`);
		};
	}
};
var _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue
var UpdateProfileInformationForm_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$12 });
var _sfc_main$12 = {
	__name: "UpdateProfileInformationForm",
	__ssrInlineRender: true,
	props: {
		mustVerifyEmail: { type: Boolean },
		status: { type: String }
	},
	setup(__props) {
		const user = usePage().props.auth.user;
		const form = useForm({
			name: user.name,
			email: user.email
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-gray-900"> Profile Information </h2><p class="mt-1 text-sm text-gray-600"> Update your account&#39;s profile information and email address. </p></header><form class="mt-6 space-y-6"><div>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "name",
				value: "Name"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$37, {
				id: "name",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).name,
				"onUpdate:modelValue": ($event) => unref(form).name = $event,
				required: "",
				autofocus: "",
				autocomplete: "name"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				class: "mt-2",
				message: unref(form).errors.name
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$45, {
				for: "email",
				value: "Email"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$37, {
				id: "email",
				type: "email",
				class: "mt-1 block w-full",
				modelValue: unref(form).email,
				"onUpdate:modelValue": ($event) => unref(form).email = $event,
				required: "",
				autocomplete: "username"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$44, {
				class: "mt-2",
				message: unref(form).errors.email
			}, null, _parent));
			_push(`</div>`);
			if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
				_push(`<div><p class="mt-2 text-sm text-gray-800"> Your email address is unverified. `);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("verification.send"),
					method: "post",
					as: "button",
					class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Click here to re-send the verification email. `);
						else return [createTextVNode(" Click here to re-send the verification email. ")];
					}),
					_: 1
				}, _parent));
				_push(`</p><div class="mt-2 text-sm font-medium text-green-600" style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}"> A new verification link has been sent to your email address. </div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="flex items-center gap-4">`);
			_push(ssrRenderComponent(PrimaryButton_default, { disabled: unref(form).processing }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Save`);
					else return [createTextVNode("Save")];
				}),
				_: 1
			}, _parent));
			if (unref(form).recentlySuccessful) _push(`<p class="text-sm text-gray-600"> Saved. </p>`);
			else _push(`<!---->`);
			_push(`</div></form></section>`);
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Profile/Edit.vue
var Edit_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$11 });
var _sfc_main$11 = {
	__name: "Edit",
	__ssrInlineRender: true,
	props: {
		mustVerifyEmail: { type: Boolean },
		status: { type: String }
	},
	setup(__props) {
		const activeSection = ref("perfil");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Mi perfil" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$17, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Mi perfil </h2>`);
					else return [createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Mi perfil ")];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [
								{
									value: "perfil",
									label: "Mi perfil"
								},
								{
									value: "seguridad",
									label: "Seguridad"
								},
								{
									value: "cuenta",
									label: "Cuenta"
								}
							]
						}, null, _parent, _scopeId));
						_push(`<div class="py-4"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$12, {
							"must-verify-email": __props.mustVerifyEmail,
							status: __props.status,
							class: "max-w-xl"
						}, null, _parent, _scopeId));
						_push(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$13, { class: "max-w-xl" }, null, _parent, _scopeId));
						_push(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$14, { class: "max-w-xl" }, null, _parent, _scopeId));
						_push(`</div></div></div>`);
					} else return [createVNode(_sfc_main$29, {
						modelValue: activeSection.value,
						"onUpdate:modelValue": ($event) => activeSection.value = $event,
						items: [
							{
								value: "perfil",
								label: "Mi perfil"
							},
							{
								value: "seguridad",
								label: "Seguridad"
							},
							{
								value: "cuenta",
								label: "Cuenta"
							}
						]
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "py-4" }, [createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [createVNode(_sfc_main$12, {
							"must-verify-email": __props.mustVerifyEmail,
							status: __props.status,
							class: "max-w-xl"
						}, null, 8, ["must-verify-email", "status"])]),
						createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [createVNode(_sfc_main$13, { class: "max-w-xl" })]),
						createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [createVNode(_sfc_main$14, { class: "max-w-xl" })])
					])])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Quotes/Create.vue
var Create_exports$1 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$10 });
var _sfc_main$10 = {
	__name: "Create",
	__ssrInlineRender: true,
	props: { clients: Array },
	setup(__props) {
		const params = { tenantBySlug: usePage().props.tenant?.slug };
		const activeSection = ref("cliente");
		const submit = () => {
			if (!form.client_id) {
				activeSection.value = "cliente";
				form.setError("client_id", "Selecciona un cliente.");
				return;
			}
			form.post(route("quotes.store", params), { onError: (errors) => {
				activeSection.value = errors.client_id ? "cliente" : "condiciones";
			} });
		};
		const form = useForm({
			client_id: "",
			notes: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nueva cotización" }, null, _parent, _scopeId));
						_push(`<h1 class="text-3xl font-bold"${_scopeId}>Nueva cotización</h1>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "cliente",
								label: "Cliente"
							}, {
								value: "condiciones",
								label: "Condiciones"
							}]
						}, null, _parent, _scopeId));
						_push(`<form class="mt-6 flex max-w-2xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7"${_scopeId}><label class="flex flex-col gap-2 font-medium" style="${ssrRenderStyle(activeSection.value === "cliente" ? null : { display: "none" })}"${_scopeId}>Cliente<select class="rounded-lg border-slate-300"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).client_id) ? ssrLooseContain(unref(form).client_id, "") : ssrLooseEqual(unref(form).client_id, "")) ? " selected" : ""}${_scopeId}>Selecciona un cliente</option><!--[-->`);
						ssrRenderList(__props.clients, (client) => {
							_push(`<option${ssrRenderAttr("value", client.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).client_id) ? ssrLooseContain(unref(form).client_id, client.id) : ssrLooseEqual(unref(form).client_id, client.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(client.name)} · ${ssrInterpolate(client.rut)}</option>`);
						});
						_push(`<!--]--></select></label>`);
						_push(ssrRenderComponent(unref(Link), {
							style: activeSection.value === "cliente" ? null : { display: "none" },
							href: _ctx.route("clients.index", params),
							class: "text-sm text-orange-600"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Agregar o revisar clientes →`);
								else return [createTextVNode("Agregar o revisar clientes →")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<label class="flex flex-col gap-2 font-medium" style="${ssrRenderStyle(activeSection.value === "condiciones" ? null : { display: "none" })}"${_scopeId}>Notas y condiciones<textarea maxlength="1000" rows="4" class="rounded-lg border-slate-300"${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></label><!--[-->`);
						ssrRenderList(unref(form).errors, (error, key) => {
							_push(`<p class="text-sm text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
						});
						_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(form).processing || !__props.clients.length) ? " disabled" : ""} class="self-start rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:opacity-50"${_scopeId}> Crear cotización </button></form>`);
					} else return [
						createVNode(unref(Head), { title: "Nueva cotización" }),
						createVNode("h1", { class: "text-3xl font-bold" }, "Nueva cotización"),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [{
								value: "cliente",
								label: "Cliente"
							}, {
								value: "condiciones",
								label: "Condiciones"
							}]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "mt-6 flex max-w-2xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7"
						}, [
							withDirectives(createVNode("label", { class: "flex flex-col gap-2 font-medium" }, [createTextVNode("Cliente"), withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => unref(form).client_id = $event,
								class: "rounded-lg border-slate-300"
							}, [createVNode("option", {
								value: "",
								disabled: ""
							}, "Selecciona un cliente"), (openBlock(true), createBlock(Fragment, null, renderList(__props.clients, (client) => {
								return openBlock(), createBlock("option", {
									key: client.id,
									value: client.id
								}, toDisplayString(client.name) + " · " + toDisplayString(client.rut), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).client_id]])], 512), [[vShow, activeSection.value === "cliente"]]),
							withDirectives(createVNode(unref(Link), {
								href: _ctx.route("clients.index", params),
								class: "text-sm text-orange-600"
							}, {
								default: withCtx(() => [createTextVNode("Agregar o revisar clientes →")]),
								_: 1
							}, 8, ["href"]), [[vShow, activeSection.value === "cliente"]]),
							withDirectives(createVNode("label", { class: "flex flex-col gap-2 font-medium" }, [createTextVNode("Notas y condiciones"), withDirectives(createVNode("textarea", {
								"onUpdate:modelValue": ($event) => unref(form).notes = $event,
								maxlength: "1000",
								rows: "4",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).notes]])], 512), [[vShow, activeSection.value === "condiciones"]]),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(form).errors, (error, key) => {
								return openBlock(), createBlock("p", {
									key,
									class: "text-sm text-red-600"
								}, toDisplayString(error), 1);
							}), 128)),
							createVNode("button", {
								disabled: unref(form).processing || !__props.clients.length,
								class: "self-start rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
							}, " Crear cotización ", 8, ["disabled"])
						], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quotes/Create.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Quotes/Index.vue
var Index_exports$2 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$9 });
var _sfc_main$9 = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		quotes: Object,
		filters: Object,
		followUp: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const page = usePage();
		const params = { tenantBySlug: page.props.tenant?.slug };
		const search = ref(props.filters?.search || "");
		const labels = {
			draft: "Borrador",
			pending_customer: "Pendiente",
			accepted: "Aceptada",
			rejected: "Rechazada"
		};
		const money = (value) => new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP"
		}).format(Number(value));
		const canManage = page.props.auth.user.is_super_admin || page.props.auth.user.permissions.includes("quotes.manage");
		const days = (date) => date ? Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 864e5)) : 0;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: __props.followUp ? "Seguimiento" : "Cotizaciones" }, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>${ssrInterpolate(__props.followUp ? "Seguimiento comercial" : "Cotizaciones")}</h1><p class="mt-2 text-slate-500"${_scopeId}>${ssrInterpolate(__props.followUp ? "Cotizaciones que esperan respuesta, ordenadas desde la más antigua." : "Prepara y consulta las propuestas para tus clientes.")}</p></div>`);
						if (unref(canManage)) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.create", params),
							class: "rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva cotización`);
								else return [createTextVNode("Nueva cotización")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div><nav class="cf-section-tabs" aria-label="Vistas de cotización"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.index", params),
							class: { "is-selected": !__props.followUp },
							"aria-current": !__props.followUp ? "page" : void 0
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Todas las cotizaciones`);
								else return [createTextVNode("Todas las cotizaciones")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.follow-up", params),
							class: { "is-selected": __props.followUp },
							"aria-current": __props.followUp ? "page" : void 0
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Pendientes de respuesta`);
								else return [createTextVNode("Pendientes de respuesta")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</nav>`);
						if (!__props.followUp) _push(`<form class="my-6 flex gap-3"${_scopeId}><input${ssrRenderAttr("value", search.value)} aria-label="Buscar cotizaciones" placeholder="Buscar por cliente o RUT" class="w-full max-w-md rounded-lg border-slate-300"${_scopeId}><button class="rounded-lg bg-slate-900 px-5 text-white"${_scopeId}> Buscar </button></form>`);
						else _push(`<!---->`);
						_push(`<div class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-slate-50"${_scopeId}><tr${_scopeId}><th class="p-4"${_scopeId}>Número</th><th class="p-4"${_scopeId}>Cliente</th><th class="p-4"${_scopeId}>Estado</th>`);
						if (__props.followUp) _push(`<th class="p-4"${_scopeId}>Días pendiente</th>`);
						else _push(`<!---->`);
						_push(`<th class="p-4"${_scopeId}>Total</th><th class="p-4"${_scopeId}>Detalle</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.quotes.data, (quote) => {
							_push(`<tr class="border-t border-slate-100"${_scopeId}><td class="p-4"${_scopeId}>#${ssrInterpolate(quote.id)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(quote.client?.name)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(labels[quote.status])}</td>`);
							if (__props.followUp) _push(`<td class="p-4"${_scopeId}>${ssrInterpolate(days(quote.sent_at))}</td>`);
							else _push(`<!---->`);
							_push(`<td class="p-4"${_scopeId}>${ssrInterpolate(money(quote.total_amount))}</td><td class="p-4"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("quotes.show", {
									...params,
									quote: quote.id
								}),
								class: "font-medium text-orange-600"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Abrir`);
									else return [createTextVNode("Abrir")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</td></tr>`);
						});
						_push(`<!--]--></tbody></table>`);
						if (!__props.quotes.data.length) _push(`<p class="p-8 text-slate-500"${_scopeId}>${ssrInterpolate(__props.followUp ? "No hay cotizaciones pendientes de respuesta." : "Aún no hay cotizaciones para mostrar.")}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="mt-5 flex gap-4"${_scopeId}>`);
						if (__props.quotes.prev_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.quotes.prev_page_url }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`← Anterior`);
								else return [createTextVNode("← Anterior")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if (__props.quotes.next_page_url) _push(ssrRenderComponent(unref(Link), { href: __props.quotes.next_page_url }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Siguiente →`);
								else return [createTextVNode("Siguiente →")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [
						createVNode(unref(Head), { title: __props.followUp ? "Seguimiento" : "Cotizaciones" }, null, 8, ["title"]),
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [createVNode("div", null, [createVNode("h1", { class: "text-3xl font-bold" }, toDisplayString(__props.followUp ? "Seguimiento comercial" : "Cotizaciones"), 1), createVNode("p", { class: "mt-2 text-slate-500" }, toDisplayString(__props.followUp ? "Cotizaciones que esperan respuesta, ordenadas desde la más antigua." : "Prepara y consulta las propuestas para tus clientes."), 1)]), unref(canManage) ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: _ctx.route("quotes.create", params),
							class: "rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
						}, {
							default: withCtx(() => [createTextVNode("Nueva cotización")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)]),
						createVNode("nav", {
							class: "cf-section-tabs",
							"aria-label": "Vistas de cotización"
						}, [createVNode(unref(Link), {
							href: _ctx.route("quotes.index", params),
							class: { "is-selected": !__props.followUp },
							"aria-current": !__props.followUp ? "page" : void 0
						}, {
							default: withCtx(() => [createTextVNode("Todas las cotizaciones")]),
							_: 1
						}, 8, [
							"href",
							"class",
							"aria-current"
						]), createVNode(unref(Link), {
							href: _ctx.route("quotes.follow-up", params),
							class: { "is-selected": __props.followUp },
							"aria-current": __props.followUp ? "page" : void 0
						}, {
							default: withCtx(() => [createTextVNode("Pendientes de respuesta")]),
							_: 1
						}, 8, [
							"href",
							"class",
							"aria-current"
						])]),
						!__props.followUp ? (openBlock(), createBlock("form", {
							key: 0,
							onSubmit: withModifiers(($event) => unref(router).get(_ctx.route("quotes.index", params), { search: search.value }), ["prevent"]),
							class: "my-6 flex gap-3"
						}, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => search.value = $event,
							"aria-label": "Buscar cotizaciones",
							placeholder: "Buscar por cliente o RUT",
							class: "w-full max-w-md rounded-lg border-slate-300"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]]), createVNode("button", { class: "rounded-lg bg-slate-900 px-5 text-white" }, " Buscar ")], 40, ["onSubmit"])) : createCommentVNode("", true),
						createVNode("div", { class: "mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white" }, [createVNode("table", { class: "w-full text-left text-sm" }, [createVNode("thead", { class: "bg-slate-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "p-4" }, "Número"),
							createVNode("th", { class: "p-4" }, "Cliente"),
							createVNode("th", { class: "p-4" }, "Estado"),
							__props.followUp ? (openBlock(), createBlock("th", {
								key: 0,
								class: "p-4"
							}, "Días pendiente")) : createCommentVNode("", true),
							createVNode("th", { class: "p-4" }, "Total"),
							createVNode("th", { class: "p-4" }, "Detalle")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.quotes.data, (quote) => {
							return openBlock(), createBlock("tr", {
								key: quote.id,
								class: "border-t border-slate-100"
							}, [
								createVNode("td", { class: "p-4" }, "#" + toDisplayString(quote.id), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(quote.client?.name), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(labels[quote.status]), 1),
								__props.followUp ? (openBlock(), createBlock("td", {
									key: 0,
									class: "p-4"
								}, toDisplayString(days(quote.sent_at)), 1)) : createCommentVNode("", true),
								createVNode("td", { class: "p-4" }, toDisplayString(money(quote.total_amount)), 1),
								createVNode("td", { class: "p-4" }, [createVNode(unref(Link), {
									href: _ctx.route("quotes.show", {
										...params,
										quote: quote.id
									}),
									class: "font-medium text-orange-600"
								}, {
									default: withCtx(() => [createTextVNode("Abrir")]),
									_: 1
								}, 8, ["href"])])
							]);
						}), 128))])]), !__props.quotes.data.length ? (openBlock(), createBlock("p", {
							key: 0,
							class: "p-8 text-slate-500"
						}, toDisplayString(__props.followUp ? "No hay cotizaciones pendientes de respuesta." : "Aún no hay cotizaciones para mostrar."), 1)) : createCommentVNode("", true)]),
						createVNode("div", { class: "mt-5 flex gap-4" }, [__props.quotes.prev_page_url ? (openBlock(), createBlock(unref(Link), {
							key: 0,
							href: __props.quotes.prev_page_url
						}, {
							default: withCtx(() => [createTextVNode("← Anterior")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true), __props.quotes.next_page_url ? (openBlock(), createBlock(unref(Link), {
							key: 1,
							href: __props.quotes.next_page_url
						}, {
							default: withCtx(() => [createTextVNode("Siguiente →")]),
							_: 1
						}, 8, ["href"])) : createCommentVNode("", true)])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quotes/Index.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Quotes/PublicShow.vue
var PublicShow_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$8 });
var _sfc_main$8 = {
	__name: "PublicShow",
	__ssrInlineRender: true,
	props: {
		quote: Object,
		company: Object,
		clientName: String,
		items: Array,
		taxName: String
	},
	setup(__props) {
		const page = usePage();
		const form = useForm({
			decision: "accepted",
			notes: ""
		});
		const labels = {
			pending_customer: "Pendiente de respuesta",
			accepted: "Aceptada",
			rejected: "Rechazada"
		};
		const money = (value) => new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP"
		}).format(Number(value));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 px-5 py-12" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Head), { title: `Cotización #${__props.quote.id}` }, null, _parent));
			_push(`<main class="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10"><header class="flex items-center gap-4">`);
			if (__props.company.logo_url) _push(`<img${ssrRenderAttr("src", __props.company.logo_url)}${ssrRenderAttr("alt", __props.company.name)} class="h-14 w-14 object-contain">`);
			else _push(ssrRenderComponent(_sfc_main$47, { class: "h-12 w-12" }, null, _parent));
			_push(`<div><p class="font-semibold">${ssrInterpolate(__props.company.name)}</p><p class="text-sm text-slate-500"> Cotización preparada con CotizaFlow </p></div></header><h1 class="mt-8 text-3xl font-bold">Cotización #${ssrInterpolate(__props.quote.id)}</h1><p class="mt-3 text-slate-600">Preparada para ${ssrInterpolate(__props.clientName)}</p><p class="mt-2 font-semibold text-orange-600">${ssrInterpolate(labels[__props.quote.status])}</p><div class="my-8 overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr><th class="py-3">Descripción</th><th class="p-3">Cantidad</th><th class="p-3">Descuento</th><th class="p-3">Total</th></tr></thead><tbody><!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(`<tr class="border-t border-slate-100"><td class="py-4">${ssrInterpolate(item.description)}</td><td class="p-3">${ssrInterpolate(item.quantity)}</td><td class="p-3">${ssrInterpolate(item.discount_percent)}%</td><td class="p-3">${ssrInterpolate(money(item.total_price))}</td></tr>`);
			});
			_push(`<!--]--></tbody></table></div><div class="flex flex-col gap-3 border-t pt-5"><p class="flex justify-between"><span>Subtotal</span><span>${ssrInterpolate(money(__props.quote.subtotal_amount))}</span></p><p class="flex justify-between"><span>${ssrInterpolate(__props.taxName)} (${ssrInterpolate(__props.quote.apply_tax ? __props.quote.tax_rate : 0)}%)</span><span>${ssrInterpolate(money(__props.quote.tax_amount))}</span></p><p class="flex justify-between text-xl font-bold"><span>Total</span><span>${ssrInterpolate(money(__props.quote.total_amount))}</span></p></div><p class="mt-6 whitespace-pre-wrap text-slate-600">${ssrInterpolate(__props.quote.notes)}</p>`);
			if (__props.quote.status === "pending_customer") {
				_push(`<section class="mt-8 border-t pt-6"><label class="flex flex-col gap-2">Comentario (opcional)<textarea maxlength="1000" rows="3" class="rounded-lg border-slate-300">${ssrInterpolate(unref(form).notes)}</textarea></label><div class="mt-4 flex flex-wrap gap-3"><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"> Aceptar cotización</button><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl border border-slate-300 px-5 py-3"> Rechazar </button></div><!--[-->`);
				ssrRenderList(unref(form).errors, (error, key) => {
					_push(`<p class="mt-3 text-red-600">${ssrInterpolate(error)}</p>`);
				});
				_push(`<!--]--></section>`);
			} else _push(`<!---->`);
			if (unref(page).props.flash?.success) _push(`<p class="mt-5 text-green-700">${ssrInterpolate(unref(page).props.flash.success)}</p>`);
			else _push(`<!---->`);
			_push(`</main></div>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quotes/PublicShow.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Quotes/Show.vue
var Show_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$7 });
var _sfc_main$7 = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		quote: Object,
		products: Array,
		services: Array,
		taxName: String,
		publicUrl: String,
		whatsAppMessage: String
	},
	setup(__props) {
		const props = __props;
		const page = usePage();
		const params = {
			tenantBySlug: page.props.tenant?.slug,
			quote: props.quote.id
		};
		const can = (permission) => page.props.auth.user.is_super_admin || page.props.auth.user.permissions.includes(permission);
		const editable = computed(() => !["accepted", "rejected"].includes(props.quote.status));
		const labels = {
			draft: "Borrador",
			pending_customer: "Pendiente",
			accepted: "Aceptada",
			rejected: "Rechazada"
		};
		const money = (value) => new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP"
		}).format(Number(value));
		const item = useForm({
			product_id: null,
			service_id: null,
			description: "",
			quantity: 1,
			unit_price: null,
			discount_percent: 0
		});
		const tax = useForm({
			apply_tax: props.quote.apply_tax,
			tax_rate: props.quote.tax_rate
		});
		const send = useForm({ channel: "manual" });
		const source = ref("manual");
		const copied = ref(false);
		const selectSource = () => {
			item.product_id = null;
			item.service_id = null;
			item.description = "";
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
		const addItem = () => item.post(route("quotes.items.store", params), { onSuccess: () => {
			item.reset();
			source.value = "manual";
		} });
		const whatsapp = computed(() => {
			return `https://wa.me/${(props.quote.client?.phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(props.whatsAppMessage)}`;
		});
		const activeSection = ref("items");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: `Cotización #${__props.quote.id}` }, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap justify-between gap-4"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("quotes.index", { tenantBySlug: params.tenantBySlug }),
							class: "text-sm text-slate-500"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`← Cotizaciones`);
								else return [createTextVNode("← Cotizaciones")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<h1 class="mt-3 text-3xl font-bold"${_scopeId}> Cotización #${ssrInterpolate(__props.quote.id)}</h1><p class="mt-2 text-slate-600"${_scopeId}>${ssrInterpolate(__props.quote.client?.name)} · ${ssrInterpolate(labels[__props.quote.status])}</p></div>`);
						if (can("quotes.send") && editable.value) _push(`<div class="flex items-center gap-3"${_scopeId}><button${ssrIncludeBooleanAttr(unref(send).processing || !__props.quote.items.length) ? " disabled" : ""} class="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-50"${_scopeId}> Habilitar enlace</button><button${ssrIncludeBooleanAttr(!__props.quote.items.length) ? " disabled" : ""} class="rounded-xl border border-slate-300 bg-white px-4 py-3"${_scopeId}> Registrar aceptación </button></div>`);
						else _push(`<!---->`);
						_push(`</div><!--[-->`);
						ssrRenderList(unref(send).errors, (error, key) => {
							_push(`<p class="mt-3 text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
						});
						_push(`<!--]-->`);
						if (_ctx.$page.props.errors?.quote) _push(`<p class="mt-3 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.$page.props.errors.quote)}</p>`);
						else _push(`<!---->`);
						if (__props.quote.status !== "draft") _push(`<section class="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5"${_scopeId}><a${ssrRenderAttr("href", __props.publicUrl)} target="_blank" rel="noopener" class="font-semibold text-orange-700"${_scopeId}>Ver enlace público</a><button class="font-semibold text-orange-700"${_scopeId}>${ssrInterpolate(copied.value ? "Enlace copiado" : "Copiar enlace")}</button><a${ssrRenderAttr("href", whatsapp.value)} target="_blank" rel="noopener" class="font-semibold text-orange-700"${_scopeId}>Compartir por WhatsApp</a><input${ssrRenderAttr("value", __props.publicUrl)} readonly aria-label="Enlace público" class="min-w-0 flex-1 rounded-lg border-orange-200 text-sm"${_scopeId}></section>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [
								{
									value: "items",
									label: "Ítems"
								},
								{
									value: "condiciones",
									label: "Condiciones e impuestos"
								},
								{
									value: "historial",
									label: "Historial"
								}
							]
						}, null, _parent, _scopeId));
						_push(`<section role="tabpanel" aria-label="Ítems" class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white" style="${ssrRenderStyle(activeSection.value === "items" ? null : { display: "none" })}"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-slate-50"${_scopeId}><tr${_scopeId}><th class="p-4"${_scopeId}>Descripción</th><th class="p-4"${_scopeId}>Cantidad</th><th class="p-4"${_scopeId}>Precio</th><th class="p-4"${_scopeId}>Descuento</th><th class="p-4"${_scopeId}>Total</th><th class="p-4"${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.quote.items, (row) => {
							_push(`<tr class="border-t border-slate-100"${_scopeId}><td class="p-4"${_scopeId}>${ssrInterpolate(row.description)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(row.quantity)}</td><td class="p-4"${_scopeId}>${ssrInterpolate(money(row.original_unit_price))}</td><td class="p-4"${_scopeId}>${ssrInterpolate(row.discount_percent)}%</td><td class="p-4"${_scopeId}>${ssrInterpolate(money(row.total_price))}</td><td class="p-4"${_scopeId}>`);
							if (editable.value && can("quotes.manage")) _push(`<button class="text-red-600"${_scopeId}> Quitar </button>`);
							else _push(`<!---->`);
							_push(`</td></tr>`);
						});
						_push(`<!--]--></tbody></table>`);
						if (!__props.quote.items.length) _push(`<p class="p-6 text-slate-500"${_scopeId}> Agrega el primer producto o servicio. </p>`);
						else _push(`<!---->`);
						_push(`</section>`);
						if (editable.value && can("quotes.manage")) {
							_push(`<form class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4" style="${ssrRenderStyle(activeSection.value === "items" ? null : { display: "none" })}"${_scopeId}><label class="flex flex-col gap-2"${_scopeId}>Origen<select class="rounded-lg border-slate-300"${_scopeId}><option value="manual"${ssrIncludeBooleanAttr(Array.isArray(source.value) ? ssrLooseContain(source.value, "manual") : ssrLooseEqual(source.value, "manual")) ? " selected" : ""}${_scopeId}>Ítem libre</option><option value="product"${ssrIncludeBooleanAttr(Array.isArray(source.value) ? ssrLooseContain(source.value, "product") : ssrLooseEqual(source.value, "product")) ? " selected" : ""}${_scopeId}>Producto</option><option value="service"${ssrIncludeBooleanAttr(Array.isArray(source.value) ? ssrLooseContain(source.value, "service") : ssrLooseEqual(source.value, "service")) ? " selected" : ""}${_scopeId}>Servicio</option></select></label>`);
							if (source.value === "product") {
								_push(`<label class="flex flex-col gap-2"${_scopeId}>Producto<select required class="rounded-lg border-slate-300"${_scopeId}><option${ssrRenderAttr("value", null)} disabled${ssrIncludeBooleanAttr(Array.isArray(unref(item).product_id) ? ssrLooseContain(unref(item).product_id, null) : ssrLooseEqual(unref(item).product_id, null)) ? " selected" : ""}${_scopeId}>Selecciona</option><!--[-->`);
								ssrRenderList(__props.products, (product) => {
									_push(`<option${ssrRenderAttr("value", product.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(item).product_id) ? ssrLooseContain(unref(item).product_id, product.id) : ssrLooseEqual(unref(item).product_id, product.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(product.name)}</option>`);
								});
								_push(`<!--]--></select></label>`);
							} else if (source.value === "service") {
								_push(`<label class="flex flex-col gap-2"${_scopeId}>Servicio<select required class="rounded-lg border-slate-300"${_scopeId}><option${ssrRenderAttr("value", null)} disabled${ssrIncludeBooleanAttr(Array.isArray(unref(item).service_id) ? ssrLooseContain(unref(item).service_id, null) : ssrLooseEqual(unref(item).service_id, null)) ? " selected" : ""}${_scopeId}>Selecciona</option><!--[-->`);
								ssrRenderList(__props.services, (service) => {
									_push(`<option${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(item).service_id) ? ssrLooseContain(unref(item).service_id, service.id) : ssrLooseEqual(unref(item).service_id, service.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(service.name)}</option>`);
								});
								_push(`<!--]--></select></label>`);
							} else _push(`<label class="flex flex-col gap-2"${_scopeId}>Descripción<input${ssrRenderAttr("value", unref(item).description)} required class="rounded-lg border-slate-300"${_scopeId}></label>`);
							_push(`<label class="flex flex-col gap-2"${_scopeId}>Cantidad<input${ssrRenderAttr("value", unref(item).quantity)} type="number" min="0.01" step="0.01" required class="rounded-lg border-slate-300"${_scopeId}></label><label class="flex flex-col gap-2"${_scopeId}>Precio unitario<input${ssrRenderAttr("value", unref(item).unit_price)}${ssrIncludeBooleanAttr(source.value === "manual") ? " required" : ""}${ssrRenderAttr("placeholder", source.value === "manual" ? "Precio" : "Usar precio del catálogo")} type="number" min="0" step="0.01" class="rounded-lg border-slate-300"${_scopeId}></label><label class="flex flex-col gap-2"${_scopeId}>Descuento (%)<input${ssrRenderAttr("value", unref(item).discount_percent)} type="number" min="0" max="100" step="0.01" class="rounded-lg border-slate-300"${_scopeId}></label><div class="flex items-end"${_scopeId}><button${ssrIncludeBooleanAttr(unref(item).processing) ? " disabled" : ""} class="rounded-xl bg-slate-900 px-5 py-3 text-white"${_scopeId}> Agregar ítem </button></div><!--[-->`);
							ssrRenderList(unref(item).errors, (error, key) => {
								_push(`<p class="text-sm text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
							});
							_push(`<!--]--></form>`);
						} else _push(`<!---->`);
						_push(`<div role="tabpanel" aria-label="Condiciones e impuestos" class="mt-6 grid gap-6 md:grid-cols-2" style="${ssrRenderStyle(activeSection.value === "condiciones" ? null : { display: "none" })}"${_scopeId}><section class="rounded-2xl border border-slate-200 bg-white p-6"${_scopeId}><h2 class="text-lg font-semibold"${_scopeId}>Notas y condiciones</h2><p class="mt-3 whitespace-pre-wrap text-slate-600"${_scopeId}>${ssrInterpolate(__props.quote.notes || "Sin notas adicionales.")}</p></section><section class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}>Subtotal</span><span${_scopeId}>${ssrInterpolate(money(__props.quote.subtotal_amount))}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.taxName)} (${ssrInterpolate(__props.quote.apply_tax ? __props.quote.tax_rate : 0)}%)</span><span${_scopeId}>${ssrInterpolate(money(__props.quote.tax_amount))}</span></div><div class="flex justify-between border-t pt-3 text-xl font-bold"${_scopeId}><span${_scopeId}>Total</span><span${_scopeId}>${ssrInterpolate(money(__props.quote.total_amount))}</span></div>`);
						if (editable.value && can("quotes.manage")) {
							_push(`<form class="mt-3 flex flex-wrap items-center gap-3"${_scopeId}><label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(tax).apply_tax) ? ssrLooseContain(unref(tax).apply_tax, null) : unref(tax).apply_tax) ? " checked" : ""} type="checkbox"${_scopeId}>Aplicar impuesto</label><input${ssrRenderAttr("value", unref(tax).tax_rate)} aria-label="Tasa de impuesto" type="number" min="0" max="100" step="0.01" class="w-24 rounded-lg border-slate-300"${_scopeId}><button class="text-sm font-semibold text-orange-600"${_scopeId}> Actualizar </button><!--[-->`);
							ssrRenderList(unref(tax).errors, (error, key) => {
								_push(`<p class="text-sm text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
							});
							_push(`<!--]--></form>`);
						} else _push(`<!---->`);
						_push(`</section></div><section role="tabpanel" aria-label="Historial" class="mt-6 rounded-2xl border border-slate-200 bg-white p-6" style="${ssrRenderStyle(activeSection.value === "historial" ? null : { display: "none" })}"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Historial</h2><ul class="mt-4 flex flex-col gap-3"${_scopeId}><!--[-->`);
						ssrRenderList(__props.quote.events, (event) => {
							_push(`<li class="text-sm text-slate-600"${_scopeId}><time${_scopeId}>${ssrInterpolate(new Date(event.created_at).toLocaleString("es-CL"))}</time> · ${ssrInterpolate(event.description)}</li>`);
						});
						_push(`<!--]--></ul></section>`);
					} else return [
						createVNode(unref(Head), { title: `Cotización #${__props.quote.id}` }, null, 8, ["title"]),
						createVNode("div", { class: "flex flex-wrap justify-between gap-4" }, [createVNode("div", null, [
							createVNode(unref(Link), {
								href: _ctx.route("quotes.index", { tenantBySlug: params.tenantBySlug }),
								class: "text-sm text-slate-500"
							}, {
								default: withCtx(() => [createTextVNode("← Cotizaciones")]),
								_: 1
							}, 8, ["href"]),
							createVNode("h1", { class: "mt-3 text-3xl font-bold" }, " Cotización #" + toDisplayString(__props.quote.id), 1),
							createVNode("p", { class: "mt-2 text-slate-600" }, toDisplayString(__props.quote.client?.name) + " · " + toDisplayString(labels[__props.quote.status]), 1)
						]), can("quotes.send") && editable.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center gap-3"
						}, [createVNode("button", {
							disabled: unref(send).processing || !__props.quote.items.length,
							onClick: ($event) => unref(send).post(_ctx.route("quotes.send", params)),
							class: "rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-50"
						}, " Habilitar enlace", 8, ["disabled", "onClick"]), createVNode("button", {
							disabled: !__props.quote.items.length,
							onClick: ($event) => unref(router).post(_ctx.route("quotes.approve-manually", params)),
							class: "rounded-xl border border-slate-300 bg-white px-4 py-3"
						}, " Registrar aceptación ", 8, ["disabled", "onClick"])])) : createCommentVNode("", true)]),
						(openBlock(true), createBlock(Fragment, null, renderList(unref(send).errors, (error, key) => {
							return openBlock(), createBlock("p", {
								key,
								class: "mt-3 text-red-600"
							}, toDisplayString(error), 1);
						}), 128)),
						_ctx.$page.props.errors?.quote ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mt-3 text-red-600"
						}, toDisplayString(_ctx.$page.props.errors.quote), 1)) : createCommentVNode("", true),
						__props.quote.status !== "draft" ? (openBlock(), createBlock("section", {
							key: 1,
							class: "mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5"
						}, [
							createVNode("a", {
								href: __props.publicUrl,
								target: "_blank",
								rel: "noopener",
								class: "font-semibold text-orange-700"
							}, "Ver enlace público", 8, ["href"]),
							createVNode("button", {
								onClick: copyLink,
								class: "font-semibold text-orange-700"
							}, toDisplayString(copied.value ? "Enlace copiado" : "Copiar enlace"), 1),
							createVNode("a", {
								href: whatsapp.value,
								target: "_blank",
								rel: "noopener",
								class: "font-semibold text-orange-700"
							}, "Compartir por WhatsApp", 8, ["href"]),
							createVNode("input", {
								value: __props.publicUrl,
								readonly: "",
								"aria-label": "Enlace público",
								class: "min-w-0 flex-1 rounded-lg border-orange-200 text-sm"
							}, null, 8, ["value"])
						])) : createCommentVNode("", true),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [
								{
									value: "items",
									label: "Ítems"
								},
								{
									value: "condiciones",
									label: "Condiciones e impuestos"
								},
								{
									value: "historial",
									label: "Historial"
								}
							]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Ítems",
							class: "mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"
						}, [createVNode("table", { class: "w-full text-left text-sm" }, [createVNode("thead", { class: "bg-slate-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "p-4" }, "Descripción"),
							createVNode("th", { class: "p-4" }, "Cantidad"),
							createVNode("th", { class: "p-4" }, "Precio"),
							createVNode("th", { class: "p-4" }, "Descuento"),
							createVNode("th", { class: "p-4" }, "Total"),
							createVNode("th", { class: "p-4" })
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.quote.items, (row) => {
							return openBlock(), createBlock("tr", {
								key: row.id,
								class: "border-t border-slate-100"
							}, [
								createVNode("td", { class: "p-4" }, toDisplayString(row.description), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(row.quantity), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(money(row.original_unit_price)), 1),
								createVNode("td", { class: "p-4" }, toDisplayString(row.discount_percent) + "%", 1),
								createVNode("td", { class: "p-4" }, toDisplayString(money(row.total_price)), 1),
								createVNode("td", { class: "p-4" }, [editable.value && can("quotes.manage") ? (openBlock(), createBlock("button", {
									key: 0,
									onClick: ($event) => unref(router).delete(_ctx.route("quotes.items.destroy", {
										...params,
										item: row.id
									})),
									class: "text-red-600"
								}, " Quitar ", 8, ["onClick"])) : createCommentVNode("", true)])
							]);
						}), 128))])]), !__props.quote.items.length ? (openBlock(), createBlock("p", {
							key: 0,
							class: "p-6 text-slate-500"
						}, " Agrega el primer producto o servicio. ")) : createCommentVNode("", true)], 512), [[vShow, activeSection.value === "items"]]),
						editable.value && can("quotes.manage") ? withDirectives((openBlock(), createBlock("form", {
							key: 2,
							onSubmit: withModifiers(addItem, ["prevent"]),
							class: "mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4"
						}, [
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Origen"), withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => source.value = $event,
								onChange: selectSource,
								class: "rounded-lg border-slate-300"
							}, [
								createVNode("option", { value: "manual" }, "Ítem libre"),
								createVNode("option", { value: "product" }, "Producto"),
								createVNode("option", { value: "service" }, "Servicio")
							], 40, ["onUpdate:modelValue"]), [[vModelSelect, source.value]])]),
							source.value === "product" ? (openBlock(), createBlock("label", {
								key: 0,
								class: "flex flex-col gap-2"
							}, [createTextVNode("Producto"), withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => unref(item).product_id = $event,
								required: "",
								class: "rounded-lg border-slate-300"
							}, [createVNode("option", {
								value: null,
								disabled: ""
							}, "Selecciona"), (openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product) => {
								return openBlock(), createBlock("option", {
									key: product.id,
									value: product.id
								}, toDisplayString(product.name), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(item).product_id]])])) : source.value === "service" ? (openBlock(), createBlock("label", {
								key: 1,
								class: "flex flex-col gap-2"
							}, [createTextVNode("Servicio"), withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => unref(item).service_id = $event,
								required: "",
								class: "rounded-lg border-slate-300"
							}, [createVNode("option", {
								value: null,
								disabled: ""
							}, "Selecciona"), (openBlock(true), createBlock(Fragment, null, renderList(__props.services, (service) => {
								return openBlock(), createBlock("option", {
									key: service.id,
									value: service.id
								}, toDisplayString(service.name), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(item).service_id]])])) : (openBlock(), createBlock("label", {
								key: 2,
								class: "flex flex-col gap-2"
							}, [createTextVNode("Descripción"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(item).description = $event,
								required: "",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(item).description]])])),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Cantidad"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(item).quantity = $event,
								type: "number",
								min: "0.01",
								step: "0.01",
								required: "",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(item).quantity]])]),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Precio unitario"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(item).unit_price = $event,
								required: source.value === "manual",
								placeholder: source.value === "manual" ? "Precio" : "Usar precio del catálogo",
								type: "number",
								min: "0",
								step: "0.01",
								class: "rounded-lg border-slate-300"
							}, null, 8, [
								"onUpdate:modelValue",
								"required",
								"placeholder"
							]), [[vModelText, unref(item).unit_price]])]),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Descuento (%)"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(item).discount_percent = $event,
								type: "number",
								min: "0",
								max: "100",
								step: "0.01",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(item).discount_percent]])]),
							createVNode("div", { class: "flex items-end" }, [createVNode("button", {
								disabled: unref(item).processing,
								class: "rounded-xl bg-slate-900 px-5 py-3 text-white"
							}, " Agregar ítem ", 8, ["disabled"])]),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(item).errors, (error, key) => {
								return openBlock(), createBlock("p", {
									key,
									class: "text-sm text-red-600"
								}, toDisplayString(error), 1);
							}), 128))
						], 544)), [[vShow, activeSection.value === "items"]]) : createCommentVNode("", true),
						withDirectives(createVNode("div", {
							role: "tabpanel",
							"aria-label": "Condiciones e impuestos",
							class: "mt-6 grid gap-6 md:grid-cols-2"
						}, [createVNode("section", { class: "rounded-2xl border border-slate-200 bg-white p-6" }, [createVNode("h2", { class: "text-lg font-semibold" }, "Notas y condiciones"), createVNode("p", { class: "mt-3 whitespace-pre-wrap text-slate-600" }, toDisplayString(__props.quote.notes || "Sin notas adicionales."), 1)]), createVNode("section", { class: "flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6" }, [
							createVNode("div", { class: "flex justify-between" }, [createVNode("span", null, "Subtotal"), createVNode("span", null, toDisplayString(money(__props.quote.subtotal_amount)), 1)]),
							createVNode("div", { class: "flex justify-between" }, [createVNode("span", null, toDisplayString(__props.taxName) + " (" + toDisplayString(__props.quote.apply_tax ? __props.quote.tax_rate : 0) + "%)", 1), createVNode("span", null, toDisplayString(money(__props.quote.tax_amount)), 1)]),
							createVNode("div", { class: "flex justify-between border-t pt-3 text-xl font-bold" }, [createVNode("span", null, "Total"), createVNode("span", null, toDisplayString(money(__props.quote.total_amount)), 1)]),
							editable.value && can("quotes.manage") ? (openBlock(), createBlock("form", {
								key: 0,
								onSubmit: withModifiers(($event) => unref(tax).patch(_ctx.route("quotes.tax.update", params)), ["prevent"]),
								class: "mt-3 flex flex-wrap items-center gap-3"
							}, [
								createVNode("label", { class: "flex items-center gap-2" }, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(tax).apply_tax = $event,
									type: "checkbox"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(tax).apply_tax]]), createTextVNode("Aplicar impuesto")]),
								withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(tax).tax_rate = $event,
									"aria-label": "Tasa de impuesto",
									type: "number",
									min: "0",
									max: "100",
									step: "0.01",
									class: "w-24 rounded-lg border-slate-300"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(tax).tax_rate]]),
								createVNode("button", { class: "text-sm font-semibold text-orange-600" }, " Actualizar "),
								(openBlock(true), createBlock(Fragment, null, renderList(unref(tax).errors, (error, key) => {
									return openBlock(), createBlock("p", {
										key,
										class: "text-sm text-red-600"
									}, toDisplayString(error), 1);
								}), 128))
							], 40, ["onSubmit"])) : createCommentVNode("", true)
						])], 512), [[vShow, activeSection.value === "condiciones"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Historial",
							class: "mt-6 rounded-2xl border border-slate-200 bg-white p-6"
						}, [createVNode("h2", { class: "text-xl font-semibold" }, "Historial"), createVNode("ul", { class: "mt-4 flex flex-col gap-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.quote.events, (event) => {
							return openBlock(), createBlock("li", {
								key: event.id,
								class: "text-sm text-slate-600"
							}, [createVNode("time", null, toDisplayString(new Date(event.created_at).toLocaleString("es-CL")), 1), createTextVNode(" · " + toDisplayString(event.description), 1)]);
						}), 128))])], 512), [[vShow, activeSection.value === "historial"]])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quotes/Show.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Services/Index.vue
var Index_exports$1 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$6 });
var _sfc_main$6 = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		services: Object,
		filters: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Servicios" }, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$25, {
							records: __props.services,
							filters: __props.filters,
							kind: "service"
						}, null, _parent, _scopeId));
					} else return [createVNode(unref(Head), { title: "Servicios" }), createVNode(_sfc_main$25, {
						records: __props.services,
						filters: __props.filters,
						kind: "service"
					}, null, 8, ["records", "filters"])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/Index.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Servicios.vue
var Servicios_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$5 });
var _sfc_main$5 = {
	__name: "Servicios",
	__ssrInlineRender: true,
	setup(__props) {
		const features = [
			["Clientes", "Contactos y cotizaciones organizados por cliente."],
			["Catálogo", "Productos y servicios con precios e importación desde Excel."],
			["Cotizaciones", "Ítems, descuentos, impuestos y un enlace para que el cliente responda."],
			["Seguimiento", "Una vista de cotizaciones pendientes para retomar el contacto."]
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Head), { title: "Funciones" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$20, null, null, _parent));
			_push(`<main class="mx-auto max-w-6xl px-5 py-16"><h1 class="text-4xl font-bold"> Las herramientas para cotizar y vender </h1><div class="mt-10 grid gap-6 md:grid-cols-2"><!--[-->`);
			ssrRenderList(features, (feature) => {
				_push(`<article class="rounded-2xl border border-slate-200 bg-white p-8"><h2 class="text-2xl font-semibold">${ssrInterpolate(feature[0])}</h2><p class="mt-3 text-slate-600">${ssrInterpolate(feature[1])}</p></article>`);
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("trial.create"),
				class: "mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Solicitar acceso`);
					else return [createTextVNode("Solicitar acceso")];
				}),
				_: 1
			}, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(_sfc_main$19, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Servicios.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Settings/Index.vue
var Index_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$4 });
var _sfc_main$4 = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		company: Object,
		users: Array
	},
	setup(__props) {
		const props = __props;
		const params = { tenantBySlug: usePage().props.tenant?.slug };
		const form = useForm({
			name: props.company.name,
			phone: props.company.phone,
			comuna: props.company.comuna,
			max_discount_without_approval: props.company.max_discount_without_approval
		});
		const logo = useForm({ logo: null });
		const activeSection = ref("empresa");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$41, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Configuración" }, null, _parent, _scopeId));
						_push(`<h1 class="text-3xl font-bold"${_scopeId}>Configuración de tu empresa</h1>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [
								{
									value: "empresa",
									label: "Empresa"
								},
								{
									value: "identidad",
									label: "Identidad"
								},
								{
									value: "equipo",
									label: "Equipo"
								}
							]
						}, null, _parent, _scopeId));
						_push(`<form role="tabpanel" aria-label="Empresa" class="mt-6 grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2" style="${ssrRenderStyle(activeSection.value === "empresa" ? null : { display: "none" })}"${_scopeId}><label class="flex flex-col gap-2"${_scopeId}>Nombre de la empresa<input${ssrRenderAttr("value", unref(form).name)} required class="rounded-lg border-slate-300"${_scopeId}></label><label class="flex flex-col gap-2"${_scopeId}>Teléfono<input${ssrRenderAttr("value", unref(form).phone)} class="rounded-lg border-slate-300"${_scopeId}></label><label class="flex flex-col gap-2"${_scopeId}>Ciudad o comuna<input${ssrRenderAttr("value", unref(form).comuna)} class="rounded-lg border-slate-300"${_scopeId}></label><label class="flex flex-col gap-2"${_scopeId}>Descuento máximo sin aprobación (%)<input${ssrRenderAttr("value", unref(form).max_discount_without_approval)} type="number" min="0" max="100" step="0.01" required class="rounded-lg border-slate-300"${_scopeId}></label><!--[-->`);
						ssrRenderList(unref(form).errors, (error, key) => {
							_push(`<p class="text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
						});
						_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="justify-self-start rounded-xl bg-orange-500 px-5 py-3 text-white"${_scopeId}> Guardar cambios </button></form><section role="tabpanel" aria-label="Identidad" class="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6" style="${ssrRenderStyle(activeSection.value === "identidad" ? null : { display: "none" })}"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Logo de la empresa</h2>`);
						if (__props.company.logo_url) _push(`<img${ssrRenderAttr("src", __props.company.logo_url)}${ssrRenderAttr("alt", __props.company.name)} class="my-4 h-16 object-contain"${_scopeId}>`);
						else _push(`<!---->`);
						_push(`<form class="mt-4 flex flex-wrap items-center gap-3"${_scopeId}><input type="file" accept="image/png,image/jpeg,image/webp" aria-label="Logo de la empresa"${_scopeId}><button${ssrIncludeBooleanAttr(!unref(logo).logo || unref(logo).processing) ? " disabled" : ""} class="rounded-lg border border-slate-300 px-4 py-2"${_scopeId}> Subir logo </button><!--[-->`);
						ssrRenderList(unref(logo).errors, (error, key) => {
							_push(`<p class="text-red-600"${_scopeId}>${ssrInterpolate(error)}</p>`);
						});
						_push(`<!--]--></form></section><section role="tabpanel" aria-label="Equipo" class="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6" style="${ssrRenderStyle(activeSection.value === "equipo" ? null : { display: "none" })}"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Personas de tu empresa</h2><ul class="mt-4 flex flex-col gap-3"${_scopeId}><!--[-->`);
						ssrRenderList(__props.users, (user) => {
							_push(`<li${_scopeId}>${ssrInterpolate(user.name)} · ${ssrInterpolate(user.email)}</li>`);
						});
						_push(`<!--]--></ul></section>`);
					} else return [
						createVNode(unref(Head), { title: "Configuración" }),
						createVNode("h1", { class: "text-3xl font-bold" }, "Configuración de tu empresa"),
						createVNode(_sfc_main$29, {
							modelValue: activeSection.value,
							"onUpdate:modelValue": ($event) => activeSection.value = $event,
							items: [
								{
									value: "empresa",
									label: "Empresa"
								},
								{
									value: "identidad",
									label: "Identidad"
								},
								{
									value: "equipo",
									label: "Equipo"
								}
							]
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						withDirectives(createVNode("form", {
							role: "tabpanel",
							"aria-label": "Empresa",
							onSubmit: withModifiers(($event) => unref(form).patch(_ctx.route("taller.settings.commercial.update", params)), ["prevent"]),
							class: "mt-6 grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
						}, [
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Nombre de la empresa"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								required: "",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]])]),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Teléfono"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).phone = $event,
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).phone]])]),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Ciudad o comuna"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).comuna = $event,
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).comuna]])]),
							createVNode("label", { class: "flex flex-col gap-2" }, [createTextVNode("Descuento máximo sin aprobación (%)"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).max_discount_without_approval = $event,
								type: "number",
								min: "0",
								max: "100",
								step: "0.01",
								required: "",
								class: "rounded-lg border-slate-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).max_discount_without_approval]])]),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(form).errors, (error, key) => {
								return openBlock(), createBlock("p", {
									key,
									class: "text-red-600"
								}, toDisplayString(error), 1);
							}), 128)),
							createVNode("button", {
								disabled: unref(form).processing,
								class: "justify-self-start rounded-xl bg-orange-500 px-5 py-3 text-white"
							}, " Guardar cambios ", 8, ["disabled"])
						], 40, ["onSubmit"]), [[vShow, activeSection.value === "empresa"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Identidad",
							class: "mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"
						}, [
							createVNode("h2", { class: "text-xl font-semibold" }, "Logo de la empresa"),
							__props.company.logo_url ? (openBlock(), createBlock("img", {
								key: 0,
								src: __props.company.logo_url,
								alt: __props.company.name,
								class: "my-4 h-16 object-contain"
							}, null, 8, ["src", "alt"])) : createCommentVNode("", true),
							createVNode("form", {
								onSubmit: withModifiers(($event) => unref(logo).post(_ctx.route("taller.settings.branding.logo", params), { forceFormData: true }), ["prevent"]),
								class: "mt-4 flex flex-wrap items-center gap-3"
							}, [
								createVNode("input", {
									type: "file",
									accept: "image/png,image/jpeg,image/webp",
									"aria-label": "Logo de la empresa",
									onChange: ($event) => unref(logo).logo = $event.target.files[0]
								}, null, 40, ["onChange"]),
								createVNode("button", {
									disabled: !unref(logo).logo || unref(logo).processing,
									class: "rounded-lg border border-slate-300 px-4 py-2"
								}, " Subir logo ", 8, ["disabled"]),
								(openBlock(true), createBlock(Fragment, null, renderList(unref(logo).errors, (error, key) => {
									return openBlock(), createBlock("p", {
										key,
										class: "text-red-600"
									}, toDisplayString(error), 1);
								}), 128))
							], 40, ["onSubmit"])
						], 512), [[vShow, activeSection.value === "identidad"]]),
						withDirectives(createVNode("section", {
							role: "tabpanel",
							"aria-label": "Equipo",
							class: "mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"
						}, [createVNode("h2", { class: "text-xl font-semibold" }, "Personas de tu empresa"), createVNode("ul", { class: "mt-4 flex flex-col gap-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
							return openBlock(), createBlock("li", { key: user.id }, toDisplayString(user.name) + " · " + toDisplayString(user.email), 1);
						}), 128))])], 512), [[vShow, activeSection.value === "equipo"]])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Trial/Create.vue
var Create_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$3 });
var _sfc_main$3 = {
	__name: "Create",
	__ssrInlineRender: true,
	props: { countries: Array },
	setup(__props) {
		const form = useForm({
			country: __props.countries[0]?.value || "CL",
			name: "",
			email: "",
			phone: "",
			business_name: "",
			business_type: "",
			city: "",
			users_estimate: 1,
			message: "",
			terms: false
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Head), { title: "Solicitar acceso" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$20, null, null, _parent));
			_push(`<main class="mx-auto max-w-2xl px-5 py-12"><h1 class="text-3xl font-bold">Conversemos sobre tu empresa</h1><p class="mt-3 text-slate-600"> Cuéntanos cómo cotizas hoy y te contactaremos para coordinar acceso a CotizaFlow. </p><form class="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-7"><!--[-->`);
			ssrRenderList([
				["name", "Tu nombre"],
				["email", "Correo"],
				["phone", "Teléfono"],
				["business_name", "Empresa"],
				["business_type", "Rubro"],
				["city", "Ciudad"]
			], (field) => {
				_push(`<label class="flex flex-col gap-2">${ssrInterpolate(field[1])}<input${ssrRenderDynamicModel(field[0] === "email" ? "email" : "text", unref(form)[field[0]], null)}${ssrIncludeBooleanAttr(field[0] !== "city") ? " required" : ""}${ssrRenderAttr("type", field[0] === "email" ? "email" : "text")} class="rounded-lg border-slate-300"></label>`);
			});
			_push(`<!--]--><label class="flex flex-col gap-2">País<select class="rounded-lg border-slate-300"><!--[-->`);
			ssrRenderList(__props.countries, (country) => {
				_push(`<option${ssrRenderAttr("value", country.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).country) ? ssrLooseContain(unref(form).country, country.value) : ssrLooseEqual(unref(form).country, country.value)) ? " selected" : ""}>${ssrInterpolate(country.label)}</option>`);
			});
			_push(`<!--]--></select></label><label class="flex flex-col gap-2">¿Qué necesitas simplificar?<textarea maxlength="1000" rows="3" class="rounded-lg border-slate-300">${ssrInterpolate(unref(form).message)}</textarea></label><label class="flex items-start gap-2 text-sm text-slate-500"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""} type="checkbox" required class="mt-1">Acepto que utilicen estos datos para responder mi solicitud.</label><!--[-->`);
			ssrRenderList(unref(form).errors, (error, key) => {
				_push(`<p class="text-sm text-red-600">${ssrInterpolate(error)}</p>`);
			});
			_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"> Enviar solicitud </button></form></main>`);
			_push(ssrRenderComponent(_sfc_main$19, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Trial/Create.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Trial/Success.vue
var Success_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$2 });
var _sfc_main$2 = {
	__name: "Success",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(Head), { title: "Solicitud recibida" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$20, null, null, _parent));
			_push(`<main class="mx-auto max-w-2xl px-5 py-20"><h1 class="text-3xl font-bold">Recibimos tu solicitud</h1><p class="mt-4 text-lg text-slate-600"> Te contactaremos para conversar sobre tu proceso comercial y coordinar el acceso a CotizaFlow. </p>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "mt-8 inline-block text-orange-600"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Volver al inicio →`);
					else return [createTextVNode("Volver al inicio →")];
				}),
				_: 1
			}, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(_sfc_main$19, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Trial/Success.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/SeoHead.vue
var SITE_NAME = "TallerFlow";
var LOCALE = "es_CL";
var TWITTER_SITE = "@tallerflow";
var DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";
var _sfc_main$1 = {
	__name: "SeoHead",
	__ssrInlineRender: true,
	props: {
		seo: {
			type: Object,
			default: () => ({})
		},
		fallbackTitle: {
			type: String,
			default: "TallerFlow"
		}
	},
	setup(__props) {
		/**
		* Meta tags SEO / Open Graph / Twitter para páginas públicas.
		*
		* Renderiza exactamente el mismo set que `resources/views/app.blade.php`
		* emite en el servidor (marcado con el atributo `inertia`), de modo que al
		* hidratar, Inertia reemplaza los tags del servidor sin duplicarlos.
		*
		* El JSON-LD se renderiza solo en el servidor (blade) y no se toca aquí.
		*/
		const props = __props;
		const hasSeo = computed(() => props.seo && Object.keys(props.seo).length > 0);
		const title = computed(() => props.seo?.title || props.fallbackTitle);
		const description = computed(() => props.seo?.description || "");
		const canonical = computed(() => props.seo?.canonical_url || null);
		const robots = computed(() => props.seo?.robots || DEFAULT_ROBOTS);
		const ogType = computed(() => props.seo?.og_type || "website");
		const image = computed(() => props.seo?.og_image || null);
		const imageAlt = computed(() => props.seo?.og_image_alt || title.value);
		const imageWidth = computed(() => props.seo?.og_image_width ? String(props.seo.og_image_width) : null);
		const imageHeight = computed(() => props.seo?.og_image_height ? String(props.seo.og_image_height) : null);
		const twitterCard = computed(() => props.seo?.twitter_card || "summary_large_image");
		const publishedTime = computed(() => props.seo?.published_time || null);
		const modifiedTime = computed(() => props.seo?.modified_time || null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Head), _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<title${_scopeId}>${ssrInterpolate(title.value)}</title>`);
						if (hasSeo.value) {
							_push(`<!--[--><meta name="robots"${ssrRenderAttr("content", robots.value)}${_scopeId}>`);
							if (description.value) _push(`<meta name="description"${ssrRenderAttr("content", description.value)}${_scopeId}>`);
							else _push(`<!---->`);
							if (canonical.value) _push(`<link rel="canonical"${ssrRenderAttr("href", canonical.value)}${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<meta property="og:type"${ssrRenderAttr("content", ogType.value)}${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", SITE_NAME)}${_scopeId}><meta property="og:locale"${ssrRenderAttr("content", LOCALE)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", title.value)}${_scopeId}>`);
							if (description.value) _push(`<meta property="og:description"${ssrRenderAttr("content", description.value)}${_scopeId}>`);
							else _push(`<!---->`);
							if (canonical.value) _push(`<meta property="og:url"${ssrRenderAttr("content", canonical.value)}${_scopeId}>`);
							else _push(`<!---->`);
							if (image.value) {
								_push(`<!--[--><meta property="og:image"${ssrRenderAttr("content", image.value)}${_scopeId}><meta property="og:image:alt"${ssrRenderAttr("content", imageAlt.value)}${_scopeId}>`);
								if (imageWidth.value && imageHeight.value) _push(`<!--[--><meta property="og:image:width"${ssrRenderAttr("content", imageWidth.value)}${_scopeId}><meta property="og:image:height"${ssrRenderAttr("content", imageHeight.value)}${_scopeId}><!--]-->`);
								else _push(`<!---->`);
								_push(`<!--]-->`);
							} else _push(`<!---->`);
							if (ogType.value === "article") {
								_push(`<!--[-->`);
								if (publishedTime.value) _push(`<meta property="article:published_time"${ssrRenderAttr("content", publishedTime.value)}${_scopeId}>`);
								else _push(`<!---->`);
								if (modifiedTime.value) _push(`<meta property="article:modified_time"${ssrRenderAttr("content", modifiedTime.value)}${_scopeId}>`);
								else _push(`<!---->`);
								_push(`<!--]-->`);
							} else _push(`<!---->`);
							_push(`<meta name="twitter:card"${ssrRenderAttr("content", twitterCard.value)}${_scopeId}><meta name="twitter:site"${ssrRenderAttr("content", TWITTER_SITE)}${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", title.value)}${_scopeId}>`);
							if (description.value) _push(`<meta name="twitter:description"${ssrRenderAttr("content", description.value)}${_scopeId}>`);
							else _push(`<!---->`);
							if (image.value) _push(`<!--[--><meta name="twitter:image"${ssrRenderAttr("content", image.value)}${_scopeId}><meta name="twitter:image:alt"${ssrRenderAttr("content", imageAlt.value)}${_scopeId}><!--]-->`);
							else _push(`<!---->`);
							_push(`<!--]-->`);
						} else _push(`<!---->`);
					} else return [createVNode("title", null, toDisplayString(title.value), 1), hasSeo.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
						createVNode("meta", {
							name: "robots",
							content: robots.value
						}, null, 8, ["content"]),
						description.value ? (openBlock(), createBlock("meta", {
							key: 0,
							name: "description",
							content: description.value
						}, null, 8, ["content"])) : createCommentVNode("", true),
						canonical.value ? (openBlock(), createBlock("link", {
							key: 1,
							rel: "canonical",
							href: canonical.value
						}, null, 8, ["href"])) : createCommentVNode("", true),
						createVNode("meta", {
							property: "og:type",
							content: ogType.value
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:site_name",
							content: SITE_NAME
						}),
						createVNode("meta", {
							property: "og:locale",
							content: LOCALE
						}),
						createVNode("meta", {
							property: "og:title",
							content: title.value
						}, null, 8, ["content"]),
						description.value ? (openBlock(), createBlock("meta", {
							key: 2,
							property: "og:description",
							content: description.value
						}, null, 8, ["content"])) : createCommentVNode("", true),
						canonical.value ? (openBlock(), createBlock("meta", {
							key: 3,
							property: "og:url",
							content: canonical.value
						}, null, 8, ["content"])) : createCommentVNode("", true),
						image.value ? (openBlock(), createBlock(Fragment, { key: 4 }, [
							createVNode("meta", {
								property: "og:image",
								content: image.value
							}, null, 8, ["content"]),
							createVNode("meta", {
								property: "og:image:alt",
								content: imageAlt.value
							}, null, 8, ["content"]),
							imageWidth.value && imageHeight.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("meta", {
								property: "og:image:width",
								content: imageWidth.value
							}, null, 8, ["content"]), createVNode("meta", {
								property: "og:image:height",
								content: imageHeight.value
							}, null, 8, ["content"])], 64)) : createCommentVNode("", true)
						], 64)) : createCommentVNode("", true),
						ogType.value === "article" ? (openBlock(), createBlock(Fragment, { key: 5 }, [publishedTime.value ? (openBlock(), createBlock("meta", {
							key: 0,
							property: "article:published_time",
							content: publishedTime.value
						}, null, 8, ["content"])) : createCommentVNode("", true), modifiedTime.value ? (openBlock(), createBlock("meta", {
							key: 1,
							property: "article:modified_time",
							content: modifiedTime.value
						}, null, 8, ["content"])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true),
						createVNode("meta", {
							name: "twitter:card",
							content: twitterCard.value
						}, null, 8, ["content"]),
						createVNode("meta", {
							name: "twitter:site",
							content: TWITTER_SITE
						}),
						createVNode("meta", {
							name: "twitter:title",
							content: title.value
						}, null, 8, ["content"]),
						description.value ? (openBlock(), createBlock("meta", {
							key: 6,
							name: "twitter:description",
							content: description.value
						}, null, 8, ["content"])) : createCommentVNode("", true),
						image.value ? (openBlock(), createBlock(Fragment, { key: 7 }, [createVNode("meta", {
							name: "twitter:image",
							content: image.value
						}, null, 8, ["content"]), createVNode("meta", {
							name: "twitter:image:alt",
							content: imageAlt.value
						}, null, 8, ["content"])], 64)) : createCommentVNode("", true)
					], 64)) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SeoHead.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Welcome.vue
var Welcome_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main });
var _sfc_main = {
	__name: "Welcome",
	__ssrInlineRender: true,
	props: { seo: Object },
	setup(__props) {
		const features = [
			{
				title: "Cotizaciones claras",
				text: "Organiza productos, servicios, precios y condiciones en una cotización."
			},
			{
				title: "Clientes en un lugar",
				text: "Mantén tus contactos y revisa las cotizaciones de cada cliente."
			},
			{
				title: "Seguimiento comercial",
				text: "Identifica las cotizaciones pendientes para volver a contactar a tus clientes."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				seo: __props.seo,
				"fallback-title": "CotizaFlow"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$20, null, null, _parent));
			_push(`<main><section class="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center"><div class="flex flex-col items-start gap-6"><span class="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">Para microempresas y pymes</span><h1 class="text-5xl font-bold leading-tight tracking-tight text-slate-900"> Cotiza rápido.<br>Haz seguimiento.<br><span class="text-orange-500">Vende más.</span></h1><p class="max-w-lg text-xl leading-relaxed text-slate-600"> Cotizaciones y seguimiento comercial simple para tu empresa. </p><p class="text-slate-600"> Todo lo que necesitas para cotizar y vender. Sin pagar de más. </p>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("trial.create"),
				class: "rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Solicitar acceso`);
					else return [createTextVNode("Solicitar acceso")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><div class="flex justify-between border-b border-slate-100 pb-5"><span class="font-bold text-slate-900">Tu proceso comercial</span><span class="text-sm text-orange-600">CotizaFlow</span></div><ol class="mt-6 flex flex-col gap-6"><!--[-->`);
			ssrRenderList([
				"Organiza tus clientes y catálogo",
				"Prepara una cotización",
				"Comparte el enlace con el cliente",
				"Revisa su respuesta y haz seguimiento"
			], (step, i) => {
				_push(`<li class="flex items-center gap-4"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 font-semibold text-orange-600">${ssrInterpolate(i + 1)}</span><span class="text-slate-700">${ssrInterpolate(step)}</span></li>`);
			});
			_push(`<!--]--></ol></div></section><section id="funciones" class="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-3"><!--[-->`);
			ssrRenderList(features, (feature) => {
				_push(`<article class="rounded-2xl border border-slate-200 bg-white p-7"><h2 class="mb-3 text-xl font-semibold text-slate-900">${ssrInterpolate(feature.title)}</h2><p class="leading-relaxed text-slate-600">${ssrInterpolate(feature.text)}</p></article>`);
			});
			_push(`<!--]--></section></main>`);
			_push(ssrRenderComponent(_sfc_main$19, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region vendor/tightenco/ziggy/dist/index.esm.js
function t(t, e) {
	for (var n = 0; n < e.length; n++) {
		var r = e[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, u(r.key), r);
	}
}
function e(e, n, r) {
	return n && t(e.prototype, n), r && t(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function n() {
	return n = Object.assign ? Object.assign.bind() : function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var n = arguments[e];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (t[r] = n[r]);
		}
		return t;
	}, n.apply(null, arguments);
}
function r(t) {
	return r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t);
	}, r(t);
}
function o() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (o = function() {
		return !!t;
	})();
}
function i(t, e) {
	return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, i(t, e);
}
function u(t) {
	var e = function(t) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var n = e.call(t, "string");
			if ("object" != typeof n) return n;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return String(t);
	}(t);
	return "symbol" == typeof e ? e : e + "";
}
function f(t) {
	var e = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	return f = function(t) {
		if (null === t || !function(t) {
			try {
				return -1 !== Function.toString.call(t).indexOf("[native code]");
			} catch (e) {
				return "function" == typeof t;
			}
		}(t)) return t;
		if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== e) {
			if (e.has(t)) return e.get(t);
			e.set(t, n);
		}
		function n() {
			return function(t, e, n) {
				if (o()) return Reflect.construct.apply(null, arguments);
				var r = [null];
				r.push.apply(r, e);
				var u = new (t.bind.apply(t, r))();
				return n && i(u, n.prototype), u;
			}(t, arguments, r(this).constructor);
		}
		return n.prototype = Object.create(t.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), i(n, t);
	}, f(t);
}
var c = String.prototype.replace, a = /%20/g, l = {
	RFC1738: function(t) {
		return c.call(t, a, "+");
	},
	RFC3986: function(t) {
		return String(t);
	}
};
var s = "RFC3986";
var p = Object.prototype.hasOwnProperty, y = Array.isArray, d = /* @__PURE__ */ new WeakMap();
var b = function(t, e) {
	return d.set(t, e), t;
};
function v(t) {
	return d.has(t);
}
var h$1 = function(t) {
	return d.get(t);
}, m = function(t, e) {
	d.set(t, e);
};
var g = function() {
	const t = [];
	for (let e = 0; e < 256; ++e) t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
	return t;
}(), w = function(t, e) {
	const n = e && e.plainObjects ? Object.create(null) : {};
	for (let e = 0; e < t.length; ++e) void 0 !== t[e] && (n[e] = t[e]);
	return n;
}, j = function t(e, n, r) {
	if (!n) return e;
	if ("object" != typeof n) {
		if (y(e)) e.push(n);
		else {
			if (!e || "object" != typeof e) return [e, n];
			if (v(e)) {
				var o = h$1(e) + 1;
				e[o] = n, m(e, o);
			} else (r && (r.plainObjects || r.allowPrototypes) || !p.call(Object.prototype, n)) && (e[n] = !0);
		}
		return e;
	}
	if (!e || "object" != typeof e) {
		if (v(n)) {
			for (var i = Object.keys(n), u = r && r.plainObjects ? {
				__proto__: null,
				0: e
			} : { 0: e }, f = 0; f < i.length; f++) u[parseInt(i[f], 10) + 1] = n[i[f]];
			return b(u, h$1(n) + 1);
		}
		return [e].concat(n);
	}
	let c = e;
	return y(e) && !y(n) && (c = w(e, r)), y(e) && y(n) ? (n.forEach(function(n, o) {
		if (p.call(e, o)) {
			const i = e[o];
			i && "object" == typeof i && n && "object" == typeof n ? e[o] = t(i, n, r) : e.push(n);
		} else e[o] = n;
	}), e) : Object.keys(n).reduce(function(e, o) {
		const i = n[o];
		return e[o] = p.call(e, o) ? t(e[o], i, r) : i, e;
	}, c);
}, O = 1024, E = function(t, e, n, r) {
	if (v(t)) {
		var o = h$1(t) + 1;
		return t[o] = e, m(t, o), t;
	}
	var i = [].concat(t, e);
	return i.length > n ? b(w(i, { plainObjects: r }), i.length - 1) : i;
}, T = function(t, e) {
	if (y(t)) {
		const n = [];
		for (let r = 0; r < t.length; r += 1) n.push(e(t[r]));
		return n;
	}
	return e(t);
}, R = Object.prototype.hasOwnProperty, k = {
	brackets: function(t) {
		return t + "[]";
	},
	comma: "comma",
	indices: function(t, e) {
		return t + "[" + e + "]";
	},
	repeat: function(t) {
		return t;
	}
}, S = Array.isArray, I = Array.prototype.push, A = function(t, e) {
	I.apply(t, S(e) ? e : [e]);
}, D = Date.prototype.toISOString, $ = {
	addQueryPrefix: !1,
	allowDots: !1,
	allowEmptyArrays: !1,
	arrayFormat: "indices",
	charset: "utf-8",
	charsetSentinel: !1,
	delimiter: "&",
	encode: !0,
	encodeDotInKeys: !1,
	encoder: function(t, e, n, r, o) {
		if (0 === t.length) return t;
		let i = t;
		if ("symbol" == typeof t ? i = Symbol.prototype.toString.call(t) : "string" != typeof t && (i = String(t)), "iso-8859-1" === n) return escape(i).replace(/%u[0-9a-f]{4}/gi, function(t) {
			return "%26%23" + parseInt(t.slice(2), 16) + "%3B";
		});
		let u = "";
		for (let t = 0; t < i.length; t += O) {
			const e = i.length >= O ? i.slice(t, t + O) : i, n = [];
			for (let t = 0; t < e.length; ++t) {
				let r = e.charCodeAt(t);
				45 === r || 46 === r || 95 === r || 126 === r || r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122 || "RFC1738" === o && (40 === r || 41 === r) ? n[n.length] = e.charAt(t) : r < 128 ? n[n.length] = g[r] : r < 2048 ? n[n.length] = g[192 | r >> 6] + g[128 | 63 & r] : r < 55296 || r >= 57344 ? n[n.length] = g[224 | r >> 12] + g[128 | r >> 6 & 63] + g[128 | 63 & r] : (t += 1, r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(t)), n[n.length] = g[240 | r >> 18] + g[128 | r >> 12 & 63] + g[128 | r >> 6 & 63] + g[128 | 63 & r]);
			}
			u += n.join("");
		}
		return u;
	},
	encodeValuesOnly: !1,
	format: s,
	formatter: l[s],
	indices: !1,
	serializeDate: function(t) {
		return D.call(t);
	},
	skipNulls: !1,
	strictNullHandling: !1
}, N = {}, _ = function(t, e, n, r, o, i, u, f, c, a, l, s, p, y, d, b, v, h) {
	let m = t, g = h, w = 0, j = !1;
	for (; void 0 !== (g = g.get(N)) && !j;) {
		const e = g.get(t);
		if (w += 1, void 0 !== e) {
			if (e === w) throw new RangeError("Cyclic object value");
			j = !0;
		}
		void 0 === g.get(N) && (w = 0);
	}
	if ("function" == typeof a ? m = a(e, m) : m instanceof Date ? m = p(m) : "comma" === n && S(m) && (m = T(m, function(t) {
		return t instanceof Date ? p(t) : t;
	})), null === m) {
		if (i) return c && !b ? c(e, $.encoder, v, "key", y) : e;
		m = "";
	}
	if ("string" == typeof (O = m) || "number" == typeof O || "boolean" == typeof O || "symbol" == typeof O || "bigint" == typeof O || function(t) {
		return !(!t || "object" != typeof t || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t)));
	}(m)) return c ? [d(b ? e : c(e, $.encoder, v, "key", y)) + "=" + d(c(m, $.encoder, v, "value", y))] : [d(e) + "=" + d(String(m))];
	var O;
	const E = [];
	if (void 0 === m) return E;
	let R;
	if ("comma" === n && S(m)) b && c && (m = T(m, c)), R = [{ value: m.length > 0 ? m.join(",") || null : void 0 }];
	else if (S(a)) R = a;
	else {
		const t = Object.keys(m);
		R = l ? t.sort(l) : t;
	}
	const k = f ? e.replace(/\./g, "%2E") : e, I = r && S(m) && 1 === m.length ? k + "[]" : k;
	if (o && S(m) && 0 === m.length) return I + "[]";
	for (let e = 0; e < R.length; ++e) {
		const g = R[e], j = "object" == typeof g && void 0 !== g.value ? g.value : m[g];
		if (u && null === j) continue;
		const O = s && f ? g.replace(/\./g, "%2E") : g, T = S(m) ? "function" == typeof n ? n(I, O) : I : I + (s ? "." + O : "[" + O + "]");
		h.set(t, w);
		const k = /* @__PURE__ */ new WeakMap();
		k.set(N, h), A(E, _(j, T, n, r, o, i, u, f, "comma" === n && b && S(m) ? null : c, a, l, s, p, y, d, b, v, k));
	}
	return E;
}, x = Object.prototype.hasOwnProperty, C = Array.isArray, P = {
	allowDots: !1,
	allowEmptyArrays: !1,
	allowPrototypes: !1,
	allowSparse: !1,
	arrayLimit: 20,
	charset: "utf-8",
	charsetSentinel: !1,
	comma: !1,
	decodeDotInKeys: !1,
	decoder: function(t, e, n) {
		const r = t.replace(/\+/g, " ");
		if ("iso-8859-1" === n) return r.replace(/%[0-9a-f]{2}/gi, unescape);
		try {
			return decodeURIComponent(r);
		} catch (t) {
			return r;
		}
	},
	delimiter: "&",
	depth: 5,
	duplicates: "combine",
	ignoreQueryPrefix: !1,
	interpretNumericEntities: !1,
	parameterLimit: 1e3,
	parseArrays: !0,
	plainObjects: !1,
	strictNullHandling: !1
}, Z = function(t) {
	return t.replace(/&#(\d+);/g, function(t, e) {
		return String.fromCharCode(parseInt(e, 10));
	});
}, F = function(t, e) {
	return t && "string" == typeof t && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, U = function(t, e, n, r) {
	if (!t) return;
	const o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/g;
	let u = n.depth > 0 && /(\[[^[\]]*])/.exec(o);
	const f = u ? o.slice(0, u.index) : o, c = [];
	if (f) {
		if (!n.plainObjects && x.call(Object.prototype, f) && !n.allowPrototypes) return;
		c.push(f);
	}
	let a = 0;
	for (; n.depth > 0 && null !== (u = i.exec(o)) && a < n.depth;) {
		if (a += 1, !n.plainObjects && x.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes) return;
		c.push(u[1]);
	}
	return u && c.push("[" + o.slice(u.index) + "]"), function(t, e, n, r) {
		let o = r ? e : F(e, n);
		for (let e = t.length - 1; e >= 0; --e) {
			let r;
			const i = t[e];
			if ("[]" === i && n.parseArrays) r = v(o) ? o : n.allowEmptyArrays && ("" === o || n.strictNullHandling && null === o) ? [] : E([], o, n.arrayLimit, n.plainObjects);
			else {
				r = n.plainObjects ? Object.create(null) : {};
				const t = "[" === i.charAt(0) && "]" === i.charAt(i.length - 1) ? i.slice(1, -1) : i, e = n.decodeDotInKeys ? t.replace(/%2E/g, ".") : t, u = parseInt(e, 10);
				n.parseArrays || "" !== e ? !isNaN(u) && i !== e && String(u) === e && u >= 0 && n.parseArrays && u <= n.arrayLimit ? (r = [], r[u] = o) : "__proto__" !== e && (r[e] = o) : r = { 0: o };
			}
			o = r;
		}
		return o;
	}(c, e, n, r);
};
function q(t, e) {
	const n = function(t) {
		if (!t) return P;
		if (void 0 !== t.allowEmptyArrays && "boolean" != typeof t.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
		if (void 0 !== t.decodeDotInKeys && "boolean" != typeof t.decodeDotInKeys) throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
		if (null != t.decoder && "function" != typeof t.decoder) throw new TypeError("Decoder has to be a function.");
		if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
		const e = void 0 === t.charset ? P.charset : t.charset, n = void 0 === t.duplicates ? P.duplicates : t.duplicates;
		if ("combine" !== n && "first" !== n && "last" !== n) throw new TypeError("The duplicates option must be either combine, first, or last");
		return {
			allowDots: void 0 === t.allowDots ? !0 === t.decodeDotInKeys || P.allowDots : !!t.allowDots,
			allowEmptyArrays: "boolean" == typeof t.allowEmptyArrays ? !!t.allowEmptyArrays : P.allowEmptyArrays,
			allowPrototypes: "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : P.allowPrototypes,
			allowSparse: "boolean" == typeof t.allowSparse ? t.allowSparse : P.allowSparse,
			arrayLimit: "number" == typeof t.arrayLimit ? t.arrayLimit : P.arrayLimit,
			charset: e,
			charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : P.charsetSentinel,
			comma: "boolean" == typeof t.comma ? t.comma : P.comma,
			decodeDotInKeys: "boolean" == typeof t.decodeDotInKeys ? t.decodeDotInKeys : P.decodeDotInKeys,
			decoder: "function" == typeof t.decoder ? t.decoder : P.decoder,
			delimiter: "string" == typeof t.delimiter || (r = t.delimiter, "[object RegExp]" === Object.prototype.toString.call(r)) ? t.delimiter : P.delimiter,
			depth: "number" == typeof t.depth || !1 === t.depth ? +t.depth : P.depth,
			duplicates: n,
			ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
			interpretNumericEntities: "boolean" == typeof t.interpretNumericEntities ? t.interpretNumericEntities : P.interpretNumericEntities,
			parameterLimit: "number" == typeof t.parameterLimit ? t.parameterLimit : P.parameterLimit,
			parseArrays: !1 !== t.parseArrays,
			plainObjects: "boolean" == typeof t.plainObjects ? t.plainObjects : P.plainObjects,
			strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : P.strictNullHandling
		};
		var r;
	}(e);
	if ("" === t || null == t) return n.plainObjects ? Object.create(null) : {};
	const r = "string" == typeof t ? function(t, e) {
		const n = { __proto__: null }, r = (e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t).split(e.delimiter, Infinity === e.parameterLimit ? void 0 : e.parameterLimit);
		let o, i = -1, u = e.charset;
		if (e.charsetSentinel) for (o = 0; o < r.length; ++o) 0 === r[o].indexOf("utf8=") && ("utf8=%E2%9C%93" === r[o] ? u = "utf-8" : "utf8=%26%2310003%3B" === r[o] && (u = "iso-8859-1"), i = o, o = r.length);
		for (o = 0; o < r.length; ++o) {
			if (o === i) continue;
			const t = r[o], f = t.indexOf("]="), c = -1 === f ? t.indexOf("=") : f + 1;
			let a, l;
			-1 === c ? (a = e.decoder(t, P.decoder, u, "key"), l = e.strictNullHandling ? null : "") : (a = e.decoder(t.slice(0, c), P.decoder, u, "key"), l = T(F(t.slice(c + 1), e), function(t) {
				return e.decoder(t, P.decoder, u, "value");
			})), l && e.interpretNumericEntities && "iso-8859-1" === u && (l = Z(l)), t.indexOf("[]=") > -1 && (l = C(l) ? [l] : l);
			const s = x.call(n, a);
			s && "combine" === e.duplicates ? n[a] = E(n[a], l, e.arrayLimit, e.plainObjects) : s && "last" !== e.duplicates || (n[a] = l);
		}
		return n;
	}(t, n) : t;
	let o = n.plainObjects ? Object.create(null) : {};
	const i = Object.keys(r);
	for (let e = 0; e < i.length; ++e) {
		const u = i[e], f = U(u, r[u], n, "string" == typeof t);
		o = j(o, f, n);
	}
	return !0 === n.allowSparse ? o : function(t) {
		const e = [{
			obj: { o: t },
			prop: "o"
		}], n = [];
		for (let t = 0; t < e.length; ++t) {
			const r = e[t], o = r.obj[r.prop], i = Object.keys(o);
			for (let t = 0; t < i.length; ++t) {
				const r = i[t], u = o[r];
				"object" == typeof u && null !== u && -1 === n.indexOf(u) && (e.push({
					obj: o,
					prop: r
				}), n.push(u));
			}
		}
		return function(t) {
			for (; t.length > 1;) {
				const e = t.pop(), n = e.obj[e.prop];
				if (y(n)) {
					const t = [];
					for (let e = 0; e < n.length; ++e) void 0 !== n[e] && t.push(n[e]);
					e.obj[e.prop] = t;
				}
			}
		}(e), t;
	}(o);
}
var K = /*#__PURE__*/ function() {
	function t(t, e, n) {
		var r, o;
		this.name = t, this.definition = e, this.bindings = null != (r = e.bindings) ? r : {}, this.wheres = null != (o = e.wheres) ? o : {}, this.config = n;
	}
	var n = t.prototype;
	return n.matchesUrl = function(t) {
		var e, n = this;
		if (!this.definition.methods.includes("GET")) return !1;
		var r = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, function(t, e, r, o) {
			var i, u = "(?<" + r + ">" + ((null == (i = n.wheres[r]) ? void 0 : i.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
			return o ? "(" + e + u + ")?" : "" + e + u;
		}).replace(/^\w+:\/\//, ""), o = t.replace(/^\w+:\/\//, "").split("?"), i = o[0], u = o[1], f = null != (e = new RegExp("^" + r + "/?$").exec(i)) ? e : new RegExp("^" + r + "/?$").exec(decodeURI(i));
		if (f) {
			for (var c in f.groups) f.groups[c] = "string" == typeof f.groups[c] ? decodeURIComponent(f.groups[c]) : f.groups[c];
			return {
				params: f.groups,
				query: q(u)
			};
		}
		return !1;
	}, n.compile = function(t) {
		var e = this;
		return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(n, r, o) {
			var i, u;
			if (!o && [null, void 0].includes(t[r])) throw new Error("Ziggy error: '" + r + "' parameter is required for route '" + e.name + "'.");
			if (e.wheres[r] && !new RegExp("^" + (o ? "(" + e.wheres[r] + ")?" : e.wheres[r]) + "$").test(null != (u = t[r]) ? u : "")) throw new Error("Ziggy error: '" + r + "' parameter '" + t[r] + "' does not match required format '" + e.wheres[r] + "' for route '" + e.name + "'.");
			return encodeURI(null != (i = t[r]) ? i : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
		}).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
	}, e(t, [
		{
			key: "template",
			get: function() {
				var t = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
				return "" === t ? "/" : t;
			}
		},
		{
			key: "origin",
			get: function() {
				return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
			}
		},
		{
			key: "parameterSegments",
			get: function() {
				var t, e;
				return null != (t = null == (e = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e.map(function(t) {
					return {
						name: t.replace(/{|\??}/g, ""),
						required: !/\?}$/.test(t)
					};
				})) ? t : [];
			}
		}
	]);
}(), z = /*#__PURE__*/ function(t) {
	function r(e, r, o, i) {
		var u;
		if (void 0 === o && (o = !0), (u = t.call(this) || this).t = null != i ? i : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !u.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), u.t = globalThis.Ziggy), u.t = n({}, u.t, { absolute: o }), e) {
			if (!u.t.routes[e]) throw new Error("Ziggy error: route '" + e + "' is not in the route list.");
			u.i = new K(e, u.t.routes[e], u.t), u.u = u.l(r);
		}
		return u;
	}
	var o, u = t;
	(o = r).prototype = Object.create(u.prototype), o.prototype.constructor = o, i(o, u);
	var f = r.prototype;
	return f.toString = function() {
		var t = this, e = Object.keys(this.u).filter(function(e) {
			return !t.i.parameterSegments.some(function(t) {
				return t.name === e;
			});
		}).filter(function(t) {
			return "_query" !== t;
		}).reduce(function(e, r) {
			var o;
			return n({}, e, ((o = {})[r] = t.u[r], o));
		}, {});
		return this.i.compile(this.u) + function(t, e) {
			let n = t;
			const r = function(t) {
				if (!t) return $;
				if (void 0 !== t.allowEmptyArrays && "boolean" != typeof t.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
				if (void 0 !== t.encodeDotInKeys && "boolean" != typeof t.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
				if (null != t.encoder && "function" != typeof t.encoder) throw new TypeError("Encoder has to be a function.");
				const e = t.charset || $.charset;
				if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
				let n = s;
				if (void 0 !== t.format) {
					if (!R.call(l, t.format)) throw new TypeError("Unknown format option provided.");
					n = t.format;
				}
				const r = l[n];
				let o, i = $.filter;
				if (("function" == typeof t.filter || S(t.filter)) && (i = t.filter), o = t.arrayFormat in k ? t.arrayFormat : "indices" in t ? t.indices ? "indices" : "repeat" : $.arrayFormat, "commaRoundTrip" in t && "boolean" != typeof t.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
				return {
					addQueryPrefix: "boolean" == typeof t.addQueryPrefix ? t.addQueryPrefix : $.addQueryPrefix,
					allowDots: void 0 === t.allowDots ? !0 === t.encodeDotInKeys || $.allowDots : !!t.allowDots,
					allowEmptyArrays: "boolean" == typeof t.allowEmptyArrays ? !!t.allowEmptyArrays : $.allowEmptyArrays,
					arrayFormat: o,
					charset: e,
					charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : $.charsetSentinel,
					commaRoundTrip: t.commaRoundTrip,
					delimiter: void 0 === t.delimiter ? $.delimiter : t.delimiter,
					encode: "boolean" == typeof t.encode ? t.encode : $.encode,
					encodeDotInKeys: "boolean" == typeof t.encodeDotInKeys ? t.encodeDotInKeys : $.encodeDotInKeys,
					encoder: "function" == typeof t.encoder ? t.encoder : $.encoder,
					encodeValuesOnly: "boolean" == typeof t.encodeValuesOnly ? t.encodeValuesOnly : $.encodeValuesOnly,
					filter: i,
					format: n,
					formatter: r,
					serializeDate: "function" == typeof t.serializeDate ? t.serializeDate : $.serializeDate,
					skipNulls: "boolean" == typeof t.skipNulls ? t.skipNulls : $.skipNulls,
					sort: "function" == typeof t.sort ? t.sort : null,
					strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : $.strictNullHandling
				};
			}(e);
			let o, i;
			"function" == typeof r.filter ? (i = r.filter, n = i("", n)) : S(r.filter) && (i = r.filter, o = i);
			const u = [];
			if ("object" != typeof n || null === n) return "";
			const f = k[r.arrayFormat], c = "comma" === f && r.commaRoundTrip;
			o || (o = Object.keys(n)), r.sort && o.sort(r.sort);
			const a = /* @__PURE__ */ new WeakMap();
			for (let t = 0; t < o.length; ++t) {
				const e = o[t];
				r.skipNulls && null === n[e] || A(u, _(n[e], e, f, c, r.allowEmptyArrays, r.strictNullHandling, r.skipNulls, r.encodeDotInKeys, r.encode ? r.encoder : null, r.filter, r.sort, r.allowDots, r.serializeDate, r.format, r.formatter, r.encodeValuesOnly, r.charset, a));
			}
			const p = u.join(r.delimiter);
			let y = !0 === r.addQueryPrefix ? "?" : "";
			return r.charsetSentinel && (y += "iso-8859-1" === r.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p.length > 0 ? y + p : "";
		}(n({}, e, this.u._query), {
			addQueryPrefix: !0,
			arrayFormat: "indices",
			encodeValuesOnly: !0,
			skipNulls: !0,
			encoder: function(t, e) {
				return "boolean" == typeof t ? Number(t) : e(t);
			}
		});
	}, f.p = function(t) {
		var e = this;
		t ? this.t.absolute && t.startsWith("/") && (t = this.v().host + t) : t = this.h();
		var r = {}, o = Object.entries(this.t.routes).find(function(n) {
			return r = new K(n[0], n[1], e.t).matchesUrl(t);
		}) || [void 0, void 0];
		return n({ name: o[0] }, r, { route: o[1] });
	}, f.h = function() {
		var t = this.v(), e = t.pathname, n = t.search;
		return (this.t.absolute ? t.host + e : e.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n;
	}, f.current = function(t, e) {
		var r = this.p(), o = r.name, i = r.params, u = r.query, f = r.route;
		if (!t) return o;
		var c = new RegExp("^" + t.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o);
		if ([null, void 0].includes(e) || !c) return c;
		var a = new K(o, f, this.t);
		e = this.l(e, a);
		var l = n({}, i, u);
		if (Object.values(e).every(function(t) {
			return !t;
		}) && !Object.values(l).some(function(t) {
			return void 0 !== t;
		})) return !0;
		var s = function(t, e) {
			return Object.entries(t).every(function(t) {
				var n = t[0], r = t[1];
				return Array.isArray(r) && Array.isArray(e[n]) ? r.every(function(t) {
					return e[n].includes(t) || e[n].includes(decodeURIComponent(t));
				}) : "object" == typeof r && "object" == typeof e[n] && null !== r && null !== e[n] ? s(r, e[n]) : e[n] == r || e[n] == decodeURIComponent(r);
			});
		};
		return s(e, l);
	}, f.v = function() {
		var t, e, n, r, o, i, u = "undefined" != typeof window ? window.location : {}, f = u.host, c = u.pathname, a = u.search;
		return {
			host: null != (t = null == (e = this.t.location) ? void 0 : e.host) ? t : void 0 === f ? "" : f,
			pathname: null != (n = null == (r = this.t.location) ? void 0 : r.pathname) ? n : void 0 === c ? "" : c,
			search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === a ? "" : a
		};
	}, f.has = function(t) {
		return this.t.routes.hasOwnProperty(t);
	}, f.l = function(t, e) {
		var r = this;
		void 0 === t && (t = {}), void 0 === e && (e = this.i), t ??= {}, t = ["string", "number"].includes(typeof t) ? [t] : t;
		var o = e.parameterSegments.filter(function(t) {
			return !r.t.defaults[t.name];
		});
		if (Array.isArray(t)) t = t.reduce(function(t, e, r) {
			var i, u;
			return n({}, t, o[r] ? ((i = {})[o[r].name] = e, i) : "object" == typeof e ? e : ((u = {})[e] = "", u));
		}, {});
		else if (1 === o.length && !t.hasOwnProperty(o[0].name) && (t.hasOwnProperty(Object.values(e.bindings)[0]) || t.hasOwnProperty("id"))) {
			var i;
			(i = {})[o[0].name] = t, t = i;
		}
		return n({}, this.m(e), this.j(t, e));
	}, f.m = function(t) {
		var e = this;
		return t.parameterSegments.filter(function(t) {
			return e.t.defaults[t.name];
		}).reduce(function(t, r, o) {
			var i, u = r.name;
			return n({}, t, ((i = {})[u] = e.t.defaults[u], i));
		}, {});
	}, f.j = function(t, e) {
		var r = e.bindings, o = e.parameterSegments;
		return Object.entries(t).reduce(function(t, e) {
			var i, u, f = e[0], c = e[1];
			if (!c || "object" != typeof c || Array.isArray(c) || !o.some(function(t) {
				return t.name === f;
			})) return n({}, t, ((u = {})[f] = c, u));
			var a = c.hasOwnProperty(r[f]) ? r[f] : c.hasOwnProperty("id") ? "id" : void 0;
			if (void 0 === a) throw new Error("Ziggy error: object passed as '" + f + "' parameter is missing route model binding key '" + r[f] + "'.");
			return n({}, t, ((i = {})[f] = c[a], i));
		}, {});
	}, f.valueOf = function() {
		return this.toString();
	}, e(r, [
		{
			key: "params",
			get: function() {
				var t = this.p();
				return n({}, t.params, t.query);
			}
		},
		{
			key: "routeParams",
			get: function() {
				return this.p().params;
			}
		},
		{
			key: "queryParams",
			get: function() {
				return this.p().query;
			}
		}
	]);
}(/*#__PURE__*/ f(String));
function B(t, e, n, r) {
	var o = new z(t, e, n, r);
	return t ? o.toString() : o;
}
var M = { install: function(t, e) {
	var n = function(t, n, r, o) {
		return void 0 === o && (o = e), B(t, n, r, o);
	};
	parseInt(t.version) > 2 ? (t.config.globalProperties.route = n, t.provide("route", n)) : t.mixin({ methods: { route: n } });
} };
//#endregion
//#region resources/js/ssr.js
var appName = "CotizaFlow";
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* #__PURE__ */ Object.assign({
		"./Pages/Admin/Dashboard.vue": Dashboard_exports$1,
		"./Pages/Auth/ConfirmPassword.vue": ConfirmPassword_exports,
		"./Pages/Auth/ForgotPassword.vue": ForgotPassword_exports,
		"./Pages/Auth/Login.vue": Login_exports,
		"./Pages/Auth/Register.vue": Register_exports,
		"./Pages/Auth/ResetPassword.vue": ResetPassword_exports,
		"./Pages/Auth/VerifyEmail.vue": VerifyEmail_exports,
		"./Pages/Clients/Index.vue": Index_exports$4,
		"./Pages/Clients/Show.vue": Show_exports$1,
		"./Pages/Dashboard.vue": Dashboard_exports,
		"./Pages/Inventory/Index.vue": Index_exports$3,
		"./Pages/Pricing.vue": Pricing_exports,
		"./Pages/Profile/Edit.vue": Edit_exports,
		"./Pages/Profile/Partials/DeleteUserForm.vue": DeleteUserForm_exports,
		"./Pages/Profile/Partials/UpdatePasswordForm.vue": UpdatePasswordForm_exports,
		"./Pages/Profile/Partials/UpdateProfileInformationForm.vue": UpdateProfileInformationForm_exports,
		"./Pages/Quotes/Create.vue": Create_exports$1,
		"./Pages/Quotes/Index.vue": Index_exports$2,
		"./Pages/Quotes/PublicShow.vue": PublicShow_exports,
		"./Pages/Quotes/Show.vue": Show_exports,
		"./Pages/Services/Index.vue": Index_exports$1,
		"./Pages/Servicios.vue": Servicios_exports,
		"./Pages/Settings/Index.vue": Index_exports,
		"./Pages/Trial/Create.vue": Create_exports,
		"./Pages/Trial/Success.vue": Success_exports,
		"./Pages/Welcome.vue": Welcome_exports
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin).use(M, {
			...props.initialPage.props.ziggy ?? {},
			location: new URL(props.initialPage.url)
		});
	}
}));
//#endregion
export {};
