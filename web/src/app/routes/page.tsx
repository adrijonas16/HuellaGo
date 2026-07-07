'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_ROUTES, DIFFICULTY_LABELS } from '@/lib/mock-data';
import { Route, MapPin, Clock, Star, Smartphone } from 'lucide-react';

export default function RoutesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Rutas de paseo 🗺️</h1>
              <p className="text-bark text-lg">Rutas calificadas por otros paseadores en Arequipa</p>
            </div>
          </div>

          {/* Info banner - routes only created in app */}
          <ScrollReveal>
            <div className="bg-secondary/5 border-2 border-secondary/15 rounded-card p-4 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Las rutas se crean desde la app</p>
                <p className="text-xs text-bark">Descarga HuellaGo en tu celular para crear y grabar rutas con GPS en tiempo real.</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ROUTES.map((route, i) => (
              <ScrollReveal key={route.id} delay={i * 80}>
                <Link href={`/routes/${route.id}`}>
                <div className="bg-white rounded-card shadow-card card-hover overflow-hidden cursor-pointer">
                  {/* Map placeholder */}
                  <div className="h-40 bg-gradient-to-br from-teal/10 to-primary/5 flex items-center justify-center relative">
                    <Route size={48} className="text-teal/20" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${route.difficulty === 'EASY' ? 'bg-success/15 text-success' : route.difficulty === 'MODERATE' ? 'bg-accent/15 text-amber-700' : 'bg-error/15 text-error'}`}>
                        {DIFFICULTY_LABELS[route.difficulty]}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading font-bold text-dark text-lg mb-1">{route.name}</h3>
                    <p className="text-sm text-bark mb-3 line-clamp-2">{route.description}</p>

                    <div className="flex items-center gap-4 text-sm text-bark mb-3">
                      <span className="flex items-center gap-1"><MapPin size={13} className="text-primary" /> {route.distance} km</span>
                      <span className="flex items-center gap-1"><Clock size={13} className="text-secondary" /> {route.duration} min</span>
                      <span className="flex items-center gap-1"><Star size={13} className="fill-accent text-accent" /> {route.avgRating}</span>
                    </div>

                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {route.hasShade && <span className="text-[10px] font-bold bg-teal/10 text-teal-dark px-2 py-1 rounded-full">🌳 Sombra</span>}
                      {route.hasWater && <span className="text-[10px] font-bold bg-info/10 text-info px-2 py-1 rounded-full">💧 Agua</span>}
                      {route.hasRestArea && <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-2 py-1 rounded-full">🪑 Descanso</span>}
                    </div>

                    <div className="text-xs text-bark/60">🐾 Realizada {route.timesWalked} veces</div>
                  </div>
                </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
