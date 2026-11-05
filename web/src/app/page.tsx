import Link from 'next/link';
import { MapPin, Star, Users, Clock, ChevronRight, Heart, Droplets, Trees, Armchair, Store } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PawMark } from '@/components/layout/logo';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { HeroWalk } from '@/components/home/hero-walk';
import { HeroSearch } from '@/components/home/hero-search';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { SafeImage } from '@/components/ui/safe-image';
import { CategoryIcon } from '@/components/ui/category-icon';
import { RouteSketch } from '@/components/ui/route-sketch';
import {
  MOCK_EVENTS,
  MOCK_BUSINESSES,
  MOCK_ROUTES,
  MOCK_COMMUNITIES,
  CATEGORY_LABELS,
  ENERGY_LABELS,
  DIFFICULTY_LABELS,
  ENERGY_COLORS,
  CATEGORY_COLORS,
} from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import { fetchApi } from '@/lib/api';

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const CATEGORIES = ['VETERINARY', 'EMERGENCY_CLINIC', 'GROOMING', 'WALKER', 'HOTEL', 'DAYCARE', 'STORE', 'TRAINER'];

function SectionHead({ title, desc, href, cta }: { title: string; desc: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8">
      <div className="max-w-xl">
        <h2 className="section-title">{title}</h2>
        <p className="text-bark mt-3 text-[17px] leading-relaxed">{desc}</p>
      </div>
      {href && (
        <Link href={href} className="hidden md:inline-flex shrink-0 items-center gap-1 font-bold text-dark hover:text-primary transition-colors">
          <span className="link-route">{cta}</span> <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}

function MobileMore({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="md:hidden mt-6 flex items-center justify-center gap-1 w-full rounded-full border border-sand bg-white py-3 font-bold text-dark">
      {label} <ChevronRight size={16} />
    </Link>
  );
}

export default async function LandingPage() {
  const [bizRes, evtRes, rtRes] = await Promise.all([
    fetchApi<{ data: any[] }>('/businesses', { limit: '4' }).catch(() => null),
    fetchApi<{ data: any[] }>('/events', { limit: '3' }).catch(() => null),
    fetchApi<{ data: any[] }>('/routes', { limit: '3' }).catch(() => null),
  ]);

  const featuredBusinesses: any[] = bizRes?.data?.length ? bizRes.data : [...MOCK_BUSINESSES].sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);
  const upcomingEvents: any[] = evtRes?.data?.length
    ? evtRes.data
    : [...MOCK_EVENTS].sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 3);
  const popularRoutes: any[] = rtRes?.data?.length ? rtRes.data : [...MOCK_ROUTES].sort((a, b) => b.timesWalked - a.timesWalked).slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="contenido">
        {/* ==================== HERO ==================== */}
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20 pb-20 lg:pb-28 grid lg:grid-cols-[1.08fr_1fr] gap-14 lg:gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-dark bg-white border border-sand rounded-full pl-1.5 pr-3.5 py-1 animate-fade-in">
                <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center">
                  <MapPin size={13} />
                </span>
                Ya disponible en Arequipa
              </p>

              <h1
                id="hero-title"
                className="font-heading font-extrabold text-dark mt-6"
                style={{ fontSize: 'clamp(52px, 8.4vw, 112px)', lineHeight: 0.88, letterSpacing: '-0.055em' }}
              >
                <span className="block animate-word-pop delay-100">Cada paseo</span>
                <span className="block animate-word-pop delay-200">
                  deja huella
                  <PawMark className="inline-block w-[0.42em] h-[0.42em] ml-[0.08em] -mb-[0.02em] text-primary align-baseline rotate-[18deg] animate-bounce-in delay-700" />
                </span>
              </h1>

              <p className="text-bark text-lg sm:text-xl leading-relaxed mt-6 max-w-[34ch] animate-text-reveal delay-300">
                Veterinarias, rutas para pasear y eventos pet friendly en tu ciudad. Todo lo que tu mascota necesita, cerca de ti.
              </p>

              <div className="mt-8 animate-fade-up delay-400">
                <HeroSearch />
              </div>

              <div className="flex items-center gap-3 mt-10 animate-fade-up delay-500">
                <div className="flex -space-x-2" aria-hidden>
                  {['🐕', '🐈', '🐇', '🦜'].map((e, i) => (
                    <span key={i} className="w-9 h-9 rounded-full bg-white ring-2 ring-cream flex items-center justify-center text-lg">{e}</span>
                  ))}
                </div>
                <p className="text-sm text-bark leading-snug">
                  <strong className="text-dark">2.800 mascotas</strong> y <strong className="text-dark">50 negocios</strong>
                  <br className="hidden sm:block" /> ya forman parte de la manada.
                </p>
              </div>
            </div>

            <HeroWalk />
          </div>
        </section>

        {/* ==================== EVENTOS ==================== */}
        <section aria-labelledby="eventos" className="py-20 bg-white rounded-t-[40px] sm:rounded-t-[56px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div id="eventos">
                <SectionHead
                  title="Próximos planes con tu mascota"
                  desc="Mascotatones, caminatas y ferias. Inscríbete en un toque y conoce a quién más va."
                  href="/events"
                  cta="Todos los eventos"
                />
              </div>
            </ScrollReveal>

            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-2">
              {upcomingEvents.map((event) => {
                const d = new Date(event.date);
                const energy = ENERGY_COLORS[event.energyLevel || 'MEDIUM'];
                const pct = event.maxAttendees ? Math.min((event._count.attendances / event.maxAttendees) * 100, 100) : 0;
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="group snap-start shrink-0 w-[82%] sm:w-[60%] md:w-auto bg-cream rounded-card overflow-hidden card-hover border border-sand/60"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <SafeImage
                        src={event.photos?.[0]?.url}
                        alt=""
                        fallback={<PawMark className="w-14 h-14 text-primary/30" />}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-white rounded-2xl px-3 py-2 text-center leading-none shadow-card">
                        <span className="block font-heading font-extrabold text-2xl text-dark">{d.getDate()}</span>
                        <span className="block text-[12px] font-semibold text-bark mt-1">{MONTHS[d.getMonth()]}</span>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${event.isFree ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                          {event.isFree ? 'Gratis' : `S/ ${event.price}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[13px] font-semibold text-bark first-letter:uppercase">
                        {WEEKDAYS[d.getDay()]}, {formatTime(event.date)}
                      </p>
                      <h3 className="font-heading font-bold text-dark text-xl leading-tight mt-1 group-hover:text-primary transition-colors">{event.title}</h3>
                      <p className="flex items-center gap-1.5 text-sm text-bark mt-2">
                        <MapPin size={14} className="shrink-0" /> <span className="truncate">{event.meetingPoint}</span>
                      </p>
                      <div className="mt-4 pt-4 border-t border-sand flex items-center gap-3">
                        <span className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: energy + '18', color: energy }}>
                          {ENERGY_LABELS[event.energyLevel || 'MEDIUM']}
                        </span>
                        <div className="flex-1 flex items-center gap-2 min-w-0">
                          <Users size={14} className="text-bark shrink-0" />
                          {event.maxAttendees ? (
                            <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden" title={`${event._count.attendances} de ${event.maxAttendees} cupos`}>
                              <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          ) : null}
                          <span className="text-[12px] font-semibold text-bark whitespace-nowrap">{event._count.attendances} van</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <MobileMore href="/events" label="Todos los eventos" />
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <section aria-labelledby="servicios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div id="servicios">
                <SectionHead
                  title="Lo que tu mascota necesita, cerca"
                  desc="Negocios revisados por el equipo de HuellaGo, con reseñas reales de otros dueños."
                  href="/directory"
                  cta="Ver directorio"
                />
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 [&>*]:min-w-0">
              {/* categorías */}
              <ScrollReveal>
                <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-2 sm:gap-3 bg-cream rounded-card p-2.5 sm:p-4 h-full content-start">
                  {CATEGORIES.map((key) => (
                    <Link
                      key={key}
                      href={`/directory?category=${key}`}
                      className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-white p-1.5 sm:p-4 aspect-square min-w-0 hover:bg-dark hover:text-white transition-colors"
                    >
                      <span
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-spring"
                        style={{ backgroundColor: CATEGORY_COLORS[key] + '18', color: CATEGORY_COLORS[key] }}
                      >
                        <CategoryIcon category={key} size={22} />
                      </span>
                      <span className="text-[11px] sm:text-[13px] font-semibold text-center leading-tight break-words hyphens-auto w-full">{CATEGORY_LABELS[key]}</span>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              {/* destacados */}
              <ScrollReveal>
                <ul className="divide-y divide-sand border border-sand rounded-card overflow-hidden">
                  {featuredBusinesses.map((biz) => (
                    <li key={biz.id} className="relative group">
                      <Link href={`/directory/${biz.id}`} className="flex items-center gap-4 p-4 sm:p-5 pr-16 hover:bg-cream transition-colors">
                        <span
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: CATEGORY_COLORS[biz.category] + '18', color: CATEGORY_COLORS[biz.category] }}
                        >
                          <CategoryIcon category={biz.category} size={22} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-heading font-bold text-dark text-[17px] truncate group-hover:text-primary transition-colors">{biz.name}</span>
                            {biz.is24Hours && <span className="shrink-0 text-[11px] font-bold text-white bg-rose px-2 py-0.5 rounded-full">24h</span>}
                          </span>
                          <span className="flex items-center gap-3 text-sm text-bark mt-0.5">
                            <span className="inline-flex items-center gap-1 font-semibold text-dark">
                              <Star size={14} className="fill-accent text-accent" /> {biz.avgRating}
                              <span className="font-normal text-bark">({biz._count?.reviews ?? 0})</span>
                            </span>
                            <span className="truncate">{CATEGORY_LABELS[biz.category]} en {biz.district}</span>
                          </span>
                        </span>
                      </Link>
                      <FavoriteButton kind="business" id={String(biz.id)} label={biz.name} subtitle={`${CATEGORY_LABELS[biz.category] ?? ''} en ${biz.district ?? biz.city ?? ''}`} className="absolute right-4 top-1/2 -translate-y-1/2" />
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <MobileMore href="/directory" label="Ver directorio" />
          </div>
        </section>

        {/* ==================== RUTAS ==================== */}
        <section aria-labelledby="rutas" className="py-20 bg-cream map-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div id="rutas">
                <SectionHead
                  title="Rutas que otros ya caminaron"
                  desc="Con sombra, agua y lugares para descansar marcados por la comunidad."
                  href="/routes"
                  cta="Explorar rutas"
                />
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5">
              {popularRoutes.map((route) => (
                <ScrollReveal key={route.id}>
                  <Link href={`/routes/${route.id}`} className="group block bg-white rounded-card p-5 card-hover h-full">
                    <div className="flex items-start gap-4">
                      <RouteSketch waypoints={route.waypoints} className="w-24 h-24 shrink-0 rounded-2xl bg-cream group-hover:bg-primary-soft transition-colors" />
                      <div className="min-w-0">
                        <span className={`inline-block text-[12px] font-bold px-2.5 py-0.5 rounded-full ${route.difficulty === 'EASY' ? 'bg-secondary/10 text-secondary' : route.difficulty === 'MODERATE' ? 'bg-accent-soft text-[#8A5A00]' : 'bg-rose/10 text-rose-dark'}`}>
                          {DIFFICULTY_LABELS[route.difficulty]}
                        </span>
                        <h3 className="font-heading font-bold text-dark text-lg leading-tight mt-2 group-hover:text-primary transition-colors">{route.name}</h3>
                        <p className="text-sm text-bark mt-1">{route.district}</p>
                      </div>
                    </div>
                    <dl className="grid grid-cols-3 gap-2 mt-5 text-center">
                      <div className="bg-cream rounded-xl py-2">
                        <dt className="text-[12px] text-bark">Distancia</dt>
                        <dd className="font-heading font-bold text-dark">{route.distance} km</dd>
                      </div>
                      <div className="bg-cream rounded-xl py-2">
                        <dt className="text-[12px] text-bark">Duración</dt>
                        <dd className="font-heading font-bold text-dark flex items-center justify-center gap-1"><Clock size={13} />{route.duration} min</dd>
                      </div>
                      <div className="bg-cream rounded-xl py-2">
                        <dt className="text-[12px] text-bark">Valoración</dt>
                        <dd className="font-heading font-bold text-dark flex items-center justify-center gap-1"><Star size={13} className="fill-accent text-accent" />{route.avgRating}</dd>
                      </div>
                    </dl>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {route.hasShade && <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full"><Trees size={12} /> Sombra</span>}
                      {route.hasWater && <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-info bg-info/10 px-2 py-1 rounded-full"><Droplets size={12} /> Agua</span>}
                      {route.hasRestArea && <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-bark bg-sand px-2 py-1 rounded-full"><Armchair size={12} /> Descanso</span>}
                      <span className="ml-auto text-[12px] text-bark self-center">{route.timesWalked} paseos</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <MobileMore href="/routes" label="Explorar rutas" />
          </div>
        </section>

        {/* ==================== ADOPCIÓN ==================== */}
        <section aria-labelledby="adopción" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[36px] bg-rose text-white px-6 py-12 sm:px-12 sm:py-16 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
                <PawMark aria-hidden className="absolute -right-10 -bottom-12 w-72 h-72 text-white/10 rotate-[24deg]" />
                <div className="relative">
                  <h2 id="adopción" className="font-heading font-extrabold leading-[0.95]" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', letterSpacing: '-0.045em' }}>
                    71 mascotas esperan un hogar en Arequipa
                  </h2>
                  <p className="text-white/85 text-lg mt-5 max-w-md">
                    Conoce a perros, gatos y conejos rescatados por refugios locales. Puedes adoptar, ser hogar temporal o apadrinar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link href="/adoptions" className="inline-flex items-center justify-center gap-2 bg-white text-rose-dark font-bold rounded-full px-6 py-3.5 boop-btn">
                      <Heart size={18} className="fill-rose text-rose" /> Conocer mascotas
                    </Link>
                    <Link href="/adoptions#refugios" className="inline-flex items-center justify-center gap-1 font-bold rounded-full px-6 py-3.5 ring-2 ring-white/40 hover:ring-white transition-shadow">
                      Ver refugios
                    </Link>
                  </div>
                </div>
                <div className="relative grid grid-cols-3 gap-3" aria-hidden>
                  {['🐕', '🐈', '🐇', '🐈‍⬛', '🐩', '🐹'].map((e, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-4xl sm:text-5xl ${i % 2 ? 'translate-y-4' : ''}`}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== COMUNIDAD + NEGOCIOS ==================== */}
        <section aria-labelledby="comunidad" className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.5fr_1fr] gap-6">
            <ScrollReveal>
              <div className="rounded-card border border-sand p-6 sm:p-8 h-full">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <h2 id="comunidad" className="font-heading font-extrabold text-dark text-3xl leading-none" style={{ letterSpacing: '-0.035em' }}>
                    Encuentra tu manada
                  </h2>
                  <Link href="/community" className="text-sm font-bold text-primary link-route shrink-0">Ver comunidades</Link>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {MOCK_COMMUNITIES.slice(0, 4).map((c) => (
                    <li key={c.id}>
                      <Link href="/community" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-cream transition-colors">
                        <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: c.color + '18' }} aria-hidden>
                          {c.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-heading font-bold text-dark truncate">{c.name}</span>
                          <span className="block text-sm text-bark">{c.members.toLocaleString('es-PE')} miembros</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-card bg-accent p-6 sm:p-8 h-full flex flex-col">
                <span className="w-12 h-12 rounded-2xl bg-dark text-accent flex items-center justify-center">
                  <Store size={22} />
                </span>
                <h2 className="font-heading font-extrabold text-dark text-3xl leading-none mt-6" style={{ letterSpacing: '-0.035em' }}>
                  ¿Tienes un negocio pet?
                </h2>
                <p className="text-dark/75 mt-3 flex-1">
                  Aparece en el mapa, publica promociones y recibe reseñas de dueños de mascotas en tu distrito. El plan básico es gratis.
                </p>
                <Link href="/business/register" className="mt-6 inline-flex items-center justify-center gap-2 bg-dark text-white font-bold rounded-full px-6 py-3.5 boop-btn hover:bg-primary transition-colors">
                  Registrar mi negocio
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
