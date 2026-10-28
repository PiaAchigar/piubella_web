import { describe, expect, it } from 'vitest'
import { enlaceDeWhatsApp, WHATSAPP_DEL_LOCAL } from '@/lib/whatsapp'

describe('enlaceDeWhatsApp', () => {
  it('deja sólo los dígitos: así viene el número de la configuración', () => {
    expect(enlaceDeWhatsApp('+54 9 11 3377-5014')).toBe('https://wa.me/5491133775014')
  })

  it('saca el 00 internacional, que wa.me no entiende', () => {
    expect(enlaceDeWhatsApp('00541133775014')).toBe('https://wa.me/541133775014')
  })

  it('agrega el texto codificado', () => {
    expect(enlaceDeWhatsApp('5491133775014', 'Hola, quiero info & precios')).toBe(
      'https://wa.me/5491133775014?text=Hola%2C%20quiero%20info%20%26%20precios',
    )
  })

  it('sin número usa el del local', () => {
    expect(enlaceDeWhatsApp(null)).toBe(`https://wa.me/${WHATSAPP_DEL_LOCAL}`)
    expect(enlaceDeWhatsApp('  ')).toBe(`https://wa.me/${WHATSAPP_DEL_LOCAL}`)
  })
})
