import Link from 'next/link'
import { WorkerPromotion } from '@/lib/worker-api'

/**
 * `variante` existe por el mismo motivo que en ComboCard: esta card vive en la
 * franja oscura de Destacados (`oscuro`, el carrusel de la home) y también va
 * a vivir en las pantallas claras de /servicios. En `oscuro` no cambia nada —
 * no queremos tocar la home.
 */
export function PromoCard({
  promo,
  variante = 'oscuro',
}: {
  promo: WorkerPromotion
  variante?: 'oscuro' | 'claro'
}) {
  const claro = variante === 'claro'

  const descuento =
    promo.discountPercentage != null
      ? `${promo.discountPercentage}% OFF`
      : promo.discountAmount != null
        ? `$${promo.discountAmount.toLocaleString('es-AR')} de descuento`
        : null

  const validUntilLabel = promo.validUntil
    ? `hasta el ${new Date(promo.validUntil).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
      })}`
    : null

  return (
    <div
      className={
        claro
          ? 'w-full bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4'
          : 'flex-shrink-0 w-72 bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-4'
      }
    >
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span
          className={`font-sans text-label-md uppercase tracking-widest text-xs ${
            claro ? 'text-primary' : 'text-on-primary/60'
          }`}
        >
          {promo.promotionType === 'bundle' ? 'Pack' : 'Promo'}
        </span>
        {validUntilLabel && (
          <span
            className={`font-sans text-label-md text-xs ${
              claro ? 'text-on-surface-variant' : 'text-on-primary/50'
            }`}
          >
            · {validUntilLabel}
          </span>
        )}
      </div>

      {/* Nombre */}
      <h3
        className={`font-serif text-headline-sm font-normal leading-snug ${
          claro ? 'text-on-surface' : 'text-on-primary'
        }`}
      >
        {promo.name}
      </h3>

      {/* Lo que está en oferta */}
      {promo.targets.length > 0 && (
        <ul className="space-y-1.5 flex-grow">
          {promo.targets.map((t) => (
            <li
              key={t.id}
              className={`font-sans text-body-sm flex items-start gap-2 ${
                claro ? 'text-on-surface-variant' : 'text-on-primary/80'
              }`}
            >
              <span
                className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${
                  claro ? 'text-outline' : 'text-on-primary/50'
                }`}
              >
                check
              </span>
              {t.nombre}
            </li>
          ))}
        </ul>
      )}

      {/* Descuento + CTA */}
      <div
        className={`flex items-center justify-between pt-4 border-t mt-auto ${
          claro ? 'border-outline-variant/40' : 'border-white/20'
        }`}
      >
        {descuento != null ? (
          <span
            className={`font-serif text-headline-sm ${
              claro ? 'text-on-surface' : 'text-on-primary'
            }`}
          >
            {descuento}
          </span>
        ) : (
          <span
            className={`font-sans text-label-md ${
              claro ? 'text-on-surface-variant' : 'text-on-primary/50'
            }`}
          >
            Consultar
          </span>
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
