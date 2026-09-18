import type { WorkerCombo } from './worker-api'

/**
 * Agrupar por ÁREA y agrupar por CLASIFICACIÓN son dos cosas distintas y las
 * dos están en la misma pantalla. Ver el spec §2.
 *
 *   - Área (6): el título cuando se toca un botón (Combos / Packs / Promos).
 *   - Clasificación (8): dónde aparece un combo dentro del árbol del menú.
 *
 * Están juntas en este archivo justamente para que la diferencia se lea de una.
 */

export interface Grupo<T> {
  areaName: string
  items: T[]
}

/** Lo que no tiene área no se esconde: se muestra último, bajo este título. */
const SIN_AREA = 'Otros'

export function agruparPorArea<T extends { areaName: string | null }>(
  items: readonly T[],
): Grupo<T>[] {
  const porArea = new Map<string, T[]>()
  for (const item of items) {
    const clave = item.areaName ?? SIN_AREA
    const lista = porArea.get(clave) ?? []
    lista.push(item)
    porArea.set(clave, lista)
  }

  return [...porArea.entries()]
    .map(([areaName, grupoItems]) => ({ areaName, items: grupoItems }))
    .sort((a, b) => {
      // "Otros" siempre último: es el cajón de lo que no se pudo clasificar y
      // arriba de todo se leería como una categoría de verdad.
      if (a.areaName === SIN_AREA) return 1
      if (b.areaName === SIN_AREA) return -1
      return a.areaName.localeCompare(b.areaName, 'es')
    })
}

/**
 * Los combos que se muestran dentro de una clasificación del árbol.
 *
 * Un combo aparece en CADA clasificación que tenga alguno de sus servicios, así
 * que el mismo combo sale en más de un lugar. Eso es querido, no un bug.
 */
export function combosDeClasificacion(
  combos: readonly WorkerCombo[],
  clasificacionId: string,
): WorkerCombo[] {
  return combos.filter((c) => c.clasificaciones.some((k) => k.id === clasificacionId))
}
