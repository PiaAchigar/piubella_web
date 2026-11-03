import Link from 'next/link'
import { WorkerDepilationPack } from '@/lib/worker-api'
import { PrecioConAhorro } from './precio-con-ahorro'

/**
 * Un pack de depilación en la web pública.
 *
 * El tachado es la suma de las zonas sueltas (`sumaDeLasPartes`), y sólo
 * viene cuando el pack tiene zonas fijas: en "elegís N zonas" es null y no se
 * inventa un tachado.
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
          <PrecioConAhorro suma={pack.sumaDeLasPartes} final={pack.fixedPrice} claro />
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
