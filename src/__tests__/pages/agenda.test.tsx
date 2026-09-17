import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Agenda from '@/app/agenda/page'

// /agenda dejó de ser el asistente de reserva de 5 pasos: ese flujo se eliminó
// y la página hoy deriva a WhatsApp. Los tests de pasos, calendario y resumen
// vivían acá y probaban una pantalla que ya no existe; los reemplazan estos.
// Es un Server Component async, por eso se lo invoca antes de renderizarlo.
describe('Agenda (próximamente)', () => {
  it('anuncia que la reserva online todavía no está', async () => {
    render(await Agenda())
    expect(screen.getByText(/próximamente/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /estamos trabajando/i }),
    ).toBeInTheDocument()
  })

  it('explica que por ahora se reserva por WhatsApp', async () => {
    render(await Agenda())
    expect(screen.getByText(/escribinos por whatsapp/i)).toBeInTheDocument()
  })

  it('lleva al WhatsApp por defecto cuando el Worker no responde', async () => {
    render(await Agenda())
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      'https://wa.me/5491133775014',
    )
  })

  it('deja una salida hacia los servicios', async () => {
    render(await Agenda())
    expect(screen.getByRole('link', { name: /ver nuestros servicios/i })).toHaveAttribute(
      'href',
      '/servicios',
    )
  })
})
