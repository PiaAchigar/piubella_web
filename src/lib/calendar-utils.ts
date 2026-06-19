import { TimeSlot } from '@/types'

export function isPastDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function formatDate(date: Date, locale = 'es-AR'): string {
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Accepts various formats: +54 9 1234 56789, (11) 2345-6789, 1234567890, etc.
  // Extract only digits and check length (minimum 10 digits)
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10 && digitsOnly.length <= 15
}

// Genera slots de 30 minutos entre dos horarios HH:MM
export function generateTimeSlots(openTime: string, closeTime: string, intervalMinutes = 30): string[] {
  const [openH, openM] = openTime.split(':').map(Number)
  const [closeH, closeM] = closeTime.split(':').map(Number)

  const slots: string[] = []
  let current = openH * 60 + openM
  const end = closeH * 60 + closeM

  while (current < end) {
    const h = Math.floor(current / 60)
    const m = current % 60
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
    current += intervalMinutes
  }

  return slots
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Kept for backward compatibility — callers migrated to useAvailability hook
export function getAvailableSlots(_date: Date): TimeSlot[] {
  return []
}

export function getNextAvailableDate(): Date {
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + 1)
  nextDate.setHours(0, 0, 0, 0)
  return nextDate
}
