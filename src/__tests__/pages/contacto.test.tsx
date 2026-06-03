import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactoPage from '@/app/contacto/page'

describe('Contacto Page', () => {
  it('renders page title', () => {
    render(<ContactoPage />)
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renders contact form with name field', () => {
    render(<ContactoPage />)
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
  })

  it('renders contact form with email field', () => {
    render(<ContactoPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders contact form with phone field', () => {
    render(<ContactoPage />)
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
  })

  it('renders contact form with message field', () => {
    render(<ContactoPage />)
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactoPage />)
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('renders company information section', () => {
    render(<ContactoPage />)
    expect(screen.getByText(/horarios/i)).toBeInTheDocument()
  })
})
