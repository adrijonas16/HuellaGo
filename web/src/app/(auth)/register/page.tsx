'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks';
import { PET_TYPES } from '@/lib/mock-data';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Arequipa');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, firstName, lastName);
      router.push('/');
    } catch {
      setError('Error al crear la cuenta');
    }
  }

  return (
    <div className="min-h-screen bg-cream paw-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-button">
              <span className="text-white text-2xl">🐾</span>
            </div>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-dark">Crear cuenta en HuellaGo</h1>
          <p className="text-bark mt-2">Registrate para encontrar todo para tu mascota</p>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-dark text-lg mb-1">Tus datos</h2>
              <div className="grid grid-cols-2 gap-3">
                <Input id="firstName" label="Nombre" placeholder="Maria" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <Input id="lastName" label="Apellido" placeholder="Garcia" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <Input id="email" label="Email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input id="password" label="Contrasena" type="password" placeholder="Minimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div>
                <label className="text-sm font-medium text-bark block mb-1.5">Ciudad</label>
                <select className="w-full px-4 py-3.5 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white text-dark" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Arequipa</option><option>Lima</option><option>Cusco</option><option>Trujillo</option><option>Chiclayo</option><option>Piura</option><option>Tacna</option>
                </select>
              </div>
              <Button onClick={() => setStep(1)} className="w-full" disabled={!firstName || !email || !password}>
                Siguiente: tu mascota 🐾
              </Button>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-heading font-bold text-dark text-lg mb-1">Tu mascota (opcional)</h2>
              <p className="text-xs text-bark mb-3">Puedes agregar esto despues si prefieres</p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {PET_TYPES.slice(0, 8).map((pt) => (
                  <button key={pt.id} type="button" className="p-3 rounded-card border-2 border-sand hover:border-primary/30 text-center transition-all boop-btn">
                    <div className="text-2xl">{pt.icon}</div>
                    <div className="text-[10px] font-semibold text-bark mt-1">{pt.name}</div>
                  </button>
                ))}
              </div>

              <Input id="petName" label="Nombre de tu mascota" placeholder="Firulais, Luna, Michi..." />
              <Input id="petBreed" label="Raza (opcional)" placeholder="Labrador, Mestizo, Persa..." />

              {error && <p className="text-sm text-error text-center">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
              <button type="button" onClick={() => setStep(0)} className="w-full text-sm text-bark font-medium py-2 hover:text-primary">
                Volver
              </button>
            </form>
          )}

          <div className="mt-4 text-center text-sm text-bark">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary font-semibold">Inicia sesion</Link>
          </div>
        </div>

        <p className="text-[11px] text-bark/50 text-center mt-4">
          Al registrarte aceptas los <Link href="/terms" className="underline">Terminos</Link> y la <Link href="/privacy" className="underline">Politica de Privacidad</Link>
        </p>
      </div>
    </div>
  );
}
