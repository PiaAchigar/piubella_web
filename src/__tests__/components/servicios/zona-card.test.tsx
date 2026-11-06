import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ZonaCard } from '@/components/servicios/zona-card'

describe('ZonaCard', () => {
  it('muestra la zona y su precio', () => {
    render(<ZonaCard zona={{ id: 'z1', nombre: 'Axila', precio: 12000 }} />)
    expect(screen.getByText('Axila')).toBeInTheDocument()
    expect(screen.getByText('$12.000')).toBeInTheDocument()
  })

  it('sin tarifa cargada no inventa un $0', () => {
    render(<ZonaCard zona={{ id: 'z1', nombre: 'Axila', precio: 0 }} />)
    expect(screen.queryByText('$0')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Consultar' })).toHaveAttribute('href', '/contacto')
  })
})
