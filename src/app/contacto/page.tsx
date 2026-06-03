'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('Contact form submitted:', {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const channels = [
    { icon: 'chat', label: 'WhatsApp', value: '+54 9 11 3377 5014', href: 'https://wa.me/00541133775014' },
    { icon: 'photo_camera', label: 'Instagram', value: '@piubellaesteticapilates', href: 'https://www.instagram.com/piubellaesteticapilates/' },
    { icon: 'social_leaderboard', label: 'Facebook', value: 'Piu Bella Estetica Pilates', href: 'https://www.facebook.com/piubellaesteticagym' },
    { icon: 'mail', label: 'Email', value: 'info@piubellaesteticapilates.com.ar', href: 'mailto:info@piubellaesteticapilates.com.ar' },
  ]

  return (
    <>
      <section className="relative pt-section-lg pb-12 overflow-hidden">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="font-sans text-label-md text-primary uppercase tracking-widest mb-4 block">
              Estética &amp; Pilates
            </span>
            <h1 className="font-serif text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
              Encuentra tu equilibrio,{' '}
              <br />
              <span className="italic text-primary">conecta con nosotros</span>
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant mb-8 max-w-md">
              Estamos aquí para acompañarte en tu camino hacia el bienestar integral. Consultanos
              por nuestras clases de Reformer, Yoga o tratamientos de estética avanzada.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden elegant-shadow">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ9sBAJHGDGZwJ2TPY3WfdvgC7Tk2UbDhgkKave8MP8kOboOaQ3fsE9quwqe3U95ZOfGf9xfUxph2sknSdmt1S0SOEjZkLM63qQuuECM0HPUdatmOpM-YQQcIMexKcanGDzRqM-WsuzUm3JiXMITKZkKgIWWr0eMWQPzxWKVQtqU4Xrem3HejGr5lh8uVeXOy6nzRBRJwAHMG6ms3TqJUm6xOP2S1C5k56n64YvtrjypmyBdtQzJDvTocYYJjcTW6Kl2e8tEgBlkPB"
              alt="Interior spa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/5" />
          </div>
        </div>
      </section>

      <section className="py-section-lg bg-surface-container-low">
        <div className="max-w-container mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="font-serif text-headline-md text-on-surface mb-8">
                  Nuestros canales
                </h2>
                <div className="space-y-4">
                  {channels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-container text-primary flex-shrink-0">
                        <span className="material-symbols-outlined">{ch.icon}</span>
                      </div>
                      <div>
                        <p className="font-sans text-label-md text-primary uppercase">{ch.label}</p>
                        <p className="font-sans text-body-md text-on-surface">{ch.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-primary-container/20 border border-primary-container/30">
                <h3 className="font-serif text-headline-sm text-on-primary-container mb-4">
                  ¿Lista para tu momento?
                </h3>
                <p className="font-sans text-body-md text-on-primary-container/80 mb-6">
                  Agenda tu sesión de Pilates o tu tratamiento de estética hoy mismo de forma
                  online.
                </p>
                <a
                  href="/agenda"
                  className="inline-flex items-center text-primary font-serif italic border-b border-primary pb-1 hover:opacity-70 transition-opacity group"
                >
                  Agendar cita ahora
                  <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-surface p-8 md:p-12 rounded-2xl elegant-shadow border border-surface-variant/50">
                {submitted && (
                  <div className="mb-8 p-4 bg-primary-container text-on-primary-container rounded-lg font-sans text-body-md">
                    ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                  </div>
                )}
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block font-sans text-label-md text-on-surface-variant uppercase">
                        Nombre
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Tu nombre completo"
                        className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant font-sans text-body-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-sans text-label-md text-on-surface-variant uppercase">
                        Mail
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="correo@ejemplo.com"
                        className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant font-sans text-body-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-sans text-label-md text-on-surface-variant uppercase">
                      WhatsApp
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+54 11 ..."
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant font-sans text-body-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-sans text-label-md text-on-surface-variant uppercase">
                      Consulta
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant font-sans text-body-md resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 rounded-lg font-sans text-label-md hover:bg-primary/90 transition-colors uppercase tracking-widest shadow-lg shadow-primary/20"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-lg bg-surface">
        <div className="max-w-container mx-auto px-gutter text-center mb-12">
          <h2 className="font-serif text-headline-md mb-2">Nos encontrás en:</h2>
          <div className="w-16 h-px bg-secondary mx-auto mb-6" />
          <p className="font-sans text-body-md text-on-surface-variant">
            Calle de la Armonía 1234, Barrio Norte, CABA
          </p>
        </div>
        <div className="max-w-[1400px] mx-auto px-gutter">
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-outline-variant/30 elegant-shadow">
            <iframe
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.444900223789!2d-58.4022416!3d-34.5930062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzM0LjgiUyA1OMKwMjQnMDguMSJX!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
            />
            <div className="absolute inset-0 pointer-events-none bg-primary/5 mix-blend-overlay" />
          </div>
        </div>
      </section>
    </>
  )
}
