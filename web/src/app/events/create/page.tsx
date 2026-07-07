'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LocationPicker } from '@/components/map/location-picker';
import { ChevronLeft, Calendar, Users, Zap, Plus, Trash2 } from 'lucide-react';
import { PhotoUpload } from '@/components/photos/photo-upload';

const ENERGY_OPTIONS = [
  { value: 'LOW', label: 'Tranquilo', icon: '🐕', desc: 'Paseo suave, ideal para mascotas calmadas' },
  { value: 'MEDIUM', label: 'Moderado', icon: '🚶', desc: 'Ritmo normal, la mayoria de mascotas' },
  { value: 'HIGH', label: 'Energico', icon: '🏃', desc: 'Actividad intensa, mascotas con mucha energia' },
];

const SIZE_OPTIONS = [
  { value: 'MINI', label: 'Mini' },
  { value: 'SMALL', label: 'Pequeno' },
  { value: 'MEDIUM', label: 'Mediano' },
  { value: 'LARGE', label: 'Grande' },
  { value: 'GIANT', label: 'Gigante' },
];

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [meetingLocation, setMeetingLocation] = useState<{ lat: number; lng: number; address?: string } | undefined>();
  const [endLocation, setEndLocation] = useState<{ lat: number; lng: number; address?: string } | undefined>();
  const [city, setCity] = useState('Arequipa');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [energyLevel, setEnergyLevel] = useState('MEDIUM');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [requirements, setRequirements] = useState(['Correa obligatoria']);
  const [newReq, setNewReq] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }

  function addRequirement() {
    if (newReq.trim()) {
      setRequirements((prev) => [...prev, newReq.trim()]);
      setNewReq('');
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/events" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver a eventos
          </Link>

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🎉</div>
            <h1 className="font-heading font-extrabold text-3xl text-dark mb-2">Crear evento</h1>
            <p className="text-bark">Crea un evento para tu comunidad. Todos los usuarios pueden crear eventos.</p>
          </div>

          <div className="space-y-6">
            {/* Basic info */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up">
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Informacion basica</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-dark block mb-1.5">Nombre del evento *</label>
                  <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: Caminata canina en Yanahuara" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark block mb-1.5">Descripcion</label>
                  <textarea className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]" placeholder="Describe tu evento, que actividades habra, que deben traer..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Fecha y hora de inicio *</label>
                    <input type="datetime-local" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Fecha y hora de fin</label>
                    <input type="datetime-local" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark block mb-1.5">Ciudad *</label>
                  <select className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Arequipa</option><option>Lima</option><option>Cusco</option><option>Trujillo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Ubicacion 📍</h2>
              <div className="space-y-4">
                <LocationPicker
                  label="Punto de partida *"
                  value={meetingLocation}
                  onChange={setMeetingLocation}
                  placeholder="Donde se reunen los asistentes"
                />
                <LocationPicker
                  label="Punto de llegada (opcional)"
                  value={endLocation}
                  onChange={setEndLocation}
                  placeholder="Donde termina el evento"
                />
              </div>
            </div>

            {/* Energy & sizes */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Para que mascotas? 🐾</h2>

              <div className="mb-6">
                <label className="text-sm font-semibold text-dark block mb-3">Nivel de energia</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ENERGY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEnergyLevel(opt.value)}
                      className={`p-4 rounded-card border-2 text-left transition-all boop-btn ${energyLevel === opt.value ? 'border-primary bg-primary/5' : 'border-sand hover:border-primary/30'}`}
                    >
                      <div className="text-2xl mb-1">{opt.icon}</div>
                      <div className="font-heading font-bold text-dark text-sm">{opt.label}</div>
                      <div className="text-[11px] text-bark mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark block mb-3">Tamano recomendado</label>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleSize(opt.value)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all boop-btn ${selectedSizes.includes(opt.value) ? 'bg-primary text-white' : 'bg-sand text-bark hover:bg-primary/10'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Capacity & price */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Cupos y precio</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-dark block mb-1.5">Cupos maximos (dejar vacio = ilimitados)</label>
                  <input type="number" min="1" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="30" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} />
                </div>
                <div className="flex items-center justify-between bg-cream rounded-card p-4">
                  <span className="text-sm font-semibold text-dark">Evento gratuito</span>
                  <button type="button" onClick={() => setIsFree(!isFree)} className={`w-12 h-6 rounded-full transition-all ${isFree ? 'bg-primary' : 'bg-sand'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${isFree ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                {!isFree && (
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Precio (S/)</label>
                    <input type="number" min="0" step="0.5" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="25.00" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                )}
                <div className="flex items-center justify-between bg-cream rounded-card p-4">
                  <div>
                    <span className="text-sm font-semibold text-dark block">Evento publico</span>
                    <span className="text-[11px] text-bark">Visible para todos los usuarios de tu ciudad</span>
                  </div>
                  <button type="button" onClick={() => setIsPublic(!isPublic)} className={`w-12 h-6 rounded-full transition-all ${isPublic ? 'bg-primary' : 'bg-sand'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Requisitos</h2>
              <div className="space-y-2 mb-3">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 bg-cream rounded-lg px-3 py-2">
                    <span className="text-sm text-dark flex-1">{req}</span>
                    <button type="button" onClick={() => setRequirements((prev) => prev.filter((_, j) => j !== i))} className="text-bark/40 hover:text-error">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 px-4 py-2.5 rounded-button border border-sand text-sm focus:border-primary outline-none" placeholder="Ej: Llevar agua para tu mascota" value={newReq} onChange={(e) => setNewReq(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())} />
                <button type="button" onClick={addRequirement} className="px-4 py-2.5 bg-primary/10 text-primary rounded-button font-semibold text-sm boop-btn hover:bg-primary/20">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Fotos */}
            <div className="bg-white rounded-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '500ms' }}>
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Fotos del evento</h2>
              <PhotoUpload maxPhotos={8} label="Sube fotos del lugar o de eventos anteriores" />
            </div>

            {/* Enviar */}
            <div className="flex justify-between items-center pt-4">
              <Link href="/events" className="text-bark font-medium text-sm hover:text-primary">Cancelar</Link>
              <button className="bg-primary text-white font-bold px-8 py-4 rounded-button shadow-button boop-btn hover:bg-primary-dark transition-all text-lg flex items-center gap-2">
                🎉 Publicar evento
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
