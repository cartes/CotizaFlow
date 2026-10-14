# Inventario Feeto → CotizaFlow

Fecha: 14 de octubre de 2026. Base local: commit `fa473cddf476ec86e2b23dcba0eb850722060c70`.
Rama: `cotizaflow/inventario`.

## Decisión de partida

Continuar sobre una copia independiente de Feeto. El código contiene una base comercial útil, pero sigue siendo una aplicación para talleres. Las decisiones siguientes son propuestas para el MVP; ELIMINAR significa retirar del producto después de desacoplar referencias, no que ya se hayan borrado archivos o tablas.

La revisión previa que asignaba reutilización del 100% era demasiado optimista. Tener instalado DomPDF o el SDK de IA no significa que ya exista el PDF de cotización ni un agente que la redacte. La cotización manual exige un vehículo y la aceptación crea una orden de trabajo. Estos acoplamientos definen la primera fase de adaptación.

## Matriz de módulos

| Módulo | Decisión | Evidencia en el código | Trabajo para CotizaFlow / prioridad |
|---|---|---|---|
| Laravel, Vue, Inertia, Vite | REUTILIZAR | `composer.json`, `package.json`, `vite.config.js` | Conservar estructura; revisar actualizaciones de seguridad. P0 |
| Multiempresa | REUTILIZAR | `Tenant`, `TenantAware`, `PathOrDomainTenantFinder`, `config/multitenancy.php` | Una base compartida con aislamiento lógico por tenant; probar aislamiento en cada adaptación. P0 |
| URL y navegación por empresa | ADAPTAR | `/taller/{tenantBySlug}`, `SetTenantRouteDefaults`, `resources/js/app.js` | Sustituir nombres y referencias a taller de forma coordinada. P1 |
| Autenticación, recuperación, perfil | REUTILIZAR | Controladores `Auth`, `User`, `LoginLog` | Conservar sesiones, verificación y registro de acceso. P0 |
| Roles y permisos | ADAPTAR | Spatie Permission, `TenantRoleCatalog`, `TenantRolesAndPermissionsSeeder` | Cotizaciones usan permisos `work-orders.*`; introducir permisos comerciales propios. P0 |
| Clientes | ADAPTAR | `Client`, `ClientController`, `ClientCrmService` | Mantener contactos/RUT; historial CRM hoy depende de vehículos y órdenes. P0 |
| Importación de clientes | ADAPTAR | `ClientVehicleWorkbookImport` | Separar contactos de vehículos; plantilla solo de clientes. P1 |
| Productos y categorías | ADAPTAR | `Product`, `ProductCategory`, `InventoryController` | Catálogo comercial sin exigir stock, repuestos ni sucursales. P0 |
| Servicios | ADAPTAR | `Service`, `ServiceController` | Mantener precios e impuestos; retirar servicios automotrices precargados. P0 |
| Importación de catálogo Excel/CSV | ADAPTAR | `ProductWorkbookImport`, `ServiceWorkbookImport`, `WorkbookImportController` | Reutilizar validación y actualización; desacoplar movimientos de stock y categorías del taller. P1 |
| Cotizaciones manuales | ADAPTAR | `Quote`, `ManualQuoteController`, `ManualQuoteService`, `StoreManualQuoteRequest`, `Quotes/*.vue` | Quitar vehículo obligatorio, referencias a OT y conversión automática a orden de trabajo. P0 |
| Ítems, descuentos e impuestos | REUTILIZAR | `QuoteItem`, `QuoteItemService`, `QuoteTaxTest`, `QuoteDiscountAuthorizationTest` | Conservar cálculos de productos/servicios/ítems libres, con pruebas de redondeo y permisos. P0 |
| Historial de cotización | ADAPTAR | `QuoteEvent`, `QuoteItemService::recordEvent` | Mantener eventos; quitar dependencia de orden de trabajo. P0 |
| Enlace público y respuesta del cliente | ADAPTAR | `ManualQuoteTrackingController`, `Quotes/PublicShow.vue`, rutas `quotes.public.*` | Conservar UUID y respuesta; aceptación solo cambia resultado comercial. Revisar privacidad, expiración y accesibilidad. P0 |
| PDF de cotización | CREAR | DomPDF instalado; no ruta/controlador/plantilla dedicada encontrada para PDF de cotización manual | Crear plantilla con logo, datos, ítems, impuestos, totales y descarga. Los PDF de reportes sirven como referencia técnica. P1 |
| Envío real de cotizaciones por correo | CREAR | `ManualQuoteService::send` registra estado/evento; `ManualQuoteController::send` devuelve mensaje y URL WhatsApp | Añadir correo específico de cotización, adjunto/enlace, trabajo en cola y manejo de fallos; registrar envío tras resultado real. P1 |
| Compartir por WhatsApp | ADAPTAR | `ManualQuoteService::buildWhatsAppMessage`, flujo de envío en controlador | Reutilizar enlace para compartir manualmente; cambiar textos automotrices. P1 |
| Tracking de correo | ADAPTAR | `EmailTracking`, `EmailTrackingController` | Integrar con nuevo envío; apertura de correo no prueba lectura humana. P2 |
| Seguimiento de cotizaciones pendientes | CREAR | Recordatorios actuales son de renovación, cobranza o marketing preventivo | Crear fecha de próximo contacto, responsable, tareas, recordatorios y registro de interacción. P1 |
| Resumen comercial y conversión | ADAPTAR | `TallerDashboardController`, `ClientCrmService`, `Reports/ReportDataService` | Métricas directas de Quote: enviadas, pendientes, aceptadas y monto; no métricas de órdenes. P1 |
| Notificaciones internas | ADAPTAR | `TenantNotification`, listeners, `TenantNotificationController` | Mantener almacenamiento; nuevos textos y tipos de seguimiento comercial. P1 |
| Onboarding | ADAPTAR | `TenantWelcomeService`, `TenantSetupService`, `TenantSetupChecklistService`, tours | Empresa → catálogo → cliente → primera cotización. Actualmente inicia con taller y página de reservas. P1 |
| Planes y control de acceso | ADAPTAR | `Plan`, `TenantPlan`, `PlanFeatureService`, `TenantFeature` | Redefinir Emprendedor/Pyme/Equipo y contadores de uso; no copiar límites automotrices. P2 |
| Suscripciones y Mercado Pago | ADAPTAR | `Payment`, controladores de suscripción/checkout/webhook | Reutilizar integración después de ajustar producto/planes y probar sandbox. P2 |
| Administración SaaS y auditoría | ADAPTAR | `Admin/*`, `AuditLog`, `TenantLead`, `TenantNote`, `TrialRequest` | Conservar empresas, usuarios y soporte; simplificar informes y alta. P2 |
| Branding de empresa | ADAPTAR | `TenantBrandingController`, atributos de Tenant | Reutilizar logo y colores para PDF y enlace público. P1 |
| IA y consumo | ADAPTAR | `laravel/ai`, `ApiUsageLog`, agentes actuales de patente, SEO y soporte | Conservar infraestructura; no hay agente comercial de cotización identificado. P2 |
| Asistente para preparar cotización | CREAR | No agente especializado encontrado en `app/Ai/Agents` | Texto del cliente → borrador con catálogo y revisión humana; cuotas y costos. P2 |
| Kanban comercial | CREAR | Kanban actual representa operación de taller | Diseñar etapas de oportunidades/cotizaciones si se valida necesidad; posterior al MVP. P3 |
| Sucursales | ADAPTAR | `Branch`, `BranchContext`, `BranchLimitService` | Mantener temporalmente Casa Matriz: catálogo y usuarios dependen de ella. Ocultar del MVP; evaluar retirada después. P2 |
| Vehículos y consulta por patente | ELIMINAR | `Vehicle`, `VehicleBrand`, `VehicleModel`, `BoostrService`, agentes de patente | Retirar tras desacoplar cotizaciones, contactos y seeders. P1 |
| Recepción, checklist e imágenes de taller | ELIMINAR | `ReceptionController`, `ReceptionChecklist`, `SmartReceptionController`, `WorkOrderImage` | Retirar de rutas, menú, permisos, eventos y onboarding. P1 |
| Órdenes y operación de taller | ELIMINAR | `WorkOrder`, `WorkOrderItem`, `WorkOrderQuoteService`, `WorkOrderController` | Bloqueado hasta que aceptar una cotización no cree una OT. P1 |
| Stock, movimientos y ventas de mostrador | ELIMINAR | `StockMovement`, `StockService`, `Order`, `OrderItem`, observers | Conservar catálogo; eliminar efectos de stock/importación y reportes operativos después de desacoplar. P2 |
| Agenda y reservas de taller | ELIMINAR | `Appointment`, `PublicBookingController`, `TenantSchedulingController` | Retirar agenda de servicios automotrices; fechas de seguimiento serán un módulo comercial distinto. P2 |
| Facturas internas y cobranza | ELIMINAR | `ClientInvoice`, recordatorios de facturas, `CollectionsReportController` | Fuera del MVP; revisar referencias desde clientes y reportes. P2 |
| Directorio de talleres y páginas automotrices | ELIMINAR | `PublicTenantDirectoryController`, `PublicOrdenDeTrabajoController`, `PublicServicesController` | Retirar contenido comercial específico de Feeto. P2 |
| Landing, precios, SEO y blog | ADAPTAR | `WelcomeController`, `PublicPricingController`, `BlogPost`, `SeoController` | Marca y propuesta CotizaFlow; blog/editor opcional después del MVP. P2 |
| Infraestructura y despliegue | ADAPTAR | archivos Docker/despliegue del repositorio | Configurar nuevo servicio, dominio y secretos cuando llegue publicación. P3 |

## Dependencias principales instaladas

Versiones tomadas de los archivos lock; no se actualizaron paquetes en esta fase.

| Dependencia | Versión instalada | Destino |
|---|---|---|
| Laravel | 13.2.0 | Conservar |
| Inertia Laravel / Vue | 2.0.22 / 2.3.18 | Conservar |
| Vue / Vite | 3.5.30 / 8.1.0 | Conservar |
| Tailwind | 3.4.19 | Conservar; revisar auditoría antes de actualizar |
| Spatie Multitenancy / Permission | 4.1.0 / 7.3.0 | Conservar |
| Laravel Excel | 3.1.69 | Conservar para importaciones |
| DomPDF (adaptador Laravel) | 3.1.2 | Reutilizar al construir PDF; revisar avisos del motor |
| Laravel AI | 0.3.2 | Opcional para segunda fase |
| Mercado Pago | 3.8.0 | Conservar para fase de cobro |
| Laravel Reverb | 1.9.0 | Opcional; desarrollo local inicia servidor, broadcasting usa log |
| Tiptap Vue | 3.23.6 | Evaluar al simplificar blog/editor |
| ApexCharts | 5.14.0 | Reutilizar si los gráficos comerciales lo justifican |

El Mac dispone de PHP 8.5.4, Node 26.10.0 y Composer 2.9.5. El valor `config.platform.php` de Composer es 8.3.6 y el lock se pudo instalar con PHP 8.5.4; revisar esa simulación antes de cambiar dependencias o desplegar.

## Acoplamientos que determinan el orden

1. `StoreManualQuoteRequest` exige `vehicle_id` y `ManualQuoteService::createDraft` lo lee directamente.
2. `approveManually` y `respondPublicly` llaman a `convertToWorkOrder` al aceptar. Por eso no se pueden borrar vehículos/OT al comienzo.
3. Las rutas de cotización usan permisos `work-orders.view` y `work-orders.manage-items`; hay que migrar permisos antes de retirar roles de taller.
4. `ClientCrmService` calcula parte del historial a partir de vehículos/OT; deberá relacionar directamente clientes y cotizaciones.
5. Productos e importaciones incluyen stock y sucursales; `TenantSetupService` crea Casa Matriz y servicios automotrices.
6. La navegación y el reconocimiento de empresa contienen `/taller/` tanto en PHP como en JavaScript. Un cambio parcial rompe enlaces o resolución del tenant.

## MVP propuesto y criterios de salida

P0: entrar a una empresa, crear cliente y catálogo, crear cotización SIN vehículo, agregar ítems e impuestos, guardar y consultar historial. Aceptar no crea una orden de taller. Permisos y aislamiento funcionan entre dos empresas.

P1: importar catálogo, descargar PDF con logo, compartir enlace por WhatsApp, enviar correo real, aceptar/rechazar desde enlace público, programar próximo contacto y consultar un resumen de pendientes/conversión. Menú y onboarding usan lenguaje de pyme.

P2: habilitar cobro, límites por plan, automatizaciones avanzadas e IA después de validar el flujo básico. Los precios conversados son propuestas; no se cargaron en el sistema.

Orden recomendado: pruebas de cotización genérica → desacoplar vehículos/OT → permisos comerciales → clientes/catálogo → PDF/envío → seguimiento → simplificar navegación → planes/cobro.

## Validación de esta preparación

- Dependencias PHP instaladas desde `composer.lock`; dependencias JS desde `package-lock.json`.
- Migraciones y seeders ejecutados sobre SQLite nueva, exclusiva de CotizaFlow.
- `npm run build`: correcto. Avisos heredados: imágenes `car-hero` no resueltas, Browserslist antiguo y algunos bundles mayores a 500 kB.
- 36 pruebas existentes pasaron, con 200 aserciones: autenticación, cotización manual, impuestos, roles, importación de productos y servicios.
- Laravel en `127.0.0.1:8000` y Vite en `localhost:5173`: HTTP 200.
- Inicio de sesión con `admin@cartes.test`: comprobado en navegador; abre onboarding heredado.
- El entorno local conserva las funciones de Feeto para inspección. El inventario no equivale a una adaptación funcional completa ni a una validación de toda la aplicación.

## Pendiente de revisión antes de publicar

Las auditorías de paquetes detectaron avisos de seguridad heredados. Resolver mediante actualizaciones seleccionadas y pruebas; no ejecutar una actualización forzada indiscriminada. Ver los reportes adjuntos `COTIZAFLOW_AUDIT_NPM.json` y `COTIZAFLOW_AUDIT_COMPOSER.json`.

Resultados consultados el 14 de octubre de 2026: npm reporta 55 paquetes afectados (38 moderados, 16 altos y 1 crítico, `shell-quote`); Composer reporta 52 avisos en 16 paquetes. Los conteos no equivalen a fallos explotables independientes: incluyen dependencias transitivas y deben evaluarse según el uso real.

También se comprobó en navegador que «Continuar después» abre el panel de la empresa. No se probó de extremo a extremo cada módulo ni se ejecutó la suite completa.

## Adaptación comercial aplicada

La interfaz activa ahora usa CotizaFlow: portada, funciones, planes, navegación, clientes, catálogo, cotizaciones, seguimiento y configuración. Las URLs privadas usan `/empresa/{slug}`; la URL anterior del panel redirige al inicio comercial. Se retiraron las rutas de agenda, recepción, vehículos, órdenes, directorio de talleres y páginas automotrices. Las pantallas retiradas también quedaron fuera del paquete frontend de navegador y SSR.

La cotización comercial ya no exige vehículo y su aceptación no crea una orden de trabajo. Los permisos comerciales son `quotes.view`, `quotes.manage`, `quotes.send`, `customers.manage`, `inventory.manage` y `users.manage`. Se corrigió la renovación de la caché de permisos al cambiar de empresa. Seguimiento muestra cotizaciones pendientes; todavía no programa recordatorios automáticos.

Se retiraron 24 productos y 30 servicios automotrices de demostración sin referencias en cotizaciones. Los datos previos están respaldados en `storage/app/private/cotizaflow-before-commercial-cleanup.sqlite`. Las claves de acceso existentes se conservaron.

Las tablas y parte del código backend heredado siguen en el repositorio para retirar sus dependencias en una fase posterior. No tienen rutas activas en la nueva interfaz. Los planes públicos indican que precios e inclusiones están por confirmar; PDF y correo real de cotización siguen pendientes.
