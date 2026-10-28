import { NextResponse } from 'next/server'
import { workerPost } from '@/lib/worker-client'

// El formulario de /contacto. La consulta va al Worker, que la deja en el
// Inbox del CRM como conversación del canal "web" (2026-10-28). Se pasa por
// acá, en el servidor, para usar WORKER_URL: el navegador no la conoce.
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    const res = await workerPost('/api/web/contacto', body)
    return NextResponse.json({ ok: res.ok }, { status: res.status })
  } catch (error) {
    console.error('[contacto] el Worker no respondió:', error)
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
