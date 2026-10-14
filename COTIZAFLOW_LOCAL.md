# CotizaFlow en macOS

Proyecto: `/Users/cristiancartes/Documents/desarrollo/laravel/cotizaflow`.

## Abrir y acceder

Abrir http://127.0.0.1:8000/?login=1.

Datos de demostración creados por los seeders heredados:

- Administrador de empresa: `admin@cartes.test` / la contraseña elegida durante el cambio inicial.
- Superadministrador: `superadmin@tallerflow.cl` / `password`.

Son usuarios de desarrollo. El panel comercial se abre en `/empresa/cartes/inicio`. Los seeders nuevos no agregan productos ni servicios automotrices.

## Levantar el proyecto en siguientes sesiones

Terminal 1:

```sh
cd /Users/cristiancartes/Documents/desarrollo/laravel/cotizaflow
php artisan serve --host=127.0.0.1 --port=8000
```

Terminal 2:

```sh
cd /Users/cristiancartes/Documents/desarrollo/laravel/cotizaflow
npm run dev
```

Laravel entrega la aplicación y Vite recompila los recursos. Abrir el puerto 8000, no el 5173. El script `npm run dev` heredado también inicia Reverb en 127.0.0.1:8080; se configuraron credenciales solo locales. `BROADCAST_CONNECTION=log` mantiene desactivado el broadcasting por WebSocket para esta inspección.

Si prefieres solo Vite:

```sh
npm exec vite -- --host 127.0.0.1
```

Para ejecutar además el trabajador de correos en cola, en otra terminal:

```sh
cd /Users/cristiancartes/Documents/desarrollo/laravel/cotizaflow
php artisan queue:listen --tries=1 --timeout=0
```

Alternativa integrada heredada: `composer run dev` inicia Laravel, cola, logs, Vite y Reverb. Usar esta alternativa después de detener las otras terminales para evitar puertos duplicados. Detener procesos de desarrollo con Ctrl+C.

Para servir recursos compilados sin Vite: detener Vite para que retire `public/hot`, ejecutar `npm run build` y mantener `php artisan serve`.

## Entorno preparado

- `.env` con nombre CotizaFlow, URL local, clave nueva y cookie `cotizaflow_session`.
- SQLite propia en `database/database.sqlite`; no se copió una base de Feeto.
- Sesión por base de datos; `SESSION_SECURE_COOKIE=false` para HTTP local. Configurar `true` al desplegar con HTTPS.
- Correo `log`: mensajes en `storage/logs/laravel.log`; no hay envío externo configurado.
- IA y pagos sin claves de proveedor. Sus flujos externos requieren configuración posterior.
- `vendor` y `node_modules` instalados; frontend compilado.
- `.env`, base SQLite y dependencias quedan fuera de Git según reglas heredadas.

## Comprobaciones ejecutadas

```sh
npm run build
php artisan test --compact tests/Feature/Auth/AuthenticationTest.php tests/Feature/ManualQuoteControllerTest.php tests/Feature/QuoteTaxTest.php tests/Feature/TenantRolesTest.php tests/Feature/ProductWorkbookImportTest.php tests/Feature/ServiceControllerTest.php
```

Resultado: compilación correcta; 36 pruebas y 200 aserciones. HTTP 200 en Laravel y cliente Vite; acceso de demostración verificado en navegador.

No repetir `migrate --seed` sobre esta base ya poblada: algunos seeders crean registros sin comprobar existencia. Para nuevas migraciones usar `php artisan migrate`; cualquier reinicio de datos debe decidirse expresamente.
