/**
 * Qué está mostrando la pantalla de /servicios.
 *
 * Los cuatro son excluyentes: tocar un botón apaga los otros. `arbol` es el
 * estado en que no hay ningún botón activo — el catálogo por clasificación,
 * que es lo que se ve al entrar.
 */
export type ModoCatalogo = 'arbol' | 'todos' | 'combos' | 'packs' | 'promos'

export const BOTONES: { modo: Exclude<ModoCatalogo, 'arbol'>; etiqueta: string; icono: string }[] = [
  { modo: 'combos', etiqueta: 'Combos', icono: 'style' },
  { modo: 'packs', etiqueta: 'Packs', icono: 'layers' },
  { modo: 'promos', etiqueta: 'Promos', icono: 'local_offer' },
  { modo: 'todos', etiqueta: 'Todos los servicios', icono: 'apps' },
]
