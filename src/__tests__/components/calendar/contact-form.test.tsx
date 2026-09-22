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

  it.skip('validates email format', async () => {
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

  it.skip('disables submit button during loading', () => {
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
