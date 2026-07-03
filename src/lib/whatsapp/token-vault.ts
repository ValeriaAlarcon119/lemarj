// ============================================================
// LEMARJ — WhatsApp Token Vault Service
// Cifra y descifra los access_tokens de cada tenant con AES-256-GCM
// NUNCA se exporta el token en texto plano al cliente
// ============================================================

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.WHATSAPP_TOKEN_ENCRYPTION_KEY!;
// Debe ser exactamente 32 bytes (256 bits) en hex: openssl rand -hex 32

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  // Solo se valida en runtime del servidor, nunca en el cliente
  if (typeof window === 'undefined') {
    console.error('[LEMARJ TokenVault] WHATSAPP_TOKEN_ENCRYPTION_KEY debe ser 64 caracteres hex (32 bytes).');
  }
}

const ALGORITHM = 'aes-256-gcm';

/**
 * Cifra un access_token antes de guardarlo en Supabase.
 * Retorna: iv:authTag:ciphertext (todo en hex, separado por ":")
 */
export function encryptToken(plainToken: string): string {
  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  const iv = randomBytes(12); // 96 bits recomendado para GCM
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plainToken, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Descifra un token almacenado en Supabase.
 * Input: iv:authTag:ciphertext (el formato de encryptToken)
 */
export function decryptToken(encryptedToken: string): string {
  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  const parts = encryptedToken.split(':');
  
  if (parts.length !== 3) {
    throw new Error('[LEMARJ TokenVault] Formato de token cifrado inválido.');
  }
  
  const [ivHex, authTagHex, ciphertext] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
