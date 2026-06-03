import Link from 'next/link'

const LEGAL_LINKS = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Cookies', href: '/cookies' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full mt-auto bg-surface-container-highest border-t border-outline-variant/50">
      <div className="container py-section-lg flex flex-col items-center space-y-8">

        {/* Logo + nombre + tagline */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-serif text-headline-md text-on-surface">
            Piu Bella Estética &amp; Pilates
          </p>
          <p className="font-sans text-body-md text-on-surface-variant max-w-md text-center">
            Bienestar integral para armonizar tu vida.
          </p>
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
          <a href="#" aria-label="Redes sociales" className="text-primary hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a href="mailto:contacto@piubella.com" aria-label="Email" className="text-primary hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined">mail</span>
          </a>
          <a href="#" aria-label="Ubicación" className="text-primary hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined">map</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="font-sans text-body-md text-on-surface-variant opacity-60">
          © {year} Piu Bella Estética &amp; Pilates. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  )
}
