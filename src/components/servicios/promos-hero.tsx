import { fetchPromotions } from '@/lib/worker-api'
import { PromoCarousel } from './promo-carousel'

export async function PromosHero() {
  let promos = []
  try {
    promos = await fetchPromotions()
    console.log(promos)
  } catch {
    return null
  }

  if (promos.length === 0) return null

  return (
    <section className="bg-primary overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-gutter py-section-md">
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
