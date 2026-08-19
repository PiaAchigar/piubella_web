import Link from 'next/link'
import { WorkerCombo } from '@/lib/worker-api'

const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

export function ComboCard({ combo }: { combo: WorkerCombo }) {
  const hayAhorro = combo.finalAmount < combo.servicesSubtotal

  return (
    <div className="flex-shrink-0 w-72 bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-4">
      <span className="font-sans text-label-md text-on-primary/60 uppercase tracking-widest text-xs">
        Combo
      </span>

      <h3 className="font-serif text-headline-sm text-on-primary font-normal leading-snug">
        {combo.name}
      </h3>

      {combo.lines.length > 0 && (
        <ul className="space-y-1.5 flex-grow">
          {combo.lines.map((l) => (
            <li
              key={l.id}
              className="font-sans text-body-sm text-on-primary/80 flex items-start gap-2"
            >
              <span className="material-symbols-outlined text-on-primary/50 text-sm mt-0.5 flex-shrink-0">
                check
              </span>
              {l.sessionsIncluded} {l.sessionsIncluded === 1 ? 'sesión' : 'sesiones'} de {l.serviceName}
            </li>
          ))}
        </ul>
      )}

      {combo.validityMonths != null && (
        <p className="font-sans text-body-sm text-on-primary/60">
          {combo.validityMonths} meses para usarlas
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-auto">
        <div className="flex flex-col">
          {hayAhorro && (
            <span
              data-testid="combo-subtotal"
              className="font-sans text-body-sm text-on-primary/50 line-through"
            >
              {pesos(combo.servicesSubtotal)}
            </span>
          )}
          <span className="font-serif text-headline-sm text-on-primary">
            {pesos(combo.finalAmount)}
          </span>
        </div>
        <Link
          href="/contacto"
          className="font-sans text-label-md text-on-primary underline underline-offset-4"
        >
          Consultar
        </Link>
      </div>
    </div>
  )
}
