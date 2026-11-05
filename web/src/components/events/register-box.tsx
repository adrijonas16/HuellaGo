'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, PartyPopper } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import { useAppStore, useHydrated } from '@/lib/store';
import { useAuth } from '@/hooks';
import { MOCK_PETS } from '@/lib/mock-pets';

interface RegisterBoxProps {
  eventId: string;
  eventTitle: string;
  spotsLeft: number | null;
}

/** Inscripción a un evento: elegir mascota → confirmar → estado persistido. */
export function RegisterBox({ eventId, eventTitle, spotsLeft }: RegisterBoxProps) {
  const hydrated = useHydrated();
  const registration = useAppStore((s) => s.registrations[eventId]);
  const toggle = useAppStore((s) => s.toggleRegistration);
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const pets = Object.values(MOCK_PETS).filter((p: any) => p.isOwn).slice(0, 3) as any[];
  const [pet, setPet] = useState<string>(pets[0]?.name ?? 'Mi mascota');
  const [justJoined, setJustJoined] = useState(false);

  const registered = hydrated && !!registration;
  const full = spotsLeft !== null && spotsLeft <= 0;

  if (registered) {
    return (
      <div>
        <div className={`rounded-2xl bg-secondary/10 text-secondary-dark p-4 flex items-center gap-3 ${justJoined ? 'animate-bounce-in' : ''}`}>
          <span className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
            {justJoined ? <PartyPopper size={18} /> : <Check size={18} strokeWidth={3} />}
          </span>
          <div className="text-sm">
            <p className="font-bold text-dark">Estás inscrito{registration.petName ? ` con ${registration.petName}` : ''}</p>
            <p className="text-bark">Te recordaremos un día antes.</p>
          </div>
        </div>
        <button
          onClick={() => { toggle(eventId); setJustJoined(false); }}
          className="w-full mt-3 text-sm font-semibold text-bark hover:text-error py-2 rounded-full"
        >
          Cancelar inscripción
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        disabled={full}
        onClick={() => setOpen(true)}
        className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-button hover:bg-primary-dark boop-btn text-lg disabled:bg-bark-light disabled:shadow-none"
      >
        {full ? 'Cupos agotados' : 'Inscribirme'}
      </button>
      <p className="text-center text-xs text-bark mt-3">
        {full ? 'Puedes guardarlo en favoritos por si se libera un cupo.' : 'Elegirás con qué mascota vas en el siguiente paso.'}
      </p>

      <Sheet open={open} onClose={() => setOpen(false)} title="¿Con quién vas?">
        <p className="text-sm text-bark -mt-2 mb-4">{eventTitle}</p>
        <fieldset className="space-y-2">
          <legend className="sr-only">Elige tu mascota</legend>
          {[...pets.map((p) => ({ name: p.name, detail: `${p.breed ?? ''}`, icon: p.typeIcon ?? '🐾' })), { name: 'Otra mascota', detail: 'La registrarás al llegar', icon: '🐾' }].map((p) => (
            <label
              key={p.name}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 cursor-pointer transition-colors ${pet === p.name ? 'border-primary bg-primary-soft' : 'border-sand hover:border-bark-light'}`}
            >
              <input type="radio" name="pet" value={p.name} checked={pet === p.name} onChange={() => setPet(p.name)} className="sr-only" />
              <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl shrink-0" aria-hidden>{p.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-dark">{p.name}</span>
                <span className="block text-sm text-bark truncate">{p.detail}</span>
              </span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pet === p.name ? 'border-primary bg-primary' : 'border-sand'}`}>
                {pet === p.name && <Check size={12} className="text-white" strokeWidth={3} />}
              </span>
            </label>
          ))}
        </fieldset>
        {!isAuthenticated && hydrated && (
          <p className="text-xs text-bark mt-4">
            Te inscribimos en este dispositivo. <Link href="/login" className="font-bold text-primary">Ingresa</Link> para verlo también en tu cuenta.
          </p>
        )}
        <button
          onClick={() => {
            toggle(eventId, pet === 'Otra mascota' ? undefined : pet);
            setJustJoined(true);
            setOpen(false);
          }}
          className="w-full mt-5 bg-primary text-white font-bold py-3.5 rounded-full shadow-button boop-btn"
        >
          Confirmar inscripción
        </button>
      </Sheet>
    </>
  );
}
