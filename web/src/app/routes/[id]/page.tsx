'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_ROUTES, DIFFICULTY_LABELS } from '@/lib/mock-data';
import { fetchApi } from '@/lib/api';
import { MapPin, Clock, Star, ChevronLeft, Route, Footprints, Shield, Droplets, TreePine, Armchair, Smartphone } from 'lucide-react';

import { FavoriteButton } from '@/components/ui/favorite-button';
import { ShareButton } from '@/components/ui/share-button';

const RouteMap = dynamic(() => import('@/components/map/route-map'), { ssr: false });

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const mockRoute = MOCK_ROUTES.find((r) => r.id === params.id);
  const [route, setRoute] = useState<any>(mockRoute || null);
  const [loaded, setLoaded] = useState(!!mockRoute);

  useEffect(() => {
    fetchApi<any>(`/routes/${params.id}`).then((res) => {
      setLoaded(true);
      if (res) setRoute(res);
    });
  }, [params.id]);

  if (!route && !loaded) {
    return (
      <>
        <Navbar />
        <main id="contenido" className="min-h-screen bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4" aria-busy="true" aria-label="Cargando">
            <div className="skeleton h-56 rounded-card" />
            <div className="skeleton h-8 w-2/3" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-32 rounded-card" />
          </div>
        </main>
      </>
    );
  }

  if (!route) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <Route size={48} className="mx-auto mb-4 text-bark/30" />
            <h1 className="font-heading font-bold text-2xl text-dark mb-2">Ruta no encontrada</h1>
            <Link href="/routes" className="text-primary font-semibold hover:underline">Volver a rutas</Link>
          </div>
        </div>
      </>
    );
  }

  const diffColor = route.difficulty === 'EASY' ? 'success' : route.difficulty === 'MODERATE' ? 'accent' : 'error';

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/routes" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver a rutas
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map - takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card overflow-hidden">
                  <div className="h-[400px] md:h-[500px]">
                    <RouteMap route={route} />
                  </div>
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="font-heading font-bold text-dark text-lg mb-3">Sobre esta ruta</h2>
                  <p className="text-bark leading-relaxed">{route.description}</p>
                </div>
              </ScrollReveal>

              {/* Characteristics */}
              <ScrollReveal delay={150}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="font-heading font-bold text-dark text-lg mb-4">Caracteristicas</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${route.hasShade ? 'bg-teal/5 border border-teal/15' : 'bg-sand/50'}`}>
                      <TreePine size={20} className={route.hasShade ? 'text-teal' : 'text-bark/30'} />
                      <div>
                        <div className="text-sm font-semibold text-dark">Sombra</div>
                        <div className="text-[11px] text-bark">{route.hasShade ? 'Zona arbolada' : 'Sin sombra'}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${route.hasWater ? 'bg-info/5 border border-info/15' : 'bg-sand/50'}`}>
                      <Droplets size={20} className={route.hasWater ? 'text-info' : 'text-bark/30'} />
                      <div>
                        <div className="text-sm font-semibold text-dark">Agua</div>
                        <div className="text-[11px] text-bark">{route.hasWater ? 'Agua disponible' : 'Llevar agua'}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${route.hasRestArea ? 'bg-secondary/5 border border-secondary/15' : 'bg-sand/50'}`}>
                      <Armchair size={20} className={route.hasRestArea ? 'text-secondary' : 'text-bark/30'} />
                      <div>
                        <div className="text-sm font-semibold text-dark">Descanso</div>
                        <div className="text-[11px] text-bark">{route.hasRestArea ? 'Zonas de descanso' : 'Sin bancas'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Reviews placeholder */}
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-card shadow-card p-6">
                  <h2 className="font-heading font-bold text-dark text-lg mb-3">Comentarios de paseadores</h2>
                  <div className="space-y-3">
                    {[
                      { user: 'María G.', rating: 5, text: 'Excelente ruta! Mucha sombra y bien senalizada. Mi perro la disfruto mucho.', date: '3 jul' },
                      { user: 'Carlos Q.', rating: 4, text: 'Buena ruta, algo de trafico en la parte del centro pero en general segura.', date: '28 jun' },
                      { user: 'Ana T.', rating: 5, text: 'La hicimos con mi Golden y la paso genial. Hay piletas donde pueden tomar agua.', date: '20 jun' },
                    ].map((r, i) => (
                      <div key={i} className="border-b border-sand/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-[10px] font-bold flex items-center justify-center">{r.user[0]}</div>
                          <span className="text-sm font-semibold text-dark">{r.user}</span>
                          <div className="flex gap-0.5 ml-auto">
                            {Array.from({ length: 5 }, (_, j) => (
                              <Star key={j} size={10} className={j < r.rating ? 'fill-accent text-accent' : 'text-gray-200'} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-bark">{r.text}</p>
                        <p className="text-[10px] text-bark/40 mt-1">{r.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-6 lg:sticky lg:top-24">
                  <h1 className="font-heading font-extrabold text-2xl text-dark mb-4">{route.name}</h1>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-cream rounded-xl">
                      <Footprints size={18} className="mx-auto mb-1 text-primary" />
                      <div className="text-lg font-extrabold text-dark">{route.distance}</div>
                      <div className="text-[10px] text-bark">km</div>
                    </div>
                    <div className="text-center p-3 bg-cream rounded-xl">
                      <Clock size={18} className="mx-auto mb-1 text-secondary" />
                      <div className="text-lg font-extrabold text-dark">{route.duration}</div>
                      <div className="text-[10px] text-bark">min</div>
                    </div>
                    <div className="text-center p-3 bg-cream rounded-xl">
                      <Star size={18} className="mx-auto mb-1 text-accent" />
                      <div className="text-lg font-extrabold text-dark">{route.avgRating}</div>
                      <div className="text-[10px] text-bark">rating</div>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between py-3 border-t border-sand">
                    <span className="text-sm text-bark">Dificultad</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-${diffColor}/10 text-${diffColor}`}>
                      {DIFFICULTY_LABELS[route.difficulty]}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between py-3 border-t border-sand">
                    <span className="text-sm text-bark">Ubicación</span>
                    <span className="text-sm font-semibold text-dark">{route.district}, {route.city}</span>
                  </div>

                  {/* Times walked */}
                  <div className="flex items-center justify-between py-3 border-t border-sand">
                    <span className="text-sm text-bark">Veces realizada</span>
                    <span className="text-sm font-semibold text-dark">{route.timesWalked}</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 p-4 bg-secondary/5 rounded-xl border border-secondary/15">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone size={16} className="text-secondary" />
                      <span className="text-sm font-bold text-dark">Hacer esta ruta</span>
                    </div>
                    <p className="text-xs text-bark mb-3">Abre la ruta en tu app de mapas para seguirla con GPS.</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${route.startLat},${route.startLng}&destination=${route.endLat},${route.endLng}&travelmode=walking${
                        route.waypoints?.length > 2 ? `&waypoints=${route.waypoints.slice(1, -1).map((w: any) => `${w.lat},${w.lng}`).join('|')}` : ''
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full bg-primary text-white font-bold py-3 rounded-full shadow-button boop-btn hover:bg-primary-dark text-sm"
                    >
                      Empezar paseo con GPS
                    </a>
                  </div>

                  {/* Create event from route */}
                  <Link href="/events/create" className="block text-center mt-3 w-full border-2 border-dark text-dark font-bold py-3 rounded-full hover:bg-dark hover:text-white transition-colors text-sm">
                    Crear evento con esta ruta
                  </Link>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <FavoriteButton kind="route" id={route.id} label={route.name} subtitle={`${route.distance} km · ${route.duration} min`} className="shadow-none bg-cream" />
                    <ShareButton title={route.name} className="shadow-none bg-cream" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
