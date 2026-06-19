import { NextResponse } from 'next/server'
import { fetchCategories } from '@/lib/worker-api'

export async function GET() {
  try {
    const data = await fetchCategories()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar categorías'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
