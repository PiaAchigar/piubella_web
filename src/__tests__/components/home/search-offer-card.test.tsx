import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchOfferCard, esCombo, fechaCorta, type SearchOffer } from '@/components/home/search-offer-card'

const oferta = (over: Partial<SearchOffer> = {}): SearchOffer => ({
  id: 'of-1',
  name: 'Media pierna + Axila',
  description: 'Combo de media pierna más una zona a elección.',
  promotion_type: 'bundle',
  discount_percentage: null,
  discount_amount: null,
  final_amount: null,
  valid_from: null,
  valid_until: null,
  status: 'active',
  is_featured: false,
  services: [{ service_id: 's-1', service_name: 'Media pierna' }],
  ...over,
})

describe('esCombo', () => {
  it('trata promotion_type "bundle" como combo', () => {
    expect(esCombo(oferta({ promotion_type: 'bundle' }))).toBe(true)
  })

  it('trata cualquier otro promotion_type como promoción', () => {
    expect(esCombo(oferta({ promotion_type: 'percentage' }))).toBe(false)
  })
})

describe('SearchOfferCard', () => {
  it('etiqueta el bundle como Combo y usa "Incluye:" para sus servicios', () => {
    render(<SearchOfferCard offer={oferta()} />)
    expect(screen.getByText('Combo')).toBeInTheDocument()
    expect(screen.getByText('Incluye:')).toBeInTheDocument()
  })

  it('etiqueta el resto como Promoción y usa "Aplica a:"', () => {
    render(<SearchOfferCard offer={oferta({ promotion_type: 'percentage' })} />)
    expect(screen.getByText('Promoción')).toBeInTheDocument()
    expect(screen.getByText('Aplica a:')).toBeInTheDocument()
  })

  it('muestra la descripción', () => {
    render(<SearchOfferCard offer={oferta()} />)
    expect(
      screen.getByText('Combo de media pierna más una zona a elección.'),
    ).toBeInTheDocument()
  })

  it('muestra el precio y el descuento cuando tienen valor', () => {
    render(<SearchOfferCard offer={oferta({ discount_percentage: 10, final_amount: 36000 })} />)
    expect(screen.getByText('10%')).toBeInTheDocument()
    expect(screen.getByText('$36.000')).toBeInTheDocument()
  })

  it('no dibuja el bloque de precio cuando no hay importe ni descuento', () => {
    render(<SearchOfferCard offer={oferta()} />)
    expect(screen.queryByText('Valor final')).not.toBeInTheDocument()
    expect(screen.queryByText('Descuento')).not.toBeInTheDocument()
  })

  it('trata el 0 como "sin precio" y no lo muestra', () => {
    render(<SearchOfferCard offer={oferta({ discount_percentage: 0, final_amount: 0 })} />)
    expect(screen.queryByText('Valor final')).not.toBeInTheDocument()
    expect(screen.queryByText('$0')).not.toBeInTheDocument()
  })

  it('siempre lleva el CTA a la agenda, tenga precio o no', () => {
    const { rerender } = render(<SearchOfferCard offer={oferta()} />)
    expect(screen.getByRole('link', { name: /Reservar turno/ })).toHaveAttribute('href', '/agenda')

    rerender(<SearchOfferCard offer={oferta({ promotion_type: 'percentage', final_amount: 36000 })} />)
    expect(screen.getByRole('link', { name: /Reservar turno/ })).toHaveAttribute('href', '/agenda')
  })
})

describe('fechaCorta', () => {
  it('no retrocede un día con una fecha ISO en UTC', () => {
    // new Date('2026-12-31T00:00:00.000Z').toLocaleDateString('es-AR') da 30/12
    // en Argentina; la promo vence el 31.
    expect(fechaCorta('2026-12-31T00:00:00.000Z')).toBe('31/12/2026')
    expect(fechaCorta('2026-12-31')).toBe('31/12/2026')
  })

  it('sigue formateando un Date real', () => {
    expect(fechaCorta(new Date(2026, 11, 31))).toBe('31/12/2026')
  })
})
