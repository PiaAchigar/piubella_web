import { describe, expect, it } from 'vitest'
import { agruparPorArea, combosDeClasificacion } from '@/lib/agrupar-catalogo'
import type { WorkerCombo } from '@/lib/worker-api'

function combo(over: Partial<WorkerCombo>): WorkerCombo {
  return {
    id: 'c1', name: 'Combo', description: null, priceType: 'percentage',
    validityMonths: null, servicesSubtotal: 100, finalAmount: 80, lines: [],
    kind: 'combo', areaCategoryId: 'a1', areaName: 'Estética', clasificaciones: [],
    ...over,
  }
}

describe('agruparPorArea', () => {
  it('agrupa por el nombre del área', () => {
    const grupos = agruparPorArea([
      combo({ id: 'c1', areaName: 'Estética' }),
      combo({ id: 'c2', areaName: 'Masajes y Bienestar' }),
      combo({ id: 'c3', areaName: 'Estética' }),
    ])
    expect(grupos.map((g) => g.areaName)).toEqual(['Estética', 'Masajes y Bienestar'])
    expect(grupos[0].items.map((i) => i.id)).toEqual(['c1', 'c3'])
  })

  it('ordena las áreas alfabéticamente en español', () => {
    const grupos = agruparPorArea([
      combo({ id: 'c1', areaName: 'Medicina y Dermatología' }),
      combo({ id: 'c2', areaName: 'Depilación Definitiva' }),
    ])
    expect(grupos.map((g) => g.areaName)).toEqual([
      'Depilación Definitiva',
      'Medicina y Dermatología',
    ])
  })

  it('lo que no tiene área va a un grupo "Otros", al final', () => {
    const grupos = agruparPorArea([
      combo({ id: 'c1', areaName: null }),
      combo({ id: 'c2', areaName: 'Estética' }),
    ])
    expect(grupos.map((g) => g.areaName)).toEqual(['Estética', 'Otros'])
  })

  it('sin items devuelve una lista vacía, no un grupo vacío', () => {
    expect(agruparPorArea([])).toEqual([])
  })
})

describe('combosDeClasificacion', () => {
  const belleza = { id: 'k1', name: 'Belleza' }
  const medicos = { id: 'k2', name: 'Tratamientos Médicos' }

  it('trae los combos que tienen esa clasificación', () => {
    const combos = [
      combo({ id: 'c1', clasificaciones: [belleza, medicos] }),
      combo({ id: 'c2', clasificaciones: [medicos] }),
    ]
    expect(combosDeClasificacion(combos, 'k1').map((c) => c.id)).toEqual(['c1'])
  })

  it('el mismo combo sale en sus DOS clasificaciones', () => {
    const combos = [combo({ id: 'c1', clasificaciones: [belleza, medicos] })]
    expect(combosDeClasificacion(combos, 'k1').map((c) => c.id)).toEqual(['c1'])
    expect(combosDeClasificacion(combos, 'k2').map((c) => c.id)).toEqual(['c1'])
  })

  it('una clasificación sin combos devuelve vacío', () => {
    expect(combosDeClasificacion([combo({ clasificaciones: [belleza] })], 'k9')).toEqual([])
  })
})
