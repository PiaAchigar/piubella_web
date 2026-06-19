'use client'

import { BookingData } from '@/types'
import { formatDate, formatTime } from '@/lib/calendar-utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface BookingSummaryProps {
  booking: BookingData
  onPayWithMercadoPago: () => void
  onPayWithWhatsApp: () => void
  onEdit?: () => void
  isLoading?: boolean
  error?: string | null
}

export function BookingSummary({
  booking,
  onPayWithMercadoPago,
  onPayWithWhatsApp,
  onEdit,
  isLoading = false,
  error,
}: BookingSummaryProps) {
  return (
    <div className="w-full">
      <h2 className="font-serif text-headline-md text-on-surface mb-6">
        Resumen de tu reserva
      </h2>

      <Card className="bg-primary-container border-2 border-primary mb-8">
        <div className="p-8 space-y-6">
          {/* Servicio */}
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

          {/* Fecha y hora */}
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

          {/* Contacto */}
          <div className="pb-4 border-b border-on-primary-container">
            <p className="font-sans text-label-md text-on-primary-container-variant font-medium mb-3">
              Información de contacto
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">Nombre:</span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">{booking.contactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">Email:</span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">{booking.contactEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-body-md text-on-primary-container-variant">Teléfono:</span>
                <span className="font-sans text-body-md text-on-primary-container font-medium">{booking.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Seña */}
          <div className="flex justify-between items-center pt-4">
            <p className="font-sans text-headline-sm text-on-primary-container font-semibold">
              Seña a abonar:
            </p>
            <p className="font-serif text-display-lg text-on-primary-container font-bold">
              ${booking.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      {/* Aviso de expiración */}
      <p className="font-sans text-label-md text-on-surface-variant text-center mb-6">
        Tu lugar queda reservado por <strong>1 hora</strong> mientras confirmamos la seña.
      </p>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-error-container rounded-lg text-center">
          <p className="font-sans text-body-md text-on-error-container">{error}</p>
        </div>
      )}

      {/* Botones de pago */}
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          onClick={onPayWithMercadoPago}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Procesando...' : 'Pagar seña con MercadoPago'}
        </Button>

        <Button
          variant="outline"
          onClick={onPayWithWhatsApp}
          disabled={isLoading}
          className="w-full"
        >
          Enviar seña por WhatsApp
        </Button>

        <button
          onClick={onEdit}
          disabled={isLoading}
          className="w-full text-center font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
        >
          Modificar reserva
        </button>
      </div>
    </div>
  )
}
