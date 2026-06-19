import Link from 'next/link'
import { WorkerPromotion } from '@/lib/worker-api'

export function PromoCard({ promo }: { promo: WorkerPromotion }) {
  const price = promo.services[0]?.unitPriceList

  const validUntilLabel = promo.validUntil
    ? `hasta el ${new Date(promo.validUntil).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
      })}`
    : null

  return (
    <div className="flex-shrink-0 w-72 bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-4">
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="font-sans text-label-md text-on-primary/60 uppercase tracking-widest text-xs">
          {promo.promotionType === 'bundle' ? 'Pack' : 'Promo'}
        </span>
        {validUntilLabel && (
          <span className="font-sans text-label-md text-on-primary/50 text-xs">
            · {validUntilLabel}
          </span>
        )}
      </div>

      {/* Nombre */}
      <h3 className="font-serif text-headline-sm text-on-primary font-normal leading-snug">
        {promo.name}
      </h3>

      {/* Servicios incluidos */}
      {promo.services.length > 0 && (
        <ul className="space-y-1.5 flex-grow">
          {promo.services.map((s) => (
            <li
              key={s.id}
              className="font-sans text-body-sm text-on-primary/80 flex items-start gap-2"
            >
              <span className="material-symbols-outlined text-on-primary/50 text-sm mt-0.5 flex-shrink-0">
                check
              </span>
              {s.name}
            </li>
          ))}
        </ul>
      )}

      {/* Precio + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-auto">
        {price != null ? (
          <span className="font-serif text-headline-sm text-on-primary">
            ${price.toLocaleString('es-AR')}
          </span>
        ) : (
          <span className="font-sans text-label-md text-on-primary/50">Consultar</span>
        )}
        <Link
          href="/agenda"
          className="font-sans text-label-md bg-on-primary text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Reservar
        </Link>
      </div>
    </div>
  )
}
