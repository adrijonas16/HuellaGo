'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui';
import { PasswordInput } from '@/components/ui/password-input';
import { AuthShell } from '@/components/layout/auth-shell';
import { useAuth } from '@/hooks';
import { useAppStore } from '@/lib/store';
import { PET_TYPES } from '@/lib/mock-data';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const notify = useAppStore((s) => s.notify);
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Arequipa');
  const [petType, setPetType] = useState<string | null>(null);
  const [petName, setPetName] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const errors = {
    firstName: touched && !firstName.trim() ? 'Escribe tu nombre' : '',
    email: touched && !EMAIL_RE.test(email) ? 'Escribe un email válido' : '',
    password: touched && password.length < 8 ? 'Usa al menos 8 caracteres' : '',
  };
  const st = strength(password);

  function next() {
    setTouched(true);
    if (!firstName.trim() || !EMAIL_RE.test(email) || password.length < 8) return;
    setStep(1);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, firstName.trim(), lastName.trim());
      notify(`¡Bienvenido a la manada, ${firstName.trim()}!${petName ? ` Saluda a ${petName} de nuestra parte.` : ''}`, { tone: 'success' });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos crear tu cuenta. Inténtalo otra vez.');
    }
  }

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Es gratis y te toma menos de un minuto.">
      {/* Progreso */}
      <ol className="flex items-center gap-3 mb-8" aria-label="Progreso del registro">
        {['Tus datos', 'Tu mascota'].map((label, i) => (
          <li key={label} className="flex items-center gap-2 flex-1">
            <span
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                i < step ? 'bg-secondary text-white' : i === step ? 'bg-dark text-white' : 'bg-sand text-bark'
              }`}
              aria-current={i === step ? 'step' : undefined}
            >
              {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
            </span>
            <span className={`text-sm font-semibold ${i === step ? 'text-dark' : 'text-bark'}`}>{label}</span>
            {i === 0 && <span className="flex-1 h-0.5 rounded-full bg-sand overflow-hidden"><span className="block h-full bg-secondary transition-all duration-500" style={{ width: step > 0 ? '100%' : '0%' }} /></span>}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate className="space-y-5 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <Input id="firstName" label="Nombre" autoComplete="given-name" placeholder="María" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
            <Input id="lastName" label="Apellido" autoComplete="family-name" placeholder="García" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <Input id="email" label="Email" type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <div>
            <PasswordInput id="password" label="Contraseña" autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
            {password && (
              <div className="flex items-center gap-2 mt-2" aria-live="polite">
                <div className="flex gap-1 flex-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < st ? (st <= 1 ? 'bg-rose' : st === 2 ? 'bg-accent' : 'bg-secondary') : 'bg-sand'}`} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-bark w-16 text-right">{['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Excelente'][st]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="text-sm font-semibold text-dark">Ciudad</label>
            <select id="city" className="w-full px-4 py-3.5 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none bg-white text-dark" value={city} onChange={(e) => setCity(e.target.value)}>
              {['Arequipa', 'Lima', 'Cusco', 'Trujillo', 'Chiclayo', 'Piura', 'Tacna'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-dark text-white font-bold text-lg py-4 rounded-full boop-btn hover:bg-primary transition-colors">
            Continuar
          </button>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-in-right">
          <fieldset>
            <legend className="text-sm font-semibold text-dark mb-2">¿Qué mascota tienes? <span className="font-normal text-bark">(opcional)</span></legend>
            <div className="grid grid-cols-4 gap-2">
              {PET_TYPES.slice(0, 8).map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setPetType(petType === pt.id ? null : pt.id)}
                  aria-pressed={petType === pt.id}
                  className={`p-3 rounded-2xl border-2 text-center transition-all ${petType === pt.id ? 'border-primary bg-primary-soft scale-[1.03]' : 'border-sand bg-white hover:border-bark-light'}`}
                >
                  <span className="block text-2xl" aria-hidden>{pt.icon}</span>
                  <span className="block text-[12px] font-semibold text-dark mt-1">{pt.name}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <Input id="petName" label="¿Cómo se llama?" placeholder="Firulais, Luna, Michi…" value={petName} onChange={(e) => setPetName(e.target.value)} />

          {error && <p role="alert" className="text-sm text-error bg-error/5 rounded-xl px-4 py-3">{error}</p>}

          <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg py-4 rounded-full shadow-button boop-btn hover:bg-primary-dark disabled:opacity-60">
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
          <button type="button" onClick={() => setStep(0)} className="w-full text-sm text-bark font-semibold py-2 hover:text-dark">
            Volver a tus datos
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-bark">
        ¿Ya tienes cuenta? <Link href="/login" className="text-primary font-bold link-route">Ingresar</Link>
      </p>
      <p className="text-xs text-bark/80 text-center mt-4">
        Al crear tu cuenta aceptas los <Link href="/terms" className="underline">Términos</Link> y la <Link href="/privacy" className="underline">Política de privacidad</Link>.
      </p>
    </AuthShell>
  );
}
