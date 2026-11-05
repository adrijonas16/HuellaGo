'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail } from 'lucide-react';
import { Input } from '@/components/ui';
import { AuthShell } from '@/components/layout/auth-shell';
import { api } from '@/services/api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_RE.test(email)) return;
    setSending(true);
    // Si el backend no responde igual mostramos la confirmación: por seguridad
    // nunca revelamos si un email existe o no.
    await api.post('/auth/forgot-password', { email }).catch(() => null);
    setSending(false);
    setSent(true);
  }

  return (
    <AuthShell title="Recupera tu acceso" subtitle="Te enviaremos un enlace para crear una contraseña nueva.">
      {sent ? (
        <div className="bg-white rounded-card p-6 text-center animate-bounce-in">
          <span className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
            <Mail size={28} />
          </span>
          <h2 className="font-heading font-bold text-dark text-xl mt-4">Revisa tu correo</h2>
          <p className="text-bark mt-2">
            Si <strong className="text-dark">{email}</strong> tiene una cuenta, recibirás el enlace en unos minutos. Mira también en spam.
          </p>
          <button onClick={() => setSent(false)} className="mt-5 text-sm text-primary font-bold link-route">Usar otro email</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Input
            id="email"
            label="Email de tu cuenta"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={touched && !EMAIL_RE.test(email) ? 'Escribe un email válido' : ''}
          />
          <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg py-4 rounded-full shadow-button boop-btn disabled:opacity-60">
            {sending && <Loader2 size={18} className="animate-spin" />} Enviar enlace
          </button>
        </form>
      )}
      <p className="mt-8 text-center text-bark">
        ¿La recordaste? <Link href="/login" className="text-primary font-bold link-route">Volver a ingresar</Link>
      </p>
    </AuthShell>
  );
}
