import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// `TreatmentSearchSection` hace su propia búsqueda contra el Worker; acá sólo
// interesa que la home la monte en su lugar.
vi.mock('@/components/home/treatment-search-section', () => ({
  TreatmentSearchSection: () => <div data-testid="buscador-de-tratamientos" />,
}))

import Home from '@/app/page'

describe('/', () => {
  it('muestra el título principal', async () => {
    render(await Home())
    expect(
      screen.getByRole('heading', { name: /cuidado integral para tu cuerpo, mente y alma/i }),
    ).toBeInTheDocument()
  })

  it('invita a contar el objetivo y monta el buscador de tratamientos', async () => {
    render(await Home())
    expect(screen.getByText(/contanos cuál es tu objetivo/i)).toBeInTheDocument()
    expect(screen.getByTestId('buscador-de-tratamientos')).toBeInTheDocument()
  })

  it('tiene la sección de nosotros', async () => {
    render(await Home())
    expect(
      screen.getByRole('heading', { name: /un espacio diseñado para tu bienestar absoluto/i }),
    ).toBeInTheDocument()
  })

  it('tiene el encabezado de servicios destacados aunque no haya ninguno', async () => {
    render(await Home())
    expect(
      screen.getByRole('heading', { name: /nuestros servicios destacados/i }),
    ).toBeInTheDocument()
  })

  it('muestra el testimonio', async () => {
    render(await Home())
    expect(screen.getByText(/mi momento de pausa y reconexión diaria/i)).toBeInTheDocument()
  })
})
