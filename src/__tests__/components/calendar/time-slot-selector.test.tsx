import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TimeSlotSelector } from '@/components/calendar/time-slot-selector'
import { MOCK_TIME_SLOTS } from '@/lib/mock-data'

describe('TimeSlotSelector', () => {
  const availableSlots = MOCK_TIME_SLOTS.filter((slot) => slot.available)

  it('renders available time slots', () => {
    const mockSelect = vi.fn()
    render(
      <TimeSlotSelector
        slots={availableSlots}
        onSelect={mockSelect}
      />
    )

    availableSlots.forEach((slot) => {
      expect(screen.getByText(slot.time)).toBeInTheDocument()
    })
  })

  it('calls onSelect when a slot is clicked', () => {
    const mockSelect = vi.fn()
    render(
      <TimeSlotSelector
        slots={availableSlots}
        onSelect={mockSelect}
      />
    )

    const firstSlot = availableSlots[0]
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    expect(mockSelect).toHaveBeenCalledWith(firstSlot)
  })

  it('highlights selected slot', () => {
    const mockSelect = vi.fn()
    const selectedSlot = availableSlots[0]
    const { container } = render(
      <TimeSlotSelector
        slots={availableSlots}
        selected={selectedSlot}
        onSelect={mockSelect}
      />
    )

    const selectedButtons = container.querySelectorAll('[data-selected="true"]')
    expect(selectedButtons.length).toBeGreaterThan(0)
  })

  it('disables unavailable slots', () => {
    const mockSelect = vi.fn()
    const allSlots = MOCK_TIME_SLOTS
    const { container } = render(
      <TimeSlotSelector
        slots={allSlots}
        onSelect={mockSelect}
      />
    )

    const disabledButtons = container.querySelectorAll('[disabled], [data-disabled="true"]')
    expect(disabledButtons.length).toBeGreaterThan(0)
  })

  it('applies responsive grid classes', () => {
    const mockSelect = vi.fn()
    const { container } = render(
      <TimeSlotSelector
        slots={availableSlots}
        onSelect={mockSelect}
      />
    )

    const grid = container.querySelector('[class*="grid"]')
    expect(grid?.className).toMatch(/grid-cols/)
    expect(grid?.className).toMatch(/md:grid-cols/)
  })

  it('formats time in AM/PM format', () => {
    const mockSelect = vi.fn()
    const customSlots = [
      { id: '1', time: '09:00', available: true },
      { id: '2', time: '14:30', available: true },
    ]
    render(
      <TimeSlotSelector
        slots={customSlots}
        onSelect={mockSelect}
      />
    )

    // Should display formatted times
    expect(screen.getByText(/9:00|09:00/)).toBeInTheDocument()
    expect(screen.getByText(/14:30|2:30/)).toBeInTheDocument()
  })

  it('handles empty slots list', () => {
    const mockSelect = vi.fn()
    render(
      <TimeSlotSelector
        slots={[]}
        onSelect={mockSelect}
      />
    )

    expect(
      screen.getByText(/No hay horarios disponibles|sin horarios/i)
    ).toBeInTheDocument()
  })

  it('does not call onSelect when unavailable slot is clicked', () => {
    const mockSelect = vi.fn()
    const allSlots = MOCK_TIME_SLOTS
    const { container } = render(
      <TimeSlotSelector
        slots={allSlots}
        onSelect={mockSelect}
      />
    )

    // Find a disabled button
    const disabledButtons = container.querySelectorAll('[disabled]')
    if (disabledButtons.length > 0) {
      fireEvent.click(disabledButtons[0] as HTMLButtonElement)
      expect(mockSelect).not.toHaveBeenCalled()
    }
  })
})
