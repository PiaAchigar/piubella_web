import { Service } from '@/types'

/**
 * Tarjeta de "Nuestros Servicios Destacados". Vive aparte de
 * `servicios/service-card.tsx` porque el home usa otro diseño (más grande, con
 * elevación al hover), pero comparte con ella las MISMAS guardas de datos.
 *
 * `mapService` rellena la duración faltante con un 0, así que sin la guarda la
 * tarjeta anunciaba "0 min" — y 148 de los 213 servicios activos no tienen
 * duración cargada. Lo mismo con el precio: `Number('')` da 0 y salía "$0".
 * Un dato que no existe no se dibuja; inventarle un cero le dice a la clienta
 * que el servicio dura nada y sale nada.
 */
export function FeaturedServiceCard({ service }: { service: Service }) {
  const precio = service.unit_price !== '' ? Number(service.unit_price) : NaN
  const hayPrecio = Number.isFinite(precio) && precio > 0
  const hayDuracion = service.duration_minutes > 0

  return (
    <div className="asymmetric-item group reveal-up">
      <div className="bg-surface rounded-xl overflow-hidden elegant-shadow transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col">
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-headline-sm text-on-surface mb-3 font-medium">
            {service.name}
          </h3>
          {service.description && (
            <p className="font-sans text-body-md text-on-surface-variant mb-6 flex-grow">
              {service.description}
            </p>
          )}

          {/* Sin duración ni precio no se dibuja ni la línea divisoria: una
              franja con borde y nada adentro se lee como un error de la página. */}
          {(hayDuracion || hayPrecio) && (
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
              {hayDuracion ? (
                <span className="font-sans text-label-md text-on-surface-variant">
                  {service.duration_minutes} min
                </span>
              ) : (
                <span />
              )}
              {hayPrecio && (
                <span className="font-sans text-label-md text-primary font-bold">
                  ${precio.toLocaleString('es-AR')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
