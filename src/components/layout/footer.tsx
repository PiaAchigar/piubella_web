import Link from 'next/link'
import { fetchCompanyConfig, WorkerCompanyConfig } from '@/lib/worker-api'

const LEGAL_LINKS = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Cookies', href: '/cookies' },
]

async function getConfig(): Promise<WorkerCompanyConfig | null> {
  try {
    return await fetchCompanyConfig()
  } catch {
    return null
  }
}

export async function Footer() {
  const config = await getConfig()
  const year = new Date().getFullYear()

  const whatsappHref = config?.whatsapp
    ? `https://wa.me/${config.whatsapp}`
    : 'https://wa.me/5491133775014'

  const emailHref = config?.email
    ? `mailto:${config.email}`
    : 'mailto:info@piubellaesteticapilates.com.ar'

  const companyName = config?.companyName ?? 'Piu Bella Estética & Pilates'

  return (
    <footer className="w-full mt-auto bg-surface-container-highest border-t border-outline-variant/50">
      <div className="container py-section-lg flex flex-col items-center space-y-8">

        {/* Logo + nombre + tagline */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-serif text-headline-md text-on-surface">
            {companyName}
          </p>
          <p className="font-sans text-body-md text-on-surface-variant max-w-md text-center">
            Bienestar integral para armonizar tu vida.
          </p>
          {config?.address && (
            <p className="font-sans text-label-md text-on-surface-variant">
              {config.address}
            </p>
          )}
        </div>

        {/* Links legales */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-on-tertiary-fixed-variant hover:text-primary transition-colors font-sans text-label-md"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Íconos sociales */}
        <div className="flex gap-6">
          <a href={whatsappHref} aria-label="Whatsapp" className="text-primary hover:opacity-70 transition-opacity" target="_blank">
            <span className="material-symbols-outlined">chat</span>
          </a>
          <a href={emailHref} aria-label="Email" className="text-primary hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined">mail</span>
          </a>
          <a href="https://search.google.com/local/writereview?placeid=ChIJzxLidZ2kvJURLNp7zU5f2Is" aria-label="Ubicación" className="text-primary hover:opacity-70 transition-opacity" target="_blank">
            <span className="material-symbols-outlined">map</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="font-sans text-body-md text-on-surface-variant opacity-60">
          Piu Bella Estética Pilates. Todos los derechos reservados.
        </p>
        <p className="font-sans text-on-surface-variant opacity-40">
          © {year} Complexa IA Software &amp; Automation
        </p>

      </div>
    </footer>
  )
}
