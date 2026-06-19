import { db } from '@/lib/db'
import { appointments, providerAvailability } from '@/lib/db/schema'
import { eq, and, or, sql } from 'drizzle-orm'
import { CreateAppointmentInput } from '@/types'

export async function createReservation(input: CreateAppointmentInput) {
  const [y, m, d] = input.appointment_date.split('-').map(Number)
  const dayOfWeek = new Date(y, m - 1, d).getDay()

  // Todas las operadoras que trabajan ese día
  const workingProviders = await db
    .selectDistinct({ id: providerAvailability.provider_id })
    .from(providerAvailability)
    .where(eq(providerAvailability.day_of_week, dayOfWeek))

  if (!workingProviders.length) {
    throw new Error('No hay operadoras disponibles para ese día')
  }

  // Operadoras ya tomadas en ese slot (reserved no expirado + scheduled)
  const takenRows = await db
    .select({ provider_id: appointments.provider_id })
    .from(appointments)
    .where(
      and(
        eq(appointments.appointment_date, input.appointment_date),
        eq(appointments.appointment_time, input.appointment_time),
        or(
          eq(appointments.status, 'scheduled'),
          and(
            eq(appointments.status, 'reserved'),
            sql`${appointments.expires_at} > NOW()`,
          ),
        ),
      ),
    )

  const takenIds = new Set(takenRows.map((r) => r.provider_id))
  const freeProvider = workingProviders.find((p) => !takenIds.has(p.id))

  if (!freeProvider) {
    throw new Error('El horario ya no está disponible')
  }

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // +1 hora

  const result = await db
    .insert(appointments)
    .values({
      service_id: input.service_id,
      provider_id: freeProvider.id,
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone,
      appointment_date: input.appointment_date,
      appointment_time: input.appointment_time,
      status: 'reserved',
      expires_at: expiresAt,
      notes: input.notes ?? null,
    })
    .returning()

  return result[0]
}

export async function confirmAppointment(id: string) {
  const result = await db
    .update(appointments)
    .set({ status: 'scheduled', expires_at: null })
    .where(eq(appointments.id, id))
    .returning()

  return result[0]
}
