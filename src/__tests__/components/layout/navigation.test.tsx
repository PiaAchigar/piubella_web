import { render, screen, fireEvent, within } from '@testing-library/react'
import { expect, it, describe, vi, beforeEach } from 'vitest'
import { Navigation } from '@/components/layout/navigation'

// Reescrito contra el componente real (2026-09-22). Los tests viejos daban por
// sentada una barra que ya no existe: un link "Home" (hoy es "Inicio", el sitio
// está en español), un logo en TEXTO (hoy es una imagen con alt) y la clase
// `bg-surface-container` colgada del <nav> (está en el panel móvil, adentro).
//
// El cambio de fondo: ahora se afirma sobre lo que la clienta ve —qué links
// hay, si el panel móvil está abierto—, no sobre nombres de clases de Tailwind.
// Una clase que cambia de `shadow` a `shadow-sm` no rompe nada y no tiene por
// qué poner un test en rojo.

// `usePathname` se mockea con vi.fn() para poder moverlo por test. El mock
// viejo era una arrow suelta, así que `mockReturnValue` no existía y el test
// del link activo reventaba antes de afirmar nada.
const usePathname = vi.fn(() => '/')
vi.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
  useRouter: () => ({ push: vi.fn() }),
}))

/** El panel móvil sólo existe en el DOM cuando está abierto. */
function panelMovil(): HTMLElement | null {
  return document.querySelector('nav > div.md\\:hidden')
}

beforeEach(() => {
  usePathname.mockReturnValue('/')
})

describe('Navigation', () => {
  it('el logo lleva a la home y tiene texto alternativo', () => {
    render(<Navigation />)
    // Es una imagen, no texto: sin `alt` un lector de pantalla anuncia "link"
    // y nada más.
    expect(screen.getByAltText(/piu bella/i)).toBeInTheDocument()
  })

  it('están las cinco secciones del sitio', () => {
    render(<Navigation />)
    for (const etiqueta of ['Inicio', 'Nosotros', 'Servicios', 'Contacto', 'Agenda']) {
      expect(screen.getByRole('link', { name: etiqueta })).toBeInTheDocument()
    }
  })

  it('además del menú, hay un botón de reservar', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /reservar cita/i })).toBeInTheDocument()
  })

  it('tiene el botón de hamburguesa para el celular', () => {
    render(<Navigation />)
    expect(screen.getByRole('button', { name: /menú/i })).toBeInTheDocument()
  })

  it('la hamburguesa abre y cierra el panel móvil', () => {
    render(<Navigation />)
    const hamburguesa = screen.getByRole('button', { name: /menú/i })
    expect(panelMovil()).toBeNull()

    fireEvent.click(hamburguesa)
    expect(panelMovil()).not.toBeNull()
    expect(hamburguesa).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(hamburguesa)
    expect(panelMovil()).toBeNull()
    expect(hamburguesa).toHaveAttribute('aria-expanded', 'false')
  })

  it('tocar un link del panel móvil lo cierra', () => {
    // Si no se cerrara, la clienta navega y se queda con el menú tapándole la
    // página que acaba de abrir.
    render(<Navigation />)
    fireEvent.click(screen.getByRole('button', { name: /menú/i }))

    const panel = panelMovil()!
    fireEvent.click(within(panel).getByRole('link', { name: 'Servicios' }))

    expect(panelMovil()).toBeNull()
  })

  it('resalta la sección en la que está parada la clienta', () => {
    usePathname.mockReturnValue('/servicios')
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Servicios' })).toHaveClass('text-primary')
    expect(screen.getByRole('link', { name: 'Contacto' })).not.toHaveClass('text-primary')
  })
})
