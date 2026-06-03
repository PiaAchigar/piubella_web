import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Servicios from '@/app/servicios/page'

describe('Servicios Page', () => {
  it('renders page title', () => {
    render(<Servicios />)
    expect(screen.getByText(/Todos nuestros servicios/i)).toBeInTheDocument()
  })

  it('renders all service cards', () => {
    render(<Servicios />)
    expect(screen.getByText('Depilación Láser')).toBeInTheDocument()
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument()
    expect(screen.getByText('Facial Premium')).toBeInTheDocument()
    expect(screen.getByText('Manicura y Pedicura')).toBeInTheDocument()
    expect(screen.getByText('Tratamiento Capilar')).toBeInTheDocument()
    expect(screen.getByText('Bronceado en Cabina')).toBeInTheDocument()
  })

  it('renders service prices', () => {
    render(<Servicios />)
    expect(screen.getByText('$150.00')).toBeInTheDocument()
    expect(screen.getByText('$120.00')).toBeInTheDocument()
  })

  it('renders service durations', () => {
    render(<Servicios />)
    expect(screen.getByText(/60 min/)).toBeInTheDocument()
    expect(screen.getByText(/90 min/)).toBeInTheDocument()
  })

  it('renders book buttons for each service', () => {
    render(<Servicios />)
    const bookButtons = screen.getAllByRole('link', { name: /Reservar/i })
    expect(bookButtons.length).toBe(6)
  })

  it('displays responsive grid layout', () => {
    const { container } = render(<Servicios />)
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })
})
