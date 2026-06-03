import { HeroSection } from '@/components/ui/hero-section'
import { ServiceCard } from '@/components/ui/service-card'
import { MOCK_SERVICES } from '@/lib/mock-data'

export default function Servicios() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        title="Todos Nuestros Servicios"
        description="Descubre nuestro catálogo completo de servicios de belleza y bienestar"
        backgroundColor="bg-secondary-container"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
