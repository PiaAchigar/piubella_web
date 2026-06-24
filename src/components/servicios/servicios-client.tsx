'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Service, Training } from '@/types'
import { CategoryNode } from './types'
import { SidebarNav } from './sidebar-nav'
import { ServiceCard } from './service-card'
import { TrainingCard } from '@/components/capacitaciones/training-card'
import { TrainingJsonLd } from '@/components/capacitaciones/capacitaciones-section'

interface Props {
  tree: CategoryNode[]
  allServices: Service[]
  trainings: Training[]
}

// Renderiza una sección de categoría recursivamente con niveles de heading apropiados
function CategorySection({ node, depth }: { node: CategoryNode; depth: number }) {
  const headingEl = (() => {
    if (depth === 0) {
      return (
        <h2 className="font-serif text-display-lg-mobile text-on-surface border-b border-outline-variant/30 pb-4 mb-8">
          {node.name}
        </h2>
      )
    }
    if (depth === 1) {
      return (
        <h3 className="font-serif text-headline-md text-on-surface mt-12 mb-6">
          {node.name}
        </h3>
      )
    }
    return (
      <h4 className="font-sans text-label-md text-primary tracking-widest uppercase mt-8 mb-4">
        {node.name}
      </h4>
    )
  })()

  return (
    <div id={`cat-${node.id}`} className="scroll-mt-[110px]">
      {headingEl}

      {node.services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {node.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {node.children.map((child) => (
        <CategorySection key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export function ServiciosClient({ tree, allServices, trainings }: Props) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  const isSearching = query.trim().length > 0
  const showFlat = showAll || isSearching

  const displayedServices = useMemo(() => {
    if (!isSearching) return allServices
    const q = query.toLowerCase()
    return allServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description?.toLowerCase().includes(q) ?? false),
    )
  }, [query, allServices, isSearching])

  return (
    <main className="max-w-container mx-auto flex flex-col md:flex-row px-gutter py-12 gap-12">

      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-[100px] h-[calc(100vh-120px)] flex flex-col py-8 bg-surface-container-low rounded-r-xl elegant-shadow">
          <div className="px-6 mb-4">
            <h2 className="font-serif text-headline-sm text-primary">Servicios</h2>
            <p className="font-sans text-label-md text-on-surface-variant">Bienestar Integral</p>
          </div>

          {/* Buscador */}
          <div className="px-4 mb-3">
            <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2 border border-outline-variant/40 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-base">search</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (e.target.value.trim()) setShowAll(false)
                }}
                placeholder="Buscar servicio..."
                className="bg-transparent font-sans text-label-md text-on-surface placeholder:text-on-surface-variant outline-none w-full"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Botón "Todos los servicios" */}
          <div className="px-4 mb-2">
            <button
              onClick={() => { setShowAll(!showAll); setQuery('') }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-label-md transition-all ${
                showAll && !isSearching
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">apps</span>
              Todos los servicios
            </button>
          </div>

          {/* Nav por categorías — solo en modo categorías */}
          {!showFlat && (
            <>
              {/* Divisor fijo — h-0.5 = 2px de alto */}
              <div className="h-0.5 bg-outline-variant/30 mx-4 flex-shrink-0" />
              {/* Área scrolleable — flex-1 + min-h-0 para que el flex no rompa el scroll */}
              <div className="flex-1 min-h-0 overflow-y-auto sidebar-scroll">
                <SidebarNav tree={tree} hasTrainings={trainings.length > 0} />
              </div>
            </>
          )}

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
      <section className="flex-grow md:pb-24">
        <header className="max-w-2xl mb-16">
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

        {/* Vista plana: búsqueda o "todos" */}
        {showFlat && (
          <div className="space-y-6">
            <p className="font-sans text-label-md text-on-surface-variant">
              {isSearching
                ? displayedServices.length === 0
                  ? `Sin resultados para "${query}"`
                  : `${displayedServices.length} resultado${displayedServices.length !== 1 ? 's' : ''} para "${query}"`
                : `${allServices.length} servicios en total`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Vista por categorías — árbol recursivo */}
        {!showFlat && (
          <div className="space-y-16">
            {tree.map((node) => (
              <div key={node.id}>
                <CategorySection node={node} depth={0} />
                <div className="mt-8">
                  <Link
                    href="/agenda"
                    className="font-sans text-label-md text-primary border border-primary/30 px-6 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 inline-block"
                  >
                    Reservar en {node.name}
                  </Link>
                </div>
              </div>
            ))}
            {tree.length === 0 && (
              <p className="font-sans text-body-md text-on-surface-variant">
                No hay servicios disponibles en este momento.
              </p>
            )}

            {/* Capacitaciones — última "categoría" del listado */}
            {trainings.length > 0 && (
              <div id="cat-capacitaciones" className="scroll-mt-[110px]">
                <TrainingJsonLd trainings={trainings} />
                <h2 className="font-serif text-display-lg-mobile text-on-surface border-b border-outline-variant/30 pb-4 mb-8">
                  Capacitaciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trainings.map((t) => (
                    <TrainingCard key={t.id} training={t} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── MOBILE: FAB + Bottom Drawer ─────────────────────────────── */}
      <div className="md:hidden">

        {/* FAB — abre el drawer */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-surface-container-highest text-on-surface px-4 py-3 rounded-full shadow-lg border border-outline-variant/30 font-sans text-label-md hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300"
          aria-label="Abrir filtros"
        >
          <span className="material-symbols-outlined text-base">tune</span>
          Filtros
        </button>

        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
            drawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '82vh' }}
        >
          {/* Handle + header */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-outline-variant/20 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-outline-variant absolute top-3 left-1/2 -translate-x-1/2" />
            <p className="font-serif text-headline-sm text-on-surface mt-2">Servicios</p>
            <button
              onClick={closeDrawer}
              className="text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Contenido scrolleable del drawer */}
          <div className="overflow-y-auto sidebar-scroll flex flex-col gap-3 p-4" style={{ maxHeight: 'calc(82vh - 64px)' }}>

            {/* Buscador */}
            <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-3 py-3 border border-outline-variant/40 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-base">search</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (e.target.value.trim()) setShowAll(false)
                }}
                placeholder="Buscar servicio..."
                className="bg-transparent font-sans text-body-md text-on-surface placeholder:text-on-surface-variant outline-none w-full"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>

            {/* Botón "Todos" */}
            <button
              onClick={() => { setShowAll(!showAll); setQuery(''); closeDrawer() }}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-sans text-label-md transition-all ${
                showAll && !query.trim()
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-base">apps</span>
              Todos los servicios
            </button>

            {/* Divisor */}
            <div className="h-0.5 bg-outline-variant/30 mx-1" />

            {/* Nav de categorías */}
            <SidebarNav tree={tree} hasTrainings={trainings.length > 0} onLinkClick={closeDrawer} />

            {/* Espacio al final para que no quede pegado al borde */}
            <div className="h-4" />
          </div>
        </div>
      </div>
    </main>
  )
}
