/**
 * Corre una carga de datos del Worker y, si falla, sigue adelante con un valor
 * por defecto — pero dejando el error escrito en el log del servidor.
 *
 * **Por qué existe.** Las páginas que se arman en el servidor cargaban sus
 * datos con `fetchLoQueSea().catch(() => [])` o un `try/catch` vacío. La
 * tolerancia es deliberada y se queda: si el Worker no contesta, la clienta
 * tiene que seguir viendo la página, no una pantalla de error. Lo que estaba
 * mal era que se tragaban el error **sin dejar rastro**, y entonces una caída
 * y un catálogo legítimamente vacío se veían idénticos desde afuera.
 *
 * Eso costó caro el 2026-09-22: `GET /api/agenda/combos` devolvía 500 por un
 * problema de binding, en la web simplemente no había combos, y como la página
 * es estática el resultado vacío quedaba congelado diez minutos. No había una
 * sola línea en ningún log que lo dijera.
 *
 * `console.error` acá corre en el servidor —son Server Components—, así que
 * termina en los logs de la función en Vercel.
 *
 * El valor por defecto va explícito en cada llamada, y no escondido acá
 * adentro, porque es lo que la clienta va a ver cuando la cosa falle.
 */
export async function siFalla<T>(
  queSeEstabaCargando: string,
  cargar: () => Promise<T>,
  porDefecto: T,
): Promise<T> {
  try {
    return await cargar()
  } catch (error) {
    // El texto dice "la página sigue en pie" a propósito: quien lea el log
    // tiene que entender de una que esto es una sección degradada y no una
    // caída, sin ir a buscar el código.
    console.error(
      `[web] no se pudo cargar ${queSeEstabaCargando}; la página sigue en pie, esa parte va con el valor por defecto:`,
      error,
    )
    return porDefecto
  }
}
