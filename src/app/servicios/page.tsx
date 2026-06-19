import { fetchServices, fetchCategories } from '@/lib/worker-api'
import { Service } from '@/types'
import Link from 'next/link'

interface CategorySection {
  id: string
  name: string
  services: Service[]
}

async function getSectionsWithFilter(): Promise<CategorySection[]> {
  try {
    const categories = await fetchCategories()

    const sections = await Promise.all(
      categories.map(async (cat) => ({
        id: cat.id,
        name: cat.name,
        services: await fetchServices({ categoryId: cat.id }),
      })),
    )

    return sections.filter((s) => s.services.length > 0)
  } catch {
    return []
  }
}

export default async function Servicios() {
  const sections = await getSectionsWithFilter()

  return (
    <main className="max-w-container mx-auto flex flex-col md:flex-row px-gutter py-12 gap-12">
      {/* Sidebar de navegación */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-[100px] h-[calc(100vh-120px)] flex flex-col py-8 space-y-2 bg-surface-container-low rounded-r-xl elegant-shadow">
          <div className="px-6 mb-8">
            <h2 className="font-serif text-headline-sm text-primary">Servicios</h2>
            <p className="font-sans text-label-md text-on-surface-variant">Bienestar Integral</p>
          </div>
          <nav className="flex flex-col space-y-1 overflow-y-auto">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#cat-${section.id}`}
                className="p-3 mx-2 my-1 flex items-center gap-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all"
              >
                <span className="material-symbols-outlined text-outline">spa</span>
                <span className="font-sans text-label-md">{section.name}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto px-6 pt-4 border-t border-outline-variant/30">
            <Link
              href="/agenda"
              className="text-primary italic font-serif text-body-md flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              Reservar turno{' '}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </aside>

      <section className="flex-grow space-y-24 md:pb-24">
        <header className="max-w-2xl">
          <span className="text-primary font-sans text-label-md tracking-widest uppercase mb-4 block">
            Nuestras Experiencias
          </span>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg mb-6">
            Equilibrio entre cuerpo, mente y estética.
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
            En Piu Bella, diseñamos cada tratamiento como un ritual de bienestar. Utilizamos técnicas
            avanzadas y un enfoque orgánico para resaltar tu belleza natural mientras fortalecemos tu
            núcleo vital.
          </p>
        </header>

        {sections.map((section) => (
          <div key={section.id} id={`cat-${section.id}`} className="pt-4">
            <h3 className="font-serif text-headline-md mb-8 text-on-surface">{section.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-surface-container-lowest p-8 rounded-xl elegant-shadow border border-surface-container hover:border-primary/20 transition-all flex flex-col"
                >
                  <h4 className="font-serif text-headline-sm mb-3 text-on-surface">
                    {service.name}
                  </h4>
                  {service.description && (
                    <p className="font-sans text-body-md text-on-surface-variant leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
                    <span className="font-sans text-label-md text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {service.duration_minutes} min
                    </span>
                    <span className="font-sans text-label-md text-primary font-bold">
                      ${Number(service.unit_price).toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/agenda"
                className="font-sans text-label-md text-primary border border-primary/30 px-6 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 inline-block"
              >
                Reservar en {section.name}
              </Link>
            </div>
          </div>
        ))}

        {sections.length === 0 && (
          <p className="font-sans text-body-md text-on-surface-variant">
            No hay servicios disponibles en este momento.
          </p>
        )}
      </section>
    </main>
  )
}
