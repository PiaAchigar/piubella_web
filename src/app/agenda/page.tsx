'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/ui/hero-section'
import { ServiceSelector } from '@/components/calendar/service-selector'
import { CalendarPicker } from '@/components/calendar/calendar-picker'
import { TimeSlotSelector } from '@/components/calendar/time-slot-selector'
import { ContactForm } from '@/components/calendar/contact-form'
import { BookingSummary } from '@/components/calendar/booking-summary'
import { Button } from '@/components/ui/button'
import { Service, TimeSlot, BookingData } from '@/types'
import { MOCK_SERVICES, MOCK_TIME_SLOTS } from '@/lib/mock-data'

type Step = 1 | 2 | 3 | 4 | 5

export default function Agenda() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
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
    // In FASE 4, this will submit to Supabase
    console.log('Booking confirmed:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTimeSlot,
      contact: contactData,
    })
    // TODO: Submit to API and show success message
  }

  const handleEdit = () => {
    setCurrentStep(1)
    setSelectedService(undefined)
    setSelectedDate(undefined)
    setSelectedTimeSlot(undefined)
    setContactData(undefined)
  }

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? (prev - 1) as Step : 1))
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
      <HeroSection
        title="Reserva tu Cita"
        description="Elige el servicio, fecha y horario que mejor te convenga"
        backgroundColor="bg-secondary-container"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-sans font-bold text-sm transition-all ${
                    step === currentStep
                      ? 'bg-primary text-on-primary'
                      : step < currentStep
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <p className="font-sans text-body-md text-on-surface-variant text-center">
              Paso {currentStep} de 5
            </p>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <div>
                <h2 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un servicio
                </h2>
                <ServiceSelector
                  services={MOCK_SERVICES}
                  selected={selectedService}
                  onSelect={handleServiceSelect}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="font-serif text-headline-md text-on-surface mb-6">
                  Elige una fecha
                </h2>
                <CalendarPicker
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="font-serif text-headline-md text-on-surface mb-6">
                  Selecciona un horario
                </h2>
                <TimeSlotSelector
                  slots={MOCK_TIME_SLOTS}
                  selected={selectedTimeSlot}
                  onSelect={handleTimeSelect}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="font-serif text-headline-md text-on-surface mb-6">
                  Completa tus datos
                </h2>
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            )}

            {currentStep === 5 && bookingData && (
              <div>
                <BookingSummary
                  booking={bookingData}
                  onConfirm={handleConfirm}
                  onEdit={handleEdit}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-12">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  ← Atrás
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
