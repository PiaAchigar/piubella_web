import { NextRequest, NextResponse } from 'next/server'
import { confirmAppointment } from '@/lib/supabase/mutations'

// Siempre responder 200 a MercadoPago, incluso en errores,
// para que no reintente indefinidamente.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // MP envía múltiples tipos de notificaciones — solo procesar payments
    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ received: true })
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) return NextResponse.json({ received: true })

    // Consultar el pago a la API de MP para obtener external_reference
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${body.data.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!mpResponse.ok) return NextResponse.json({ received: true })

    const payment = await mpResponse.json()

    if (payment.status === 'approved' && payment.external_reference) {
      await confirmAppointment(payment.external_reference)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('MP webhook error:', error)
    return NextResponse.json({ received: true })
  }
}
