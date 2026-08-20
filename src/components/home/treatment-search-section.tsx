'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchOfferCard, esCombo, type SearchOffer } from './search-offer-card'

type TreatmentResult = {
  id: string
  name: string
  description: string | null
  unit_price_list: number
  benefits: string | null
  contraindications: string | null
  special_attention_notes: string | null
  similarity_score: number
  // El backend ahora normaliza el precio por tipo (service/activity/training):
  // `price` ya viene calculado según corresponda y `price_label` trae su unidad.
  // `unit_price_list` se deja tal cual arriba porque sigue llegando del backend.
  kind: 'service' | 'activity' | 'training'
  price: number | null
  price_label: string
}

// Mismo vocabulario que usa el resto del sitio para cada tipo. En particular
// 'service' es "Servicio" y no "Tratamiento": la navegación, el home y la
// página /servicios dicen "Servicios", y dos nombres para lo mismo obligan a
// la clienta a deducir que son la misma cosa.
const KIND_LABELS: Record<TreatmentResult['kind'], string> = {
  service: 'Servicio',
  activity: 'Actividad',
  training: 'Capacitación',
}

type SearchResults = {
  treatments: TreatmentResult[]
  // El backend devuelve combos y promociones mezclados acá; se separan en el
  // render por `promotion_type` — ver `esCombo`.
  promotions: SearchOffer[]
}

export function TreatmentSearchSection() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Hay algo que limpiar si quedó texto escrito o si ya se buscó alguna vez.
  // El botón no se muestra antes de eso: un control que no hace nada distrae.
  const puedeLimpiar = query.length > 0 || hasSearched

  const handleClear = () => {
    setQuery('')
    setResults(null)
    setHasSearched(false)
    // Devolver el foco al campo evita que quien navega con teclado quede
    // parada en un botón que acaba de desaparecer.
    inputRef.current?.focus()
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL ?? 'http://localhost:8787'
      const response = await fetch(`${workerUrl}/api/treatments/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 10, similarityThreshold: 0.3 }),
      })

      if (!response.ok) throw new Error('Error en la búsqueda')
      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error('Error al buscar:', err)
      setResults({ treatments: [], promotions: [] })
    } finally {
      setLoading(false)
    }
  }

  const ofertas = results?.promotions ?? []
  const combos = ofertas.filter(esCombo)
  const promos = ofertas.filter((o) => !esCombo(o))

  return (
    <div>
      <div>
        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="¿Cuál es tu objetivo? (Ej: verme más joven, tonificar brazos)"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg shadow-sm bg-surface-container text-on-surface placeholder-on-surface-variant outline-none border-2 border-transparent focus:border-primary transition-colors"
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none bg-primary text-on-primary px-8 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>

              {/* Limpiar. `type="button"` NO es opcional: dentro de un <form> el
                  default de un botón es submit, así que sin esto la escobita
                  dispararía una búsqueda en vez de limpiarla. */}
              {puedeLimpiar && (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Limpiar búsqueda y resultados"
                  aria-label="Limpiar búsqueda y resultados"
                  className="shrink-0 px-4 py-3 rounded-lg border-2 border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined block text-xl leading-none">
                    cleaning_services
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        {hasSearched && results && (
          <div>
            {/* Treatments */}
            {results.treatments.length > 0 ? (
              <div className="mb-16">
                <h3 className="font-serif text-headline-md text-on-surface mb-8">
                  Servicios que están alineados a tu objetivo:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {results.treatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="bg-surface rounded-xl overflow-hidden elegant-shadow transition-transform duration-500 hover:-translate-y-2 flex flex-col h-full"
                    >
                      <div className="p-8 flex flex-col flex-grow">
                        {/* Etiqueta de tipo: mismas clases que activity-card.tsx / training-card.tsx
                            para que se vea del mismo sistema de diseño. */}
                        <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
                          {KIND_LABELS[treatment.kind] ?? treatment.kind}
                        </span>
                        <h4 className="font-serif text-headline-sm text-on-surface mb-2 font-medium">
                          {treatment.name}
                        </h4>
                        {treatment.description && (
                          <p className="font-sans text-body-sm text-on-surface-variant mb-4">
                            {treatment.description}
                          </p>
                        )}
                        {treatment.benefits && (
                          <div className="mb-4 text-sm">
                            <p className="font-sans text-label-sm text-on-surface-variant mb-1">
                              Beneficios:
                            </p>
                            <p className="font-sans text-body-sm text-on-surface">
                              {treatment.benefits}
                            </p>
                          </div>
                        )}
                        <div className="mt-auto pt-4 border-t border-outline-variant/30">
                          {/* `price` viene normalizado por el backend según el kind (service/
                              activity/training); si es null no mostramos nada en vez de "$0".
                              El puntaje de similitud NO se muestra: es una métrica interna del
                              buscador semántico y a una clienta un "31%" le dice que el
                              resultado es malo, cuando en realidad no significa nada para ella. */}
                          {treatment.price != null && Number(treatment.price) !== 0 && (
                            <span className="font-sans text-label-md text-primary font-bold">
                              ${Number(treatment.price).toLocaleString('es-AR')}
                              <span className="font-sans text-label-sm text-on-surface-variant font-normal">
                                {' '}{treatment.price_label}
                              </span>
                            </span>
                          )}

                          {/* Mismas clases que el CTA de activity-card.tsx, para
                              que las tarjetas del buscador se lean como parte
                              del mismo sistema y no como un agregado. */}
                          <Link
                            href="/agenda"
                            className="mt-6 flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all text-center"
                          >
                            Reservar turno
                            <span className="material-symbols-outlined text-sm leading-none">
                              arrow_forward
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center mb-16">
                <p className="font-sans text-body-lg text-on-surface-variant mb-6">
                  No encontramos servicios que coincidan con "{query}"
                </p>
                <Link
                  href="/servicios"
                  className="bg-primary text-on-primary px-8 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all inline-block"
                >
                  Ver todos los servicios
                </Link>
              </div>
            )}

            {/* Combos y promociones. Vienen mezclados en `results.promotions`
                y se separan acá: un combo es un paquete de zonas o sesiones,
                una promoción es un descuento con vigencia. Meterlos en la
                misma grilla obligaba a leer la letra chica para distinguirlos. */}
            {combos.length > 0 && (
              <div className="mb-16">
                <h3 className="font-serif text-headline-md text-on-surface mb-8">
                  Combos que incluyen lo que buscás:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {combos.map((combo) => (
                    <SearchOfferCard key={combo.id} offer={combo} />
                  ))}
                </div>
              </div>
            )}

            {promos.length > 0 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-8">
                  Promociones que te podemos ofrecer alineadas a tu objetivo:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {promos.map((promo) => (
                    <SearchOfferCard key={promo.id} offer={promo} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
