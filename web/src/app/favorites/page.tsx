'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Heart, Star, MapPin, Calendar, Route, Trash2 } from 'lucide-react';

const FAVORITES = {
  businesses: [
    { id: '1', name: 'Veterinaria Patitas Felices', category: 'Veterinaria', icon: '🏥', rating: 4.8, reviews: 124, district: 'Cayma' },
    { id: '3', name: 'Happy Paws Grooming', category: 'Grooming', icon: '✂️', rating: 4.9, reviews: 203, district: 'JLByR' },
    { id: '5', name: 'Hotel Canino Mi Segunda Casa', category: 'Hotel', icon: '🏨', rating: 4.5, reviews: 78, district: 'Sachaca' },
  ],
  routes: [
    { id: 'r2', name: 'Circuito Parque Selva Alegre', distance: 1.4, duration: 25, difficulty: 'Facil', rating: 4.8 },
    { id: 'r1', name: 'Ruta Centro Historico', distance: 2.1, duration: 35, difficulty: 'Facil', rating: 4.6 },
  ],
  events: [
    { id: 'e1', name: 'Mascotatone Arequipa 2026', date: '20 de julio', location: 'Plaza de Armas', free: true },
    { id: 'e4', name: 'Feria Pet Friendly Mall Aventura', date: '27 de julio', location: 'Mall Aventura', free: true },
  ],
};

export default function FavoritesPage() {
  const [tab, setTab] = useState<'businesses' | 'routes' | 'events'>('businesses');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading font-extrabold text-3xl text-dark mb-2">Mis favoritos</h1>
          <p className="text-bark mb-6">Lugares, rutas y eventos que guardaste</p>

          <div className="flex gap-2 mb-6">
            {[
              { key: 'businesses', label: `Negocios (${FAVORITES.businesses.length})` },
              { key: 'routes', label: `Rutas (${FAVORITES.routes.length})` },
              { key: 'events', label: `Eventos (${FAVORITES.events.length})` },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key as any)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === t.key ? 'bg-primary text-white shadow-button' : 'bg-white text-bark border border-sand'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'businesses' && (
            <div className="space-y-3">
              {FAVORITES.businesses.map((b, i) => (
                <ScrollReveal key={b.id} delay={i * 60}>
                  <div className="bg-white rounded-card shadow-card p-4 flex items-center gap-4 card-hover">
                    <Link href={`/directory/${b.id}`} className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-2xl shrink-0">{b.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-dark truncate">{b.name}</div>
                        <div className="text-xs text-bark">{b.category} · {b.district}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={11} className="fill-accent text-accent" />
                          <span className="text-xs font-bold">{b.rating}</span>
                          <span className="text-[10px] text-bark">({b.reviews})</span>
                        </div>
                      </div>
                    </Link>
                    <button className="p-2 hover:bg-error/5 rounded-lg transition-all boop-btn"><Trash2 size={16} className="text-bark/30 hover:text-error" /></button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {tab === 'routes' && (
            <div className="space-y-3">
              {FAVORITES.routes.map((r, i) => (
                <ScrollReveal key={r.id} delay={i * 60}>
                  <div className="bg-white rounded-card shadow-card p-4 flex items-center gap-4 card-hover">
                    <Link href={`/routes/${r.id}`} className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0"><Route size={20} className="text-teal" /></div>
                      <div className="flex-1">
                        <div className="font-semibold text-dark">{r.name}</div>
                        <div className="text-xs text-bark">{r.distance} km · {r.duration} min · {r.difficulty}</div>
                      </div>
                    </Link>
                    <button className="p-2 hover:bg-error/5 rounded-lg transition-all boop-btn"><Trash2 size={16} className="text-bark/30" /></button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {tab === 'events' && (
            <div className="space-y-3">
              {FAVORITES.events.map((e, i) => (
                <ScrollReveal key={e.id} delay={i * 60}>
                  <div className="bg-white rounded-card shadow-card p-4 flex items-center gap-4 card-hover">
                    <Link href={`/events/${e.id}`} className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Calendar size={20} className="text-accent" /></div>
                      <div className="flex-1">
                        <div className="font-semibold text-dark">{e.name}</div>
                        <div className="text-xs text-bark">{e.date} · {e.location}</div>
                      </div>
                      {e.free && <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">Gratis</span>}
                    </Link>
                    <button className="p-2 hover:bg-error/5 rounded-lg transition-all boop-btn"><Trash2 size={16} className="text-bark/30" /></button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
