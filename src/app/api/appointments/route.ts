import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createReservation } from '@/lib/supabase/mutations'

const CreateAppointmentSchema = z.object({
  service_id: z.string().uuid('ID de servicio inválido'),
  customer_name: z.string().min(2, 'Nombre requerido'),
  customer_email: z.string().email('Email inválido'),
  customer_phone: z.string().min(8, 'Teléfono inválido'),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  appointment_time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const input = CreateAppointmentSchema.parse(body)
    const appointment = await createReservation(input)

    return NextResponse.json({ success: true, data: appointment }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 },
      )
    }

    const message = error instanceof Error ? error.message : 'Error al crear la reserva'
    const status = message.includes('no está disponible') ? 409 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
