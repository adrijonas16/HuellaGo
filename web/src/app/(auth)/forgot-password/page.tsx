'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mail } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-cream paw-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-button">
              <span className="text-white text-2xl">🐾</span>
            </div>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-dark">Recuperar contrasena</h1>
          <p className="text-bark mt-2">Te enviaremos un link para crear una nueva contrasena</p>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          {sent ? (
            <div className="text-center py-4 animate-bounce-in">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-success" />
              </div>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">Email enviado!</h2>
              <p className="text-sm text-bark mb-4">Revisa tu bandeja de entrada en <span className="font-semibold text-dark">{email}</span>. Si no lo ves, revisa spam.</p>
              <button onClick={() => setSent(false)} className="text-sm text-primary font-semibold hover:underline">Enviar de nuevo</button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input id="email" label="Email de tu cuenta" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button onClick={() => email && setSent(true)} className="w-full" disabled={!email}>
                Enviar link de recuperacion
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-bark">
            <Link href="/login" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
              <ChevronLeft size={14} /> Volver a iniciar sesion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
