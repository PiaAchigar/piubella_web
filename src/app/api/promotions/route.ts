import { NextResponse } from 'next/server'
import { fetchPromotions } from '@/lib/worker-api'

export async function GET() {
  try {
    const data = await fetchPromotions()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar promociones'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
