import { TimeSlot } from '@/types'
import { MOCK_TIME_SLOTS } from './mock-data'

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

export function getAvailableSlots(_date: Date, _serviceId?: string): TimeSlot[] {
  // For now, return all available slots from mock data
  // In FASE 4, this will query Supabase based on provider availability
  return MOCK_TIME_SLOTS.filter((slot) => slot.available === true)
}

export function getNextAvailableDate(): Date {
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + 1)
  nextDate.setHours(0, 0, 0, 0)
  return nextDate
}
