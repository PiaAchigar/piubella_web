import { describe, it, expect, vi, afterEach } from 'vitest'
import { siFalla } from '@/lib/si-falla'

afterEach(() => {
  vi.restoreAllMocks()
})

const revienta = async (): Promise<never> => {
  throw new Error('Worker 500: Internal server error')
}

describe('siFalla', () => {
  it('cuando todo anda, devuelve lo cargado y no toca el valor por defecto', async () => {
    expect(await siFalla('los combos', async () => [1, 2, 3], [])).toEqual([1, 2, 3])
  })

  it('no vuelve a tirar el error: la página tiene que seguir en pie', async () => {
    expect(await siFalla('los combos', revienta, [])).toEqual([])
  })

  it('el valor por defecto no tiene por qué ser una lista', async () => {
    // El footer cae a `null` y el botón de WhatsApp a un teléfono fijo.
    expect(await siFalla('la configuración', revienta, null)).toBeNull()
    expect(await siFalla('el whatsapp', revienta, '5491133775014')).toBe('5491133775014')
  })

  it('DEJA RASTRO del error en el log del servidor', async () => {
    // Éste es el test que importa. Antes el `catch` vacío hacía que un 500 del
    // Worker y un catálogo legítimamente vacío se vieran idénticos, y el
    // resultado quedaba congelado en la página estática durante diez minutos.
    // Pasó de verdad el 2026-09-22: GET /api/agenda/combos devolvía 500 y en
    // la web simplemente no había combos, sin una sola línea en ningún log.
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    await siFalla('los combos', revienta, [])
    expect(log).toHaveBeenCalledOnce()
    const texto = log.mock.calls[0]!.join(' ')
    expect(texto).toContain('los combos')
    expect(texto).toContain('Worker 500')
  })

  it('cuando no falla nada, no ensucia el log', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    await siFalla('los combos', async () => [], [])
    expect(log).not.toHaveBeenCalled()
  })
})
