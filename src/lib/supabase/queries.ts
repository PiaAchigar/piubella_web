import { db } from '@/lib/db'
import { services, categories, serviceCategory, appointments, providerAvailability, openHours } from '@/lib/db/schema'
import { eq, and, or, sql } from 'drizzle-orm'
import { generateTimeSlots } from '@/lib/calendar-utils'
import { TimeSlot } from '@/types'

export async function getCategories() {
  return await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .orderBy(categories.name)
}

export async function getServices(categoryId?: string) {
  if (!categoryId) {
    return await db.select().from(services).orderBy(services.name)
  }

  return await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      unit_price: services.unit_price,
      duration_minutes: services.duration_minutes,
      created_at: services.created_at,
      updated_at: services.updated_at,
    })
    .from(services)
    .innerJoin(serviceCategory, eq(services.id, serviceCategory.service_id))
    .where(eq(serviceCategory.category_id, categoryId))
    .orderBy(services.name)
}

export async function getAvailableTimeSlotsForDate(date: string): Promise<TimeSlot[]> {
  // date: 'YYYY-MM-DD'
  // getDay() en UTC para evitar desfase de zona horaria
  const [y, m, d] = date.split('-').map(Number)
  const dayOfWeek = new Date(y, m - 1, d).getDay() // 0=Dom, 6=Sáb

  // 1. Horarios del negocio para ese día
  const hoursResult = await db
    .select()
    .from(openHours)
    .where(and(eq(openHours.day_of_week, dayOfWeek), eq(openHours.is_closed, false)))

  if (!hoursResult.length) return []

  const { open_time, close_time } = hoursResult[0]

  // 2. Operadoras que trabajan ese día
  const workingProviders = await db
    .selectDistinct({ id: providerAvailability.provider_id })
    .from(providerAvailability)
    .where(eq(providerAvailability.day_of_week, dayOfWeek))

  if (!workingProviders.length) return []
  const totalProviders = workingProviders.length

  // 3. Turnos que ocupan slots (reserved no expirado + scheduled)
  const takenRows = await db
    .select({ time: appointments.appointment_time })
    .from(appointments)
    .where(
      and(
        eq(appointments.appointment_date, date),
        or(
          eq(appointments.status, 'scheduled'),
          and(
            eq(appointments.status, 'reserved'),
            sql`${appointments.expires_at} > NOW()`,
          ),
        ),
      ),
    )

  // Cuenta cuántos turnos hay por horario
  const slotCounts: Record<string, number> = {}
  for (const row of takenRows) {
    slotCounts[row.time] = (slotCounts[row.time] || 0) + 1
  }

  // 4. Genera todos los slots de 30 min y marca disponibilidad
  const allTimes = generateTimeSlots(open_time, close_time, 30)

  return allTimes.map((time) => ({
    id: time,
    time,
    available: (slotCounts[time] || 0) < totalProviders,
  }))
}
