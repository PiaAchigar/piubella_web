import { Training } from '@/types'

const MODALITY_LABELS: Record<string, string> = {
  in_person: 'Presencial',
  online: 'Online',
  hybrid: 'Híbrida',
}

const WHATSAPP_BASE = 'https://wa.me/00541133775014'

function priceAR(value: number | null): string | null {
  if (value == null) return null
  return `$${Number(value).toLocaleString('es-AR')}`
}

export function TrainingCard({ training }: { training: Training }) {
  const modalityLabel = training.modality
    ? MODALITY_LABELS[training.modality] ?? training.modality
    : null

  const listPrice = priceAR(training.listPrice)
  const cashPrice = priceAR(training.cashPrice)

  const meta: string[] = []
  if (training.totalSessions != null) {
    meta.push(`${training.totalSessions} ${training.totalSessions === 1 ? 'sesión' : 'sesiones'}`)
  }
  if (training.durationPerSessionMinutes != null) {
    meta.push(`${training.durationPerSessionMinutes} min c/u`)
  }
  if (training.maxParticipants != null) {
    meta.push(`cupo ${training.maxParticipants}`)
  }

  const waMessage = encodeURIComponent(`Hola! Quiero más información sobre la capacitación "${training.name ?? ''}".`)
  const waHref = `${WHATSAPP_BASE}?text=${waMessage}`

  return (
    <div className="asymmetric-item group reveal-up">
      <div className="bg-surface rounded-xl overflow-hidden elegant-shadow transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col">
        <div className="p-8 flex flex-col flex-grow">
          {modalityLabel && (
            <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
              {modalityLabel}
            </span>
          )}

          <h3 className="font-serif text-headline-sm text-on-surface mb-3 font-medium">
            {training.name}
          </h3>

          <p className="font-sans text-body-md text-on-surface-variant mb-4 flex-grow">
            {training.description ?? ''}
          </p>

          {meta.length > 0 && (
            <p className="font-sans text-label-md text-on-surface-variant mb-3">
              {meta.join(' · ')}
            </p>
          )}

          {training.includesCertification && (
            <span className="inline-flex w-fit items-center gap-1 font-sans text-label-sm text-primary font-bold mb-4">
              ✓ {training.certificationTitle ?? 'Incluye certificación'}
            </span>
          )}

          {/* Precios: lista + efectivo, cada uno con su etiqueta chica */}
          {(listPrice || cashPrice) && (
            <div className="flex items-end gap-6 mt-auto pt-4 border-t border-outline-variant/30">
              {listPrice && (
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm text-on-surface-variant">
                    Precio de lista
                  </span>
                  <span className="font-sans text-label-md text-on-surface font-medium">
                    {listPrice}
                  </span>
                </div>
              )}
              {cashPrice && (
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm text-on-surface-variant">
                    Precio efectivo
                  </span>
                  <span className="font-sans text-label-md text-primary font-bold">
                    {cashPrice}
                  </span>
                </div>
              )}
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
