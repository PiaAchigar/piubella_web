import { Activity } from '@/types'

// Mismas etiquetas de modalidad que training-card, pero para el eje class/machine.
const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  class: 'Clase grupal',
  machine: 'Aparatología',
}

const WHATSAPP_BASE = 'https://wa.me/00541133775014'

function priceAR(value: string | null): string | null {
  if (value == null) return null
  const num = Number(value)
  if (Number.isNaN(num)) return null
  return `$${num.toLocaleString('es-AR')}`
}

// Espeja TrainingCard: mismas clases de Tailwind y mismo contenedor, para que
// la sección de Actividades se vea parte del mismo sistema de diseño.
export function ActivityCard({ activity }: { activity: Activity }) {
  const typeLabel = activity.activityType
    ? ACTIVITY_TYPE_LABELS[activity.activityType] ?? activity.activityType
    : null

  const price = priceAR(activity.monthlyBasePrice)
  const activityName = activity.name ?? 'Actividad'

  const meta: string[] = []
  if (activity.classesPerMonth != null && activity.classesPerMonth > 0) {
    meta.push(`${activity.classesPerMonth} ${activity.classesPerMonth === 1 ? 'clase' : 'clases'} por mes`)
  }

  const waMessage = encodeURIComponent(`Hola! Quiero más información sobre la actividad "${activityName}".`)
  const waHref = `${WHATSAPP_BASE}?text=${waMessage}`

  return (
    <div className="asymmetric-item group">
      <div className="bg-surface rounded-xl overflow-hidden elegant-shadow transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col">
        <div className="p-8 flex flex-col flex-grow">
          {typeLabel && (
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
              {typeLabel}
            </span>
          )}

          <h3 className="font-serif text-headline-sm text-on-surface mb-3 font-medium">
            {activityName}
          </h3>

          <p className="font-sans text-body-md text-on-surface-variant mb-4 flex-grow">
            {activity.description ?? ''}
          </p>

          {meta.length > 0 && (
            <p className="font-sans text-label-md text-on-surface-variant mb-3">
              {meta.join(' · ')}
            </p>
          )}

          {price && (
            <div className="flex items-end gap-6 mt-auto pt-4 border-t border-outline-variant/30">
              <div className="flex flex-col">
                <span className="font-sans text-label-sm text-on-surface-variant">
                  Abono mensual
                </span>
                <span className="font-sans text-label-md text-primary font-bold">
                  {price}
                </span>
              </div>
            </div>
          )}

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-primary text-on-primary px-6 py-3 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all text-center"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
