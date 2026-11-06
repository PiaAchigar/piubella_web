import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiciosClient } from '@/components/servicios/servicios-client'
import { descripcionDeSeccion } from '@/lib/descripcion-de-seccion'
import type { CategoryNode } from '@/components/servicios/types'
import type { WorkerCategory } from '@/lib/worker-api'

const servicio = { id: 's1', name: 'Limpieza', description: null } as unknown as CategoryNode['services'][number]

function nodo(over: Partial<CategoryNode>): CategoryNode {
  return { id: 'n', name: 'N', descripcionWeb: null, services: [servicio], children: [], ...over }
}

function montar(over: Partial<Parameters<typeof ServiciosClient>[0]> = {}) {
  return render(
    <ServiciosClient
      tree={[]}
      allServices={[]}
      trainings={[]}
      activities={[]}
      combos={[]}
      packs={[]}
      promos={[]}
      {...over}
    />,
  )
}

describe('la descripción debajo del título de cada categoría', () => {
  it('sale debajo del título, en cualquier nivel', () => {
    montar({
      tree: [
        nodo({
          id: 'r',
          name: 'Belleza',
          descripcionWeb: 'Texto de la raíz',
          children: [nodo({ id: 'h', name: 'Cejas', descripcionWeb: 'Texto de la hija' })],
        }),
      ],
    })
    const titulo = screen.getByRole('heading', { name: 'Belleza' })
    const texto = screen.getByText('Texto de la raíz')
    expect(titulo.nextElementSibling).toBe(texto)
    expect(screen.getByRole('heading', { name: 'Cejas' }).nextElementSibling).toBe(
      screen.getByText('Texto de la hija'),
    )
  })

  it('respeta los saltos de línea que escribió Laura', () => {
    montar({ tree: [nodo({ name: 'Belleza', descripcionWeb: 'Uno\nDos' })] })
    expect(screen.getByText(/Uno/)).toHaveClass('whitespace-pre-line')
  })

  it('sin descripción no deja un párrafo vacío', () => {
    montar({ tree: [nodo({ name: 'Belleza' })] })
    expect(screen.getByRole('heading', { name: 'Belleza' }).nextElementSibling?.tagName).not.toBe('P')
  })

  it('también en las secciones que no salen del árbol', () => {
    montar({
      zonas: [{ id: 'z', nombre: 'Axila', precioMujer: 1, precioHombre: 1 }],
      activities: [{ id: 'a', name: 'Pilates' } as never],
      descripcionesDeSecciones: {
        depilacion: 'Sobre depilación',
        actividades: 'Sobre actividades',
        capacitaciones: null,
      },
    })
    expect(screen.getByRole('heading', { name: 'Depilación Definitiva' }).nextElementSibling).toBe(
      screen.getByText('Sobre depilación'),
    )
    expect(screen.getByRole('heading', { name: 'Actividades' }).nextElementSibling).toBe(
      screen.getByText('Sobre actividades'),
    )
  })
})

describe('descripcionDeSeccion', () => {
  const cat = (name: string, kind: string, webDescription: string | null): WorkerCategory => ({
    id: name + kind, name, description: 'nota interna', webDescription, displayOrder: 0, kind, children: [],
  })

  it('toma la categoría del catálogo, no el área homónima de las pestañas', () => {
    const raices = [
      cat('Depilación Definitiva', 'area', 'no esta'),
      cat('Depilación Definitiva', 'tecnica', 'esta'),
    ]
    expect(descripcionDeSeccion(raices, 'Depilación Definitiva')).toBe('esta')
  })

  it('nunca publica la nota interna', () => {
    expect(descripcionDeSeccion([cat('Actividades', 'tecnica', null)], 'Actividades')).toBeNull()
  })

  it('si la categoría no existe no rompe', () => {
    expect(descripcionDeSeccion([], 'Actividades')).toBeNull()
  })
})
