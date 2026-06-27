"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al iniciar sesión');
      }

      // Guardamos el rol para que el middleware lo lea (en una app real usaríamos httpOnly cookies)
      document.cookie = `userRole=${data.user.role}; path=/; max-age=86400;`;

      // Redirección inteligente basada en Roles (RBAC)
      if (data.user.role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/workspace');
      }

    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 text-center">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-900 dark:text-white"
            required
          />
        </div>

        {status === 'error' && (
          <div className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all"
        >
          {status === 'loading' ? 'Verificando...' : 'Ingresar al sistema'}
        </button>
      </form>
    </div>
  );
}
