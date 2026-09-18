import Link from 'next/link'
import { WorkerDepilationPack } from '@/lib/worker-api'

const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

/**
 * Un pack de depilación en la web pública.
 *
 * Sin precio tachado a propósito: `depilation_combo` guarda su precio y nada
 * contra qué compararlo, y un tachado inventado es peor que ninguno. Ver el
 * spec §6.2.
 */
export function PackCard({ pack }: { pack: WorkerDepilationPack }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4">
      <span className="font-sans text-label-md text-primary uppercase tracking-widest text-xs">
        Pack
      </span>

      <h3 className="font-serif text-headline-sm text-on-surface font-normal leading-snug">
        {pack.name}
      </h3>

      {pack.zonas.length > 0 && (
        <ul className="space-y-1.5 flex-grow">
          {pack.zonas.map((zona) => (
            <li
              key={zona}
              className="font-sans text-body-sm text-on-surface-variant flex items-start gap-2"
            >
              <span className="material-symbols-outlined text-outline text-sm mt-0.5 flex-shrink-0">
                check
              </span>
              {zona}
            </li>
          ))}
        </ul>
      )}

      {pack.choiceZoneCount > 0 && (
        <p className="font-sans text-body-sm text-primary">
          + elegís {pack.choiceZoneCount}{' '}
          {pack.choiceZoneCount === 1 ? 'zona' : 'zonas'} más
        </p>
      )}

      {pack.fixedDurationMinutes != null && (
        <p className="font-sans text-body-sm text-on-surface-variant">
          {pack.fixedDurationMinutes} minutos
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40 mt-auto">
        {pack.fixedPrice != null && (
          <span className="font-serif text-headline-sm text-on-surface">
            {pesos(pack.fixedPrice)}
          </span>
        )}
        <Link
          href="/contacto"
          className="font-sans text-label-md text-primary underline underline-offset-4 ml-auto"
        >
          Consultar
        </Link>
      </div>
    </div>
  )
}
