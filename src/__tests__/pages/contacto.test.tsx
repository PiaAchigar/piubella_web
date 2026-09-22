import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactoPage from '@/app/contacto/page'

// Reescrito contra la pantalla real (2026-09-22). Los tests viejos afirmaban
// contra una versión anterior: un título "Contacto" que ya no existe, campos
// llamados "Email"/"Teléfono"/"Mensaje" —hoy son "Mail", "WhatsApp" y
// "Consulta"— y una sección de "horarios" que se reemplazó por los canales de
// contacto y el mapa.
//
// Lo único que NO se movió para acomodar a la pantalla son los campos por
// etiqueta: `getByLabelText` es exactamente lo que hace un lector de pantalla,
// y que fallara era un bug de accesibilidad de verdad, no un test viejo.
describe('/contacto', () => {
  it('encabeza con la invitación a contactarse', () => {
    render(<ContactoPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /encuentra tu equilibrio/i,
    )
  })

  it.each([
    ['Nombre', /nombre/i],
    ['Mail', /mail/i],
    ['WhatsApp', /whatsapp/i],
    ['Consulta', /consulta/i],
  ])('el campo %s se encuentra por su etiqueta', (_nombre, etiqueta) => {
    // Si esto falla, la etiqueta quedó suelta: un lector de pantalla no
    // anuncia el campo y hacer clic en el texto no lo enfoca.
    render(<ContactoPage />)
    expect(screen.getByLabelText(etiqueta)).toBeInTheDocument()
  })

  it('tiene el botón de enviar', () => {
    render(<ContactoPage />)
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('muestra los canales de contacto y dónde queda el local', () => {
    render(<ContactoPage />)
    expect(screen.getByRole('heading', { name: /nuestros canales/i })).toBeInTheDocument()
    expect(screen.getByText(/méxico 1120/i)).toBeInTheDocument()
  })
})
