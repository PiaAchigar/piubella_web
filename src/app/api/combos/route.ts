import { NextResponse } from 'next/server'
import { fetchCombos } from '@/lib/worker-api'

export async function GET() {
  try {
    const data = await fetchCombos()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar combos'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
