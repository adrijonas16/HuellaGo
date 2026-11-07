'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MOCK_EVENTS, ENERGY_LABELS, ENERGY_COLORS, SIZE_LABELS } from '@/lib/mock-data';
import { fetchApi } from '@/lib/api';
import { formatDateShort } from '@/lib/utils';
import { Calendar, MapPin, Users, Clock, Star, ChevronRight, Plus } from 'lucide-react';
import { useAppStore, useHydrated } from '@/lib/store';

function daysLabel(date: string) {
  const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  if (days < 0) return 'Finalizado';
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Mañana';
  return `En ${days} días`;
}
import { SafeImage } from '@/components/ui/safe-image';

export default function EventsPage() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [onlyFree, setOnlyFree] = useState(false);
  const hydrated = useHydrated();
  const registrations = useAppStore((s) => s.registrations);

  useEffect(() => {
    fetchApi<{ data: any[] }>('/events', { limit: '50' }).then((res) => {
      if (res?.data?.length) {
        // Ensure attendees array exists for graceful handling
        const normalized = res.data.map((e: any) => ({
          ...e,
          attendees: e.attendees || [],
          _count: e._count || { attendances: 0 },
          recommendedSize: e.recommendedSize || [],
        }));
        setEvents(normalized);
      }
    });
  }, []);

  const filtered = events
    .filter((e: any) => (!activeFilter || e.energyLevel === activeFilter) && (!onlyFree || e.isFree))
    .sort((a: any, b: any) => +new Date(a.date) - +new Date(b.date));

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pt-2">
            <div>
              <h1 className="font-heading font-extrabold text-dark leading-[0.95]" style={{ fontSize: 'clamp(38px, 5.4vw, 64px)', letterSpacing: '-0.045em' }}>
                Eventos pet friendly
              </h1>
              <p className="text-bark text-lg mt-3">Mascotatones, caminatas y ferias en Arequipa. Ordenados por fecha.</p>
            </div>
            <Link href="/events/create" className="self-start sm:self-auto shrink-0 inline-flex boop-btn items-center gap-2 bg-dark text-white font-bold px-5 py-3 rounded-full hover:bg-primary transition-colors text-sm">
              <Plus size={16} /> Organizar un evento
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveFilter(null)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !activeFilter ? 'bg-primary text-white shadow-button' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Todos ({events.length})
            </button>
            {['LOW', 'MEDIUM', 'HIGH'].map((level) => (
              <button
                key={level}
                onClick={() => setActiveFilter(activeFilter === level ? null : level)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === level ? 'bg-primary text-white shadow-button' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {ENERGY_LABELS[level]}
              </button>
            ))}
            <button
              onClick={() => setOnlyFree((v) => !v)}
              aria-pressed={onlyFree}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${onlyFree ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Solo gratis
            </button>
          </div>

          {filtered.length === 0 && (
            <div className="bg-white rounded-card p-10 text-center">
              <h2 className="font-heading font-bold text-xl text-dark">No hay eventos con esos filtros</h2>
              <p className="text-bark mt-2">Quita un filtro o vuelve pronto: se publican eventos nuevos cada semana.</p>
              <button onClick={() => { setActiveFilter(null); setOnlyFree(false); }} className="mt-5 font-bold text-primary link-route">Quitar filtros</button>
            </div>
          )}
          {/* Events grid */}
          <h2 className="sr-only">Lista de eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div
                  className="group bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}
                >
                  {/* Header con foto */}
                  <div className="h-40 relative overflow-hidden">
                    {event.photos?.[0]?.url ? (
                      <SafeImage src={event.photos[0].url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}20, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}05)` }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex justify-between">
                      {hydrated && registrations[event.id] ? (
                        <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full">Inscrito</span>
                      ) : (
                        <span className="bg-white text-dark text-xs font-bold px-3 py-1.5 rounded-full">{daysLabel(event.date)}</span>
                      )}
                      {event.isFree ? (
                        <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          Gratis
                        </span>
                      ) : (
                        <span className="bg-white/80 text-dark text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                          S/ {event.price}
                        </span>
                      )}
                    </div>
                    {event.route && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/90 text-primary-dark text-[11px] font-bold px-2 py-1 rounded-full">
                          Con ruta
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-bark mb-3 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-bark">
                        <Calendar size={14} className="text-primary shrink-0" />
                        <span>{formatDateShort(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-bark">
                        <MapPin size={14} className="text-secondary shrink-0" />
                        <span className="line-clamp-1">{event.meetingPoint}</span>
                      </div>
                      {event.endPoint && (
                        <div className="flex items-center gap-2 text-sm text-bark">
                          <ChevronRight size={14} className="text-gray-300 shrink-0" />
                          <span className="line-clamp-1">→ {event.endPoint}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-bark">
                        <Users size={14} className="text-accent shrink-0" />
                        <span>{event._count.attendances} inscritos{event.maxAttendees && ` de ${event.maxAttendees}`}</span>
                        {event.maxAttendees && (
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden ml-1">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${Math.min((event._count.attendances / event.maxAttendees) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex gap-1.5 flex-wrap">
                        {event.energyLevel && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: ENERGY_COLORS[event.energyLevel] + '15', color: ENERGY_COLORS[event.energyLevel] }}>
                            {ENERGY_LABELS[event.energyLevel]}
                          </span>
                        )}
                        {event.recommendedSize.length < 5 && event.recommendedSize.length > 0 && (
                          <span className="text-[11px] font-semibold text-bark bg-gray-100 px-2 py-0.5 rounded-full">
                            {event.recommendedSize.map((s: string) => SIZE_LABELS[s]).join(', ')}
                          </span>
                        )}
                      </div>
                      <div className="flex -space-x-2">
                        {(event.attendees || []).slice(0, 3).map((a: any, j: number) => (
                          <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                            {a.user?.firstName?.[0] || '?'}
                          </div>
                        ))}
                        {event._count.attendances > (event.attendees || []).length && (
                          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-[9px] font-bold flex items-center justify-center border-2 border-white">
                            +{event._count.attendances - (event.attendees || []).length}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
