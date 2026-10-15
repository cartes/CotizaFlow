<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Fuente única de verdad para las páginas públicas de marketing cuyo SEO
 * es editable desde el panel de super-admin (Landing SEO).
 */
final class MarketingSeoPages
{
    public const SITE_NAME = 'CotizaFlow';

    public const LOCALE = 'es_CL';

    public const TWITTER_SITE = null;

    public const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

    public const NOINDEX_ROBOTS = 'noindex, nofollow';

    /** Imagen social por defecto (public/images). Dimensiones reales del archivo. */
    public const DEFAULT_SOCIAL_IMAGE = '/images/tallerflow-social-share.png';

    public const DEFAULT_SOCIAL_IMAGE_WIDTH = 942;

    public const DEFAULT_SOCIAL_IMAGE_HEIGHT = 494;

    /** Logo usado en los schemas Organization / publisher. */
    public const LOGO_IMAGE = '/images/taller-flow-isotipo.png';

    /**
     * @var array<string, array{label: string, route: string, og_type: string, default_title: string, default_description: string}>
     */
    private const PAGES = [
        'home' => [
            'label' => 'Página de Inicio',
            'route' => 'home',
            'og_type' => 'website',
            'default_title' => 'CotizaFlow | Cotizaciones y seguimiento comercial',
            'default_description' => 'CotizaFlow ayuda a microempresas y pymes a crear cotizaciones profesionales y hacer seguimiento comercial.',
        ],
        'services' => [
            'label' => 'Características y Módulos',
            'route' => 'servicios',
            'og_type' => 'website',
            'default_title' => 'Funciones de CotizaFlow | Productos, servicios y cotizaciones',
            'default_description' => 'Organiza clientes, productos, servicios, descuentos e impuestos; comparte cotizaciones y revisa su estado.',
        ],
        'pricing' => [
            'label' => 'Página de Precios',
            'route' => 'pricing',
            'og_type' => 'website',
            'default_title' => 'Planes y precios de CotizaFlow',
            'default_description' => 'Elige el plan que se ajuste a la gestión de clientes, productos, servicios y cotizaciones de tu empresa.',
        ],
        'trial' => [
            'label' => 'Solicitar Prueba Gratuita',
            'route' => 'trial.create',
            'og_type' => 'website',
            'default_title' => 'Solicita acceso a CotizaFlow',
            'default_description' => 'Prueba una herramienta para crear y dar seguimiento a cotizaciones comerciales en tu empresa.',
        ],
        'blog' => [
            'label' => 'Blog',
            'route' => 'blog.index',
            'og_type' => 'website',
            'default_title' => 'Blog · TallerFlow — Recursos para Talleres Mecánicos',
            'default_description' => 'Aprende prácticas para optimizar tiempos, fidelizar clientes y aumentar la rentabilidad de tu taller mecánico en Chile.',
        ],
        'orden_trabajo' => [
            'label' => 'Guía: Orden de Trabajo',
            'route' => 'orden-de-trabajo-taller-mecanico',
            'og_type' => 'article',
            'default_title' => 'Orden de Trabajo para Taller Mecánico: Guía Completa | TallerFlow',
            'default_description' => 'Aprende qué es una orden de trabajo para taller mecánico, qué debe incluir y cómo digitalizarla. Incluye template gratuito.',
        ],
        'talleres' => [
            'label' => 'Directorio de Talleres',
            'route' => 'talleres.index',
            'og_type' => 'website',
            'default_title' => 'Directorio de Talleres Mecánicos en Chile · TallerFlow',
            'default_description' => 'Encuentra talleres mecánicos confiables en tu comuna. Agenda tu hora directamente con cada taller asociado a TallerFlow.',
        ],
    ];

    /**
     * @return array<string, array{label: string, route: string, og_type: string, default_title: string, default_description: string}>
     */
    public static function all(): array
    {
        return self::PAGES;
    }

    /** @return list<string> */
    public static function keys(): array
    {
        return array_keys(self::PAGES);
    }

    public static function has(string $key): bool
    {
        return array_key_exists($key, self::PAGES);
    }

    /**
     * @return array{label: string, route: string, og_type: string, default_title: string, default_description: string}
     */
    public static function get(string $key): array
    {
        if (! self::has($key)) {
            throw new \InvalidArgumentException("Página SEO desconocida: {$key}");
        }

        return self::PAGES[$key];
    }
}
