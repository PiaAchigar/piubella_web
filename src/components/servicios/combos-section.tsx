import { fetchCombos } from '@/lib/worker-api'
import { ComboCard } from './combo-card'

export async function CombosSection() {
  let combos = []
  try {
    combos = await fetchCombos()
  } catch {
    // Si el Worker no responde, /servicios tiene que renderizar igual.
    return null
  }

  // Sin combos no se dibuja ni el título: un encabezado con el vacío abajo se
  // ve como un error de la página.
  if (combos.length === 0) return null

  return (
    <section className="bg-primary overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-gutter py-section-md">
        <div className="mb-10">
          <span className="font-sans text-label-md text-on-primary/60 tracking-widest uppercase block">
            Paquetes de sesiones
          </span>
          <h2 className="font-serif text-display-lg-mobile md:text-display-lg text-on-primary font-normal">
            Combos
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {combos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>
    </section>
  )
}
