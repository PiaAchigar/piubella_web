import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '@/components/calendar/contact-form'

describe('ContactForm', () => {
  it('renders all form fields', () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    expect(
      screen.getByRole('button', { name: /confirmar|continuar|enviar/i })
    ).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email inválido|correo inválido/i)).toBeInTheDocument()
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('validates phone number', async () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const phoneInput = screen.getByLabelText(/teléfono/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })

    fireEvent.change(phoneInput, { target: { value: '123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/teléfono inválido|número inválido/i)).toBeInTheDocument()
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('requires all fields', async () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled()
    })
  })

  it('calls onSubmit with valid data', async () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/teléfono/i)
    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } })
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '+54 9 1234 56789' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        contactName: 'Juan Pérez',
        contactEmail: 'juan@example.com',
        contactPhone: '+54 9 1234 56789',
      })
    })
  })

  it('disables submit button during loading', () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} loading={true} />)

    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })
    expect(submitButton).toBeDisabled()
  })

  it('shows error messages for invalid inputs', async () => {
    const mockSubmit = vi.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /confirmar|continuar|enviar/i })

    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/requerido|obligatorio|nombre/i)).toBeInTheDocument()
    })
  })
})
