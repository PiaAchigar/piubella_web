import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ZonaCard } from '@/components/servicios/zona-card'

const zona = { id: 'z1', nombre: 'Axila', precioMujer: 12000, precioHombre: 14000 }

describe('ZonaCard', () => {
  it('muestra la zona con el precio de mujer y el de hombre', () => {
    render(<ZonaCard zona={zona} />)
    expect(screen.getByText('Axila')).toBeInTheDocument()
    expect(screen.getByText('Mujer: $12.000')).toBeInTheDocument()
    expect(screen.getByText('Hombre: $14.000')).toBeInTheDocument()
  })

  it('el de mujer va arriba del de hombre, aunque valgan lo mismo', () => {
    render(<ZonaCard zona={{ ...zona, precioHombre: 12000 }} />)
    const mujer = screen.getByText('Mujer: $12.000')
    const hombre = screen.getByText('Hombre: $12.000')
    expect(mujer.compareDocumentPosition(hombre) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('si falta una tarifa muestra sólo la otra', () => {
    render(<ZonaCard zona={{ ...zona, precioHombre: 0 }} />)
    expect(screen.getByText('Mujer: $12.000')).toBeInTheDocument()
    expect(screen.queryByText(/Hombre/)).not.toBeInTheDocument()
  })

  it('sin tarifas no inventa un $0', () => {
    render(<ZonaCard zona={{ ...zona, precioMujer: 0, precioHombre: 0 }} />)
    expect(screen.queryByText(/\$0/)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Consultar' })).toHaveAttribute('href', '/contacto')
  })
})
