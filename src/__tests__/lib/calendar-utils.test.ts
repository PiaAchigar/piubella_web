import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  isPastDate,
  formatDate,
  formatTime,
  validateEmail,
  validatePhone,
  getAvailableSlots,
  getNextAvailableDate,
} from '@/lib/calendar-utils'
import { MOCK_TIME_SLOTS } from '@/lib/mock-data'

describe('calendar-utils', () => {
  beforeEach(() => {
    // Mock current date to June 2, 2026 for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-02T00:00:00Z'))
  })

  describe('isPastDate', () => {
    it('returns true for past dates', () => {
      const pastDate = new Date('2026-06-01')
      expect(isPastDate(pastDate)).toBe(true)
    })

    it('returns false for future dates', () => {
      const futureDate = new Date('2026-06-03')
      expect(isPastDate(futureDate)).toBe(false)
    })

    it('returns false for today', () => {
      const today = new Date('2026-06-02')
      expect(isPastDate(today)).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('formats date to Spanish locale', () => {
      const date = new Date('2026-06-15')
      const formatted = formatDate(date, 'es-AR')
      expect(formatted).toMatch(/15|junio/)
    })

    it('returns readable date string', () => {
      const date = new Date('2026-06-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('2026')
    })

    it('handles today correctly', () => {
      const today = new Date('2026-06-02')
      const formatted = formatDate(today)
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })
  })

  describe('formatTime', () => {
    it('formats military time to AM/PM', () => {
      expect(formatTime('09:00')).toBe('9:00 AM')
    })

    it('formats afternoon times correctly', () => {
      expect(formatTime('14:30')).toBe('2:30 PM')
    })

    it('formats midnight correctly', () => {
      expect(formatTime('00:00')).toBe('12:00 AM')
    })

    it('formats noon correctly', () => {
      expect(formatTime('12:00')).toBe('12:00 PM')
    })

    it('preserves minutes', () => {
      expect(formatTime('15:45')).toBe('3:45 PM')
    })
  })

  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true)
      expect(validateEmail('test.user@domain.co.ar')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid.email')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })

    it('handles whitespace', () => {
      expect(validateEmail(' user@example.com ')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('accepts valid Argentine phone numbers', () => {
      expect(validatePhone('+54 9 1234 56789')).toBe(true)
      expect(validatePhone('+541234567890')).toBe(true)
      expect(validatePhone('1234567890')).toBe(true)
    })

    it('accepts phone numbers with common formats', () => {
      expect(validatePhone('11 2345 6789')).toBe(true)
      expect(validatePhone('(11) 2345-6789')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc')).toBe(false)
      expect(validatePhone('')).toBe(false)
    })

    it('rejects phone numbers with too few digits', () => {
      expect(validatePhone('123 456')).toBe(false)
    })
  })

  describe('getAvailableSlots', () => {
    it('returns available slots for a date', () => {
      const date = new Date('2026-06-03')
      const slots = getAvailableSlots(date)
      expect(Array.isArray(slots)).toBe(true)
      expect(slots.length > 0).toBe(true)
    })

    it('filters out unavailable slots', () => {
      const date = new Date('2026-06-03')
      const slots = getAvailableSlots(date)
      const allAvailable = slots.every((slot) => slot.available === true)
      expect(allAvailable).toBe(true)
    })

    it('returns slots with correct structure', () => {
      const date = new Date('2026-06-03')
      const slots = getAvailableSlots(date)
      slots.forEach((slot) => {
        expect(slot).toHaveProperty('id')
        expect(slot).toHaveProperty('time')
        expect(slot).toHaveProperty('available')
        expect(typeof slot.time).toBe('string')
      })
    })

    it('filters by service ID if provided', () => {
      const date = new Date('2026-06-03')
      const slots = getAvailableSlots(date, '1')
      expect(Array.isArray(slots)).toBe(true)
    })
  })

  describe('getNextAvailableDate', () => {
    it('returns a future date', () => {
      const nextDate = getNextAvailableDate()
      expect(nextDate.getTime()).toBeGreaterThan(new Date('2026-06-02').getTime())
    })

    it('returns a Date object', () => {
      const nextDate = getNextAvailableDate()
      expect(nextDate instanceof Date).toBe(true)
    })

    it('skips past dates', () => {
      const nextDate = getNextAvailableDate()
      expect(isPastDate(nextDate)).toBe(false)
    })
  })
})
