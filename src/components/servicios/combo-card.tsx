import Link from 'next/link'
import { WorkerCombo } from '@/lib/worker-api'

const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

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
  const hayAhorro = combo.finalAmount < combo.servicesSubtotal
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
              {l.sessionsIncluded} {l.sessionsIncluded === 1 ? 'sesión' : 'sesiones'} de {l.serviceName}
            </li>
          ))}
        </ul>
      )}

      {combo.validityMonths != null && (
        <p
          className={`font-sans text-body-sm ${
            claro ? 'text-on-surface-variant' : 'text-on-primary/60'
          }`}
        >
          {combo.validityMonths} meses para usarlas
        </p>
      )}

      <div
        className={`flex items-center justify-between pt-4 border-t mt-auto ${
          claro ? 'border-outline-variant/40' : 'border-white/20'
        }`}
      >
        <div className="flex flex-col">
          {hayAhorro && (
            <span
              data-testid="combo-subtotal"
              className={`font-sans text-body-sm line-through ${
                claro ? 'text-on-surface-variant' : 'text-on-primary/50'
              }`}
            >
              {pesos(combo.servicesSubtotal)}
            </span>
          )}
          <span
            className={`font-serif text-headline-sm ${claro ? 'text-on-surface' : 'text-on-primary'}`}
          >
            {pesos(combo.finalAmount)}
          </span>
        </div>
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
