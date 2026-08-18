'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

// Mismo vocabulario que usa el resto del sitio para cada tipo.
const KIND_LABELS: Record<TreatmentResult['kind'], string> = {
  service: 'Tratamiento',
  activity: 'Actividad',
  training: 'Capacitación',
}

type PromotionResult = {
  id: string
  name: string
  description: string | null
  promotion_type: string
  discount_percentage: number | null
  discount_amount: number | null
  final_amount: number | null
  valid_from: Date | null
  valid_until: Date | null
  status: string
  is_featured: boolean
  services: Array<{ service_id: string; service_name: string }>
}

type SearchResults = {
  treatments: TreatmentResult[]
  promotions: PromotionResult[]
}

export function TreatmentSearchSection() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

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

  return (
    <div>
      <div>
        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="¿Cuál es tu objetivo? (Ej: verme más joven, tonificar brazos)"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg shadow-sm bg-surface-container text-on-surface placeholder-on-surface-variant outline-none border-2 border-transparent focus:border-primary transition-colors"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary px-8 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
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
                          <div className="flex items-center justify-between">
                            {/* `price` viene normalizado por el backend según el kind (service/
                                activity/training); si es null no mostramos nada en vez de "$0". */}
                            {treatment.price != null && (
                              <span className="font-sans text-label-md text-primary font-bold">
                                ${Number(treatment.price).toLocaleString('es-AR')}
                                <span className="font-sans text-label-sm text-on-surface-variant font-normal">
                                  {' '}{treatment.price_label}
                                </span>
                              </span>
                            )}
                            <span className="font-sans text-label-sm text-on-surface-variant">
                              Similitud: {(treatment.similarity_score * 100).toFixed(0)}%
                            </span>
                          </div>
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

            {/* Promotions */}
            {results.promotions.length > 0 && (
              <div>
                <h3 className="font-serif text-headline-md text-on-surface mb-8">
                  Promociones que te podemos ofrecer alineadas a tu objetivo:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {results.promotions.map((promo) => (
                    <div
                      key={promo.id}
                      className="bg-primary-container rounded-xl p-8 border-l-4 border-primary flex flex-col"
                    >
                      <h4 className="font-serif text-headline-sm text-on-primary-container mb-2 font-medium">
                        {promo.name}
                      </h4>
                      {promo.description && (
                        <p className="font-sans text-body-sm text-on-primary-container/80 mb-4">
                          {promo.description}
                        </p>
                      )}

                      {/* Discount Info */}
                      <div className="mb-4 pt-4 border-t border-on-primary-container/20">
                        <div className="flex items-center gap-4">
                          {promo.discount_percentage && (
                            <div>
                              <span className="font-sans text-label-sm text-on-primary-container/60">
                                Descuento
                              </span>
                              <p className="font-serif text-headline-md text-on-primary-container">
                                {promo.discount_percentage}%
                              </p>
                            </div>
                          )}
                          {promo.final_amount && (
                            <div>
                              <span className="font-sans text-label-sm text-on-primary-container/60">
                                Valor Final
                              </span>
                              <p className="font-serif text-headline-md text-on-primary-container">
                                ${Number(promo.final_amount).toLocaleString('es-AR')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Services */}
                      {promo.services.length > 0 && (
                        <div className="mb-4">
                          <p className="font-sans text-label-sm text-on-primary-container/60 mb-2">
                            Aplica a:
                          </p>
                          <p className="font-sans text-body-sm text-on-primary-container">
                            {promo.services.map((s) => s.service_name).join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Validity */}
                      {promo.valid_until && (
                        <div className="mt-auto pt-4 border-t border-on-primary-container/20">
                          <p className="font-sans text-label-sm text-on-primary-container/60">
                            Válido hasta {new Date(promo.valid_until).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                      )}
                    </div>
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
