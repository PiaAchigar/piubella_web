import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// `PromosHero` es un Server Component async y React 18 no sabe renderizar hijos
// async: se mockea para poder renderizar la página. Lo que hace PromosHero se
// prueba aparte, en sus propios tests.
vi.mock('@/components/servicios/promos-hero', () => ({
  PromosHero: () => <div data-testid="promos-hero" />,
}))

import Servicios from '@/app/servicios/page'

describe('/servicios', () => {
  it('renderiza la cabecera de la página', async () => {
    render(await Servicios())
    expect(
      screen.getByRole('heading', { name: /equilibrio entre cuerpo, mente y estética/i }),
    ).toBeInTheDocument()
  })

  it('mantiene la franja de promos destacadas', async () => {
    render(await Servicios())
    expect(screen.getByTestId('promos-hero')).toBeInTheDocument()
  })

  it('sin Worker sólo queda el botón "Todo": los otros tres no tienen nada detrás', async () => {
    render(await Servicios())
    // Sin Worker, combos/packs/promos caen a listas vacías, y un botón que
    // lleva a una lista vacía es una puerta a una pantalla en blanco: no se
    // dibuja. "Todo" sí, porque servicios siempre hay.
    //
    // Los botones están duplicados —una copia en el aside de escritorio y otra
    // en el drawer móvil— así que se buscan todas las coincidencias.
    expect(screen.getAllByRole('button', { name: 'Todo' }).length).toBeGreaterThan(0)
    for (const etiqueta of ['Combos', 'Packs', 'Promos']) {
      expect(screen.queryAllByRole('button', { name: etiqueta })).toHaveLength(0)
    }
  })

  it('sin Worker no explota: renderiza con el catálogo vacío', async () => {
    render(await Servicios())
    expect(screen.getByText(/no hay servicios disponibles/i)).toBeInTheDocument()
  })
})
