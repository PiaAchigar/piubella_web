import { fetchCategoryTree, fetchServices, WorkerCategory } from '@/lib/worker-api'
import { Service } from '@/types'
import Link from 'next/link'
import { SidebarNav } from '@/components/servicios/sidebar-nav'

interface SubSection {
  id: string
  name: string
  services: Service[]
}

interface ParentSection {
  id: string
  name: string
  subcategories: SubSection[]  // cuando tiene hijos
  directServices: Service[]    // cuando no tiene hijos
}

async function getParentSections(): Promise<ParentSection[]> {
  try {
    const tree = await fetchCategoryTree()

    const visibleTree = tree.filter((p) => !p.name.includes('Eje'))

    const sections = await Promise.all(
      visibleTree.map(async (parent: WorkerCategory) => {
        const visibleChildren = parent.children.filter((c) => !c.name.includes('Eje'))

        if (visibleChildren.length > 0) {
          const subcategories = await Promise.all(
            visibleChildren.map(async (child) => ({
              id: child.id,
              name: child.name,
              services: await fetchServices({ categoryId: child.id }),
            })),
          )
          return {
            id: parent.id,
            name: parent.name,
            subcategories: subcategories.filter((s) => s.services.length > 0),
            directServices: [] as Service[],
          }
        } else {
          const directServices = await fetchServices({ categoryId: parent.id })
          return {
            id: parent.id,
            name: parent.name,
            subcategories: [] as SubSection[],
            directServices,
          }
        }
      }),
    )

    return sections.filter(
      (s) => s.subcategories.length > 0 || s.directServices.length > 0,
    )
  } catch {
    return []
  }
}

function ServiceCard({ service }: { service: Service }) {
  const price = service.unit_price !== '' ? Number(service.unit_price) : NaN
  const hasPrice = !isNaN(price) && price > 0
  const hasDuration = service.duration_minutes > 0

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl elegant-shadow border border-surface-container hover:border-primary/20 transition-all flex flex-col">
      <h5 className="font-serif text-headline-sm mb-3 text-on-surface">{service.name}</h5>
      {service.description && (
        <p className="font-sans text-body-md text-on-surface-variant leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>
      )}
      {(hasDuration || hasPrice) && (
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
          {hasDuration ? (
            <span className="font-sans text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {service.duration_minutes} min
            </span>
          ) : (
            <span />
          )}
          <span className="font-sans text-label-md text-primary font-bold">
            {hasPrice ? `$${price.toLocaleString('es-AR')}` : '–'}
          </span>
        </div>
      )}
    </div>
  )
}

export default async function Servicios() {
  const sections = await getParentSections()

  return (
    <main className="max-w-container mx-auto flex flex-col md:flex-row px-gutter py-12 gap-12">

      {/* Sidebar — solo categorías padre */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-[100px] h-[calc(100vh-120px)] flex flex-col py-8 space-y-2 bg-surface-container-low rounded-r-xl elegant-shadow">
          <div className="px-6 mb-8">
            <h2 className="font-serif text-headline-sm text-primary">Servicios</h2>
            <p className="font-sans text-label-md text-on-surface-variant">Bienestar Integral</p>
          </div>
          <SidebarNav
            sections={sections.map((s) => ({
              id: s.id,
              name: s.name,
              subcategories: s.subcategories.map((sub) => ({ id: sub.id, name: sub.name })),
            }))}
          />
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

      {/* Contenido */}
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
          <div key={section.id} id={`cat-${section.id}`} className="pt-4 space-y-12">

            {/* Título de categoría padre */}
            <h2 className="font-serif text-display-lg-mobile text-on-surface border-b border-outline-variant/30 pb-4">
              {section.name}
            </h2>

            {/* Con subcategorías → agrupadas como h4 */}
            {section.subcategories.length > 0 && section.subcategories.map((sub) => (
              <div key={sub.id} id={`sub-${sub.id}`} className="space-y-6">
                <h4 className="font-sans text-label-md text-primary tracking-widest uppercase">
                  {sub.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sub.services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ))}

            {/* Sin subcategorías → servicios directos */}
            {section.directServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.directServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            <Link
              href="/agenda"
              className="font-sans text-label-md text-primary border border-primary/30 px-6 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 inline-block"
            >
              Reservar en {section.name}
            </Link>
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
