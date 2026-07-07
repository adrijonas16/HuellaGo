'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { PhotoUpload } from '@/components/photos/photo-upload';
import { MOCK_PETS } from '@/lib/mock-pets';
import { Heart, MapPin, Calendar, Camera, Star, ChevronLeft, Zap, Footprints, Users, MessageCircle, Share2, Upload, Weight, Ruler, Stethoscope, Edit3 } from 'lucide-react';

export default function PetProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'info' | 'paseos' | 'eventos' | 'amigos' | 'fotos'>('info');
  const [showUpload, setShowUpload] = useState(false);
  const pet = MOCK_PETS[params.id];

  if (!pet) {
    return (<><Navbar /><div className="min-h-screen bg-cream flex items-center justify-center"><div className="text-center"><div className="text-6xl mb-4">🐾</div><h1 className="font-heading font-bold text-2xl text-dark mb-2">Mascota no encontrada</h1><Link href="/dashboard" className="text-primary font-semibold hover:underline">Volver al dashboard</Link></div></div></>);
  }

  return (
    <><Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium"><ChevronLeft size={16} /> Volver</Link>

          <ScrollReveal>
            <div className="bg-white rounded-card shadow-card overflow-hidden mb-6">
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img src={pet.heroPhoto} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute top-4 right-4"><button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full boop-btn hover:bg-white"><Share2 size={16} className="text-bark" /></button></div>
              </div>
              <div className="px-6 pb-6 -mt-14 relative">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <div className="relative">
                    <img src={pet.profilePhoto} alt={pet.name} className="w-28 h-28 rounded-3xl border-4 border-white shadow-card object-cover" />
                    {pet.isOwn && <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white boop-btn"><Camera size={14} className="text-white" /></button>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading font-extrabold text-3xl text-dark">{pet.name}</h1>
                      <span className="text-2xl">{pet.typeIcon}</span>
                      {pet.isNeutered && <span className="text-[10px] font-bold bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">Esterilizado</span>}
                    </div>
                    <p className="text-bark">{pet.breed} · {pet.age} · {pet.owner.district}, {pet.owner.city}</p>
                    <p className="text-xs text-bark/60 mt-0.5">Dueno: {pet.owner.name}</p>
                  </div>
                  <div className="flex gap-2">
                    {pet.isOwn ? (
                      <button className="boop-btn flex items-center gap-1.5 bg-primary text-white font-bold px-5 py-2.5 rounded-button shadow-button text-sm"><Edit3 size={14} /> Editar</button>
                    ) : (
                      <><button className="boop-btn flex items-center gap-1.5 bg-primary text-white font-bold px-5 py-2.5 rounded-button shadow-button text-sm"><Heart size={14} /> Seguir</button>
                      <button className="boop-btn flex items-center gap-1.5 bg-sand text-bark font-semibold px-5 py-2.5 rounded-button text-sm"><MessageCircle size={14} /> Mensaje</button></>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mt-6">
                  {[
                    { icon: <Footprints size={16} />, val: pet.stats.totalWalks, label: 'Paseos' },
                    { icon: <MapPin size={16} />, val: `${pet.stats.totalDistance} km`, label: 'Recorrido' },
                    { icon: <Calendar size={16} />, val: pet.stats.eventsAttended, label: 'Eventos' },
                    { icon: <Stethoscope size={16} />, val: pet.stats.vetVisits, label: 'Veterinario' },
                    { icon: <Users size={16} />, val: pet.stats.friends, label: 'Amigos' },
                    { icon: <Heart size={16} />, val: pet.stats.followers, label: 'Seguidores' },
                    { icon: <Camera size={16} />, val: pet.stats.photos, label: 'Fotos' },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-2 bg-cream rounded-xl">
                      <div className="text-primary mx-auto mb-1 flex justify-center">{s.icon}</div>
                      <div className="text-sm font-extrabold text-dark">{s.val}</div>
                      <div className="text-[9px] text-bark">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex gap-1 bg-white rounded-card shadow-card p-1.5 mb-6 overflow-x-auto">
            {[{ key: 'info', label: 'Informacion' }, { key: 'paseos', label: `Paseos (${pet.stats.totalWalks})` }, { key: 'eventos', label: `Eventos (${pet.stats.eventsAttended})` }, { key: 'amigos', label: `Amigos (${pet.stats.friends})` }, { key: 'fotos', label: `Fotos (${pet.gallery.length})` }].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-primary text-white shadow-button' : 'text-bark hover:bg-cream'}`}>{tab.label}</button>
            ))}
          </div>

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal><div className="bg-white rounded-card shadow-card p-6">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">Datos fisicos</h2>
                <div className="space-y-3">
                  {[{ icon: <Weight size={16} />, label: 'Peso', value: `${pet.weight} kg` }, { icon: <Ruler size={16} />, label: 'Altura', value: `${pet.height} cm` }, { icon: <Zap size={16} />, label: 'Energia', value: pet.energyLevel }, { label: 'Color', value: pet.color }, { label: 'Tamano', value: pet.size }, { label: 'Nacimiento', value: pet.birthDate }, { label: 'Microchip', value: pet.microchip }].map((item: any, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl bg-cream/50">
                      <div className="flex items-center gap-2 text-sm text-bark">{item.icon && <span className="text-primary">{item.icon}</span>}{item.label}</div>
                      <span className="text-sm font-semibold text-dark">{item.value}</span>
                    </div>
                  ))}
                </div>
                {pet.allergies && <div className="mt-4 p-3 bg-error/5 rounded-xl border border-error/10"><span className="text-xs font-bold text-error">Alergia: {pet.allergies}</span></div>}
              </div></ScrollReveal>
              <ScrollReveal delay={100}><div className="bg-white rounded-card shadow-card p-6">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">Vacunas</h2>
                <div className="space-y-3">
                  {pet.vaccines.map((v: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-cream/50">
                      <div><div className="text-sm font-semibold text-dark">{v.name}</div><div className="text-[11px] text-bark">Aplicada: {v.date}</div></div>
                      <div className="text-right"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.status === 'ok' ? 'bg-success/10 text-success' : 'bg-accent/15 text-amber-700'}`}>{v.status === 'ok' ? 'Al dia' : 'Pronto'}</span><div className="text-[10px] text-bark mt-0.5">Proxima: {v.next}</div></div>
                    </div>
                  ))}
                </div>
              </div></ScrollReveal>
            </div>
          )}

          {activeTab === 'paseos' && (
            <ScrollReveal><div className="bg-white rounded-card shadow-card p-6">
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Historial de paseos</h2>
              {pet.recentWalks.length === 0 ? (
                <div className="text-center py-8"><Footprints size={40} className="mx-auto mb-3 text-bark/20" /><p className="text-bark">Aun no hay paseos registrados</p><p className="text-xs text-bark/60 mt-1">Los paseos se registran desde la app movil</p></div>
              ) : (
                <div className="space-y-3">
                  {pet.recentWalks.map((w: any) => (
                    <div key={w.id} className="flex items-center gap-4 p-4 rounded-xl bg-cream/50 card-hover">
                      <img src={`https://picsum.photos/seed/ruta-${w.id}/80/80`} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1"><div className="font-semibold text-dark text-sm">{w.route}</div><div className="text-[11px] text-bark">{w.date} · {w.distance} km · {w.duration} min</div></div>
                      <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} className={i < w.rating ? 'fill-accent text-accent' : 'text-gray-200'} />)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div></ScrollReveal>
          )}

          {activeTab === 'eventos' && (
            <ScrollReveal><div className="bg-white rounded-card shadow-card p-6">
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Eventos asistidos</h2>
              {pet.recentEvents.length === 0 ? (
                <div className="text-center py-8"><Calendar size={40} className="mx-auto mb-3 text-bark/20" /><p className="text-bark">Aun no ha asistido a eventos</p></div>
              ) : (
                <div className="space-y-3">{pet.recentEvents.map((e: any) => (
                  <Link key={e.id} href={`/events/${e.id}`}><div className="flex items-center gap-4 p-4 rounded-xl bg-cream/50 card-hover cursor-pointer">
                    <img src={`https://picsum.photos/seed/evento-${e.id}/80/80`} alt="" className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1"><div className="font-semibold text-dark text-sm">{e.title}</div><div className="text-[11px] text-bark">{e.date}</div></div>
                  </div></Link>
                ))}</div>
              )}
            </div></ScrollReveal>
          )}

          {activeTab === 'amigos' && (
            <ScrollReveal><div className="bg-white rounded-card shadow-card p-6">
              <h2 className="font-heading font-bold text-dark text-lg mb-4">Amigos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pet.friends.map((f: any, i: number) => (
                  <Link key={i} href={f.id ? `/pets/${f.id}` : '#'}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 card-hover cursor-pointer">
                      <img src={f.photo} alt={f.name} className="w-12 h-12 rounded-full object-cover" />
                      <div><div className="text-sm font-semibold text-dark">{f.name}</div><div className="text-[11px] text-bark">{f.breed}</div></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div></ScrollReveal>
          )}

          {activeTab === 'fotos' && (
            <ScrollReveal><div className="bg-white rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-dark text-lg">Fotos</h2>
                {pet.isOwn && <button onClick={() => setShowUpload(!showUpload)} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full boop-btn flex items-center gap-1"><Upload size={12} /> Subir fotos</button>}
              </div>
              {showUpload && <div className="mb-6 p-4 bg-cream rounded-xl border border-sand animate-slide-up"><PhotoUpload maxPhotos={10} label={`Subir fotos de ${pet.name}`} /></div>}
              <div className="grid grid-cols-3 gap-2">
                {pet.gallery.map((url: string, i: number) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group"><img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" /></div>
                ))}
              </div>
            </div></ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
