import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComboCard } from '@/components/servicios/combo-card'
import type { WorkerCombo } from '@/lib/worker-api'

const base: WorkerCombo = {
  id: 'c1',
  name: 'Depilación cuerpo completo',
  description: 'Pack de sesiones para todo el cuerpo',
  priceType: 'fixed',
  validityMonths: 12,
  servicesSubtotal: 200000,
  finalAmount: 150000,
  lines: [
    { id: 'l1', serviceId: 's1', serviceName: 'Media pierna', sessionsIncluded: 8, servicePrice: 15000 },
    { id: 'l2', serviceId: 's2', serviceName: 'Axila', sessionsIncluded: 8, servicePrice: 10000 },
  ],
}

describe('ComboCard', () => {
  it('muestra el nombre y el precio final', () => {
    render(<ComboCard combo={base} />)
    expect(screen.getByText('Depilación cuerpo completo')).toBeInTheDocument()
    expect(screen.getByText('$150.000')).toBeInTheDocument()
  })

  it('muestra cada servicio con su cantidad de sesiones', () => {
    render(<ComboCard combo={base} />)
    expect(screen.getByText('8 sesiones de Media pierna')).toBeInTheDocument()
    expect(screen.getByText('8 sesiones de Axila')).toBeInTheDocument()
  })

  it('tacha el subtotal cuando el combo sale más barato', () => {
    render(<ComboCard combo={base} />)
    expect(screen.getByText('$200.000')).toBeInTheDocument()
  })

  it('no muestra subtotal tachado si no hay ahorro', () => {
    render(<ComboCard combo={{ ...base, finalAmount: 200000 }} />)
    expect(screen.queryByTestId('combo-subtotal')).toBeNull()
  })

  it('muestra la vigencia en meses', () => {
    render(<ComboCard combo={base} />)
    expect(screen.getByText(/12 meses para usarlas/i)).toBeInTheDocument()
  })
})
