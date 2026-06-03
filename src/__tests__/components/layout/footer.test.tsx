import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'
import { expect, it, describe } from 'vitest'

describe('Footer', () => {
  it('should render company name', () => {
    render(<Footer />)
    expect(screen.getByText(/piubella/i)).toBeInTheDocument()
  })

  it('should render company contact info', () => {
    render(<Footer />)
    expect(screen.getByText(/contacto@piubella/i)).toBeInTheDocument()
    expect(screen.getByText(/\+54/i)).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /servicios/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /agenda/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument()
  })

  it('should render legal links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacidad/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /términos/i })).toBeInTheDocument()
  })

  it('should render copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024 piubella/i)).toBeInTheDocument()
  })

  it('should have top border divider', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('border-t')
  })

  it('should have background color', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-surface-container')
  })

  it('should be responsive', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('grid')
  })
})
