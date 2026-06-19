import Link from 'next/link'
import { fetchCompanyConfig } from '@/lib/worker-api'

async function getWhatsApp(): Promise<string> {
  try {
    const config = await fetchCompanyConfig()
    return config.whatsapp ?? '5491133775014'
  } catch {
    return '5491133775014'
  }
}

export default async function AgendaProximamente() {
  const whatsapp = await getWhatsApp()

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-gutter">
      <div className="max-w-lg w-full text-center space-y-10">

        <div className="space-y-4">
          <span className="font-sans text-label-md text-primary tracking-widest uppercase">
            Próximamente
          </span>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-on-surface font-normal leading-tight">
            Estamos trabajando para ofrecerte el mejor servicio
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant">
            Muy pronto vas a poder reservar tu turno desde acá. Por ahora, escribinos por WhatsApp
            y te lo agendamos al instante.
          </p>
        </div>

        <Link
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">chat</span>
          WhatsApp
        </Link>

        <div className="pt-4 border-t border-outline-variant/30">
          <Link
            href="/servicios"
            className="font-serif italic text-body-lg text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all inline-block"
          >
            Ver nuestros servicios
          </Link>
        </div>

      </div>
    </main>
  )
}
