import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroSection } from '@/components/ui/hero-section'

describe('HeroSection', () => {
  it('renders title', () => {
    render(
      <HeroSection
        title="Bienvenido a PiuBella"
        description="Servicios premium de belleza"
      />
    )
    expect(screen.getByText('Bienvenido a PiuBella')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <HeroSection
        title="Bienvenido a PiuBella"
        description="Servicios premium de belleza"
      />
    )
    expect(screen.getByText('Servicios premium de belleza')).toBeInTheDocument()
  })

  it('renders CTA button when provided', () => {
    render(
      <HeroSection
        title="Bienvenido"
        description="Descripción"
        ctaText="Reservar ahora"
        ctaHref="/agenda"
      />
    )
    expect(screen.getByRole('link', { name: /Reservar ahora/i })).toBeInTheDocument()
  })

  it('CTA button has correct href', () => {
    render(
      <HeroSection
        title="Bienvenido"
        description="Descripción"
        ctaText="Reservar"
        ctaHref="/agenda"
      />
    )
    const link = screen.getByRole('link', { name: /Reservar/i })
    expect(link).toHaveAttribute('href', '/agenda')
  })

  it('does not render button when ctaText is not provided', () => {
    render(
      <HeroSection
        title="Bienvenido"
        description="Descripción"
      />
    )
    expect(screen.queryByRole('link', { name: /Reservar/i })).not.toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(
      <HeroSection
        title="Bienvenido"
        description="Descripción"
      />
    )
    const section = container.firstChild
    expect(section).toHaveClass('py-16', 'md:py-24')
  })

  it('renders with custom background color when provided', () => {
    const { container } = render(
      <HeroSection
        title="Bienvenido"
        description="Descripción"
        backgroundColor="bg-primary"
      />
    )
    const section = container.firstChild
    expect(section).toHaveClass('bg-primary')
  })
})
