import Link from 'next/link'
import { WorkerZonaDepilacion } from '@/lib/worker-api'

const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

/** Una zona de depilación que se puede hacer suelta, con el precio de una zona sola. */
export function ZonaCard({ zona }: { zona: WorkerZonaDepilacion }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4">
      <span className="font-sans text-label-md text-primary uppercase tracking-widest text-xs">
        Zona
      </span>

      <h3 className="font-serif text-headline-sm text-on-surface font-normal leading-snug">
        {zona.nombre}
      </h3>

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40 mt-auto">
        <div className="flex flex-col font-sans text-body-md text-on-surface">
          {zona.precioMujer > 0 && <span>Mujer: {pesos(zona.precioMujer)}</span>}
          {zona.precioHombre > 0 && <span>Hombre: {pesos(zona.precioHombre)}</span>}
        </div>
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
