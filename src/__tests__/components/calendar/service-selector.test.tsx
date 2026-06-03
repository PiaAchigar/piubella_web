import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ServiceSelector } from '@/components/calendar/service-selector'
import { MOCK_SERVICES } from '@/lib/mock-data'

describe('ServiceSelector', () => {
  it('renders all services', () => {
    const mockSelect = vi.fn()
    render(
      <ServiceSelector
        services={MOCK_SERVICES}
        onSelect={mockSelect}
      />
    )

    MOCK_SERVICES.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument()
    })
  })

  it('displays service name, description, price, and duration', () => {
    const mockSelect = vi.fn()
    render(
      <ServiceSelector
        services={MOCK_SERVICES}
        onSelect={mockSelect}
      />
    )

    const firstService = MOCK_SERVICES[0]
    expect(screen.getByText(firstService.name)).toBeInTheDocument()
    expect(screen.getByText(firstService.description!)).toBeInTheDocument()
    expect(screen.getByText(`$${parseFloat(firstService.unit_price).toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(`${firstService.duration_minutes} min`)).toBeInTheDocument()
  })

  it('calls onSelect when a service is clicked', () => {
    const mockSelect = vi.fn()
    render(
      <ServiceSelector
        services={MOCK_SERVICES}
        onSelect={mockSelect}
      />
    )

    const firstService = MOCK_SERVICES[0]
    const buttons = screen.getAllByRole('button', { name: /Reservar|Seleccionar/i })
    fireEvent.click(buttons[0])

    expect(mockSelect).toHaveBeenCalledWith(firstService)
  })

  it('highlights selected service', () => {
    const mockSelect = vi.fn()
    const selectedService = MOCK_SERVICES[0]
    const { container } = render(
      <ServiceSelector
        services={MOCK_SERVICES}
        selected={selectedService}
        onSelect={mockSelect}
      />
    )

    // Check for visual indicator on selected service (border, background, etc.)
    const selectedCards = container.querySelectorAll('[data-selected="true"]')
    expect(selectedCards.length).toBeGreaterThan(0)
  })

  it('applies responsive grid classes', () => {
    const mockSelect = vi.fn()
    const { container } = render(
      <ServiceSelector
        services={MOCK_SERVICES}
        onSelect={mockSelect}
      />
    )

    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid?.className).toMatch(/md:grid-cols/)
  })

  it('renders with different button states', () => {
    const mockSelect = vi.fn()
    const { container } = render(
      <ServiceSelector
        services={MOCK_SERVICES}
        onSelect={mockSelect}
      />
    )

    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(MOCK_SERVICES.length)
  })

  it('handles empty services list', () => {
    const mockSelect = vi.fn()
    render(
      <ServiceSelector
        services={[]}
        onSelect={mockSelect}
      />
    )

    expect(screen.getByText(/No hay servicios disponibles|Selecciona un servicio/i)).toBeInTheDocument()
  })
})
