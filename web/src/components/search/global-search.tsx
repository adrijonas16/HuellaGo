'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, MapPin, Calendar, Route, Star } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_EVENTS, MOCK_ROUTES, CATEGORY_ICONS, CATEGORY_LABELS } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = query.toLowerCase();
  const results = query.length >= 2 ? {
    businesses: MOCK_BUSINESSES.filter((b) => b.name.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q) || b.district?.toLowerCase().includes(q)),
    events: MOCK_EVENTS.filter((e) => e.title.toLowerCase().includes(q) || e.meetingPoint.toLowerCase().includes(q)),
    routes: MOCK_ROUTES.filter((r) => r.name.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q)),
  } : null;

  const hasResults = results && (results.businesses.length > 0 || results.events.length > 0 || results.routes.length > 0);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Buscar (Ctrl+K)" className="p-2 xl:pl-3 xl:pr-2 rounded-full hover:bg-sand xl:bg-white xl:border xl:border-sand transition-colors flex items-center gap-2">
        <Search size={18} className="text-bark" />
        <span className="hidden xl:inline text-sm text-bark/70">Buscar</span>
        <kbd className="hidden xl:inline text-[11px] text-bark/60 bg-sand px-1.5 py-0.5 rounded-md font-body">Ctrl K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-dark/30 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative max-w-2xl mx-auto mt-[10vh] px-4 animate-slide-down">
            <div className="bg-white rounded-2xl shadow-card-hover overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-sand">
                <Search size={20} className="text-bark/40 shrink-0" />
                <input
                  ref={inputRef}
                  className="flex-1 outline-none text-dark text-base placeholder:text-bark/40"
                  placeholder="Buscar veterinarias, eventos, rutas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-bark/40 hover:text-bark"><X size={16} /></button>
                )}
                <button onClick={() => setOpen(false)} className="text-xs text-bark bg-sand px-2 py-1 rounded font-semibold">ESC</button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {!results && (
                  <div className="px-5 py-8 text-center text-bark/60 text-sm">
                    Escribe al menos 2 caracteres para buscar
                  </div>
                )}

                {results && !hasResults && (
                  <div className="px-5 py-8 text-center">
                    <Search size={32} className="mx-auto mb-2 text-bark/20" />
                    <p className="text-bark/60 text-sm">No se encontraron resultados para &quot;{query}&quot;</p>
                  </div>
                )}

                {results?.businesses && results.businesses.length > 0 && (
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold text-bark/40 uppercase tracking-wider px-2 mb-1">Negocios</p>
                    {results.businesses.slice(0, 4).map((b) => (
                      <Link key={b.id} href={`/directory/${b.id}`} onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-cream transition-colors cursor-pointer">
                          <span className="text-lg">{CATEGORY_ICONS[b.category]}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-dark truncate">{b.name}</div>
                            <div className="text-[11px] text-bark">{CATEGORY_LABELS[b.category]} · {b.district}</div>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0"><Star size={10} className="fill-accent text-accent" /><span className="text-xs font-bold">{b.avgRating}</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {results?.events && results.events.length > 0 && (
                  <div className="px-3 py-2 border-t border-sand/50">
                    <p className="text-[10px] font-bold text-bark/40 uppercase tracking-wider px-2 mb-1">Eventos</p>
                    {results.events.slice(0, 4).map((e) => (
                      <Link key={e.id} href={`/events/${e.id}`} onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-cream transition-colors cursor-pointer">
                          <Calendar size={16} className="text-accent shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-dark truncate">{e.title}</div>
                            <div className="text-[11px] text-bark">{formatDateShort(e.date)} · {e.meetingPoint}</div>
                          </div>
                          {e.isFree && <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full shrink-0">Gratis</span>}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {results?.routes && results.routes.length > 0 && (
                  <div className="px-3 py-2 border-t border-sand/50">
                    <p className="text-[10px] font-bold text-bark/40 uppercase tracking-wider px-2 mb-1">Rutas</p>
                    {results.routes.slice(0, 4).map((r) => (
                      <Link key={r.id} href={`/routes/${r.id}`} onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-cream transition-colors cursor-pointer">
                          <Route size={16} className="text-teal shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-dark truncate">{r.name}</div>
                            <div className="text-[11px] text-bark">{r.distance} km · {r.duration} min · {r.city}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
