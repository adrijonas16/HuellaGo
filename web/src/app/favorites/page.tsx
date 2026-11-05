'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Star, MapPin, Calendar, Clock, Trash2, Heart } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_EVENTS, MOCK_ROUTES, CATEGORY_LABELS, CATEGORY_COLORS, DIFFICULTY_LABELS } from '@/lib/mock-data';
import { useAppStore, useHydrated } from '@/lib/store';
import { CategoryIcon } from '@/components/ui/category-icon';
import { RouteSketch } from '@/components/ui/route-sketch';
import { formatDateShort } from '@/lib/utils';
import { PawMark } from '@/components/layout/logo';

type Tab = 'business' | 'route' | 'event';

export default function FavoritesPage() {
  const hydrated = useHydrated();
  const favorites = useAppStore((s) => s.favorites);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const [tab, setTab] = useState<Tab>('business');

  // Cada favorito guarda su nombre y enlace, así funcionan tanto los datos
  // de ejemplo como los que llegan de la API.
  const entries = useMemo(() => {
    const by: Record<Tab, { id: string; label: string; href: string; subtitle?: string }[]> = { business: [], route: [], event: [] };
    if (!hydrated) return by;
    Object.entries(favorites).forEach(([k, meta]) => {
      const [kind, id] = k.split(':') as [Tab, string];
      if (!(kind in by)) return;
      const m = meta === true ? null : meta;
      const mockB = kind === 'business' ? MOCK_BUSINESSES.find((b) => String(b.id) === id) : null;
      const mockE = kind === 'event' ? MOCK_EVENTS.find((e) => e.id === id) : null;
      const mockR = kind === 'route' ? MOCK_ROUTES.find((r) => r.id === id) : null;
      const label = m?.label ?? mockB?.name ?? mockE?.title ?? mockR?.name ?? 'Favorito';
      const href = m?.href ?? (kind === 'business' ? `/directory/${id}` : kind === 'event' ? `/events/${id}` : `/routes/${id}`);
      const subtitle =
        m?.subtitle ??
        (mockB ? `${CATEGORY_LABELS[mockB.category]} en ${mockB.district}` : mockE ? `${formatDateShort(mockE.date)} · ${mockE.meetingPoint}` : mockR ? `${mockR.distance} km · ${mockR.duration} min · ${DIFFICULTY_LABELS[mockR.difficulty]}` : undefined);
      by[kind].push({ id, label, href, subtitle });
    });
    return by;
  }, [favorites, hydrated]);

  const businesses = entries.business;
  const routes = entries.route;
  const events = entries.event;

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'business', label: 'Servicios', count: businesses.length },
    { key: 'route', label: 'Rutas', count: routes.length },
    { key: 'event', label: 'Eventos', count: events.length },
  ];

  const empty = {
    business: { text: 'Guarda veterinarias, tiendas o paseadores con el corazón para encontrarlos rápido.', href: '/directory', cta: 'Explorar servicios' },
    route: { text: 'Guarda las rutas que quieras repetir con tu mascota.', href: '/routes', cta: 'Ver rutas' },
    event: { text: 'Guarda eventos para decidir después si te inscribes.', href: '/events', cta: 'Ver eventos' },
  }[tab];

  const list = tab === 'business' ? businesses : tab === 'route' ? routes : events;

  const RemoveBtn = ({ kind, id, label }: { kind: Tab; id: string; label: string }) => (
    <button
      onClick={() => toggle(kind, id, label)}
      aria-label={`Quitar ${label} de favoritos`}
      className="p-2.5 rounded-full text-bark hover:text-error hover:bg-error/5 transition-colors shrink-0"
    >
      <Trash2 size={18} />
    </button>
  );

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <h1 className="font-heading font-extrabold text-dark leading-none" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.045em' }}>
            Mis favoritos
          </h1>
          <p className="text-bark text-lg mt-3 mb-8">Lo que guardaste para volver después. Se guarda en este dispositivo.</p>

          <div className="inline-flex gap-1 p-1 bg-white border border-sand rounded-full mb-6" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${tab === t.key ? 'bg-dark text-white' : 'text-bark hover:text-dark'}`}
              >
                {t.label} <span className={tab === t.key ? 'text-white/60' : 'text-bark/60'}>{t.count}</span>
              </button>
            ))}
          </div>

          {!hydrated ? (
            <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-20 rounded-card" />)}</div>
          ) : list.length === 0 ? (
            <div className="bg-white rounded-card p-10 text-center animate-fade-in">
              <span className="w-16 h-16 mx-auto rounded-2xl bg-rose/10 text-rose flex items-center justify-center">
                <Heart size={28} />
              </span>
              <h2 className="font-heading font-bold text-xl text-dark mt-5">Todavía no guardaste nada aquí</h2>
              <p className="text-bark mt-2 max-w-sm mx-auto">{empty.text}</p>
              <Link href={empty.href} className="inline-flex mt-6 bg-primary text-white font-bold rounded-full px-6 py-3 shadow-button boop-btn">
                {empty.cta}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {(tab === 'business' ? businesses : tab === 'route' ? routes : events).map((f) => {
                const mockB = tab === 'business' ? MOCK_BUSINESSES.find((b) => String(b.id) === f.id) : null;
                const mockR = tab === 'route' ? MOCK_ROUTES.find((r) => r.id === f.id) : null;
                return (
                  <li key={f.id} className="bg-white rounded-card p-3 pr-2 flex items-center gap-3 animate-slide-up">
                    <Link href={f.href} className="flex items-center gap-4 flex-1 min-w-0 rounded-2xl p-1">
                      {mockR ? (
                        <RouteSketch waypoints={mockR.waypoints} className="w-12 h-12 rounded-2xl bg-cream shrink-0" />
                      ) : (
                        <span
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-primary-soft text-primary"
                          style={mockB ? { backgroundColor: CATEGORY_COLORS[mockB.category] + '18', color: CATEGORY_COLORS[mockB.category] } : undefined}
                        >
                          {mockB ? <CategoryIcon category={mockB.category} size={22} /> : tab === 'event' ? <Calendar size={22} /> : tab === 'route' ? <Clock size={22} /> : <Star size={22} />}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-heading font-bold text-dark truncate">{f.label}</span>
                        {f.subtitle && <span className="block text-sm text-bark truncate">{f.subtitle}</span>}
                      </span>
                    </Link>
                    <RemoveBtn kind={tab} id={f.id} label={f.label} />
                  </li>
                );
              })}
            </ul>
          )}
          <PawMark className="w-10 h-10 mx-auto mt-16 text-bark/15" />
        </div>
      </main>
      <Footer />
    </>
  );
}
