'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch {
      setError('Email o contrasena incorrectos');
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="font-heading font-bold text-2xl text-dark">
            Bienvenido a HuellaGo
          </h1>
          <p className="text-gray-500 mt-2">
            Ingresa para descubrir el mundo pet de tu ciudad
          </p>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Contrasena"
              type="password"
              placeholder="Tu contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-error text-center">{error}</p>
            )}

            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                Olvidaste tu contrasena?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Iniciar sesion'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            No tienes cuenta?{' '}
            <Link href="/register" className="text-primary font-semibold">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
