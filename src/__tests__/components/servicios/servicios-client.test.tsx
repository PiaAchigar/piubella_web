import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiciosClient } from '@/components/servicios/servicios-client'
import type { WorkerCombo, WorkerDepilationPack, WorkerPromotion } from '@/lib/worker-api'

const combo: WorkerCombo = {
  id: 'c1', name: 'Combo Facial', description: null, priceType: 'percentage',
  validityMonths: null, servicesSubtotal: 100000, finalAmount: 80000, lines: [],
  kind: 'combo', areaCategoryId: 'a1', areaName: 'Estética',
  clasificaciones: [{ id: 'k1', name: 'Belleza' }],
}

const promo: WorkerPromotion = {
  id: 'pr1', name: 'Promo Primavera', description: null,
  promotionType: 'percentage', discountPercentage: 20, discountAmount: null,
  validFrom: null, validUntil: null, targets: [],
}

const pack: WorkerDepilationPack = {
  id: 'p1', name: 'Cuerpo Full', description: null, fixedPrice: 65000,
  fixedDurationMinutes: 90, choiceZoneCount: 0, zonas: ['Axilas'],
}

function montar(over: Partial<Parameters<typeof ServiciosClient>[0]> = {}) {
  return render(
    <ServiciosClient
      tree={[]}
      allServices={[]}
      trainings={[]}
      activities={[]}
      combos={[combo]}
      packs={[pack]}
      promos={[promo]}
      {...over}
    />,
  )
}

describe('ServiciosClient — los cuatro botones', () => {
  it('los cuatro están en el menú', () => {
    montar()
    for (const etiqueta of ['Combos', 'Packs', 'Promos', 'Todo']) {
      expect(screen.getAllByRole('button', { name: etiqueta }).length).toBeGreaterThan(0)
    }
  })

  it('tocar Combos muestra los combos agrupados por ÁREA', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    expect(screen.getByRole('heading', { name: 'Estética' })).toBeInTheDocument()
    expect(screen.getByText('Combo Facial')).toBeInTheDocument()
  })

  it('tocar Packs muestra los packs', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Packs' })[0])
    expect(screen.getByText('Cuerpo Full')).toBeInTheDocument()
  })

  it('los botones son excluyentes: tocar Packs apaga Combos', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    fireEvent.click(screen.getAllByRole('button', { name: 'Packs' })[0])
    expect(screen.queryByText('Combo Facial')).toBeNull()
    expect(screen.getByText('Cuerpo Full')).toBeInTheDocument()
  })

  // Un botón que lleva a una lista vacía es una puerta a una pantalla en
  // blanco. Antes ahí salía "todavía no hay combos publicados", que es una
  // explicación de nuestra gestión interna leída por una clienta. Ahora el
  // botón directamente no está.
  it('sin combos publicados no hay botón "Combos"', () => {
    montar({ combos: [] })
    expect(screen.queryAllByRole('button', { name: 'Combos' })).toHaveLength(0)
  })

  it('sin packs publicados no hay botón "Packs"', () => {
    montar({ packs: [] })
    expect(screen.queryAllByRole('button', { name: 'Packs' })).toHaveLength(0)
  })

  it('sin promos vigentes no hay botón "Promos"', () => {
    montar({ promos: [] })
    expect(screen.queryAllByRole('button', { name: 'Promos' })).toHaveLength(0)
  })

  it('"Todo" queda siempre, aunque no haya nada más publicado', () => {
    montar({ combos: [], packs: [] })
    expect(screen.queryAllByRole('button', { name: 'Combos' })).toHaveLength(0)
    expect(screen.queryAllByRole('button', { name: 'Packs' })).toHaveLength(0)
    expect(screen.getAllByRole('button', { name: 'Todo' }).length).toBeGreaterThan(0)
  })

  it('las categorías NO desaparecen al tocar un botón', () => {
    montar({ tree: [{ id: 'k1', name: 'Belleza', services: [], children: [] }] })
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    // Antes el árbol se escondía al entrar en un modo y no había forma de
    // recuperarlo sin recargar la página.
    expect(screen.getAllByRole('link', { name: 'Belleza' }).length).toBeGreaterThan(0)
  })

  it('tocar una categoría apaga el botón activo y vuelve al catálogo', () => {
    montar({ tree: [{ id: 'k1', name: 'Belleza', services: [], children: [] }] })
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    fireEvent.click(screen.getAllByRole('link', { name: 'Belleza' })[0])
    // El combo de la prueba es del área Estética: si volvió al catálogo por
    // categorías, ese encabezado de área ya no está.
    expect(screen.queryByRole('heading', { name: 'Estética' })).toBeNull()
  })

  // Hallazgo de revisión sobre 9214cb2: el toggle decidía contra `modo` (el
  // estado interno crudo) pero el resaltado se pintaba con `modoEfectivo` (que
  // buscar puede pisar). Con eso, un botón que la búsqueda apaga visualmente
  // sigue "prendido" por dentro, y tocarlo lo apagaba en vez de prenderlo.
  it('tocar un botón apagado por la búsqueda lo prende, no lo manda al árbol', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    expect(screen.getByText('Combo Facial')).toBeInTheDocument()

    // Buscar pisa el modo visualmente: "Combos" se ve apagado aunque por
    // dentro `modo` siga valiendo 'combos'.
    fireEvent.change(screen.getAllByPlaceholderText('Buscar servicio...')[0], {
      target: { value: 'algo' },
    })
    expect(screen.queryByText('Combo Facial')).toBeNull()

    // El botón "apagado" tiene que prender Combos de nuevo, no apagarlo más.
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    expect(screen.getByText('Combo Facial')).toBeInTheDocument()
  })
})

// Hallazgo de revisión sobre 9214cb2: el test de arriba usa `getAllByRole(...)[0]`,
// que siempre agarra el botón de escritorio (es el primero en el DOM) — los cuatro
// botones del drawer móvil y su `closeDrawer()` no los probaba nadie. El drawer es
// la mitad del rediseño que ve quien entra desde el celular, así que va aparte,
// distinguido por el `aria-label` del grupo (más estable que un índice posicional).
describe('ServiciosClient — combos dentro del árbol', () => {
  const arbol = [
    { id: 'k1', name: 'Belleza', services: [], children: [] },
    { id: 'k9', name: 'Masajes', services: [], children: [] },
  ]

  it('el combo aparece en la clasificación que tiene alguno de sus servicios', () => {
    montar({ tree: arbol })
    expect(screen.getByText('Combo Facial')).toBeInTheDocument()
  })

  it('NO aparece en una clasificación que no es suya', () => {
    montar({ tree: [{ id: 'k9', name: 'Masajes', services: [], children: [] }] })
    expect(screen.queryByText('Combo Facial')).toBeNull()
  })

  it('un combo de dos clasificaciones sale en las dos', () => {
    montar({
      tree: arbol,
      combos: [{ ...combo, clasificaciones: [{ id: 'k1', name: 'Belleza' }, { id: 'k9', name: 'Masajes' }] }],
    })
    expect(screen.getAllByText('Combo Facial')).toHaveLength(2)
  })
})

describe('ServiciosClient — el drawer móvil también tiene los cuatro botones', () => {
  it('están los cuatro, con las mismas etiquetas', () => {
    montar()
    const drawer = within(screen.getByRole('group', { name: /drawer móvil/i }))
    for (const etiqueta of ['Combos', 'Packs', 'Promos', 'Todo']) {
      expect(drawer.getByRole('button', { name: etiqueta })).toBeInTheDocument()
    }
  })

  it('tocar uno cambia el modo y cierra el drawer', () => {
    const { container } = montar()

    // Abrir el drawer primero: si arranca cerrado, cerrarlo de nuevo no prueba nada.
    fireEvent.click(screen.getByRole('button', { name: 'Abrir filtros' }))
    const drawerPanel = container.querySelector('.rounded-t-2xl')
    expect(drawerPanel?.className).toContain('translate-y-0')

    const botonesDrawer = within(screen.getByRole('group', { name: /drawer móvil/i }))
    fireEvent.click(botonesDrawer.getByRole('button', { name: 'Packs' }))

    expect(screen.getByText('Cuerpo Full')).toBeInTheDocument()
    expect(drawerPanel?.className).toContain('translate-y-full')
  })
})

// Pedido de Pia (2026-10-27): Depilación Definitiva es un ÁREA, no una
// clasificación, así que nunca entraba en el árbol del menú. Ahora va como una
// categoría más —igual que Actividades y Capacitaciones— con lo publicado de
// depilación: los packs y los combos de esa área.
describe('ServiciosClient — Depilación Definitiva en el menú', () => {
  const comboDepi: WorkerCombo = {
    ...combo, id: 'c2', name: 'Combo Piernas + Axilas',
    areaCategoryId: 'a2', areaName: 'Depilación Definitiva', clasificaciones: [],
  }

  it('con un pack publicado aparece en el menú como categoría', () => {
    montar()
    expect(screen.getAllByRole('link', { name: 'Depilación Definitiva' }).length).toBeGreaterThan(0)
  })

  it('su sección del catálogo muestra los packs', () => {
    montar()
    const seccion = screen.getByRole('heading', { name: 'Depilación Definitiva' }).parentElement!
    expect(within(seccion).getByText('Cuerpo Full')).toBeTruthy()
  })

  it('un combo del área Depilación Definitiva también entra en la sección', () => {
    montar({ combos: [combo, comboDepi] })
    const seccion = screen.getByRole('heading', { name: 'Depilación Definitiva' }).parentElement!
    expect(within(seccion).getByText('Combo Piernas + Axilas')).toBeTruthy()
    // Un combo de otra área no se cuela.
    expect(within(seccion).queryByText('Combo Facial')).toBeNull()
  })

  it('sin nada de depilación publicado no aparece: sería una puerta a una sección vacía', () => {
    montar({ packs: [] })
    expect(screen.queryByRole('link', { name: 'Depilación Definitiva' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Depilación Definitiva' })).toBeNull()
  })

  it('tocarla en el menú vuelve al catálogo aunque se esté mirando Combos', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    fireEvent.click(screen.getAllByRole('link', { name: 'Depilación Definitiva' })[0])
    expect(screen.getByRole('heading', { name: 'Depilación Definitiva' })).toBeTruthy()
  })
})
