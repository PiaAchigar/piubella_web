'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/ui/hero-section'
import { ContactForm } from '@/components/contact/contact-form'
import { Card } from '@/components/ui/card'

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (data: any) => {
    // TODO: In FASE 4, submit to Supabase or email service
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <HeroSection
        title="Contacto"
        description="¿Consultas o sugerencias? ¡Nos encantaría escucharte!"
        backgroundColor="bg-tertiary-container"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-headline-md text-on-surface mb-6">
                Envíanos tu Mensaje
              </h2>
              {submitted && (
                <div className="mb-6 p-4 bg-primary-container text-on-primary-container rounded font-sans text-body-md">
                  ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                </div>
              )}
              <ContactForm onSubmit={handleSubmit} />
            </div>

            {/* Company Information */}
            <div className="flex flex-col gap-8">
              {/* Hours */}
              <Card>
                <div className="p-6">
                  <h3 className="font-serif text-headline-sm text-on-surface mb-4">
                    Horarios
                  </h3>
                  <div className="space-y-3 font-sans text-body-md text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes:</span>
                      <span className="font-semibold text-on-surface">
                        9:00 AM - 8:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábados:</span>
                      <span className="font-semibold text-on-surface">
                        10:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingos:</span>
                      <span className="font-semibold text-on-surface">
                        Cerrado
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card>
                <div className="p-6">
                  <h3 className="font-serif text-headline-sm text-on-surface mb-4">
                    Información
                  </h3>
                  <div className="space-y-4 font-sans text-body-md text-on-surface-variant">
                    <div>
                      <p className="font-semibold text-on-surface mb-1">
                        Teléfono
                      </p>
                      <a
                        href="tel:+541234567890"
                        className="text-primary hover:text-primary-container transition-colors"
                      >
                        +54 (123) 456-7890
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:contacto@piubella.com"
                        className="text-primary hover:text-primary-container transition-colors"
                      >
                        contacto@piubella.com
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface mb-1">
                        Ubicación
                      </p>
                      <p>
                        Av. Principal 123<br />
                        Buenos Aires, Argentina
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card>
                <div className="p-6">
                  <h3 className="font-serif text-headline-sm text-on-surface mb-4">
                    Síguenos
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      className="px-4 py-2 bg-primary text-on-primary rounded font-sans text-label-md font-medium hover:bg-primary-container transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://facebook.com"
                      className="px-4 py-2 bg-primary text-on-primary rounded font-sans text-label-md font-medium hover:bg-primary-container transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://wa.me"
                      className="px-4 py-2 bg-primary text-on-primary rounded font-sans text-label-md font-medium hover:bg-primary-container transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
