'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const SERVICES = [
  {
    id: 1,
    title: 'Pilates Reformer',
    description: 'Fortalece tu centro, mejora tu postura y gana flexibilidad con clases personalizadas.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_7FamrsJUlVqgGKfu_1rewRiZ6AHb8smyI4CDnBft6Wd9eqnAdq_M6uPyM55ZNXJLNMJR8mlOP4T4qXsA54CiN_-W2DMcPCBxV6ShH4kTjC6p7CywotT_Z-lP9p-1Zw3b5uzQuKKijsNTwi0VAtf7mY_E-fhHzcSKYhw_OrTLO755RJhKPj3sxaxcKGQMCRUqPR7F1zRQmv33DNZ8a5BAqqm_QqzTNqhkTcyNtIGv0A_45hKOFqEdo31_ZD0bTafcPi7mbnth5oC',
  },
  {
    id: 2,
    title: 'Estética Avanzada',
    description: 'Tratamientos faciales y corporales que realzan tu belleza natural con ciencia y arte.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjp_uB2T-Ea6pXbw93dT6kxsYFn9f3A0C_2kzfXcSjgzpcVAWiqOKTeXLpBqqrXnUNdhRHaP5RP7OpCd4qsag7XuSgZFhSrwG0Vtb4GqHws8CPCnQx6W7AnsOiE_8t1N6GkgsHB6XFKv5AW1UkAvyrz1Yz2vqkDZC-RAQ9_9iA-uZM2XkO2GPh2Bp5j_PVb9B512tjyowKI2dk9851wa-0x9BOB6n_xzdcEnzFCXsoAVR6nzKRFAX0bIbQPnj9WWY_yYeoQ7BGTcf1',
  },
  {
    id: 3,
    title: 'Masajes & Spa',
    description: 'Libera tensiones y reconecta con tu paz interior a través de nuestras terapias manuales.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiSlKrXvBfd4gsHcv4JAhEq8VPM37_kwcNwlOCUUg7nvIaQ9XCs-n459cfB3RsS_uo9l85awf9z6hMcZGoAj35dNZ5E0voot55YimMqOWmF_uni7gBE3cHkbSaX5WxwgUKhQ9XnXolJtcjfngX5unCqjU_hRVLGtFxUljTVsOWAyiYdPyzXkjw5VaKahh0BibdRNQP1iDW_iEI-dhd6KZXZVhGaoAspXbM7OXnn_ylbyIDu8ZTKwgu8tFL1MSd7RLPTetlZZ549cDd',
  },
]

const NOSOTROS_IMG_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCpvQE7n_ihNG9PSVU5xhch2Q88-og7-yOKkScggtZ8toZR8Py1fEUUIGw4EaazAaBWK88PxZ8G_R519MVhx_U88nYXW5lMBctDxrjaVmtjZJYGpEUyS6vnIqmAasi9lLqOJYR_R3dIXhBEueacPUkBvh-NeSWGUXjAGSHZ8PfzvqA3Z0ps_a9VNqF1Nsj5Izp-Fh-yvE_IrQNIsuSiwEuvXNfHGeP_ILiueYsq2XnkgFoAA-U4ZsdqbiN_AfU0E2yfBrNUb3HBHS16'
const NOSOTROS_IMG_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_LxJ2nILDMbAyv-4vaAJVs1EehvcLqvT9swWVC7IIAgGWB6NmQg77mHZO8jXAsAwvpmPcMBuf7DjVNryufOmz2wojSAlA-jYkVCr3XIPS8VcJgvgYCFK3WRxB9yi4H1_f74_UcRB387_AcPnoU5Jku0u4X2CCXtbiXiKmqLz64IRcfHEmxF7efGqrqjgQfS7jqqBxjFNH7KAsTG2kZVNigaQ30GlGt_rXw7o6yraIaYY4n35Sp1j6IRhR_d-cGlY0edFdrCCv4sM3'
const TESTIMONIAL_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBYBZVjQK9PmhvNphQliDEme6jW1EdSZGLwyFliHo2_YspPIrIDZrLet61utyM4YiUOpkF-c4DPcVXUo5zTwoubQecWU_ZBRi7_TV8j-bFphMjRq6vtR_bCuXXF1YR8BrMJystGWtAkt22n4gai_uihAK_sEeSEOsL1ZM0ya8ASCE50HojY1jnVFESfZApP0oVBqFci0hno3ndlktYaTR60J00d2rBcA7LxIgCledygxdk2EB2rAXQAcq_z62DNSw7o5_h5g2_56U0X'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/woman.png"
            alt="Piu Bella"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/40 to-transparent" />
        </div>
        <div className="relative z-10 container w-full">
          <div className="max-w-2xl reveal-up">
            <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-6 leading-tight italic font-normal">
              Cuidado integral para tu cuerpo, mente y alma.
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant mb-10 max-w-lg">
              Descubre un santuario de bienestar en Piu Bella. Fusionamos la disciplina del Pilates
              Reformer con la delicadeza de la estética avanzada para renovar tu esencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/agenda"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all text-center"
              >
                Empezar mi Transformación
              </Link>
              <Link
                href="/servicios"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-sans text-label-md tracking-widest uppercase hover:text-on-primary-container hover:border-secondary text-center"
              >
                Explorar Servicios
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Nosotros Section */}
      <section className="py-section-lg bg-surface relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <span className="font-sans text-label-md text-primary tracking-widest uppercase mb-4 block">
                Nuestra Esencia
              </span>
              <h2 className="font-serif text-headline-md md:text-display-lg text-on-surface mb-8 font-normal">
                Un espacio diseñado para tu bienestar absoluto
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant mb-6 leading-relaxed">
                En Piu Bella, creemos que la belleza es el reflejo de una salud equilibrada. Nuestro
                enfoque combina técnicas tradicionales con tecnología de vanguardia para ofrecerte
                resultados que se sienten tanto por dentro como por fuera.
              </p>
              <Link
                href="/nosotros"
                className="font-serif italic text-body-lg text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all inline-block"
              >
                Conoce nuestra historia
              </Link>
            </div>

            {/* Bento Visual Grid */}
            <div className="grid grid-cols-2 gap-4 h-[500px] reveal-up">
              <div className="rounded-2xl overflow-hidden shadow-lg h-full relative">
                <img
                  src={NOSOTROS_IMG_1}
                  alt="Pilates Reformer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="rounded-2xl overflow-hidden shadow-lg relative">
                  <img
                    src={NOSOTROS_IMG_2}
                    alt="Spa Treatment"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="bg-primary-container rounded-2xl flex flex-col justify-center p-8 text-on-primary-container">
                  <span className="font-serif text-headline-md mb-2">23+</span>
                  <span className="font-sans text-label-md uppercase tracking-wider">
                    Años de experiencia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-section-lg bg-surface-container-low">
        <div className="container">
          <div className="text-center mb-16 reveal-up">
            <span className="font-sans text-label-md text-primary tracking-widest uppercase mb-4 block">
              Experiencias Piu Bella
            </span>
            <h2 className="font-serif text-headline-md md:text-display-lg text-on-surface font-normal">
              Nuestros Servicios Destacados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="asymmetric-item group reveal-up">
                <div className="bg-surface rounded-xl overflow-hidden elegant-shadow transition-transform duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-headline-sm text-on-surface mb-3 font-medium">
                      {service.title}
                    </h3>
                    <p className="font-sans text-body-md text-on-surface-variant mb-6">
                      {service.description}
                    </p>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform inline-block">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal-up">
            <Link
              href="/servicios"
              className="bg-primary text-on-primary px-12 py-4 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all inline-block"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-section-lg bg-surface relative">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto reveal-up">
            <span className="material-symbols-outlined text-primary-container text-4xl mb-6 block">
              format_quote
            </span>
            <p className="font-serif italic text-headline-md md:text-display-lg text-primary mb-12 font-normal">
              &ldquo;Piu Bella no es solo un centro de estética, es mi momento de pausa y reconexión
              diaria. El ambiente es simplemente mágico.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-outline-variant/30 overflow-hidden flex-shrink-0">
                <img
                  src={TESTIMONIAL_AVATAR}
                  alt="Mariana Soler"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-on-surface">Mariana Soler</p>
                <p className="font-sans text-label-md text-on-surface-variant">
                  Cliente desde 2021
                </p>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="mt-24 max-w-sm mx-auto flex items-center gap-4 opacity-30">
            <div className="h-px flex-1 bg-secondary" />
            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              circle
            </span>
            <div className="h-px flex-1 bg-secondary" />
          </div>
        </div>
      </section>
    </div>
  )
}
