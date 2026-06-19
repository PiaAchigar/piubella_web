import { NextResponse } from 'next/server'
import { fetchCompanyConfig } from '@/lib/worker-api'

export async function GET() {
  try {
    const data = await fetchCompanyConfig()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar configuración'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
