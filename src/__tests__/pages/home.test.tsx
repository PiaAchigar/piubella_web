import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders hero section with title', () => {
    render(<Home />)
    expect(screen.getByText(/PiuBella/i)).toBeInTheDocument()
  })

  it('renders services section', () => {
    render(<Home />)
    expect(screen.getByText(/Servicios Destacados/i)).toBeInTheDocument()
  })

  it('renders service cards', () => {
    render(<Home />)
    expect(screen.getByText('Depilación Láser')).toBeInTheDocument()
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument()
    expect(screen.getByText('Facial Premium')).toBeInTheDocument()
  })

  it('renders testimonials section', () => {
    render(<Home />)
    expect(screen.getByText(/Testimoni/i)).toBeInTheDocument()
  })

  it('renders customer testimonials', () => {
    render(<Home />)
    expect(screen.getByText('María González')).toBeInTheDocument()
  })

  it('renders call to action button', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /Agendar una cita/i })).toBeInTheDocument()
  })
})
