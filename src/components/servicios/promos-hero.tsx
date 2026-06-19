import { fetchPromotions } from '@/lib/worker-api'
import { PromoCarousel } from './promo-carousel'

export async function PromosHero() {
  let promos = []
  try {
    promos = await fetchPromotions()
  } catch {
    return null
  }

  if (promos.length === 0) return null

  return (
    <section className="bg-primary overflow-hidden">
      <div className="container py-section-lg">
        <div className="mb-10">
          <span className="font-sans text-label-md text-on-primary/60 tracking-widest uppercase block mb-3">
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
