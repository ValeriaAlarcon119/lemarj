export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'
export type PaymentType = 'SUBSCRIPTION' | 'ONE_TIME' | 'PAY_PER_USE'
export type TransactionType = 'increase' | 'decrease'

export interface WompiSignaturePayload {
  checksum: string
  properties: string[]
}

export interface WompiWebhookBody {
  event: string
  timestamp: number
  signature: WompiSignaturePayload
  data?: {
    transaction?: {
      id: string
      reference: string
      status: string
    }
  }
}

export interface CreatePaymentInput {
  subscriptionId: string
  userId: string
  amount: number
  paymentType: PaymentType
}

export interface CreatePaymentResult {
  paymentId: string
  amountInCents: number
  currency: string
  signature: string
  publicKey: string
}

export interface ApiResponse<T = boolean> {
  data?: T
  successMessage?: string
  errorMessage?: string
  errorTitle?: string
}

export interface UpdateUserData {
  verified?: boolean
  status?: 'active' | 'inactive'
  role?: string
  full_name?: string
  email?: string
}

export interface UpdateUserParams {
  userId: string
  data: UpdateUserData
  userEmail?: string | null
  userName?: string | null
}

export interface CreditTransactionData {
  organization_id: string
  amount: number
  transaction_type: TransactionType
  reason: string
  notes?: string | null
  author_id: string
  created_at?: string
}

export interface UpdateProjectCostData {
  project_id: string
  new_cost: number
  organization_id: string
  author_id: string
  notes?: string
}
