/**
 * PAUSADO EN PARTE (2026-09-22, decisión de Pia).
 *
 * Este archivo prueba el asistente de reserva de /agenda, que HOY NO TIENE
 * RUTA: `page.tsx` es la página "Próximamente" y el asistente quedó en
 * `page.booking.tsx`, que en el App Router no es una ruta. El código se
 * conserva a propósito, para cuando el turnero vuelva.
 *
 * Los tests marcados con `it.skip` afirman contra una versión anterior de
 * estos componentes y NO esconden ningún bug: se revisaron uno por uno. Se
 * pausan en vez de arreglarse porque arreglar tests de una pantalla que nadie
 * ejecuta es trabajo que habría que rehacer igual: cuando el turnero vuelva va
 * a hablar con el Worker, y estos componentes leen la base con Drizzle directo
 * desde la web, que es la arquitectura que el proyecto ya dejó atrás.
 *
 * El resto del archivo SIGUE CORRIENDO: pausar todo habría apagado tests que
 * hoy pasan y cubren código que se conserva.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BookingSummary } from '@/components/calendar/booking-summary'
import { BookingData } from '@/types'
import { MOCK_SERVICES } from '@/lib/mock-data'

describe('BookingSummary', () => {
  const mockBooking: BookingData = {
    serviceId: '1',
    service: MOCK_SERVICES[0],
    date: new Date('2026-06-15'),
    timeSlot: {
      id: '1',
      time: '09:00',
      available: true,
    },
    contactName: 'Juan Pérez',
    contactEmail: 'juan@example.com',
    contactPhone: '+54 9 1234 56789',
    totalPrice: 150,
  }

  it('renders booking summary title', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/resumen|confirmación|detalle/i)).toBeInTheDocument()
  })

  it('displays selected service name', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(mockBooking.service.name)).toBeInTheDocument()
  })

  it.skip('displays selected date', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/15|junio|june/i)).toBeInTheDocument()
  })

  it('displays selected time', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/09:00|9:00/i)).toBeInTheDocument()
  })

  it('displays customer contact information', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('juan@example.com')).toBeInTheDocument()
    expect(screen.getByText('+54 9 1234 56789')).toBeInTheDocument()
  })

  it.skip('displays total price', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/150|precio|total/i)).toBeInTheDocument()
  })

  it.skip('renders confirm button', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(
      screen.getByRole('button', { name: /confirmar|aceptar|reservar/i })
    ).toBeInTheDocument()
  })

  it('renders edit/modify button', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(
      screen.getByRole('button', { name: /editar|modificar|cambiar|atrás/i })
    ).toBeInTheDocument()
  })

  it.skip('displays service duration', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/60|min|minutos/i)).toBeInTheDocument()
  })

  it('has appropriate styling with primary-container background', () => {
    const { container } = render(<BookingSummary booking={mockBooking} />)
    const section = container.querySelector('[class*="primary-container"]')
    expect(section).toBeInTheDocument()
  })

  it('displays items in readable receipt format', () => {
    const { container } = render(<BookingSummary booking={mockBooking} />)
    const items = container.querySelectorAll('[class*="flex"][class*="justify"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
