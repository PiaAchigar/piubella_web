import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeaturedServiceCard } from '@/components/home/featured-service-card'
import { Service } from '@/types'

const servicio = (over: Partial<Service> = {}): Service => ({
  id: 's-1',
  name: 'Hidratación de Labios',
  description: 'Hidratación profunda con ácido hialurónico.',
  unit_price: '40000.00',
  duration_minutes: 20,
  created_at: new Date(0),
  updated_at: new Date(0),
  ...over,
})

describe('FeaturedServiceCard', () => {
  it('muestra duración y precio cuando los hay', () => {
    render(<FeaturedServiceCard service={servicio()} />)
    expect(screen.getByText('20 min')).toBeInTheDocument()
    expect(screen.getByText('$40.000')).toBeInTheDocument()
  })

  it('no anuncia "0 min" cuando el servicio no tiene duración cargada', () => {
    // `mapService` rellena la duración faltante con 0.
    render(<FeaturedServiceCard service={servicio({ duration_minutes: 0 })} />)
    expect(screen.queryByText(/min/)).not.toBeInTheDocument()
    expect(screen.getByText('$40.000')).toBeInTheDocument()
  })

  it('no muestra "$0" cuando el servicio no tiene precio de lista', () => {
    // `mapService` deja unit_price en '' si unitPriceList viene null.
    render(<FeaturedServiceCard service={servicio({ unit_price: '' })} />)
    expect(screen.queryByText(/^\$/)).not.toBeInTheDocument()
    expect(screen.getByText('20 min')).toBeInTheDocument()
  })

  it('sin duración ni precio no dibuja la línea divisoria', () => {
    const { container } = render(
      <FeaturedServiceCard service={servicio({ duration_minutes: 0, unit_price: '' })} />,
    )
    expect(container.querySelector('.border-t')).toBeNull()
    expect(screen.getByText('Hidratación de Labios')).toBeInTheDocument()
  })

  it('omite el párrafo de descripción cuando no hay descripción', () => {
    const { container } = render(<FeaturedServiceCard service={servicio({ description: null })} />)
    expect(container.querySelector('p')).toBeNull()
  })
})
