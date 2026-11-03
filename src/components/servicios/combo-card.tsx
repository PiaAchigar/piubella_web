import Link from 'next/link'
import { WorkerCombo } from '@/lib/worker-api'
import { PrecioConAhorro } from './precio-con-ahorro'

/**
 * `variante` existe porque esta card vive en dos fondos: la franja oscura de
 * Destacados (`oscuro`, el de siempre, un carrusel horizontal) y las pantallas
 * de catálogo de /servicios, que son claras y usan grilla. Una segunda card
 * sería la misma card duplicada.
 */
export function ComboCard({
  combo,
  variante = 'oscuro',
}: {
  combo: WorkerCombo
  variante?: 'oscuro' | 'claro'
}) {
  const esPack = combo.kind === 'pack'
  const claro = variante === 'claro'

  return (
    <div
      className={
        claro
          ? 'w-full bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4'
          : 'flex-shrink-0 w-72 bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-4'
      }
    >
      <span
        className={`font-sans text-label-md uppercase tracking-widest text-xs ${
          claro ? 'text-primary' : 'text-on-primary/60'
        }`}
      >
        Combo
      </span>

      <h3
        className={`font-serif text-headline-sm font-normal leading-snug ${
          claro ? 'text-on-surface' : 'text-on-primary'
        }`}
      >
        {combo.name}
      </h3>

      {combo.lines.length > 0 && (
        <ul className="space-y-1.5 flex-grow">
          {combo.lines.map((l) => (
            <li
              key={l.id}
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
              {(() => {
                // Un pack dice las sesiones reales (puede traer regalo), no las de la receta.
                const n = esPack && combo.packEffectiveSessions != null ? combo.packEffectiveSessions : l.sessionsIncluded
                return `${n} ${n === 1 ? 'sesión' : 'sesiones'} de ${l.serviceName}`
              })()}
            </li>
          ))}
        </ul>
      )}

      {(combo.validityWeeks != null || (combo.validityWeeks === undefined && combo.validityMonths != null)) && (
        <p
          className={`font-sans text-body-sm ${
            claro ? 'text-on-surface-variant' : 'text-on-primary/60'
          }`}
        >
          {combo.validityWeeks != null
            ? `${combo.validityWeeks} semanas para usarlas`
            : `${combo.validityMonths} meses para usarlas`}
        </p>
      )}

      <div
        className={`flex items-center justify-between pt-4 border-t mt-auto ${
          claro ? 'border-outline-variant/40' : 'border-white/20'
        }`}
      >
        <PrecioConAhorro
          suma={combo.sumaDeLasPartes ?? combo.servicesSubtotal}
          final={combo.finalAmount}
          efectivo={combo.finalAmountCash}
          claro={claro}
          testIdSuma="combo-subtotal"
        />
        <Link
          href="/contacto"
          className={`font-sans text-label-md underline underline-offset-4 ${
            claro ? 'text-primary' : 'text-on-primary'
          }`}
        >
          Consultar
        </Link>
      </div>
    </div>
  )
}
