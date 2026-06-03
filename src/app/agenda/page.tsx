'use client'

import { useState } from 'react'
import { ServiceSelector } from '@/components/calendar/service-selector'
import { CalendarPicker } from '@/components/calendar/calendar-picker'
import { TimeSlotSelector } from '@/components/calendar/time-slot-selector'
import { ContactForm } from '@/components/calendar/contact-form'
import { BookingSummary } from '@/components/calendar/booking-summary'
import { Service, TimeSlot, BookingData } from '@/types'
import { MOCK_SERVICES, MOCK_TIME_SLOTS } from '@/lib/mock-data'

type Step = 1 | 2 | 3 | 4 | 5

const STEP_LABELS = ['Servicio', 'Fecha', 'Horario', 'Datos', 'Confirmar']

const CATEGORIES = ['Todos', 'Pilates Reformer', 'Yoga Flow', 'Masajes', 'Faciales']

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

export default function Agenda() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedService, setSelectedService] = useState<Service | undefined>()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>()
  const [contactData, setContactData] = useState<{
    contactName: string
    contactEmail: string
    contactPhone: string
  } | undefined>()

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentStep(3)
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
    setCurrentStep(4)
  }

  const handleContactSubmit = (data: {
    contactName: string
    contactEmail: string
    contactPhone: string
  }) => {
    setContactData(data)
    setCurrentStep(5)
  }

  const handleConfirm = () => {
    console.log('Booking confirmed:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTimeSlot,
      contact: contactData,
    })
  }

  const handleEdit = () => {
    setCurrentStep(1)
    setSelectedService(undefined)
    setSelectedDate(undefined)
    setSelectedTimeSlot(undefined)
    setContactData(undefined)
  }

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as Step) : 1))
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

        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-secondary/20 pb-4">
            <div className="flex items-center space-x-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] w-full md:w-auto pb-4 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap font-sans text-label-md px-4 py-2 rounded-full transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-secondary-container/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl">info</span>
              <span className="font-sans text-label-md">Duración estimada: 60 min</span>
            </div>
          </div>
        </section>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_40px_rgba(60,60,59,0.04)]">
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
            {currentStep > 1 && (
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

            {currentStep === 1 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un servicio
                </h3>
                <ServiceSelector
                  services={MOCK_SERVICES}
                  selected={selectedService}
                  onSelect={handleServiceSelect}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Elige una fecha
                </h3>
                <CalendarPicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un horario
                </h3>
                <TimeSlotSelector
                  slots={MOCK_TIME_SLOTS}
                  selected={selectedTimeSlot}
                  onSelect={handleTimeSelect}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-6">
                  Completa tus datos
                </h3>
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            )}

            {currentStep === 5 && bookingData && (
              <BookingSummary
                booking={bookingData}
                onConfirm={handleConfirm}
                onEdit={handleEdit}
              />
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
