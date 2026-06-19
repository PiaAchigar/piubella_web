'use client'

import { useState } from 'react'
import { ServiceSelector } from '@/components/calendar/service-selector'
import { CalendarPicker } from '@/components/calendar/calendar-picker'
import { TimeSlotSelector } from '@/components/calendar/time-slot-selector'
import { ContactForm } from '@/components/calendar/contact-form'
import { BookingSummary } from '@/components/calendar/booking-summary'
import { Service, TimeSlot, BookingData } from '@/types'
import { useServices } from '@/hooks/useServices'
import { useCategories } from '@/hooks/useCategories'
import { useAvailability } from '@/hooks/useAvailability'
import { formatDate, formatTime, buildWhatsAppUrl, formatDateISO } from '@/lib/calendar-utils'

type Step = 1 | 2 | 3 | 4 | 5

const STEP_LABELS = ['Servicio', 'Fecha', 'Horario', 'Datos', 'Confirmar']

const INFO_CARDS = [
  {
    icon: 'verified_user',
    title: 'Seguridad y Higiene',
    desc: 'Cumplimos con los más altos estándares de sanitización para que tu única preocupación sea disfrutar.',
  },
  {
    icon: 'event_available',
    title: 'Flexibilidad de Turnos',
    desc: 'Cancela o reprograma tu cita con hasta 24 horas de antelación sin cargos adicionales.',
  },
  {
    icon: 'loyalty',
    title: 'Planes Membresía',
    desc: 'Consulta por nuestros packs mensuales y beneficios exclusivos para clientes frecuentes.',
  },
]

type BookingConfirmed = {
  method: 'whatsapp' | 'mercadopago'
  appointmentId: string
}

export default function Agenda() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>()
  const [selectedService, setSelectedService] = useState<Service | undefined>()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>()
  const [contactData, setContactData] = useState<{
    contactName: string
    contactEmail: string
    contactPhone: string
  } | undefined>()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingConfirmed | null>(null)

  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const { data: services = [], isLoading: servicesLoading } = useServices(selectedCategoryId)
  const { data: availableSlots = [], isLoading: slotsLoading } = useAvailability(selectedDate, selectedService?.id)

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(undefined)
    setCurrentStep(3)
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
    setCurrentStep(4)
  }

  const handleContactSubmit = (data: { contactName: string; contactEmail: string; contactPhone: string }) => {
    setContactData(data)
    setCurrentStep(5)
  }

  const handleEdit = () => {
    setCurrentStep(1)
    setSelectedService(undefined)
    setSelectedDate(undefined)
    setSelectedTimeSlot(undefined)
    setContactData(undefined)
    setPaymentError(null)
    setBookingConfirmed(null)
  }

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as Step) : 1))
  }

  // Crea la reserva en la BD y devuelve el appointmentId
  async function createAppointmentInDB(): Promise<string> {
    if (!selectedService || !selectedDate || !selectedTimeSlot || !contactData) {
      throw new Error('Faltan datos de la reserva')
    }

    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: selectedService.id,
        customer_name: contactData.contactName,
        customer_email: contactData.contactEmail,
        customer_phone: contactData.contactPhone,
        appointment_date: formatDateISO(selectedDate),
        appointment_time: selectedTimeSlot.time,
      }),
    })

    const json = await res.json()
    if (!json.success) throw new Error(json.error ?? 'Error al crear la reserva')
    return json.data.id
  }

  const handlePayWithMercadoPago = async () => {
    if (!selectedService) return
    setIsProcessingPayment(true)
    setPaymentError(null)

    try {
      const appointmentId = await createAppointmentInDB()

      const res = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId,
          serviceName: selectedService.name,
          amount: parseFloat(selectedService.unit_price),
        }),
      })

      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'Error al iniciar el pago')

      // Redirige a MercadoPago Checkout
      window.location.href = json.checkoutUrl
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Error inesperado')
      setIsProcessingPayment(false)
    }
  }

  const handlePayWithWhatsApp = async () => {
    if (!selectedService || !selectedDate || !selectedTimeSlot || !contactData) return
    setIsProcessingPayment(true)
    setPaymentError(null)

    try {
      const appointmentId = await createAppointmentInDB()

      const message = [
        '¡Hola PiuBella! 🌸 Acabo de hacer una reserva y quiero enviarles el comprobante de seña:',
        '',
        `📋 Servicio: ${selectedService.name}`,
        `📅 Fecha: ${formatDate(selectedDate, 'es-AR')}`,
        `🕐 Hora: ${formatTime(selectedTimeSlot.time)}`,
        `👤 Nombre: ${contactData.contactName}`,
        `📧 Email: ${contactData.contactEmail}`,
        '',
        '¡Muchas gracias!',
      ].join('\n')

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
      const url = buildWhatsAppUrl(whatsappNumber, message)

      window.open(url, '_blank')
      setBookingConfirmed({ method: 'whatsapp', appointmentId })
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Error inesperado')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const bookingData: BookingData | undefined =
    selectedService && selectedDate && selectedTimeSlot && contactData
      ? {
          serviceId: selectedService.id,
          service: selectedService,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          contactName: contactData.contactName,
          contactEmail: contactData.contactEmail,
          contactPhone: contactData.contactPhone,
          totalPrice: parseFloat(selectedService.unit_price),
        }
      : undefined

  return (
    <>
      <main className="max-w-container mx-auto px-gutter md:py-section-lg py-20">
        <section className="mb-16 text-center">
          <h2 className="font-serif text-display-lg-mobile md:text-display-lg mb-4">
            Reserva tu Momento
          </h2>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Selecciona tu servicio y encuentra el espacio perfecto para tu bienestar físico y mental.
          </p>
        </section>

        {/* Filtro de categorías */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-secondary/20 pb-4">
            <div className="flex items-center space-x-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] w-full md:w-auto pb-4 md:pb-0">
              <button
                onClick={() => setSelectedCategoryId(undefined)}
                className={`whitespace-nowrap font-sans text-label-md px-4 py-2 rounded-full transition-all ${
                  !selectedCategoryId
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-secondary-container/50'
                }`}
              >
                Todos
              </button>
              {!categoriesLoading &&
                categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`whitespace-nowrap font-sans text-label-md px-4 py-2 rounded-full transition-all ${
                      selectedCategoryId === cat.id
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-secondary-container/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>
            {selectedService && (
              <div className="hidden md:flex items-center space-x-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">schedule</span>
                <span className="font-sans text-label-md">
                  Duración: {selectedService.duration_minutes} min
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_40px_rgba(60,60,59,0.04)]">
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              {([1, 2, 3, 4, 5] as Step[]).map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-bold flex-shrink-0 transition-all ${
                      step === currentStep
                        ? 'bg-primary text-on-primary'
                        : step < currentStep
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {step < currentStep ? (
                      <span className="material-symbols-outlined text-sm">check</span>
                    ) : (
                      step
                    )}
                  </div>
                  {i < 4 && <div className="flex-1 h-px bg-outline-variant" />}
                </div>
              ))}
            </div>
            <p className="font-sans text-label-md text-on-surface-variant text-center">
              {STEP_LABELS[currentStep - 1]} — Paso {currentStep} de 5
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {currentStep > 1 && !bookingConfirmed && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-sans text-label-md mb-8 group"
              >
                <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
                Volver a {STEP_LABELS[currentStep - 2]}
              </button>
            )}

            {/* Paso 1: Selección de servicio */}
            {currentStep === 1 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un servicio
                </h3>
                {servicesLoading ? (
                  <div className="py-8 text-center font-sans text-body-md text-on-surface-variant">
                    Cargando servicios...
                  </div>
                ) : (
                  <ServiceSelector
                    services={services}
                    selected={selectedService}
                    onSelect={handleServiceSelect}
                  />
                )}
              </div>
            )}

            {/* Paso 2: Fecha */}
            {currentStep === 2 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Elige una fecha
                </h3>
                <CalendarPicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
              </div>
            )}

            {/* Paso 3: Horario */}
            {currentStep === 3 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un horario
                </h3>
                {slotsLoading ? (
                  <div className="py-8 text-center font-sans text-body-md text-on-surface-variant">
                    Consultando disponibilidad...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="font-sans text-body-md text-on-surface-variant">
                      No hay turnos disponibles para este día. Probá con otra fecha.
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="mt-4 font-sans text-label-md text-primary hover:underline"
                    >
                      Elegir otra fecha
                    </button>
                  </div>
                ) : (
                  <TimeSlotSelector
                    slots={availableSlots}
                    selected={selectedTimeSlot}
                    onSelect={handleTimeSelect}
                  />
                )}
              </div>
            )}

            {/* Paso 4: Datos de contacto */}
            {currentStep === 4 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Completa tus datos
                </h3>
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            )}

            {/* Paso 5: Resumen y pago */}
            {currentStep === 5 && bookingData && !bookingConfirmed && (
              <BookingSummary
                booking={bookingData}
                onPayWithMercadoPago={handlePayWithMercadoPago}
                onPayWithWhatsApp={handlePayWithWhatsApp}
                onEdit={handleEdit}
                isLoading={isProcessingPayment}
                error={paymentError}
              />
            )}

            {/* Estado: reserva enviada por WhatsApp */}
            {bookingConfirmed?.method === 'whatsapp' && (
              <div className="text-center space-y-6 py-8">
                <span className="material-symbols-outlined text-primary text-6xl">
                  check_circle
                </span>
                <h3 className="font-serif text-headline-md text-on-surface">
                  ¡Tu lugar está reservado!
                </h3>
                <p className="font-sans text-body-lg text-on-surface-variant">
                  Se abrió WhatsApp con los detalles de tu turno. Envianos el comprobante de seña
                  para confirmar. Tu lugar queda reservado por <strong>1 hora</strong>.
                </p>
                <button
                  onClick={handleEdit}
                  className="font-sans text-label-md text-primary hover:underline"
                >
                  Hacer otra reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <section className="bg-surface-container-high py-section-lg">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-12">
          {INFO_CARDS.map((card) => (
            <div key={card.title} className="flex flex-col space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">{card.icon}</span>
              <h4 className="font-serif text-headline-sm">{card.title}</h4>
              <p className="font-sans text-body-md text-on-surface-variant">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
