'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui';
import { PasswordInput } from '@/components/ui/password-input';
import { AuthShell } from '@/components/layout/auth-shell';
import { useAuth } from '@/hooks';
import { useAppStore } from '@/lib/store';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const notify = useAppStore((s) => s.notify);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const emailError = touched && !EMAIL_RE.test(email) ? 'Escribe un email válido, por ejemplo luna@correo.com' : '';
  const passError = touched && password.length < 6 ? 'La contraseña tiene al menos 6 caracteres' : '';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    setError('');
    if (!EMAIL_RE.test(email) || password.length < 6) return;
    try {
      await login(email, password);
      const { isDemo, user } = useAuth.getState();
      notify(isDemo ? `Hola, ${user?.firstName}. Entraste en modo demo (sin servidor).` : `Hola de nuevo, ${user?.firstName}`, { tone: 'success' });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos iniciar sesión. Inténtalo otra vez.');
    }
  }

  return (
    <AuthShell title="Hola de nuevo" subtitle="Ingresa para ver tus mascotas, favoritos y eventos.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input id="email" label="Email" type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
        <div>
          <PasswordInput id="password" label="Contraseña" autoComplete="current-password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} error={passError} />
          <div className="text-right mt-2">
            <Link href="/forgot-password" className="text-sm text-primary font-semibold link-route">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-error bg-error/5 rounded-xl px-4 py-3">{error}</p>}

        <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg py-4 rounded-full shadow-button boop-btn hover:bg-primary-dark disabled:opacity-60">
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isLoading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-8 text-center text-bark">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/register" className="text-primary font-bold link-route">Crear cuenta gratis</Link>
      </p>
    </AuthShell>
  );
}
