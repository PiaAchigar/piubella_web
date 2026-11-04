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
  kind: 'combo',
  areaCategoryId: 'area-1',
  areaName: 'Depilación Definitiva',
  clasificaciones: [{ id: 'k1', name: 'Belleza' }],
}

describe('ComboCard', () => {
  it('lleva la pastilla "Combo"', () => {
    render(<ComboCard combo={base} />)
    expect(screen.getByText('Combo')).toBeInTheDocument()
  })

  it('en variante clara el título usa el color de superficie', () => {
    const { container } = render(<ComboCard combo={base} variante="claro" />)
    expect(container.querySelector('h3')).toHaveClass('text-on-surface')
  })

  it('en variante oscura sigue siendo la del carrusel: ancho fijo', () => {
    const { container } = render(<ComboCard combo={base} />)
    expect(container.firstChild).toHaveClass('w-72')
  })

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
    const subtotal = screen.getByTestId('combo-subtotal')
    expect(subtotal).toBeInTheDocument()
    expect(subtotal).toHaveClass('line-through')
  })

  it('no muestra subtotal tachado si no hay ahorro', () => {
    render(<ComboCard combo={{ ...base, finalAmount: 200000 }} />)
    expect(screen.queryByTestId('combo-subtotal')).toBeNull()
  })

  it('no muestra el plazo de uso, aunque esté cargado', () => {
    render(<ComboCard combo={{ ...base, validityMonths: 12, validityWeeks: 26 }} />)
    expect(screen.queryByText(/para usarlas/)).toBeNull()
  })

  it('usa el singular "sesión" cuando la línea incluye una sola sesión', () => {
    const combo: WorkerCombo = {
      ...base,
      lines: [
        { id: 'l1', serviceId: 's1', serviceName: 'Media pierna', sessionsIncluded: 1, servicePrice: 15000 },
      ],
    }
    render(<ComboCard combo={combo} />)
    expect(screen.getByText('1 sesión de Media pierna')).toBeInTheDocument()
  })

  it('pack de 4: dice 4 sesiones, tacha $88.000 y muestra $79.000', () => {
    const pack: WorkerCombo = {
      ...base,
      kind: 'pack',
      lines: [{ id: 'l1', serviceId: 's1', serviceName: 'Axila', sessionsIncluded: 3, servicePrice: 22000 }],
      packEffectiveSessions: 4,
      packUnitAmount: 22000,
      sumaDeLasPartes: 88000,
      servicesSubtotal: 66000,
      finalAmount: 79000,
    }
    render(<ComboCard combo={pack} />)
    expect(screen.getByText('4 sesiones de Axila')).toBeInTheDocument()
    expect(screen.getByTestId('combo-subtotal')).toHaveTextContent('$88.000')
    expect(screen.getByText('$79.000')).toBeInTheDocument()
  })

  it('combo: tacha la suma y muestra el final', () => {
    render(<ComboCard combo={{ ...base, sumaDeLasPartes: 210000 }} />)
    expect(screen.getByTestId('combo-subtotal')).toHaveTextContent('$210.000')
    expect(screen.getByText('$150.000')).toBeInTheDocument()
  })

  it('no tacha si el final no es menor', () => {
    render(<ComboCard combo={{ ...base, sumaDeLasPartes: 150000 }} />)
    expect(screen.queryByTestId('combo-subtotal')).toBeNull()
  })

  it('muestra precio efectivo cuando difiere; no si es igual o falta', () => {
    const { rerender } = render(<ComboCard combo={{ ...base, finalAmountCash: 135000 }} />)
    expect(screen.getByText(/Precio efectivo/)).toBeInTheDocument()
    expect(screen.getByText('$135.000')).toBeInTheDocument()
    rerender(<ComboCard combo={{ ...base, finalAmountCash: 150000 }} />)
    expect(screen.queryByText(/Precio efectivo/)).toBeNull()
    rerender(<ComboCard combo={base} />)
    expect(screen.queryByText(/Precio efectivo/)).toBeNull()
  })

})
