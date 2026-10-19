<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ApiUsageLog;
use App\Models\IntegrationEvent;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Spatie\Multitenancy\Models\Tenant;

class BoostrService
{
    /**
     * Obtiene los datos de la patente desde la API de Boostr.
     *
     * @param  string  $patente  La patente a consultar
     * @return array<string, mixed>|null Objeto con los datos o null en caso de error
     */
    public function getVehicleData(string $patente): ?array
    {
        try {
            $baseUrl = rtrim((string) config('services.boostr.base_url', 'https://api.boostr.cl'), '/');
            $apiKey = config('services.boostr.key');
            $connectTimeout = (int) config('services.boostr.connect_timeout', 2);
            $timeout = (int) config('services.boostr.timeout', 5);
            $apiUrl = str_contains($baseUrl, '{patente}')
                ? str_replace('{patente}', urlencode($patente), $baseUrl)
                : $baseUrl.'/vehiculo/'.urlencode($patente);

            $response = Http::withToken($apiKey ?? '')
                ->connectTimeout($connectTimeout)
                ->timeout($timeout)
                ->get($apiUrl);

            if ($response->successful()) {
                ApiUsageLog::record('boostr', Tenant::current()?->id);
                IntegrationEvent::record('boostr', 'ok', 'La API respondió correctamente.');
                $data = $response->json();

                // Extrayendo la información premium del vehículo
                return [
                    'marca' => $data['marca'] ?? 'Desconocida',
                    'modelo' => $data['modelo'] ?? 'Desconocido',
                    'anio' => $data['anio'] ?? 'Desconocido',
                    'vin' => $data['vin'] ?? 'No disponible',
                    'nombre_dueno' => $data['propietario']['nombre'] ?? 'Sin asignar',
                    'rut_dueno' => $data['propietario']['rut'] ?? 'No disponible',
                ];
            }

            Log::warning('Boostr API returned status: '.$response->status()." for patente: {$patente}");
            IntegrationEvent::record('boostr', 'error', 'Boostr respondió con HTTP '.$response->status().'.');

            return null;

        } catch (\Throwable $e) {
            Log::error('Error communicating with Boostr API: '.$e->getMessage());
            IntegrationEvent::record('boostr', 'error', 'No se pudo establecer comunicación con Boostr.');

            return null;
        }
    }
}
