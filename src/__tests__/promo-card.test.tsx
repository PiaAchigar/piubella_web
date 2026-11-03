import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PromoCard } from '@/components/servicios/promo-card'
import type { WorkerPromotion } from '@/lib/worker-api'

const base: WorkerPromotion = {
  id: 'p1',
  name: 'Promo verano',
  description: null,
  promotionType: 'bundle',
  discountPercentage: 20,
  discountAmount: null,
  validFrom: null,
  validUntil: null,
  targets: [{ id: 't1', nombre: 'Axila' }] as WorkerPromotion['targets'],
}

describe('PromoCard', () => {
  it('promo con suma y precio muestra tachado y final', () => {
    const { container } = render(
      <PromoCard promo={{ ...base, sumaDeLasPartes: 50000, precioFinal: 40000 }} />,
    )
    expect(container.querySelector('.line-through')).toHaveTextContent('$50.000')
    expect(screen.getByText('$40.000')).toBeInTheDocument()
    expect(screen.queryByText('20% OFF')).toBeNull()
  })

  it('sin precioFinal queda el % OFF de siempre', () => {
    render(<PromoCard promo={{ ...base, sumaDeLasPartes: null, precioFinal: null }} />)
    expect(screen.getByText('20% OFF')).toBeInTheDocument()
  })
})
