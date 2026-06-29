import { NextRequest, NextResponse } from 'next/server'
import { validateWompiSignature, handleWompiWebhookEvent } from '@/services/payments.service'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { PaymentStatus, WompiWebhookBody } from '@/services/types'

async function updatePayment(
  paymentId: string,
  status: PaymentStatus,
  gatewayRef: string,
  paidAt: Date | null
) {
  const { error } = await supabaseAdmin
    .from('payments')
    .update({
      payment_status: status,
      gateway_reference: gatewayRef,
      paid_at: paidAt?.toISOString() ?? null,
    })
    .eq('id', paymentId)

  if (error) {
    throw new Error(`Failed to update payment ${paymentId}: ${error.message}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WompiWebhookBody

    const isValid = validateWompiSignature(body)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
    }

    const result = await handleWompiWebhookEvent(body, updatePayment)
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error('[Wompi Webhook] Error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
