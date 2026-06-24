import { Training } from '@/types'
import { TrainingCard } from './training-card'

function buildCourseJsonLd(trainings: Training[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: trainings
      .filter((t) => t.name != null)
      .map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: t.name,
        description: t.description ?? undefined,
        provider: {
          '@type': 'Organization',
          name: 'Piu Bella',
          sameAs: 'https://piubella.com',
        },
        ...(t.listPrice != null && {
          offers: {
            '@type': 'Offer',
            price: t.listPrice,
            priceCurrency: 'ARS',
            availability: 'https://schema.org/InStock',
          },
        }),
      },
    })),
  }
}

/** Script JSON-LD (schema.org Course/ItemList) reutilizable: home + /servicios. */
export function TrainingJsonLd({ trainings }: { trainings: Training[] }) {
  if (trainings.length === 0) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseJsonLd(trainings)) }}
    />
  )
}

export function CapacitacionesSection({
  trainings,
  variant = 'home',
}: {
  trainings: Training[]
  variant?: 'home' | 'servicios'
}) {
  if (trainings.length === 0) return null

  const sectionBg = variant === 'home' ? 'bg-secondary' : 'bg-surface'
  const eyebrowColor = variant === 'home' ? 'text-on-secondary/70' : 'text-on-surface-variant'
  const titleColor = variant === 'home' ? 'text-on-secondary' : 'text-on-surface'

  return (
    <section className={`${sectionBg} overflow-hidden py-section-lg`} aria-label="Capacitaciones">
      <TrainingJsonLd trainings={trainings} />
      <div className="container">
        <div className="mb-10 reveal-up">
          <span className={`font-sans text-label-md ${eyebrowColor} tracking-widest uppercase block mb-3`}>
            Formación profesional
          </span>
          <h2 className={`font-serif text-display-lg-mobile md:text-display-lg ${titleColor} font-normal`}>
            Capacitaciones
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainings.map((t) => (
            <TrainingCard key={t.id} training={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
