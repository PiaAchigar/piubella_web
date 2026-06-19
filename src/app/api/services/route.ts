import { NextRequest, NextResponse } from 'next/server'
import { fetchServices } from '@/lib/worker-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId') ?? undefined
    const q = searchParams.get('q') ?? undefined
    const data = await fetchServices({ categoryId, q })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar servicios'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
