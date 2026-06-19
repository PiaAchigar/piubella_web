'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ConfirmacionContent() {
  const params = useSearchParams()
  const status = params.get('status')

  if (status === 'success') {
    return (
      <div className="text-center space-y-6">
        <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
        <h1 className="font-serif text-display-lg-mobile md:text-headline-md text-on-surface">
          ¡Reserva confirmada!
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-md mx-auto">
          Tu seña fue procesada con éxito. En breve te enviamos un email con los detalles de tu turno.
        </p>
        <Link href="/">
          <Button variant="primary">Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="text-center space-y-6">
        <span className="material-symbols-outlined text-tertiary text-6xl">schedule</span>
        <h1 className="font-serif text-display-lg-mobile md:text-headline-md text-on-surface">
          Pago pendiente
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-md mx-auto">
          Tu pago está siendo procesado. Cuando se acredite, confirmamos tu turno automáticamente.
        </p>
        <Link href="/">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  // failure o cualquier otro estado
  return (
    <div className="text-center space-y-6">
      <span className="material-symbols-outlined text-error text-6xl">cancel</span>
      <h1 className="font-serif text-display-lg-mobile md:text-headline-md text-on-surface">
        No pudimos procesar el pago
      </h1>
      <p className="font-sans text-body-lg text-on-surface-variant max-w-md mx-auto">
        Podés intentar nuevamente o enviarnos la seña por WhatsApp.
      </p>
      <Link href="/agenda">
        <Button variant="primary">Intentar de nuevo</Button>
      </Link>
    </div>
  )
}

export default function ConfirmacionPage() {
  return (
    <main className="max-w-container mx-auto px-gutter py-20 flex items-center justify-center min-h-[60vh]">
      <Suspense fallback={<div className="font-sans text-body-md text-on-surface-variant">Cargando...</div>}>
        <ConfirmacionContent />
      </Suspense>
    </main>
  )
}
