'use client'

import { BookingData } from '@/types'
import { formatDate, formatTime } from '@/lib/calendar-utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface BookingSummaryProps {
  booking: BookingData
  onConfirm?: () => void
  onEdit?: () => void
}

export function BookingSummary({
  booking,
  onConfirm,
  onEdit,
}: BookingSummaryProps) {
  return (
    <div className="w-full">
      <h2 className="font-serif text-headline-md text-on-surface mb-6">
        Resumen de tu reserva
      </h2>

      <Card className="bg-primary-container border-2 border-primary mb-8">
        <div className="p-8 space-y-6">
          {/* Service */}
          <div className="flex justify-between items-start pb-4 border-b border-on-primary-container">
            <div>
              <p className="font-sans text-label-md text-on-primary-container-variant font-medium">
                Servicio
              </p>
              <p className="font-serif text-headline-sm text-on-primary-container mt-1">
                {booking.service.name}
              </p>
              <p className="font-sans text-body-md text-on-primary-container-variant mt-2">
                Duración: {booking.service.duration_minutes} min
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-headline-md text-on-primary-container font-bold">
                ${booking.service.unit_price}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between items-start pb-4 border-b border-on-primary-container">
            <div>
              <p className="font-sans text-label-md text-on-primary-container-variant font-medium">
                Fecha y Hora
              </p>
              <p className="font-serif text-body-lg text-on-primary-container mt-1 capitalize">
                {formatDate(booking.date, 'es-AR')}
              </p>
              <p className="font-serif text-headline-sm text-on-primary-container mt-1">
                {formatTime(booking.timeSlot.time)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pb-4 border-b border-on-primary-container">
            <p className="font-sans text-label-md text-on-primary-container-variant font-medium mb-3">
              Información de contacto
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">
                  Nombre:
                </span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">
                  {booking.contactName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">
                  Email:
                </span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">
                  {booking.contactEmail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">
                  Teléfono:
                </span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">
                  {booking.contactPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4">
            <p className="font-sans text-headline-sm text-on-primary-container font-semibold">
              Total a pagar:
            </p>
            <p className="font-serif text-display-lg text-on-primary-container font-bold">
              ${booking.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex-1"
        >
          Modificar
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          className="flex-1"
        >
          Confirmar Reserva
        </Button>
      </div>
    </div>
  )
}
