import Link from 'next/link';
import { MapPin, Calendar, Route, Star, Users, Clock, ChevronRight, Zap, ArrowUpRight, Heart } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_EVENTS, MOCK_BUSINESSES, MOCK_ROUTES, MOCK_COMMUNITIES, PET_TYPES, CATEGORY_ICONS, CATEGORY_LABELS, ENERGY_LABELS, DIFFICULTY_LABELS, ENERGY_COLORS } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';
import { EventCarousel } from '@/components/banners/event-carousel';
import { fetchApi } from '@/lib/api';

function PawIcon({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="currentColor" aria-hidden={decorative ? 'true' : undefined} role={decorative ? 'presentation' : 'img'}>
      <ellipse cx="20" cy="28" rx="5" ry="6.5"/><ellipse cx="30" cy="22" rx="4.5" ry="6"/>
      <ellipse cx="40" cy="28" rx="5" ry="6.5"/><ellipse cx="25" cy="16" rx="3.5" ry="4.5"/>
      <ellipse cx="35" cy="16" rx="3.5" ry="4.5"/>
    </svg>
  );
}

const HERO_PETS = [
  {
    name: 'Gatos',
    desc: 'Veterinarias, grooming y todo para tu felino favorito',
    img: 'https://www.freepnglogos.com/uploads/cat-png/cute-cat-images-download-7.png',
    stat: '320+',
    statLabel: 'gatitos registrados',
    color: '#7C5CBF',
    bg: 'linear-gradient(145deg, #F3E8FF 0%, #E8DEFF 100%)',
    href: '/directory?petType=CAT',
  },
  {
    name: 'Perros',
    desc: 'Paseos, eventos, rutas y la mejor comunidad canina de Arequipa',
    img: 'https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png',
    stat: '2.1K+',
    statLabel: 'perritos registrados',
    color: '#E8825A',
    bg: 'linear-gradient(145deg, #FFF0E0 0%, #FFE0C8 100%)',
    featured: true,
    href: '/directory?petType=DOG',
  },
  {
    name: 'Conejos',
    desc: 'Encuentra veterinarias especialistas y comunidad conejil',
    img: 'https://www.freepnglogos.com/uploads/rabbit-png/download-rabbit-png-image-png-image-pngimg-4.png',
    stat: '85+',
    statLabel: 'conejitos registrados',
    color: '#38A169',
    bg: 'linear-gradient(145deg, #E6FFF0 0%, #C8F5D8 100%)',
    href: '/directory?petType=RABBIT',
  },
];

export default async function LandingPage() {
  // Fetch real data from API, fallback to mock data
  const [bizRes, evtRes, rtRes] = await Promise.all([
    fetchApi<{ data: any[]; meta: any }>('/businesses', { limit: '4' }).catch(() => null),
    fetchApi<{ data: any[]; meta: any }>('/events', { limit: '3' }).catch(() => null),
    fetchApi<{ data: any[]; meta: any }>('/routes', { limit: '3' }).catch(() => null),
  ]);

  const featuredBusinesses = bizRes?.data ?? MOCK_BUSINESSES.slice(0, 4);
  const upcomingEvents = evtRes?.data ?? MOCK_EVENTS.slice(0, 3);
  const popularRoutes = rtRes?.data ?? MOCK_ROUTES.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* ==================== HERO ==================== */}
        <section aria-label="Bienvenida" style={{ background: 'linear-gradient(160deg, #FFF9F2 0%, #FFF0E0 40%, #FFE8D6 70%, #FFF4EB 100%)' }} className="relative overflow-hidden">
          <div className="absolute top-20 right-[10%] animate-float-slow opacity-[0.04]"><PawIcon className="w-32 h-32 text-primary" decorative /></div>
          <div className="absolute bottom-32 left-[5%] animate-float opacity-[0.03]" style={{ animationDelay: '1.5s' }}><PawIcon className="w-24 h-24 text-secondary" decorative /></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24 pb-8">
            <div className="text-center animate-scale-in delay-100">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-5 py-2 rounded-full text-sm font-semibold border border-primary/10">
                <PawIcon className="w-4 h-4" decorative /> Disponible en Arequipa
              </span>
            </div>

            <div className="text-center mt-8">
              <h1 className="font-serif-display text-dark leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(40px, 7vw, 90px)' }}>
                <span className="inline-block animate-word-pop delay-200">Cada</span>{' '}
                <span className="inline-block animate-word-pop delay-300">Paseo</span>
                <br />
                <span className="inline-block animate-word-pop delay-400">Deja</span>{' '}
                <span className="inline-block animate-word-pop delay-500 gradient-text">Huella</span>
              </h1>
            </div>

            <p className="text-center text-dark/70 max-w-lg mx-auto mt-6 leading-relaxed animate-text-reveal delay-600" style={{ fontSize: 'clamp(15px, 1.6vw, 19px)' }}>
              Veterinarias, eventos, rutas y comunidad pet friendly. Todo lo que tu mascota necesita, en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10 animate-fade-up delay-700">
              <Link href="/map" className="boop-btn inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-full shadow-button hover:bg-primary-dark transition-all px-8 py-4 text-base">
                <MapPin size={20} /> Explorar mapa
              </Link>
              <Link href="/events" className="boop-btn inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold rounded-full shadow-card hover:shadow-card-hover transition-all px-8 py-4 text-base border-2 border-sand">
                <Calendar size={20} /> Ver eventos
              </Link>
            </div>

            <div className="flex justify-center gap-8 sm:gap-12 mt-10 animate-fade-up delay-800">
              {[
                { n: '2.8K+', l: 'Mascotas felices' },
                { n: '50+', l: 'Servicios registrados' },
                { n: '4.8', l: 'Calificacion promedio', icon: true },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {s.icon && <Star size={16} className="fill-accent text-accent" />}
                    <span className="font-extrabold text-dark" style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>{s.n}</span>
                  </div>
                  <div className="text-xs text-dark/50 font-medium mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pet cards */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 items-end">
              {HERO_PETS.map((pet, i) => (
                <div key={pet.name} className={`animate-fade-up ${pet.featured ? 'sm:-mt-6 delay-900' : i === 0 ? 'delay-1000' : 'delay-1100'}`}>
                  <Link href={pet.href} aria-label={`Ver servicios para ${pet.name.toLowerCase()}`}>
                    <div
                      className="rounded-card overflow-visible shadow-card card-hover group relative"
                      style={{ background: pet.bg }}
                    >
                      <div
                        className="relative flex justify-center"
                        style={{
                          height: pet.featured ? 280 : 230,
                          marginTop: pet.featured ? -40 : -24,
                          pointerEvents: 'none',
                        }}
                      >
                        <img
                          src={pet.img}
                          alt={`${pet.name} - ${pet.desc}`}
                          loading="lazy"
                          style={{
                            maxHeight: '100%',
                            maxWidth: '90%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                          className="group-hover:scale-110"
                        />
                      </div>

                      <div className="bg-white rounded-t-[28px] px-6 py-6 -mt-6 relative" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.03)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-heading font-extrabold text-dark text-xl group-hover:text-primary transition-colors">{pet.name}</h3>
                          <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: pet.color + '15', color: pet.color }}>
                            {pet.stat}
                          </span>
                        </div>
                        <p className="text-sm text-dark/60 leading-relaxed mb-4">{pet.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-dark/40 font-medium">{pet.statLabel}</span>
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: pet.color + '15' }}
                          >
                            <ArrowUpRight size={18} style={{ color: pet.color }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAROUSEL BANNER */}
        <section className="py-4 bg-white" aria-label="Eventos destacados">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <EventCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="py-20 bg-white" aria-label="Servicios">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading font-extrabold text-3xl text-dark mb-2">Servicios en Arequipa</h2>
                  <p className="text-dark/60">Veterinarias, grooming, hoteles y mas para tu mascota</p>
                </div>
                <Link href="/directory" className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline">Ver todos <ChevronRight size={16} /></Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredBusinesses.map((biz, i) => (
                <ScrollReveal key={biz.id} delay={i * 80}>
                  <Link href={`/directory/${biz.id}`}>
                    <div className="group bg-cream hover:bg-white rounded-card p-5 border-2 border-transparent hover:border-primary/20 card-hover cursor-pointer">
                      <div className="text-4xl mb-3 group-hover:animate-wiggle">{CATEGORY_ICONS[biz.category]}</div>
                      <h3 className="font-heading font-bold text-dark text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{biz.name}</h3>
                      <p className="text-xs text-dark/50 mb-2">{CATEGORY_LABELS[biz.category]}</p>
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-accent text-accent" />
                        <span className="text-xs font-bold">{biz.avgRating}</span>
                        <span className="text-xs text-dark/40">({biz._count.reviews})</span>
                      </div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {biz.is24Hours && <span className="text-[11px] font-bold text-rose bg-rose/10 px-2 py-0.5 rounded-full">24H</span>}
                        {biz.isVerified && <span className="text-[11px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">Verificado</span>}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            {/* Mobile "Ver todos" */}
            <div className="mt-6 text-center md:hidden">
              <Link href="/directory" className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                Ver todos los servicios <ChevronRight size={14} />
              </Link>
            </div>
            <ScrollReveal delay={300}>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-8 bg-sand/50 rounded-card p-4">
                {Object.entries(CATEGORY_ICONS).map(([key, icon]) => (
                  <Link href={`/directory?category=${key}`} key={key}>
                    <div className="text-center p-3 rounded-xl hover:bg-white hover:shadow-card transition-all cursor-pointer group">
                      <div className="text-2xl mb-1 group-hover:animate-wiggle">{icon}</div>
                      <div className="text-[11px] text-dark/50 group-hover:text-primary font-semibold">{CATEGORY_LABELS[key]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* EVENTOS */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #FFF4EB 0%, #FFF9F2 100%)' }} aria-label="Eventos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading font-extrabold text-3xl text-dark mb-2">Proximos eventos</h2>
                  <p className="text-dark/60">Mascotatones, caminatas y mas en tu ciudad</p>
                </div>
                <Link href="/events" className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline">Ver todos <ChevronRight size={16} /></Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 120}>
                  <Link href={`/events/${event.id}`}>
                    <div className="group bg-white rounded-card shadow-card card-hover overflow-hidden">
                      <div className="h-40 relative overflow-hidden">
                        {event.photos?.[0]?.url ? (
                          <img src={event.photos[0].url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}25, ${ENERGY_COLORS[event.energyLevel || 'MEDIUM']}08)` }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex justify-between">
                          <span className="bg-accent/25 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">Proximo</span>
                          {event.isFree ? (
                            <span className="bg-teal/20 text-teal-dark text-xs font-bold px-3 py-1.5 rounded-full">Gratis</span>
                          ) : (
                            <span className="bg-white/90 text-dark text-sm font-extrabold px-3 py-1.5 rounded-full">S/ {event.price}</span>
                          )}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-dark text-lg mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-dark/60"><Calendar size={14} className="text-primary" />{formatDateShort(event.date)}</div>
                          <div className="flex items-center gap-2 text-sm text-dark/60"><MapPin size={14} className="text-rose" />{event.meetingPoint}</div>
                          <div className="flex items-center gap-2 text-sm text-dark/60">
                            <Users size={14} className="text-secondary" />{event._count.attendances} inscritos{event.maxAttendees && ` de ${event.maxAttendees}`}
                            {event.maxAttendees && (
                              <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden ml-1">
                                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${Math.min((event._count.attendances / event.maxAttendees) * 100, 100)}%` }} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-sand">
                          {event.energyLevel && ENERGY_COLORS[event.energyLevel] && (
                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: ENERGY_COLORS[event.energyLevel] + '18', color: ENERGY_COLORS[event.energyLevel] }}>
                              <Zap size={10} className="inline -mt-0.5" /> {ENERGY_LABELS[event.energyLevel]}
                            </span>
                          )}
                          {event._count?.attendances > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Users size={13} className="text-dark/30" />
                              <span className="text-[11px] font-bold text-dark/50">{event._count.attendances} inscritos</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            {/* Mobile "Ver todos" */}
            <div className="mt-6 text-center md:hidden">
              <Link href="/events" className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                Ver todos los eventos <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ADOPCIONES */}
        <section className="py-20 bg-white" aria-label="Adopciones">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-card overflow-hidden" style={{ background: 'linear-gradient(135deg, #FDE8E8 0%, #FFF0F0 50%, #FFF5F0 100%)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <ScrollReveal>
                    <span className="inline-flex items-center gap-2 bg-rose/10 text-rose-dark px-4 py-1.5 rounded-full text-xs font-bold mb-6 w-fit">
                      <Heart size={14} className="fill-rose text-rose" /> Adopta, no compres
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl text-dark mb-4">Dale un hogar a quien mas lo necesita</h2>
                    <p className="text-dark/60 leading-relaxed mb-6">
                      Conoce mascotas en busca de familia. Perros, gatos y conejos rescatados por organizaciones de Arequipa esperan por ti.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/adoptions" className="boop-btn inline-flex items-center justify-center gap-2 bg-rose text-white font-semibold rounded-full hover:bg-rose-dark transition-all px-6 py-3 text-sm">
                        <Heart size={16} /> Ver mascotas en adopcion
                      </Link>
                      <Link href="/directory?category=SHELTER" className="inline-flex items-center justify-center gap-1 text-dark/60 font-medium text-sm hover:text-primary transition-colors">
                        Conocer refugios <ChevronRight size={14} />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
                <div className="hidden md:flex items-center justify-center p-8">
                  <ScrollReveal>
                    <div className="grid grid-cols-2 gap-4 max-w-xs">
                      {['🐕', '🐈', '🐇', '🐾'].map((emoji, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center card-hover">
                          <div className="text-4xl mb-2">{emoji}</div>
                          <div className="text-xs text-dark/50 font-medium">
                            {['Perros', 'Gatos', 'Conejos', 'Y mas...'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #FFF9F2 0%, #FFF4EB 100%)' }} aria-label="Funcionalidades">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="font-heading font-extrabold text-3xl text-dark mb-3">Lo que hace unico a HuellaGo</h2>
                <p className="text-dark/60 max-w-lg mx-auto">Funciones pensadas para ti y tu mascota, sea perro, gato, conejo o la que sea</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: <MapPin size={28} />, color: '#2EC4B6', title: 'Mapa centralizado', desc: 'Veterinarias, tiendas, parques y mas en un mapa interactivo.' },
                { icon: <Calendar size={28} />, color: '#7C5CBF', title: 'Eventos pet friendly', desc: 'Mascotatones, caminatas y ferias. Inscribete con un tap.' },
                { icon: <PawIcon className="w-7 h-7" />, color: '#E85D75', title: 'Huella del Paseo', desc: 'Cada paseo genera un recuerdo visual con ruta y fotos.' },
                { icon: <Users size={28} />, color: '#E8825A', title: 'Mascotas asistentes', desc: 'Ve que mascotas iran al evento. Perros, gatos y mas.' },
                { icon: <Heart size={28} />, color: '#38A169', title: 'Comunidades', desc: 'Unete a comunidades por tipo de mascota, raza o ciudad.' },
                { icon: <Route size={28} />, color: '#FFB627', title: 'Recrear ruta', desc: 'Repite paseos o crea eventos desde una ruta guardada.' },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 80}>
                  <div className="rounded-card p-6 card-hover border-2 border-sand hover:border-primary/15 bg-white" style={{ background: `linear-gradient(135deg, ${f.color}06, white)` }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: f.color + '15', color: f.color }}>
                      {f.icon}
                    </div>
                    <h3 className="font-heading font-bold text-dark mb-2">{f.title}</h3>
                    <p className="text-sm text-dark/60 leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TIPOS DE MASCOTAS */}
        <section className="py-16 bg-white" aria-label="Tipos de mascotas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-heading font-extrabold text-3xl text-dark mb-2">Para todo tipo de mascotas</h2>
                <p className="text-dark/60">No importa si es perro, gato, conejo o ave. En HuellaGo todos son bienvenidos.</p>
              </div>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4">
              {PET_TYPES.map((pet, i) => (
                <ScrollReveal key={pet.id} delay={i * 60}>
                  <div className="bg-cream rounded-card px-6 py-4 card-hover border-2 border-transparent hover:border-primary/20 text-center min-w-[110px] cursor-pointer">
                    <div className="text-4xl mb-2">{pet.icon}</div>
                    <div className="font-heading font-bold text-dark text-sm">{pet.name}</div>
                    <div className="text-[11px] text-dark/40 mt-1">{pet.count} miembros</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMUNIDADES */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #FFF9F2 0%, #FFF4EB 100%)' }} aria-label="Comunidades">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading font-extrabold text-3xl text-dark mb-2">Comunidades</h2>
                  <p className="text-dark/60">Unete a grupos por tipo de mascota, raza o interes</p>
                </div>
                <Link href="/community" className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline">Ver todas <ChevronRight size={16} /></Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_COMMUNITIES.map((com, i) => (
                <ScrollReveal key={com.id} delay={i * 70}>
                  <div className="group rounded-card p-5 card-hover border-2 border-transparent hover:border-primary/20 cursor-pointer bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: com.color + '15' }}>{com.icon}</div>
                      <div>
                        <h3 className="font-heading font-bold text-dark text-sm group-hover:text-primary transition-colors line-clamp-1">{com.name}</h3>
                        <div className="text-[11px] text-dark/40">{com.members} miembros</div>
                      </div>
                    </div>
                    <p className="text-xs text-dark/50 leading-relaxed line-clamp-2 mb-3">{com.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      {com.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sand text-dark/40">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/community" className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                Ver todas las comunidades <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* RUTAS */}
        <section className="py-20 bg-white" aria-label="Rutas de paseo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading font-extrabold text-3xl text-dark mb-2">Rutas populares</h2>
                  <p className="text-dark/60">Calificadas por otros paseadores de Arequipa</p>
                </div>
                <Link href="/routes" className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline">Ver todas <ChevronRight size={16} /></Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularRoutes.map((route, i) => (
                <ScrollReveal key={route.id} delay={i * 100}>
                  <Link href={`/routes/${route.id}`}>
                    <div className="bg-cream hover:bg-white rounded-card p-5 card-hover border-2 border-transparent hover:border-primary/15">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal/20 to-primary/10 rounded-2xl flex items-center justify-center">
                          <Route size={22} className="text-teal" />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${route.difficulty === 'EASY' ? 'bg-success/10 text-success' : route.difficulty === 'MODERATE' ? 'bg-accent/15 text-amber-700' : 'bg-error/10 text-error'}`}>
                          {DIFFICULTY_LABELS[route.difficulty]}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-dark mb-2">{route.name}</h3>
                      <p className="text-sm text-dark/60 mb-3 line-clamp-2">{route.description}</p>
                      <div className="flex items-center gap-4 text-sm text-dark/50 mb-3">
                        <span className="flex items-center gap-1"><MapPin size={13} className="text-primary" /> {route.distance} km</span>
                        <span className="flex items-center gap-1"><Clock size={13} className="text-secondary" /> {route.duration} min</span>
                        <span className="flex items-center gap-1"><Star size={13} className="fill-accent text-accent" /> {route.avgRating}</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {route.hasShade && <span className="text-[11px] font-bold bg-teal/10 text-teal-dark px-2 py-1 rounded-full">Sombra</span>}
                        {route.hasWater && <span className="text-[11px] font-bold bg-info/10 text-info px-2 py-1 rounded-full">Agua</span>}
                        {route.hasRestArea && <span className="text-[11px] font-bold bg-secondary/10 text-secondary px-2 py-1 rounded-full">Descanso</span>}
                      </div>
                      <div className="mt-3 text-xs text-dark/40">Realizada {route.timesWalked} veces</div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/routes" className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                Ver todas las rutas <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA MAPA */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D1B0E 0%, #4A2E1C 50%, #2D1B0E 100%)' }} aria-label="Mapa interactivo">
          <div className="absolute inset-0 opacity-5">
            <PawIcon className="w-48 h-48 absolute top-8 left-8 text-primary" decorative />
            <PawIcon className="w-36 h-36 absolute bottom-8 right-16 text-accent" decorative />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <ScrollReveal>
              <MapPin size={48} className="mx-auto mb-6 text-primary-light animate-float" />
              <h2 className="font-heading font-extrabold text-4xl text-white mb-4">Explora el mapa de Arequipa</h2>
              <p className="text-primary-light/80 max-w-lg mx-auto mb-10 text-lg">Veterinarias, grooming, tiendas, hoteles y mas con filtros inteligentes.</p>
              <Link href="/map" className="boop-btn inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-5 rounded-full shadow-button hover:bg-primary-dark transition-all text-lg">
                <MapPin size={22} /> Abrir mapa interactivo
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* NEGOCIOS */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #F3E8FF 0%, #FFF9F2 50%, #FFF0E0 100%)' }} aria-label="Para negocios">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-secondary" />
                </div>
                <h2 className="font-heading font-extrabold text-3xl text-dark mb-4">Lleva tu negocio pet al siguiente nivel</h2>
                <p className="text-dark/60 mb-8">Registra tu servicio y conecta con miles de duenos de mascotas en tu ciudad. Gratis.</p>
                <Link href="/business/register" className="boop-btn inline-flex items-center gap-2 bg-secondary text-white font-bold px-8 py-4 rounded-full shadow-button-secondary hover:bg-secondary-dark transition-all text-lg">
                  Registrar mi negocio gratis
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFE8D6 0%, #FFF0E0 30%, #FFF4EB 60%, #FFF9F2 100%)' }}>
          <div className="absolute -bottom-16 -right-16 opacity-[0.03] select-none animate-float-slow">
            <PawIcon className="w-64 h-64 text-dark" decorative />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <ScrollReveal>
              <PawIcon className="w-16 h-16 text-primary mx-auto mb-6 animate-float" decorative />
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-dark mb-5">
                Tu mascota merece la<br /><span className="gradient-text-fun">mejor experiencia</span>
              </h2>
              <p className="text-dark/60 max-w-lg mx-auto mb-10 text-lg">Descubre servicios, eventos, rutas y comunidad para ti y todas tus mascotas.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/map" className="boop-btn inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-10 py-5 rounded-full shadow-button hover:bg-primary-dark transition-all text-lg">
                  Empezar a explorar
                </Link>
                <Link href="/events" className="boop-btn inline-flex items-center justify-center gap-2 bg-white text-dark font-bold px-10 py-5 rounded-full shadow-card hover:shadow-card-hover transition-all text-lg border-2 border-sand">
                  Ver eventos
                </Link>
              </div>
              <p className="text-sm text-dark/40 mt-6">Gratis. Hecho con amor en Peru.</p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
