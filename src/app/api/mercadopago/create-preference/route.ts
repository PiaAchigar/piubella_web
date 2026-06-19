import { NextRequest, NextResponse } from 'next/server'

// Importar mercadopago dinámicamente para evitar error si el paquete no está instalado aún
// Instalar con: pnpm add mercadopago
let MercadoPagoConfig: typeof import('mercadopago').MercadoPagoConfig
let Preference: typeof import('mercadopago').Preference

async function getMP() {
  if (!MercadoPagoConfig) {
    const mp = await import('mercadopago')
    MercadoPagoConfig = mp.MercadoPagoConfig
    Preference = mp.Preference
  }
  return { MercadoPagoConfig, Preference }
}

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!accessToken) {
    return NextResponse.json(
      { success: false, error: 'MercadoPago no configurado' },
      { status: 503 },
    )
  }

  try {
    const { appointmentId, serviceName, amount } = await request.json()
    const { MercadoPagoConfig: Config, Preference: Pref } = await getMP()

    const mp = new Config({ accessToken })
    const preference = new Pref(mp)

    const result = await preference.create({
      body: {
        items: [
          {
            id: appointmentId,
            title: `Seña — ${serviceName}`,
            quantity: 1,
            unit_price: Number(amount),
            currency_id: 'ARS',
          },
        ],
        external_reference: appointmentId,
        back_urls: {
          success: `${baseUrl}/agenda/confirmacion?status=success&id=${appointmentId}`,
          failure: `${baseUrl}/agenda/confirmacion?status=failure&id=${appointmentId}`,
          pending: `${baseUrl}/agenda/confirmacion?status=pending&id=${appointmentId}`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      },
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: result.init_point,
      preferenceId: result.id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear preferencia de pago'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
