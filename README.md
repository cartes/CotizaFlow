# CotizaFlow

**Cotiza rápido. Haz seguimiento. Vende más.**

Cotizaciones y seguimiento comercial simple para microempresas y pymes.

## Estado del proyecto

Versión inicial en desarrollo, basada en Feeto y adaptada a un flujo comercial general.

- Clientes y catálogo de productos/servicios.
- Importación de catálogo desde Excel.
- Cotizaciones con descuentos e impuestos, sin vehículos ni órdenes de taller.
- Enlace público para aceptar o rechazar la propuesta.
- Vista de cotizaciones pendientes para seguimiento manual.
- Navegación comercial y pestañas por sección.

PDF, envío real de cotizaciones por correo, recordatorios automáticos y planes comerciales siguen pendientes. Las auditorías de dependencias están documentadas en el inventario; esta versión no está preparada para producción.

## Tecnologías

Laravel 13, PHP, Vue 3, Inertia 2, Tailwind CSS 3 y Vite. El entorno de desarrollo usa SQLite.

## Desarrollo local

```sh
composer install
npm ci
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

En otra terminal:

```sh
npm exec vite -- --host 127.0.0.1
```

Abrir http://127.0.0.1:8000. No repetir los seeders sobre una base ya poblada.

En una instalación nueva, el administrador de la empresa demo es `admin@demo.test` con clave inicial `password`; la aplicación solicita cambiarla. El entorno local existente conserva las cuentas y claves que ya se configuraron.

## Validación del flujo comercial

```sh
php artisan test --compact tests/Feature/ManualQuoteControllerTest.php tests/Feature/MarketingSeoTest.php tests/Feature/Auth/AuthenticationTest.php
npm run build:ssr
```

## Documentación

- [Inventario y adaptación de Feeto](COTIZAFLOW_INVENTARIO.md)
- [Guía del entorno local](COTIZAFLOW_LOCAL.md)

El historial de Feeto se conserva como origen del código. CotizaFlow tiene su propio repositorio y evolucionará de forma independiente.
