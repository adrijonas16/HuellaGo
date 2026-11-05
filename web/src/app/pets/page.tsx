'use client';

import { Suspense, useEffect, useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sheet } from '@/components/ui/sheet';
import { Input } from '@/components/ui';
import { useAppStore, useHydrated } from '@/lib/store';
import { PET_TYPES } from '@/lib/mock-data';
import { Trash2 } from 'lucide-react';

function AutoOpen({ onOpen }: { onOpen: () => void }) {
  const params = useSearchParams();
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current && params.get('nueva')) {
      fired.current = true;
      onOpen();
    }
  }, [params, onOpen]);
  return null;
}
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_PETS } from '@/lib/mock-pets';
import { Plus, ChevronRight, Footprints, Camera, Calendar, Stethoscope, ChevronLeft } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';

export default function MyPetsPage() {
  const pets = Object.values(MOCK_PETS).filter((p: any) => p.isOwn);
  const hydrated = useHydrated();
  const myPets = useAppStore((s) => s.myPets);
  const addPet = useAppStore((s) => s.addPet);
  const removePet = useAppStore((s) => s.removePet);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('dog');
  const [breed, setBreed] = useState('');
  const extra = hydrated ? myPets : [];

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const t = PET_TYPES.find((p) => p.id === type)!;
    addPet({ name: name.trim(), type, icon: t.icon, breed: breed.trim() || undefined });
    setName('');
    setBreed('');
    setOpen(false);
  }

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver a mi panel
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-extrabold text-3xl text-dark mb-1">Mis mascotas</h1>
              <p className="text-bark">{pets.length + extra.length} mascotas registradas</p>
            </div>
            <button onClick={() => setOpen(true)} className="boop-btn flex items-center gap-1.5 bg-primary text-white font-bold px-5 py-2.5 rounded-full shadow-button text-sm">
              <Plus size={16} /> Agregar mascota
            </button>
          </div>

          <div className="space-y-4">
            {pets.map((pet: any, i: number) => (
              <ScrollReveal key={pet.id} delay={i * 80}>
                <Link href={`/pets/${pet.id}`}>
                  <div className="bg-white rounded-card shadow-card card-hover cursor-pointer overflow-hidden">
                    <div className="flex">
                      {/* Foto */}
                      <div className="w-32 md:w-40 shrink-0">
                        <SafeImage src={pet.profilePhoto} alt={pet.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="font-heading font-extrabold text-xl text-dark">{pet.name}</h2>
                          <span className="text-xl">{pet.typeIcon}</span>
                        </div>
                        <p className="text-sm text-bark mb-3">{pet.breed} · {pet.age} · {pet.weight} kg</p>

                        {/* Mini stats */}
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-1 text-xs text-bark">
                            <Footprints size={12} className="text-primary" />
                            <span className="font-bold text-dark">{pet.stats.totalWalks}</span> paseos
                          </div>
                          <div className="flex items-center gap-1 text-xs text-bark">
                            <Calendar size={12} className="text-accent" />
                            <span className="font-bold text-dark">{pet.stats.eventsAttended}</span> eventos
                          </div>
                          <div className="flex items-center gap-1 text-xs text-bark">
                            <Stethoscope size={12} className="text-secondary" />
                            <span className="font-bold text-dark">{pet.stats.vetVisits}</span> al vet
                          </div>
                          <div className="flex items-center gap-1 text-xs text-bark">
                            <Camera size={12} className="text-rose" />
                            <span className="font-bold text-dark">{pet.stats.photos}</span> fotos
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-1.5 mt-3">
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{pet.size}</span>
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">Energía: {pet.energyLevel}</span>
                          {pet.isNeutered && <span className="text-[10px] font-bold bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">Esterilizado</span>}
                          {pet.allergies && <span className="text-[10px] font-bold bg-error/10 text-error px-2 py-0.5 rounded-full">Alergia: {pet.allergies}</span>}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center pr-4">
                        <ChevronRight size={20} className="text-bark/20" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {extra.length > 0 && (
            <ul className="space-y-3 mt-4">
              {extra.map((p) => (
                <li key={p.id} className="bg-white rounded-card p-4 flex items-center gap-4 animate-slide-up">
                  <span className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center text-3xl" aria-hidden>{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-extrabold text-lg text-dark">{p.name}</p>
                    <p className="text-sm text-bark">{p.breed || PET_TYPES.find((t) => t.id === p.type)?.name} · Agregada recién</p>
                  </div>
                  <button onClick={() => removePet(p.id)} aria-label={`Quitar a ${p.name}`} className="p-2.5 rounded-full text-bark hover:text-error hover:bg-error/5">
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Add pet CTA */}
          <ScrollReveal delay={200}>
            <div className="mt-6 bg-white rounded-card shadow-card p-6 text-center border-2 border-dashed border-primary/20">
              <Plus size={32} className="mx-auto mb-2 text-primary/40" />
              <h3 className="font-heading font-bold text-dark mb-1">Agregar otra mascota</h3>
              <p className="text-xs text-bark mb-3">Perro, gato, conejo, ave... todas son bienvenidas</p>
              <button onClick={() => setOpen(true)} className="boop-btn bg-primary/10 text-primary font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary/20 transition-all">Agregar mascota</button>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}><AutoOpen onOpen={() => setOpen(true)} /></Suspense>
      <Sheet open={open} onClose={() => setOpen(false)} title="Agregar mascota">
        <form onSubmit={submit} className="space-y-5">
          <fieldset>
            <legend className="text-sm font-semibold text-dark mb-2">Tipo</legend>
            <div className="grid grid-cols-4 gap-2">
              {PET_TYPES.map((pt) => (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setType(pt.id)}
                  aria-pressed={type === pt.id}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all ${type === pt.id ? 'border-primary bg-primary-soft' : 'border-sand hover:border-bark-light'}`}
                >
                  <span className="block text-2xl" aria-hidden>{pt.icon}</span>
                  <span className="block text-[11px] font-semibold text-dark mt-0.5">{pt.name}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <Input id="pet-name" label="Nombre" placeholder="Luna" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input id="pet-breed" label="Raza (opcional)" placeholder="Mestiza, Labrador, Persa…" value={breed} onChange={(e) => setBreed(e.target.value)} />
          <button disabled={!name.trim()} className="w-full bg-primary text-white font-bold py-3.5 rounded-full shadow-button boop-btn disabled:opacity-40 disabled:shadow-none">
            Guardar mascota
          </button>
        </form>
      </Sheet>
    </>
  );
}
