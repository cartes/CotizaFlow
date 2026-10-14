<?php

declare(strict_types=1);

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ServiceTemplateExport implements FromArray, ShouldAutoSize, WithHeadings, WithTitle
{
    public function array(): array
    {
        return [['SERV-001', 'Asesoría', 'Sesión de asesoría', 10000, 25000, 'mas_iva', 'si']];
    }

    public function headings(): array
    {
        return ['codigo', 'nombre', 'descripcion', 'costo', 'precio_venta', 'impuesto', 'activo'];
    }

    public function title(): string
    {
        return 'Servicios';
    }
}
