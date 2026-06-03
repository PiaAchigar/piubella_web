'use client'

import { useState } from 'react'
import { isPastDate } from '@/lib/calendar-utils'

interface CalendarPickerProps {
  selectedDate?: Date
  onDateSelect: (date: Date) => void
  unavailableDates?: Date[]
}

export function CalendarPicker({
  selectedDate,
  onDateSelect,
  unavailableDates = [],
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const isDateDisabled = (date: Date) => {
    if (isPastDate(date)) return true
    return unavailableDates.some(
      (unavail) =>
        unavail.getDate() === date.getDate() &&
        unavail.getMonth() === date.getMonth() &&
        unavail.getFullYear() === date.getFullYear()
    )
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ]

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom']

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = []

  // Empty cells for days before month starts
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    days.push(null)
  }

  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  return (
    <div className="w-full">
      {/* Month/Year Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 text-on-surface hover:bg-surface-container rounded transition-colors"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <h2 className="font-serif text-headline-md text-on-surface">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 text-on-surface hover:bg-surface-container rounded transition-colors"
          aria-label="Siguiente mes"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-sans text-label-md font-semibold text-on-surface-variant py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return (
              <div key={`empty-${index}`} className="aspect-square" />
            )
          }

          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              data-selected={selected}
              data-disabled={disabled}
              className={`aspect-square rounded font-sans text-body-md font-medium transition-all flex items-center justify-center ${
                disabled
                  ? 'opacity-30 cursor-not-allowed bg-surface-container text-on-surface-variant'
                  : selected
                  ? 'bg-primary text-on-primary font-semibold shadow-md'
                  : 'bg-surface-container text-on-surface hover:bg-primary-container'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
