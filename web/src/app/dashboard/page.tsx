'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_EVENTS, MOCK_ROUTES } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';
import { MapPin, Calendar, Route, Star, Heart, Footprints, Camera, Settings, ChevronRight, Plus, Clock, Edit3, LogOut } from 'lucide-react';

const USER = {
  firstName: 'Maria',
  lastName: 'Garcia',
  email: 'maria@email.com',
  city: 'Arequipa',
  district: 'Cayma',
  memberSince: 'Marzo 2026',
};

const MY_PETS = [
  { id: 'pet1', name: 'Firulais', type: 'DOG', icon: '🐕', breed: 'Golden Retriever', age: '3 anos', weight: 32, energy: 'HIGH', walks: 47, events: 5, photos: 34, photo: 'https://picsum.photos/seed/golden-face/100/100' },
  { id: 'pet2', name: 'Michi', type: 'CAT', icon: '🐱', breed: 'Persa', age: '2 anos', weight: 4.5, energy: 'LOW', walks: 0, events: 1, photos: 12, photo: 'https://picsum.photos/seed/persian-cat-face/100/100' },
];

const MY_WALKS = [
  { id: 'w1', pet: 'Firulais', petIcon: '🐕', route: 'Parque Selva Alegre', distance: 2.1, duration: 35, date: '2026-07-05', rating: 5 },
  { id: 'w2', pet: 'Firulais', petIcon: '🐕', route: 'Mirador de Yanahuara', distance: 3.8, duration: 55, date: '2026-07-03', rating: 4 },
  { id: 'w3', pet: 'Firulais', petIcon: '🐕', route: 'Circuito El Lago', distance: 5.2, duration: 70, date: '2026-06-28', rating: 4 },
  { id: 'w4', pet: 'Firulais', petIcon: '🐕', route: 'Centro Historico', distance: 2.1, duration: 35, date: '2026-06-20', rating: 5 },
];

const MY_EVENTS = [
  { ...MOCK_EVENTS[0], myStatus: 'inscrito' },
  { ...MOCK_EVENTS[1], myStatus: 'inscrito' },
];

const MY_FAVORITES = [
  { type: 'business', id: '1', name: 'Veterinaria Patitas Felices', icon: '🏥', subtitle: 'Cayma · 4.8 ★' },
  { type: 'business', id: '3', name: 'Happy Paws Grooming', icon: '✂️', subtitle: 'JLByR · 4.9 ★' },
  { type: 'route', id: 'r2', name: 'Circuito Parque Selva Alegre', icon: '🗺️', subtitle: '1.4 km · Facil' },
  { type: 'event', id: 'e4', name: 'Feria Pet Friendly Mall Aventura', icon: '🎉', subtitle: '27 jul · Gratis' },
];

const STATS = { totalWalks: 47, totalDistance: 89.5, totalEvents: 5, totalPhotos: 46 };

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'walks' | 'events' | 'favorites'>('overview');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile header */}
          <ScrollReveal>
            <div className="bg-white rounded-card shadow-card p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white text-3xl font-extrabold flex items-center justify-center shadow-button shrink-0">
                  {USER.firstName[0]}
                </div>
                <div className="flex-1">
                  <h1 className="font-heading font-extrabold text-2xl text-dark">{USER.firstName} {USER.lastName}</h1>
                  <p className="text-sm text-bark">{USER.district}, {USER.city} · Miembro desde {USER.memberSince}</p>
                  <p className="text-xs text-bark/60">{USER.email}</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/profile/edit" className="flex items-center gap-1.5 px-4 py-2 rounded-button border border-sand text-bark text-sm font-semibold hover:bg-sand/50 transition-all boop-btn">
                    <Edit3 size={14} /> Editar perfil
                  </Link>
                  <Link href="/settings" className="p-2 rounded-button border border-sand text-bark hover:bg-sand/50 transition-all">
                    <Settings size={18} />
                  </Link>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {[
                  { icon: <Footprints size={18} />, val: STATS.totalWalks, label: 'Paseos', color: 'primary' },
                  { icon: <MapPin size={18} />, val: `${STATS.totalDistance} km`, label: 'Recorrido', color: 'secondary' },
                  { icon: <Calendar size={18} />, val: STATS.totalEvents, label: 'Eventos', color: 'accent' },
                  { icon: <Camera size={18} />, val: STATS.totalPhotos, label: 'Fotos', color: 'rose' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-3 bg-cream rounded-xl">
                    <div className={`text-${s.color} mx-auto mb-1 flex justify-center`}>{s.icon}</div>
                    <div className="text-xl font-extrabold text-dark">{s.val}</div>
                    <div className="text-[10px] text-bark">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-card shadow-card p-1.5 mb-6 overflow-x-auto">
            {[
              { key: 'overview', label: 'Resumen' },
              { key: 'pets', label: `Mis mascotas (${MY_PETS.length})` },
              { key: 'walks', label: `Paseos (${MY_WALKS.length})` },
              { key: 'events', label: `Eventos (${MY_EVENTS.length})` },
              { key: 'favorites', label: `Favoritos (${MY_FAVORITES.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-primary text-white shadow-button' : 'text-bark hover:bg-cream'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My pets */}
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-dark">Mis mascotas</h2>
                    <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"><Plus size={12} /> Agregar</button>
                  </div>
                  <div className="space-y-3">
                    {MY_PETS.map((pet) => (
                      <Link key={pet.id} href={`/pets/${pet.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 card-hover cursor-pointer">
                          <img src={pet.photo} alt={pet.name} className="w-12 h-12 rounded-2xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-dark text-sm">{pet.name}</div>
                            <div className="text-[11px] text-bark">{pet.breed} · {pet.age} · {pet.weight} kg</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold text-dark">{pet.walks} paseos</div>
                            <div className="text-[10px] text-bark">{pet.photos} fotos</div>
                          </div>
                          <ChevronRight size={14} className="text-bark/30" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Recent walks */}
              <ScrollReveal delay={80}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-dark">Ultimos paseos</h2>
                    <button onClick={() => setActiveTab('walks')} className="text-xs font-bold text-primary hover:underline">Ver todos</button>
                  </div>
                  <div className="space-y-3">
                    {MY_WALKS.slice(0, 3).map((w) => (
                      <div key={w.id} className="flex items-center gap-3 p-3 rounded-xl bg-cream/50">
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-lg">{w.petIcon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-dark truncate">{w.route}</div>
                          <div className="text-[11px] text-bark">{w.date} · {w.distance} km · {w.duration} min</div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => <Star key={i} size={10} className={i < w.rating ? 'fill-accent text-accent' : 'text-gray-200'} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Upcoming events */}
              <ScrollReveal delay={160}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-dark">Mis proximos eventos</h2>
                    <button onClick={() => setActiveTab('events')} className="text-xs font-bold text-primary hover:underline">Ver todos</button>
                  </div>
                  <div className="space-y-3">
                    {MY_EVENTS.map((e) => (
                      <Link key={e.id} href={`/events/${e.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 card-hover cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Calendar size={18} className="text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-dark truncate">{e.title}</div>
                            <div className="text-[11px] text-bark">{formatDateShort(e.date)} · {e.meetingPoint}</div>
                          </div>
                          <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">Inscrito</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Favorites */}
              <ScrollReveal delay={240}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-dark">Favoritos</h2>
                    <button onClick={() => setActiveTab('favorites')} className="text-xs font-bold text-primary hover:underline">Ver todos</button>
                  </div>
                  <div className="space-y-2">
                    {MY_FAVORITES.slice(0, 4).map((f) => (
                      <Link key={f.id} href={f.type === 'business' ? `/directory/${f.id}` : f.type === 'route' ? `/routes/${f.id}` : `/events/${f.id}`}>
                        <div className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-cream/50 transition-colors cursor-pointer">
                          <span className="text-lg">{f.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-dark truncate">{f.name}</div>
                            <div className="text-[11px] text-bark">{f.subtitle}</div>
                          </div>
                          <Heart size={14} className="fill-rose text-rose shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Pets tab */}
          {activeTab === 'pets' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-heading font-bold text-dark text-lg">Mis mascotas</h2>
                <button className="boop-btn flex items-center gap-1.5 bg-primary text-white font-bold px-4 py-2.5 rounded-button shadow-button text-sm"><Plus size={14} /> Agregar mascota</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MY_PETS.map((pet) => (
                  <ScrollReveal key={pet.id}>
                    <Link href={`/pets/${pet.id}`}>
                      <div className="bg-white rounded-card shadow-card p-5 card-hover cursor-pointer">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={pet.photo} alt={pet.name} className="w-16 h-16 rounded-2xl object-cover" />
                          <div>
                            <h3 className="font-heading font-bold text-dark text-lg">{pet.name}</h3>
                            <p className="text-sm text-bark">{pet.breed} · {pet.age}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-cream rounded-lg"><div className="text-sm font-bold text-dark">{pet.weight} kg</div><div className="text-[9px] text-bark">Peso</div></div>
                          <div className="text-center p-2 bg-cream rounded-lg"><div className="text-sm font-bold text-dark">{pet.walks}</div><div className="text-[9px] text-bark">Paseos</div></div>
                          <div className="text-center p-2 bg-cream rounded-lg"><div className="text-sm font-bold text-dark">{pet.events}</div><div className="text-[9px] text-bark">Eventos</div></div>
                          <div className="text-center p-2 bg-cream rounded-lg"><div className="text-sm font-bold text-dark">{pet.photos}</div><div className="text-[9px] text-bark">Fotos</div></div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Walks tab */}
          {activeTab === 'walks' && (
            <ScrollReveal>
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">Historial de paseos ({MY_WALKS.length})</h2>
                <div className="space-y-3">
                  {MY_WALKS.map((w) => (
                    <div key={w.id} className="flex items-center gap-4 p-4 rounded-xl bg-cream/50 card-hover">
                      <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-xl">{w.petIcon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-dark">{w.route}</div>
                        <div className="text-xs text-bark">{w.date} · con {w.pet}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-dark">{w.distance} km</div>
                        <div className="text-[11px] text-bark">{w.duration} min</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => <Star key={i} size={10} className={i < w.rating ? 'fill-accent text-accent' : 'text-gray-200'} />)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-sand text-center text-sm text-bark">
                  Total: <span className="font-bold text-dark">{STATS.totalDistance} km</span> en <span className="font-bold text-dark">{STATS.totalWalks}</span> paseos
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Events tab */}
          {activeTab === 'events' && (
            <ScrollReveal>
              <div className="bg-white rounded-card shadow-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-dark text-lg">Mis eventos</h2>
                  <Link href="/events/create" className="boop-btn flex items-center gap-1.5 bg-primary text-white font-bold px-4 py-2.5 rounded-button shadow-button text-sm"><Plus size={14} /> Crear evento</Link>
                </div>
                <div className="space-y-3">
                  {MY_EVENTS.map((e) => (
                    <Link key={e.id} href={`/events/${e.id}`}>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-cream/50 card-hover cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><Calendar size={22} className="text-accent" /></div>
                        <div className="flex-1">
                          <div className="font-semibold text-dark">{e.title}</div>
                          <div className="text-xs text-bark">{formatDateShort(e.date)} · {e.meetingPoint}</div>
                          <div className="text-[11px] text-bark/60 mt-0.5">{e._count.attendances} inscritos{e.maxAttendees && ` de ${e.maxAttendees}`}</div>
                        </div>
                        <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-1 rounded-full">Inscrito</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Favorites tab */}
          {activeTab === 'favorites' && (
            <ScrollReveal>
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">Mis favoritos ({MY_FAVORITES.length})</h2>
                <div className="space-y-2">
                  {MY_FAVORITES.map((f) => (
                    <Link key={`${f.type}-${f.id}`} href={f.type === 'business' ? `/directory/${f.id}` : f.type === 'route' ? `/routes/${f.id}` : `/events/${f.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 card-hover cursor-pointer">
                        <span className="text-2xl">{f.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-dark">{f.name}</div>
                          <div className="text-[11px] text-bark">{f.subtitle}</div>
                        </div>
                        <button className="p-1.5 hover:bg-rose/10 rounded-lg transition-all" onClick={(e) => e.preventDefault()}>
                          <Heart size={16} className="fill-rose text-rose" />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
