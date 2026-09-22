/**
 * Qué está mostrando el panel derecho de /servicios.
 *
 * Los cuatro botones son excluyentes: tocar uno apaga los otros. `arbol` es el
 * estado en que no hay ninguno activo — el catálogo por clasificación, que es
 * lo que se ve al entrar y a lo que se vuelve al tocar una categoría del menú.
 */
export type ModoCatalogo = 'arbol' | 'todos' | 'combos' | 'packs' | 'promos'

export const BOTONES: { modo: Exclude<ModoCatalogo, 'arbol'>; etiqueta: string; icono: string }[] = [
  { modo: 'combos', etiqueta: 'Combos', icono: 'style' },
  { modo: 'packs', etiqueta: 'Packs', icono: 'layers' },
  { modo: 'promos', etiqueta: 'Promos', icono: 'local_offer' },
  // "Todo" y no "Todos los servicios": en una grilla de dos columnas la
  // etiqueta larga se cortaba en "Todos los ser…", y una etiqueta cortada es
  // peor que una corta.
  { modo: 'todos', etiqueta: 'Todo', icono: 'apps' },
]

/**
 * Qué botones se muestran.
 *
 * Un botón que lleva a una lista vacía es una puerta a una pantalla en blanco.
 * Si no hay combos publicados, no hay botón "Combos" — y así la clienta nunca
 * llega a un cartel que le explique nuestra gestión interna, que no es asunto
 * suyo. "Todo" queda siempre: servicios siempre hay.
 */
export function botonesVisibles(hay: {
  combos: boolean
  packs: boolean
  promos: boolean
}): typeof BOTONES {
  return BOTONES.filter((b) => {
    if (b.modo === 'combos') return hay.combos
    if (b.modo === 'packs') return hay.packs
    if (b.modo === 'promos') return hay.promos
    return true
  })
}
