import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiceCard } from '@/components/ui/service-card'
import { Service } from '@/types'

const mockService: Service = {
  id: '1',
  name: 'Depilación Láser',
  description: 'Depilación permanente con tecnología láser avanzada.',
  unit_price: '150.00',
  duration_minutes: 60,
  created_at: new Date(),
  updated_at: new Date(),
}

describe('ServiceCard', () => {
  it('renders service name', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Depilación Láser')).toBeInTheDocument()
  })

  it('renders service description', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Depilación permanente con tecnología láser avanzada.')).toBeInTheDocument()
  })

  it('renders price with currency symbol', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('$150.00')).toBeInTheDocument()
  })

  it('renders duration in minutes', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText(/60 min/i)).toBeInTheDocument()
  })

  it('renders book appointment button', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByRole('link', { name: /reservar/i })).toBeInTheDocument()
  })

  it('button link has correct href with service id', () => {
    render(<ServiceCard service={mockService} />)
    const link = screen.getByRole('link', { name: /reservar/i })
    expect(link).toHaveAttribute('href', '/agenda?service=1')
  })

  it('applies correct styling classes', () => {
    const { container } = render(<ServiceCard service={mockService} />)
    const card = container.firstChild
    expect(card).toHaveClass('rounded', 'border', 'shadow')
  })
})
