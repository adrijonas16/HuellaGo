'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MOCK_EVENTS, ENERGY_LABELS, ENERGY_COLORS, SIZE_LABELS } from '@/lib/mock-data';
import { formatDateFull, formatTime } from '@/lib/utils';
import { Calendar, MapPin, Users, Clock, ChevronLeft, Share2, Heart, CheckCircle, AlertCircle, Route, Camera, Upload } from 'lucide-react';
import { EventChat, ChatButton } from '@/components/chat/event-chat';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = MOCK_EVENTS.find((e) => e.id === id);
  const [chatOpen, setChatOpen] = useState(false);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h1 className="font-heading font-bold text-2xl text-dark mb-2">Evento no encontrado</h1>
            <Link href="/events" className="text-primary font-semibold hover:underline">Volver a eventos</Link>
          </div>
        </div>
      </>
    );
  }

  const spotsLeft = event.maxAttendees ? event.maxAttendees - event._count.attendances : null;
  const spotsPercent = event.maxAttendees ? (event._count.attendances / event.maxAttendees) * 100 : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back */}
          <Link href="/events" className="inline-flex items-center gap-1 text-gray-500 hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver a eventos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero */}
              <div className="rounded-card overflow-hidden h-56 md:h-72 relative flex items-end">
                {event.photos?.[0]?.url ? (
                  <img src={event.photos[0].url} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}30, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}08)` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all">
                    <Heart size={18} className="text-gray-600" />
                  </button>
                  <button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all">
                    <Share2 size={18} className="text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent/20 text-amber-700 text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                    Proximo
                  </span>
                </div>
                <div className="absolute right-8 bottom-4 text-[100px] opacity-10">
                  {event.energyLevel === 'HIGH' ? '🏃' : event.energyLevel === 'LOW' ? '🐕' : '🚶'}
                </div>
                <div className="p-6 relative">
                  <span className="text-sm text-gray-600 font-medium">
                    Organizado por {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-heading font-bold text-3xl text-dark mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.isFree ? (
                    <span className="bg-success/10 text-success text-sm font-bold px-4 py-1.5 rounded-full">Gratis</span>
                  ) : (
                    <span className="bg-secondary/10 text-secondary text-sm font-bold px-4 py-1.5 rounded-full">S/ {event.price}</span>
                  )}
                  {event.energyLevel && (
                    <span className="text-sm font-bold px-4 py-1.5 rounded-full" style={{ backgroundColor: ENERGY_COLORS[event.energyLevel] + '15', color: ENERGY_COLORS[event.energyLevel] }}>
                      Nivel: {ENERGY_LABELS[event.energyLevel]}
                    </span>
                  )}
                  {event.route && (
                    <span className="bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Route size={14} /> Con ruta trazada
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-heading font-bold text-dark text-lg mb-3">Sobre este evento</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Route info */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">Recorrido</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-3 h-3 bg-success rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark">Punto de partida</div>
                      <div className="text-sm text-gray-500">{event.meetingPoint}</div>
                    </div>
                  </div>
                  {event.endPoint && (
                    <>
                      <div className="ml-4 border-l-2 border-dashed border-gray-200 h-6" />
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-3 h-3 bg-error rounded-full" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-dark">Punto de llegada</div>
                          <div className="text-sm text-gray-500">{event.endPoint}</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {event.route && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-xl flex items-center gap-2">
                    <Route size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{event.route.name}</span>
                  </div>
                )}
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-heading font-bold text-dark text-lg mb-3">Requisitos</h2>
                <div className="space-y-2">
                  {event.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-success shrink-0" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-heading font-bold text-dark text-lg mb-3">Recomendado para</h2>
                <div className="flex flex-wrap gap-2">
                  {event.recommendedSize.map((size) => (
                    <span key={size} className="bg-cream text-dark text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                      🐕 Perros {SIZE_LABELS[size].toLowerCase()}s
                    </span>
                  ))}
                </div>
              </div>

              {/* Attendees */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-heading font-bold text-dark text-lg mb-4">
                  Asistentes ({event._count.attendances}{event.maxAttendees && ` / ${event.maxAttendees}`})
                </h2>

                {event.maxAttendees && (
                  <div className="mb-4">
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all" style={{ width: `${Math.min(spotsPercent, 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {spotsLeft !== null && spotsLeft > 0 ? `${spotsLeft} cupos disponibles` : 'Evento lleno'}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500">Perritos que asistiran 🐶</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.attendees.map((att, i) => (
                      <div key={i} className="flex items-center gap-3 bg-cream rounded-xl p-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-lg">
                          🐕
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-dark">{att.pet.name}</div>
                          <div className="text-xs text-gray-400">{att.pet.breed} · {att.user.firstName} {att.user.lastName}</div>
                        </div>
                      </div>
                    ))}
                    {event._count.attendances > event.attendees.length && (
                      <div className="flex items-center gap-3 bg-cream rounded-xl p-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500">
                          +{event._count.attendances - event.attendees.length}
                        </div>
                        <div className="text-sm text-gray-400">mas perritos inscritos</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-dark text-lg">Fotos del evento 📸</h2>
                  <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full boop-btn flex items-center gap-1">
                    <Upload size={12} /> Subir fotos
                  </button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-sand to-cream flex items-center justify-center text-2xl opacity-40 hover:opacity-70 cursor-pointer transition-all card-hover">
                      {['🐕', '🌳', '🐾', '🎉', '🐶', '📸', '🏃', '🐕‍🦺'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-bark/50 mt-3 text-center">Las fotos se habilitaran durante y despues del evento</p>
              </div>

              {/* Event chat preview */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-heading font-bold text-dark text-lg flex items-center gap-2">
                    💬 Chat del evento
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  </h2>
                  <span className="text-[11px] text-bark">6 en linea</span>
                </div>
                <div className="space-y-2 mb-3">
                  {[
                    { user: 'M', text: 'Alguien sabe si hay estacionamiento?', time: '09:15' },
                    { user: 'C', text: 'Si! En la calle de atras, gratis domingos', time: '09:18' },
                    { user: 'A', text: 'Mi perrito Rocky esta emocionado! 🐶', time: '09:22' },
                  ].map((msg, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-rose text-white text-[8px] font-bold flex items-center justify-center shrink-0">{msg.user}</div>
                      <div className="bg-cream rounded-xl rounded-tl-md px-3 py-1.5 text-xs text-dark flex-1">{msg.text}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setChatOpen(true)} className="w-full bg-primary/10 text-primary font-bold text-sm py-2.5 rounded-button boop-btn hover:bg-primary/20 transition-all">
                  Abrir chat completo
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sticky card */}
              <div className="bg-white rounded-card p-6 shadow-card lg:sticky lg:top-24">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark">
                        {formatDateFull(event.date)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatTime(event.date)}
                        {event.endDate && ` - ${formatTime(event.endDate)}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <MapPin size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark">{event.meetingPoint}</div>
                      <div className="text-sm text-gray-400">{event.district}, {event.city}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Users size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark">
                        {event._count.attendances} inscritos
                      </div>
                      <div className="text-sm text-gray-400">
                        {event.maxAttendees ? `${event.maxAttendees - event._count.attendances} cupos restantes` : 'Cupos ilimitados'}
                      </div>
                    </div>
                  </div>

                  {!event.isFree && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">💰</div>
                      <div>
                        <div className="text-xl font-bold text-dark">S/ {event.price}</div>
                        <div className="text-sm text-gray-400">por persona</div>
                      </div>
                    </div>
                  )}
                </div>

                <button className="w-full bg-primary text-white font-semibold py-4 rounded-button shadow-button hover:bg-primary-dark transition-all hover:scale-[1.01] active:scale-[0.99] text-lg">
                  Inscribirme 🐾
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Seleccionaras tu perrito en el siguiente paso
                </p>
              </div>

              {/* Organizer */}
              <div className="bg-white rounded-card p-6 shadow-card">
                <h3 className="font-heading font-bold text-dark text-sm mb-3">Organizador</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold flex items-center justify-center text-lg">
                    {event.organizer.firstName[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm">{event.organizer.firstName} {event.organizer.lastName}</div>
                    <div className="text-xs text-gray-400">Organizador</div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-amber-50 rounded-card p-5 border border-amber-100">
                <div className="flex items-start gap-2">
                  <AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 text-sm mb-1">Recomendaciones</h3>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• Lleva agua para tu perro</li>
                      <li>• Llega 15 minutos antes</li>
                      <li>• Usa correa en todo momento</li>
                      <li>• Recoge los desechos de tu mascota</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {!chatOpen && <ChatButton onClick={() => setChatOpen(true)} />}
      <EventChat eventTitle={event.title} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
