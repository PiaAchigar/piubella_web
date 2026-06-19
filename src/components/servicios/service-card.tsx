import { Service } from '@/types'

export function ServiceCard({ service }: { service: Service }) {
  const price = service.unit_price !== '' ? Number(service.unit_price) : NaN
  const hasPrice = !isNaN(price) && price > 0
  const hasDuration = service.duration_minutes > 0

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl elegant-shadow border border-surface-container hover:border-primary/20 transition-all flex flex-col">
      <h5 className="font-serif text-headline-sm mb-3 text-on-surface">{service.name}</h5>
      {service.description && (
        <p className="font-sans text-body-md text-on-surface-variant leading-relaxed mb-6 flex-grow break-words">
          {service.description}
        </p>
      )}
      {(hasDuration || hasPrice) && (
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
          {hasDuration ? (
            <span className="font-sans text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {service.duration_minutes} min
            </span>
          ) : (
            <span />
          )}
          <span className="font-sans text-label-md text-primary font-bold">
            {hasPrice ? `$${price.toLocaleString('es-AR')}` : '–'}
          </span>
        </div>
      )}
    </div>
  )
}
