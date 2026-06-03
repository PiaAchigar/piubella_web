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

  it('displays selected date', () => {
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

  it('displays total price', () => {
    render(<BookingSummary booking={mockBooking} />)
    expect(screen.getByText(/150|precio|total/i)).toBeInTheDocument()
  })

  it('renders confirm button', () => {
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

  it('displays service duration', () => {
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
