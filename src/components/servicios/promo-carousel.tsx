'use client'

import { useRef, useState, useEffect } from 'react'
import { WorkerPromotion } from '@/lib/worker-api'
import { PromoCard } from './promo-card'

export function PromoCarousel({ promos }: { promos: WorkerPromotion[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = trackRef.current
    el?.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el?.removeEventListener('scroll', updateScrollState)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'left' ? -296 : 296, behavior: 'smooth' })
  }

  if (promos.length === 0) return null

  return (
    <div className="relative">
      {/* Botón prev */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-on-primary flex items-center justify-center transition-all disabled:opacity-0 hidden md:flex"
        aria-label="Anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {promos.map((promo) => (
          <div key={promo.id} style={{ scrollSnapAlign: 'start' }}>
            <PromoCard promo={promo} />
          </div>
        ))}
        {/* Padding final para que la última card no quede pegada al borde */}
        <div className="flex-shrink-0 w-2" />
      </div>

      {/* Botón next */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-on-primary flex items-center justify-center transition-all disabled:opacity-0 hidden md:flex"
        aria-label="Siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  )
}
