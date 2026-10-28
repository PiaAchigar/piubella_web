import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
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

// Hasta el 2026-10-28 el formulario hacía console.log y decía "enviado": las
// consultas se perdían. Ahora van al Inbox del CRM vía /api/contacto.
describe('/contacto — enviar la consulta', () => {
  afterEach(() => vi.unstubAllGlobals())

  function completarYEnviar() {
    render(<ContactoPage />)
    const escribir = (etiqueta: RegExp, valor: string) =>
      fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
    escribir(/nombre/i, 'Ana Pérez')
    escribir(/^mail/i, 'ana@ejemplo.com')
    escribir(/whatsapp/i, '11 5555-0001')
    escribir(/consulta/i, 'Quiero info de limpieza facial')
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
  }

  it('manda la consulta y le avisa a la clienta que llegó', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    completarYEnviar()

    expect(await screen.findByText(/gracias por tu mensaje/i)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/contacto')
    expect(JSON.parse(init.body)).toEqual({
      nombre: 'Ana Pérez',
      email: 'ana@ejemplo.com',
      telefono: '11 5555-0001',
      mensaje: 'Quiero info de limpieza facial',
      empresa: '',
    })
    expect(screen.getByLabelText(/consulta/i)).toHaveValue('')
  })

  it('si no llega, lo dice, ofrece WhatsApp y no borra lo que escribió', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('error', { status: 502 })))
    completarYEnviar()

    expect(await screen.findByText(/no pudimos enviar/i)).toBeInTheDocument()
    expect(screen.queryByText(/gracias por tu mensaje/i)).toBeNull()
    expect(screen.getByRole('link', { name: /escribinos por whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5491133775014'),
    )
    expect(screen.getByLabelText(/consulta/i)).toHaveValue('Quiero info de limpieza facial')
  })

  it('mientras envía, el botón no deja mandarla dos veces', async () => {
    let terminar: (r: Response) => void = () => {}
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise<Response>((r) => (terminar = r))))
    completarYEnviar()

    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled()
    terminar(new Response('{"ok":true}', { status: 201 }))
    await waitFor(() => expect(screen.getByRole('button', { name: /enviar/i })).toBeEnabled())
  })

  it('pide el WhatsApp: es por donde le van a contestar', () => {
    render(<ContactoPage />)
    expect(screen.getByLabelText(/whatsapp/i)).toBeRequired()
  })
})
