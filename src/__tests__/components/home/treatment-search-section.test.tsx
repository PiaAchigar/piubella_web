import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TreatmentSearchSection } from '@/components/home/treatment-search-section'

const RESPUESTA = {
  treatments: [
    {
      id: 't-1',
      name: 'Mesoterapia Body Firming (Mesoestetic)',
      description: 'Activo reafirmante.',
      unit_price_list: null,
      price: null,
      kind: 'service',
      benefits: null,
      contraindications: null,
      special_attention_notes: null,
      similarity_score: 0.445,
      price_label: 'por sesión',
    },
  ],
  promotions: [],
}

let scrollIntoView: ReturnType<typeof vi.fn>

beforeEach(() => {
  // happy-dom no implementa scrollIntoView: sin este doble, el componente
  // explota al llamarlo y el test no probaría nada.
  scrollIntoView = vi.fn()
  Element.prototype.scrollIntoView = scrollIntoView
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, json: async () => RESPUESTA }) as unknown as Response),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function buscar(texto = 'tonificar brazos') {
  render(<TreatmentSearchSection />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: texto } })
  fireEvent.click(screen.getByRole('button', { name: /buscar/i }))
}

describe('TreatmentSearchSection — la página lleva a los resultados', () => {
  // Los resultados se dibujan ~230px por debajo del borde inferior de la
  // pantalla: quien busca no ve que pasó nada y concluye que no funciona
  // (Pia, 2026-09-29, contra producción).
  it('al llegar los resultados, los trae a la vista', async () => {
    buscar()
    await screen.findByText(/Mesoterapia Body Firming/)
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
  })

  it('no scrollea antes de buscar', () => {
    render(<TreatmentSearchSection />)
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('sigue mostrando los resultados que llegan', async () => {
    buscar()
    expect(await screen.findByText(/Mesoterapia Body Firming/)).toBeInTheDocument()
  })
})
