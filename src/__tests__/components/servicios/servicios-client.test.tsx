import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiciosClient } from '@/components/servicios/servicios-client'
import type { WorkerCombo, WorkerDepilationPack, WorkerPromotion } from '@/lib/worker-api'

const combo: WorkerCombo = {
  id: 'c1', name: 'Combo Facial', description: null, priceType: 'percentage',
  validityMonths: null, servicesSubtotal: 100000, finalAmount: 80000, lines: [],
  kind: 'combo', areaCategoryId: 'a1', areaName: 'Estética',
  clasificaciones: [{ id: 'k1', name: 'Belleza' }],
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
      promos={[] as WorkerPromotion[]}
      {...over}
    />,
  )
}

describe('ServiciosClient — los cuatro botones', () => {
  it('los cuatro están en el menú', () => {
    montar()
    for (const etiqueta of ['Combos', 'Packs', 'Promos', 'Todos los servicios']) {
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

  it('sin combos publicados explica por qué, no deja la pantalla en blanco', () => {
    montar({ combos: [] })
    fireEvent.click(screen.getAllByRole('button', { name: 'Combos' })[0])
    expect(screen.getByText(/todavía no hay combos publicados/i)).toBeInTheDocument()
  })

  it('sin packs publicados explica por qué', () => {
    montar({ packs: [] })
    fireEvent.click(screen.getAllByRole('button', { name: 'Packs' })[0])
    expect(screen.getByText(/todavía no hay packs publicados/i)).toBeInTheDocument()
  })

  it('sin promos vigentes explica por qué', () => {
    montar()
    fireEvent.click(screen.getAllByRole('button', { name: 'Promos' })[0])
    expect(screen.getByText(/no hay promos vigentes/i)).toBeInTheDocument()
  })
})
