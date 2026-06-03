'use client'

import { TimeSlot } from '@/types'
import { formatTime } from '@/lib/calendar-utils'

interface TimeSlotSelectorProps {
  slots: TimeSlot[]
  selected?: TimeSlot
  onSelect: (slot: TimeSlot) => void
}

export function TimeSlotSelector({
  slots,
  selected,
  onSelect,
}: TimeSlotSelectorProps) {
  if (slots.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-on-surface-variant">No hay horarios disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => slot.available && onSelect(slot)}
          disabled={!slot.available}
          data-selected={selected?.id === slot.id}
          data-disabled={!slot.available}
          className={`py-3 px-2 rounded font-sans text-body-md font-medium transition-all text-center ${
            !slot.available
              ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant'
              : selected?.id === slot.id
              ? 'bg-primary text-on-primary shadow-md font-semibold'
              : 'bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary-container'
          }`}
        >
          {formatTime(slot.time)}
        </button>
      ))}
    </div>
  )
}
