import Link from 'next/link'

/**
 * Combos y promociones llegan del backend en la MISMA lista (`promotions`) y se
 * distinguen solo por `promotion_type`: 'bundle' es un combo (paquete de zonas
 * o sesiones), cualquier otro valor es una promoción con descuento.
 */
export type SearchOffer = {
  id: string
  name: string
  description: string | null
  promotion_type: string
  discount_percentage: number | null
  discount_amount: number | null
  valid_from: Date | null
  valid_until: Date | null
  status: string
  is_featured: boolean
  services: Array<{ service_id: string; service_name: string }>
}

export const esCombo = (oferta: SearchOffer) => oferta.promotion_type === 'bundle'

/**
 * "Tiene descuento" significa distinto de null Y distinto de cero: un "0%" se
 * lee como un error de la página, no como "consultar".
 */
const conValor = (n: number | null): n is number => n != null && Number(n) !== 0

/**
 * Postgres devuelve `valid_until` como fecha sin hora. `new Date('2026-12-31')`
 * la lee como medianoche UTC y en Argentina (UTC-3) retrocede un día: la promo
 * se anunciaba venciendo el 30. Cuando el valor viene en formato ISO se
 * formatea a mano, sin construir un Date, para no perder ese día.
 */
export function fechaCorta(valor: Date | string): string {
  if (typeof valor === 'string') {
    const [a, m, d] = valor.slice(0, 10).split('-')
    if (a && m && d) return `${d}/${m}/${a}`
  }
  return new Date(valor).toLocaleDateString('es-AR')
}

export function SearchOfferCard({ offer }: { offer: SearchOffer }) {
  const combo = esCombo(offer)

  // `final_amount` salió del backend con la 1.53.0: una promo ya no tiene un
  // total propio, el descuento se aplica al vender sobre lo que la clienta se
  // lleve. Lo que se puede anunciar acá es el descuento, no un valor final.
  const porcentaje = conValor(offer.discount_percentage) ? offer.discount_percentage : null

  return (
    <div className="bg-primary-container rounded-xl p-8 border-l-4 border-primary flex flex-col h-full">
      {/* Etiqueta de tipo: mismo patrón que las tarjetas de servicio, para que
          se lea de un vistazo si es un combo o una promoción. */}
      <span className="font-sans text-label-sm text-on-primary-container/60 uppercase tracking-widest mb-3">
        {combo ? 'Combo' : 'Promoción'}
      </span>

      <h4 className="font-serif text-headline-sm text-on-primary-container mb-2 font-medium">
        {offer.name}
      </h4>

      {offer.description && (
        <p className="font-sans text-body-sm text-on-primary-container/80 mb-4">
          {offer.description}
        </p>
      )}

      {offer.services.length > 0 && (
        <div className="mb-4">
          <p className="font-sans text-label-sm text-on-primary-container/60 mb-2">
            {combo ? 'Incluye:' : 'Aplica a:'}
          </p>
          <p className="font-sans text-body-sm text-on-primary-container">
            {offer.services.map((s) => s.service_name).join(', ')}
          </p>
        </div>
      )}

      {/* Pie: descuento (solo si existe), vigencia y CTA. `mt-auto` lo pega abajo
          para que todas las tarjetas de la grilla terminen a la misma altura. */}
      <div className="mt-auto pt-4 border-t border-on-primary-container/20">
        {porcentaje != null && (
          <div className="flex items-center gap-6 mb-4">
            <div>
              <span className="font-sans text-label-sm text-on-primary-container/60">Descuento</span>
              <p className="font-serif text-headline-md text-on-primary-container">{porcentaje}%</p>
            </div>
          </div>
        )}

        {offer.valid_until && (
          <p className="font-sans text-label-sm text-on-primary-container/60 mb-4">
            Válido hasta {fechaCorta(offer.valid_until)}
          </p>
        )}

        <Link
          href="/agenda"
          className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all text-center"
        >
          Reservar turno
          <span className="material-symbols-outlined text-sm leading-none">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}
