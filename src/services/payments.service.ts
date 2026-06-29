import crypto from 'crypto'
import type {
  WompiWebhookBody,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentStatus,
} from './types'

function getWompiBaseUrl(): string {
  const publicKey = process.env.WOMPI_PUBLIC_KEY ?? ''
  return publicKey.startsWith('pub_test_')
    ? 'https://sandbox.wompi.co/v1'
    : 'https://production.wompi.co/v1'
}

function resolveNestedPath(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') break
    current = (current as Record<string, unknown>)[part]
  }
  if (current !== undefined && typeof current !== 'object') {
    return String(current)
  }
  current = (obj as Record<string, unknown>).data
  for (const part of parts) {
    if (current == null || typeof current !== 'object') break
    current = (current as Record<string, unknown>)[part]
  }
  return current !== undefined ? String(current) : ''
}

export function validateWompiSignature(body: WompiWebhookBody): boolean {
  const { signature, timestamp } = body

  if (!signature?.properties || !signature?.checksum) return false
  if (!timestamp) return false

  const eventsSecret = process.env.WOMPI_EVENTS_SECRET
  if (!eventsSecret) {
    console.error('[Wompi] WOMPI_EVENTS_SECRET is not set.')
    return false
  }

  let concatString = ''
  for (const prop of signature.properties) {
    concatString += resolveNestedPath(body as unknown as Record<string, unknown>, prop)
  }

  const valueToHash = concatString + timestamp + eventsSecret
  const computedHash = crypto.createHash('sha256').update(valueToHash).digest('hex')
  return computedHash === signature.checksum
}

export async function handleWompiWebhookEvent(
  body: WompiWebhookBody,
  updatePaymentFn: (
    paymentId: string,
    status: PaymentStatus,
    gatewayRef: string,
    paidAt: Date | null
  ) => Promise<void>
): Promise<{ received: boolean; success?: boolean }> {
  if (body.event !== 'transaction.updated') {
    return { received: true }
  }

  const tx = body.data?.transaction
  if (!tx) throw new Error('Transaction detail missing from webhook payload.')

  const { reference: paymentId, id: transactionId, status: rawStatus } = tx

  let newStatus: PaymentStatus = 'PENDING'
  let paidAt: Date | null = null

  if (rawStatus === 'APPROVED') {
    newStatus = 'PAID'
    paidAt = new Date()
  } else if (['DECLINED', 'VOIDED', 'ERROR'].includes(rawStatus)) {
    newStatus = 'FAILED'
  }

  await updatePaymentFn(paymentId, newStatus, transactionId, paidAt)
  return { received: true, success: true }
}

export async function buildWompiPaymentData(
  input: CreatePaymentInput
): Promise<CreatePaymentResult> {
  const publicKey = process.env.WOMPI_PUBLIC_KEY
  if (!publicKey) throw new Error('WOMPI_PUBLIC_KEY is not set.')

  const currency = 'COP'
  const amountInCents = Math.round(input.amount * 100)
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET

  let signature = ''
  if (integritySecret) {
    const raw = `${input.subscriptionId}${amountInCents}${currency}${integritySecret}`
    signature = crypto.createHash('sha256').update(raw).digest('hex')
  } else {
    console.warn('[Wompi] WOMPI_INTEGRITY_SECRET not configured. Integrity signature omitted.')
  }

  return {
    paymentId: input.subscriptionId,
    amountInCents,
    currency,
    signature,
    publicKey,
  }
}

export async function verifyPendingPaymentsWithGateway(
  pendingPaymentRefs: string[],
  updatePaymentFn: (
    paymentId: string,
    status: PaymentStatus,
    gatewayRef: string,
    paidAt: Date | null
  ) => Promise<void>
): Promise<{ success: boolean; updatedCount: number }> {
  const baseUrl = getWompiBaseUrl()
  let updatedCount = 0

  for (const paymentId of pendingPaymentRefs) {
    try {
      const res = await fetch(`${baseUrl}/transactions?reference=${paymentId}`)
      const json = await res.json() as { data?: Array<{ id: string; status: string; created_at: string }> }

      if (json.data && json.data.length > 0) {
        const sorted = json.data.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        const tx = sorted[0]

        let newStatus: PaymentStatus = 'PENDING'
        let paidAt: Date | null = null

        if (tx.status === 'APPROVED') {
          newStatus = 'PAID'
          paidAt = new Date()
        } else if (['DECLINED', 'VOIDED', 'ERROR'].includes(tx.status)) {
          newStatus = 'FAILED'
        }

        if (newStatus !== 'PENDING') {
          await updatePaymentFn(paymentId, newStatus, tx.id, paidAt)
          updatedCount++
        }
      }
    } catch (err) {
      console.error(`[Wompi] Error verifying payment ${paymentId}:`, err)
    }
  }

  return { success: true, updatedCount }
}
