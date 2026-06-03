import { HeroSection } from '@/components/ui/hero-section'

export default function Nosotros() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        title="Un poco de nuestra Historia"
        description="Descubre nuestro catálogo completo de servicios de belleza y bienestar"
        backgroundColor="bg-secondary-container"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
          </div>
        </div>
      </section>
    </div>
  )
}
