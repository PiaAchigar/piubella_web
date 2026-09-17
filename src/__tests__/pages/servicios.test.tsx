import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Servicios from '@/app/servicios/page'

// PAUSADO hasta el rediseño de Servicios (ver PENDIENTES.md → "La página de
// Servicios: combos y packs por clasificación").
//
// Acá el `await` no alcanza: Servicios renderiza <PromosHero /> y
// <CombosSection />, que también son Server Components async, y React 18 no
// sabe renderizar hijos async. Para correrlos habría que mockear esos dos
// componentes — justamente los que el rediseño va a reescribir. Además las
// afirmaciones son del catálogo de juguete ("Depilación Láser"), no del real.
// Se reescriben junto con esa tarea.
describe.skip('Servicios Page', () => {
  it('renders page title', async () => {
    render(await Servicios())
    expect(screen.getByText(/Todos nuestros servicios/i)).toBeInTheDocument()
  })

  it('renders all service cards', async () => {
    render(await Servicios())
    expect(screen.getByText('Depilación Láser')).toBeInTheDocument()
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument()
    expect(screen.getByText('Facial Premium')).toBeInTheDocument()
    expect(screen.getByText('Manicura y Pedicura')).toBeInTheDocument()
    expect(screen.getByText('Tratamiento Capilar')).toBeInTheDocument()
    expect(screen.getByText('Bronceado en Cabina')).toBeInTheDocument()
  })

  it('renders service prices', async () => {
    render(await Servicios())
    expect(screen.getByText('$150.00')).toBeInTheDocument()
    expect(screen.getByText('$120.00')).toBeInTheDocument()
  })

  it('renders service durations', async () => {
    render(await Servicios())
    expect(screen.getByText(/60 min/)).toBeInTheDocument()
    expect(screen.getByText(/90 min/)).toBeInTheDocument()
  })

  it('renders book buttons for each service', async () => {
    render(await Servicios())
    const bookButtons = screen.getAllByRole('link', { name: /Reservar/i })
    expect(bookButtons.length).toBe(6)
  })

  it('displays responsive grid layout', async () => {
    const { container } = render(await Servicios())
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })
})
