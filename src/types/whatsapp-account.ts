// ============================================================
// LEMARJ — Multi-Tenant WhatsApp Integration Types
// Tabla: whatsapp_accounts (separada de profiles para seguridad)
// Cada fila = 1 WABA de 1 cliente del SaaS
// ============================================================

export interface WhatsAppAccount {
  id: string;                          // UUID — Primary Key
  business_id: string;                 // FK → profiles.id (el cliente del SaaS)
  
  // Datos de la WABA del cliente final
  waba_id: string;                     // WhatsApp Business Account ID (de Meta)
  phone_number_id: string;             // ID del número registrado en Meta
  display_phone_number: string;        // Número visible (ej: +573001234567)
  display_name: string;                // Nombre del perfil en WhatsApp

  // Tokens — NUNCA se exponen en el frontend ni en logs
  // access_token_encrypted: string    // AES-256-GCM cifrado en la DB
  // (se usa una columna text en Supabase con RLS ultra-restrictivo)
  
  // Estado de la conexión
  status: 'active' | 'inactive' | 'error' | 'pending';
  webhook_verified: boolean;
  
  // Metadatos OAuth
  connected_at: string;               // ISO timestamp
  token_expires_at: string | null;    // null = token de larga duración
  
  created_at: string;
  updated_at: string;
}

// Payload que llega del Embedded Signup de Meta
export interface MetaEmbeddedSignupPayload {
  code: string;                       // Authorization code (caduca en ~5 min)
  waba_id: string;                    // WABA ID seleccionada por el usuario
}

// Respuesta de Meta al intercambiar el code por token
export interface MetaTokenResponse {
  access_token: string;
  token_type: 'bearer';
}

// Respuesta al registrar el número de teléfono como webhook
export interface MetaPhoneNumberInfo {
  id: string;                         // phone_number_id
  display_phone_number: string;
  verified_name: string;
}
