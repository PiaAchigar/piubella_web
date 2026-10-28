import { afterEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/contacto/route'

// /api/contacto pasa la consulta del formulario al Worker, que la deja en el
// Inbox del CRM. Desde el servidor: así usa WORKER_URL y no depende de que
// Vercel tenga una variable pública para el navegador.
const consulta = {
  nombre: 'Ana',
  email: 'ana@ejemplo.com',
  telefono: '11 5555-0001',
  mensaje: 'Hola',
  empresa: '',
}

function pedido(body: unknown) {
  return new Request('http://localhost/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contacto', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('le pasa la consulta tal cual al Worker', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    const res = await POST(pedido(consulta))

    expect(res.status).toBe(201)
    const [url, init] = fetchMock.mock.calls[0]
    expect(String(url)).toMatch(/\/api\/web\/contacto$/)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual(consulta)
  })

  it('si el Worker rechaza los datos, devuelve el mismo 400', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"error":"x"}', { status: 400 })))
    expect((await POST(pedido(consulta))).status).toBe(400)
  })

  it('si el Worker no responde, 502', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')))
    expect((await POST(pedido(consulta))).status).toBe(502)
  })

  it('un cuerpo que no es JSON es un 400, sin llamar al Worker', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await POST(
      new Request('http://localhost/api/contacto', { method: 'POST', body: 'no es json' }),
    )
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
