const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

/**
 * Bloque de precio compartido por combo, pack y promo: la suma de las partes
 * tachada (sólo si es mayor que el final), el precio final grande y, si hay
 * precio en efectivo distinto del final, la etiqueta chica de abajo (misma
 * que usa training-card).
 */
export function PrecioConAhorro({
  suma,
  final,
  efectivo,
  claro,
  testIdSuma,
}: {
  suma?: number | null
  final: number
  efectivo?: number | null
  claro: boolean
  testIdSuma?: string
}) {
  const hayAhorro = suma != null && suma > final
  const hayEfectivo = efectivo != null && efectivo !== final

  return (
    <div className="flex flex-col">
      {hayAhorro && (
        <span
          data-testid={testIdSuma}
          className={`font-sans text-body-sm line-through ${
            claro ? 'text-on-surface-variant' : 'text-on-primary/50'
          }`}
        >
          {pesos(suma)}
        </span>
      )}
      <span
        className={`font-serif text-headline-sm ${claro ? 'text-on-surface' : 'text-on-primary'}`}
      >
        {pesos(final)}
      </span>
      {hayEfectivo && (
        <span
          className={`font-sans text-label-sm mt-1 ${
            claro ? 'text-on-surface-variant' : 'text-on-primary/60'
          }`}
        >
          Precio efectivo{' '}
          <span className={`font-medium ${claro ? 'text-primary' : 'text-on-primary'}`}>
            {pesos(efectivo)}
          </span>
        </span>
      )}
    </div>
  )
}
