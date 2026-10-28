/**
 * Los enlaces de WhatsApp de la web, armados en un solo lugar.
 *
 * El número llega de varias formas: la configuración de la empresa lo guarda
 * como "+54 9 11 3377-5014", y había enlaces escritos a mano con el 00
 * internacional. wa.me sólo acepta dígitos, sin 00 ni +: con cualquiera de
 * esas formas, el botón abría WhatsApp en un número que no existe.
 */

/** El del local, para cuando la configuración no responde o no lo tiene. */
export const WHATSAPP_DEL_LOCAL = '5491133775014'

export function enlaceDeWhatsApp(numero: string | null | undefined, texto?: string): string {
  const digitos = (numero ?? '').replace(/\D/g, '').replace(/^00/, '')
  const base = `https://wa.me/${digitos || WHATSAPP_DEL_LOCAL}`
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base
}
