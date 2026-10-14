<?php

declare(strict_types=1);

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductTemplateExport implements FromArray, ShouldAutoSize, WithHeadings, WithTitle
{
    public function array(): array
    {
        return [['PROD-001', 'Cuaderno', 'Papelería', 'Cuaderno tamaño carta', 2000, 3500, 'mas_iva']];
    }

    public function headings(): array
    {
        return ['sku', 'nombre', 'categoria', 'descripcion', 'costo', 'precio_venta', 'impuesto'];
    }

    public function title(): string
    {
        return 'Productos';
    }
}
