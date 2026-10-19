<?php

declare(strict_types=1);

namespace App\Enums;

enum InternalAdminRole: string
{
    case Owner = 'owner';
    case Operations = 'operations';
    case Finance = 'finance';
    case Support = 'support';
    case Analyst = 'analyst';

    public function label(): string
    {
        return match ($this) {
            self::Owner => 'Propietario',
            self::Operations => 'Operaciones',
            self::Finance => 'Finanzas',
            self::Support => 'Soporte',
            self::Analyst => 'Analista',
        };
    }

    /** @return list<string> */
    public function permissions(): array
    {
        return match ($this) {
            self::Owner => ['*'],
            self::Operations => ['dashboard.view', 'companies.manage', 'requests.manage', 'reports.view'],
            self::Finance => ['dashboard.view', 'payments.view', 'reports.view'],
            self::Support => ['dashboard.view', 'companies.manage', 'requests.manage', 'history.view'],
            self::Analyst => ['dashboard.view', 'reports.view', 'history.view'],
        };
    }

    public function allows(string $permission): bool
    {
        return in_array('*', $this->permissions(), true)
            || in_array($permission, $this->permissions(), true);
    }

    /** @return array<string, string> */
    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $role): array => [$role->value => $role->label()])
            ->all();
    }
}
