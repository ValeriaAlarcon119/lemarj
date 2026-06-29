import { NextRequest, NextResponse } from 'next/server'
import { buildWompiPaymentData } from '@/services/payments.service'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import type { PaymentType } from '@/services/types'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
    }

    const body = await req.json() as {
      subscriptionId: string
      amount: number
      paymentType: PaymentType
    }

    if (!body.subscriptionId || !body.amount || !body.paymentType) {
      return NextResponse.json({ error: 'Datos incompletos.' }, { status: 400 })
    }

    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('id, user_id')
      .eq('id', body.subscriptionId)
      .single()

    if (subError || !subscription) {
      return NextResponse.json({ error: 'Suscripción no encontrada.' }, { status: 404 })
    }

    if (subscription.user_id !== user.id) {
      return NextResponse.json({ error: 'No tienes permisos para pagar esta suscripción.' }, { status: 403 })
    }

    const { error: insertError } = await supabaseAdmin.from('payments').insert({
      user_id: user.id,
      subscription_id: body.subscriptionId,
      payment_type: body.paymentType,
      amount: body.amount,
      currency: 'COP',
      payment_status: 'PENDING',
      gateway_name: 'wompi',
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    const { data: newPayment } = await supabaseAdmin
      .from('payments')
      .select('id')
      .eq('user_id', user.id)
      .eq('subscription_id', body.subscriptionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const paymentData = await buildWompiPaymentData({
      subscriptionId: newPayment?.id ?? body.subscriptionId,
      userId: user.id,
      amount: body.amount,
      paymentType: body.paymentType,
    })

    return NextResponse.json(paymentData, { status: 200 })
  } catch (err) {
    console.error('[Payments] Error creating transaction:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
