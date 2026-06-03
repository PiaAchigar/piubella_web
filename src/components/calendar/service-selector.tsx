'use client'

import { Service } from '@/types'
import { Card } from '@/components/ui/card'

interface ServiceSelectorProps {
  services: Service[]
  selected?: Service
  onSelect: (service: Service) => void
}

export function ServiceSelector({
  services,
  selected,
  onSelect,
}: ServiceSelectorProps) {
  if (services.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-on-surface-variant">No hay servicios disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          data-selected={selected?.id === service.id}
          className="text-left transition-all"
        >
          <Card
            className={`cursor-pointer transition-all ${
              selected?.id === service.id
                ? 'border-2 border-primary shadow-lg'
                : 'border border-outline-variant hover:shadow-md'
            }`}
          >
            <div className="p-6">
              <h3 className="font-serif text-headline-sm text-on-surface mb-2">
                {service.name}
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant mb-4">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-body-md font-semibold text-primary">
                    ${parseFloat(service.unit_price).toFixed(2)}
                  </span>
                  <span className="font-sans text-label-md text-on-surface-variant">
                    {service.duration_minutes} min
                  </span>
                </div>
                <div
                  className={`px-4 py-2 rounded font-sans text-label-md transition-colors ${
                    selected?.id === service.id
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {selected?.id === service.id ? '✓ Seleccionado' : 'Seleccionar'}
                </div>
              </div>
            </div>
          </Card>
        </button>
      ))}
    </div>
  )
}
