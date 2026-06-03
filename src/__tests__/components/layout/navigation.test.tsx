import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '@/components/layout/navigation'
import { expect, it, describe, vi, beforeEach } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render logo/brand', () => {
    render(<Navigation />)
    expect(screen.getByText(/piubella/i)).toBeInTheDocument()
  })

  it('should render main navigation links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /servicios/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /agenda/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument()
  })

  it('should have hamburger menu button (mobile)', () => {
    render(<Navigation />)
    const hamburgerButton = screen.getByRole('button', { name: /menú/i })
    expect(hamburgerButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when hamburger is clicked', () => {
    render(<Navigation />)
    const hamburgerButton = screen.getByRole('button', { name: /menú/i })

    fireEvent.click(hamburgerButton)
    expect(screen.getByRole('navigation')).toHaveClass('bg-surface-container')

    fireEvent.click(hamburgerButton)
    expect(screen.getByRole('navigation')).not.toHaveClass('bg-surface-container')
  })

  it('should close mobile menu when a link is clicked', () => {
    render(<Navigation />)
    const hamburgerButton = screen.getByRole('button', { name: /menú/i })

    // Open menu
    fireEvent.click(hamburgerButton)

    // Click a link (should close menu)
    const serviceLink = screen.getByRole('link', { name: /servicios/i })
    fireEvent.click(serviceLink)

    // Verify menu is closed
    expect(screen.getByRole('navigation')).not.toHaveClass('bg-surface-container')
  })

  it('should highlight active link based on current pathname', () => {
    vi.mocked(require('next/navigation').usePathname).mockReturnValue('/servicios')

    render(<Navigation />)
    const serviceLink = screen.getByRole('link', { name: /servicios/i })
    expect(serviceLink).toHaveClass('text-primary')
  })

  it('should have proper navigation structure', () => {
    const { container } = render(<Navigation />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
