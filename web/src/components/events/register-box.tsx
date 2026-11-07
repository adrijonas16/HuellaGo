'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, PartyPopper, Loader2 } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import { useAppStore, useHydrated } from '@/lib/store';
import { useAuth } from '@/hooks';
import { MOCK_PETS } from '@/lib/mock-pets';
import { PET_TYPES } from '@/lib/mock-data';
import { hasRealSession, getMyPets, attendEvent, cancelAttendance, isApiId, errorMessage } from '@/lib/backend';
import { track } from '@/lib/analytics';

interface RegisterBoxProps {
  eventId: string;
  eventTitle: string;
  spotsLeft: number | null;
  /** se llama tras inscribirse o cancelar en el servidor, para refrescar el conteo */
  onChange?: () => void;
}

interface PetOption {
  id?: string;
  name: string;
  detail: string;
  icon: string;
}

const iconFor = (petType?: string) => PET_TYPES.find((t) => t.id === petType?.toLowerCase())?.icon ?? '🐾';

/**
 * Inscripción a un evento: elegir mascota → confirmar.
 * Con sesión real y evento de la API se guarda en el servidor;
 * en otro caso queda guardado en el dispositivo.
 */
export function RegisterBox({ eventId, eventTitle, spotsLeft, onChange }: RegisterBoxProps) {
  const hydrated = useHydrated();
  const registration = useAppStore((s) => s.registrations[eventId]);
  const toggle = useAppStore((s) => s.toggleRegistration);
  const notify = useAppStore((s) => s.notify);
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [pets, setPets] = useState<PetOption[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [pet, setPet] = useState<string>('');
  const [justJoined, setJustJoined] = useState(false);
  const [saving, setSaving] = useState(false);

  const live = hydrated && hasRealSession() && isApiId(eventId);

  useEffect(() => {
    if (!open) return;
    if (live) {
      setLoadingPets(true);
      getMyPets()
        .then((list) => {
          const opts = list.map((p) => ({ id: p.id, name: p.name, detail: p.breed ?? '', icon: iconFor(p.petType) }));
          setPets(opts);
          setPet(opts[0]?.name ?? '');
        })
        .catch(() => setPets([]))
        .finally(() => setLoadingPets(false));
    } else {
      const demo = Object.values(MOCK_PETS)
        .filter((p: any) => p.isOwn)
        .slice(0, 3)
        .map((p: any) => ({ name: p.name, detail: p.breed ?? '', icon: p.typeIcon ?? '🐾' }));
      const opts = [...demo, { name: 'Otra mascota', detail: 'La registrarás al llegar', icon: '🐾' }];
      setPets(opts);
      setPet(opts[0].name);
    }
  }, [open, live]);

  const registered = hydrated && !!registration;
  const full = spotsLeft !== null && spotsLeft <= 0;

  async function confirm() {
    const chosen = pets.find((p) => p.name === pet);
    if (live) {
      if (!chosen?.id) return;
      setSaving(true);
      try {
        await attendEvent(eventId, chosen.id);
      } catch (err) {
        setSaving(false);
        notify(errorMessage(err, 'No pudimos inscribirte. Inténtalo otra vez.'), { tone: 'error' });
        return;
      }
      setSaving(false);
    }
    toggle(eventId, pet === 'Otra mascota' ? undefined : pet);
    useAppStore.setState((s) => ({
      registrations: { ...s.registrations, [eventId]: { ...s.registrations[eventId], petId: chosen?.id } as any },
    }));
    track('event_register', { event_id: eventId });
    setJustJoined(true);
    setOpen(false);
    if (live) onChange?.();
  }

  async function cancel() {
    const petId = (registration as any)?.petId;
    if (live && petId) {
      try {
        await cancelAttendance(eventId, petId);
      } catch (err) {
        notify(errorMessage(err, 'No pudimos cancelar la inscripción.'), { tone: 'error' });
        return;
      }
    }
    toggle(eventId);
    setJustJoined(false);
    if (live) onChange?.();
  }

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
        <button onClick={cancel} className="w-full mt-3 text-sm font-semibold text-bark hover:text-error py-2 rounded-full">
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
        {loadingPets ? (
          <div className="space-y-2">{[0, 1].map((i) => <div key={i} className="skeleton h-[70px] rounded-2xl" />)}</div>
        ) : pets.length === 0 ? (
          <div className="rounded-2xl bg-cream p-5 text-center">
            <p className="font-bold text-dark">Aún no tienes mascotas registradas</p>
            <p className="text-sm text-bark mt-1">Agrega a tu mascota para poder inscribirla.</p>
            <Link href="/pets?nueva=1" className="inline-flex mt-4 bg-primary text-white font-bold rounded-full px-5 py-2.5 text-sm">
              Agregar mascota
            </Link>
          </div>
        ) : (
          <fieldset className="space-y-2">
            <legend className="sr-only">Elige tu mascota</legend>
            {pets.map((p) => (
              <label
                key={p.name + (p.id ?? '')}
                className={`flex items-center gap-3 rounded-2xl border-2 p-3 cursor-pointer transition-colors ${pet === p.name ? 'border-primary bg-primary-soft' : 'border-sand hover:border-bark-light'}`}
              >
                <input type="radio" name="pet" value={p.name} checked={pet === p.name} onChange={() => setPet(p.name)} className="sr-only" />
                <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl shrink-0" aria-hidden>{p.icon}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-dark">{p.name}</span>
                  {p.detail && <span className="block text-sm text-bark truncate">{p.detail}</span>}
                </span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pet === p.name ? 'border-primary bg-primary' : 'border-sand'}`}>
                  {pet === p.name && <Check size={12} className="text-white" strokeWidth={3} />}
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {!isAuthenticated && hydrated && (
          <p className="text-xs text-bark mt-4">
            Te inscribimos en este dispositivo. <Link href="/login" className="font-bold text-primary">Ingresa</Link> para guardarlo en tu cuenta.
          </p>
        )}
        {pets.length > 0 && (
          <button
            onClick={confirm}
            disabled={saving || !pet}
            className="w-full mt-5 inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-full shadow-button boop-btn disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />} Confirmar inscripción
          </button>
        )}
      </Sheet>
    </>
  );
}
