"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CheckCircle2, Loader2, AlertCircle, ExternalLink } from "lucide-react";

// ============================================================
// LEMARJ — WhatsApp Embedded Signup Component
// Permite a los clientes conectar su propio número de WhatsApp
// sin intervención manual de LEMARJ.
// ============================================================

interface WhatsAppConnectProps {
  userToken: string;          // JWT del usuario autenticado en LEMARJ
  onSuccess?: (phone: string, name: string) => void;
  onError?: (error: string) => void;
}

type ConnectStatus = 'idle' | 'loading' | 'success' | 'error';

declare global {
  interface Window {
    FB?: {
      init: (config: object) => void;
      login: (
        callback: (response: { authResponse?: { code?: string } }) => void,
        options: object
      ) => void;
    };
  }
}

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID!;

export function WhatsAppConnect({ userToken, onSuccess, onError }: WhatsAppConnectProps) {
  const [status, setStatus] = useState<ConnectStatus>('idle');
  const [message, setMessage] = useState('');
  const [connectedPhone, setConnectedPhone] = useState('');

  // Inyectar el SDK de Facebook si no está cargado
  const loadFacebookSDK = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (window.FB) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/es_LA/sdk.js';
      script.async = true;
      script.onload = () => {
        window.FB?.init({
          appId: META_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v20.0',
        });
        resolve();
      };
      document.body.appendChild(script);
    });
  }, []);

  const handleConnect = async () => {
    setStatus('loading');
    setMessage('Cargando el asistente de Meta...');

    try {
      await loadFacebookSDK();

      // Abrir el Embedded Signup de Meta
      window.FB?.login(
        async (response) => {
          const code = response.authResponse?.code;
          if (!code) {
            setStatus('error');
            setMessage('Conexión cancelada o denegada por el usuario.');
            onError?.('Cancelled');
            return;
          }

          setMessage('Conectando tu número de WhatsApp con LEMARJ...');

          // Enviar el code al backend de LEMARJ para el intercambio de tokens
          const res = await fetch('/api/whatsapp/connect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              code,
              waba_id: response.authResponse?.code, // Meta devuelve waba_id en el authResponse extendido
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            setStatus('error');
            setMessage(data.error || 'Error al conectar. Intenta de nuevo.');
            onError?.(data.error);
            return;
          }

          setStatus('success');
          setConnectedPhone(data.phone_number);
          setMessage(data.message);
          onSuccess?.(data.phone_number, data.display_name);
        },
        {
          config_id: process.env.NEXT_PUBLIC_META_CONFIG_ID, // WhatsApp Embedded Signup Config ID
          response_type: 'code',
          override_default_response_type: true,
          extras: {
            setup: {},
            featurize: { messaging_product: 'whatsapp' },
          },
        }
      );
    } catch (err: any) {
      setStatus('error');
      setMessage('Error inesperado. Por favor recarga e intenta de nuevo.');
      onError?.(err.message);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <p className="text-zinc-400 text-sm leading-relaxed">
              Conecta el número de WhatsApp Business de tu empresa para activar el agente de IA 24/7.
              Necesitarás acceso de administrador a tu cuenta de Meta Business.
            </p>
            <button
              onClick={handleConnect}
              className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 0 25px rgba(37, 211, 102, 0.3)',
                color: '#fff',
              }}
            >
              <Smartphone className="w-5 h-5" />
              Conectar WhatsApp Business
            </button>
            <a
              href="https://business.facebook.com/wa/manage/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              ¿No tienes cuenta de Meta Business? Créala aquí
            </a>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center gap-4 py-6"
          >
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
            <p className="text-zinc-300 font-medium text-sm">{message}</p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(37, 211, 102, 0.15)', border: '2px solid rgba(37, 211, 102, 0.4)' }}>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-black text-lg">{connectedPhone}</p>
              <p className="text-emerald-400 text-sm font-bold mt-1">Agente IA activado y operativo 24/7</p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={() => { setStatus('idle'); setMessage(''); }}
              className="w-full h-12 rounded-2xl border border-white/10 text-zinc-300 font-bold text-sm hover:bg-white/5 transition-colors"
            >
              Intentar de nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
