import type { WorkerCategory } from '@/lib/worker-api'

/**
 * La descripción de una sección de /servicios que no sale del árbol (Depilación
 * Definitiva, Actividades, Capacitaciones). Se busca por nombre entre las raíces
 * y se salta el eje `area`: esas son las pestañas del panel, y Laura edita la
 * categoría del catálogo, que se llama igual.
 */
export function descripcionDeSeccion(raices: WorkerCategory[], nombre: string): string | null {
  return raices.find((c) => c.name === nombre && c.kind !== 'area')?.webDescription ?? null
}
