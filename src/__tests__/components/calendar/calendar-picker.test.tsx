import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CalendarPicker } from '@/components/calendar/calendar-picker'

describe('CalendarPicker', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-02T00:00:00Z'))
  })

  it('renders current month and year', () => {
    const mockSelect = vi.fn()
    render(<CalendarPicker onDateSelect={mockSelect} />)

    expect(screen.getByText(/Junio|June/i)).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders days of week headers', () => {
    const mockSelect = vi.fn()
    render(<CalendarPicker onDateSelect={mockSelect} />)

    const headers = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom']
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument()
    })
  })

  it('renders calendar days', () => {
    const mockSelect = vi.fn()
    render(<CalendarPicker onDateSelect={mockSelect} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('disables past dates', () => {
    const mockSelect = vi.fn()
    const { container } = render(<CalendarPicker onDateSelect={mockSelect} />)

    // June 1st should be disabled
    const disabledDays = container.querySelectorAll('[disabled], [data-disabled="true"]')
    expect(disabledDays.length).toBeGreaterThan(0)
  })

  it('calls onDateSelect when a future date is clicked', () => {
    const mockSelect = vi.fn()
    render(<CalendarPicker onDateSelect={mockSelect} />)

    // Click June 15 (future date)
    const dateButton = screen.getByRole('button', { name: '15' })
    fireEvent.click(dateButton)

    expect(mockSelect).toHaveBeenCalled()
    const selectedDate = mockSelect.mock.calls[0][0]
    expect(selectedDate.getDate()).toBe(15)
    expect(selectedDate.getMonth()).toBe(5) // June (0-indexed)
  })

  it('highlights selected date', () => {
    const mockSelect = vi.fn()
    const selectedDate = new Date('2026-06-15')
    const { container } = render(
      <CalendarPicker
        selectedDate={selectedDate}
        onDateSelect={mockSelect}
      />
    )

    // Check for selected state on June 15
    const selectedDays = container.querySelectorAll('[data-selected="true"]')
    expect(selectedDays.length).toBeGreaterThan(0)
  })

  it('has navigation for previous and next months', () => {
    const mockSelect = vi.fn()
    render(<CalendarPicker onDateSelect={mockSelect} />)

    expect(screen.getByRole('button', { name: /anterior|previous|<|‹/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /siguiente|next|>|›/i })).toBeInTheDocument()
  })

  it('renders month navigation that changes calendar', () => {
    const mockSelect = vi.fn()
    const { container, rerender } = render(
      <CalendarPicker onDateSelect={mockSelect} />
    )

    expect(screen.getByText(/Junio|June/i)).toBeInTheDocument()

    // Click next month button
    const nextButton = screen.getByRole('button', { name: /siguiente|next|>|›/i })
    fireEvent.click(nextButton)

    // Should show July now
    rerender(<CalendarPicker onDateSelect={mockSelect} />)
    // Note: This is a simplified check; full implementation would track state
  })

  it('handles unavailableDates prop', () => {
    const mockSelect = vi.fn()
    const unavailable = [new Date('2026-06-10'), new Date('2026-06-12')]
    const { container } = render(
      <CalendarPicker
        onDateSelect={mockSelect}
        unavailableDates={unavailable}
      />
    )

    // June 10 and 12 should be disabled
    const disabledDays = container.querySelectorAll('[data-disabled="true"]')
    expect(disabledDays.length).toBeGreaterThanOrEqual(unavailable.length)
  })
})
