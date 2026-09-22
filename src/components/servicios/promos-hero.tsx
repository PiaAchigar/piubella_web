import { fetchPromotions } from '@/lib/worker-api'
import { siFalla } from '@/lib/si-falla'
import { PromoCarousel } from './promo-carousel'

export async function PromosHero() {
  const promos = await siFalla('las promos de la franja', fetchPromotions, [])

  // Sin promos no hay franja: la clienta no tiene por qué ver un cartel que le
  // explique nuestra gestión interna. Vale tanto si no hay ninguna publicada
  // como si el Worker no contestó — pero ahora el segundo caso queda en el log.
  if (promos.length === 0) return null

  return (
    <section className="bg-primary overflow-hidden">
      <div className="max-w-catalogo mx-auto px-gutter py-section-md">
        <div className="mb-10">
          <span className="mt-10 font-sans text-label-md text-on-primary/60 tracking-widest uppercase block">
            Ofertas especiales
          </span>
          <h2 className="font-serif text-display-lg-mobile md:text-display-lg text-on-primary font-normal">
            Promos del Mes
          </h2>
        </div>

        <PromoCarousel promos={promos} />
      </div>
    </section>
  )
}
