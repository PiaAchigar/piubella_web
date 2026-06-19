import { NextRequest, NextResponse } from 'next/server'
import { fetchAvailability } from '@/lib/worker-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const serviceId = searchParams.get('serviceId')

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ success: false, error: 'Fecha inválida' }, { status: 400 })
    }

    if (!serviceId) {
      return NextResponse.json({ success: false, error: 'serviceId requerido' }, { status: 400 })
    }

    const data = await fetchAvailability(serviceId, date)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al consultar disponibilidad'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
