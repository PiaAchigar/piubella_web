import Link from 'next/link'
import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded border border-outline-variant shadow-sm bg-surface-container hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-headline-md font-bold text-on-surface">
          {service.name}
        </h3>
        <p className="font-sans text-body-md text-on-surface-variant">
          {service.description}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-sans text-body-md font-semibold text-primary">
            ${service.unit_price}
          </span>
          <span className="font-sans text-body-sm text-on-surface-variant">
            {service.duration_minutes} min
          </span>
        </div>
      </div>

      <Link
        href={`/agenda?service=${service.id}`}
        className="mt-2 px-4 py-2 bg-primary text-white font-sans font-medium rounded transition-colors hover:bg-primary-container text-center"
      >
        Reservar
      </Link>
    </div>
  )
}
