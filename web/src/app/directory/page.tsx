'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MOCK_BUSINESSES, CATEGORY_LABELS, CATEGORY_COLORS, PET_TYPE_LABELS } from '@/lib/mock-data';
import { fetchApi } from '@/lib/api';
import { Star, MapPin, Clock, Search, X, BadgeCheck, SlidersHorizontal } from 'lucide-react';
import { CategoryIcon } from '@/components/ui/category-icon';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { PawMark } from '@/components/layout/logo';

/** Normaliza para buscar sin importar tildes ni mayúsculas */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

type Sort = 'rating' | 'reviews' | 'name';

function DirectoryContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [businesses, setBusinesses] = useState<any[]>(MOCK_BUSINESSES);
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [only24, setOnly24] = useState(false);
  const [sort, setSort] = useState<Sort>('rating');
  const category = params.get('category');
  const petType = params.get('petType');

  useEffect(() => {
    fetchApi<{ data: any[] }>('/businesses', { limit: '50' }).then((res) => {
      if (res?.data?.length) setBusinesses(res.data);
    });
  }, []);

  // Sincroniza la búsqueda con la URL (compartible y con botón "atrás")
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (query.trim()) next.set('q', query.trim());
      else next.delete('q');
      if (next.toString() !== params.toString()) router.replace(`/directory?${next.toString()}`, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/directory${next.toString() ? `?${next}` : ''}`, { scroll: false });
  }

  const categories = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => (b.categories || [b.category]).forEach((c: string) => set.add(c)));
    return Array.from(set);
  }, [businesses]);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    const list = businesses.filter((b) => {
      const cats: string[] = b.categories || [b.category];
      if (category && !cats.includes(category)) return false;
      if (petType && b.petTypes && !b.petTypes.includes(petType)) return false;
      if (only24 && !b.is24Hours) return false;
      if (q) {
        const hay = norm([b.name, b.description, b.district, ...cats.map((c) => CATEGORY_LABELS[c])].join(' '));
        return q.split(/\s+/).every((w) => hay.includes(w));
      }
      return true;
    });
    return list.sort((a, b) =>
      sort === 'rating' ? b.avgRating - a.avgRating : sort === 'reviews' ? (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0) : a.name.localeCompare(b.name),
    );
  }, [businesses, category, petType, only24, query, sort]);

  const hasFilters = !!(category || petType || only24 || query);

  return (
    <main id="contenido" className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <header className="mb-8">
          <h1 className="font-heading font-extrabold text-dark leading-[0.95]" style={{ fontSize: 'clamp(38px, 5.4vw, 64px)', letterSpacing: '-0.045em' }}>
            Servicios para tu mascota
          </h1>
          <p className="text-bark text-lg mt-3">Veterinarias, grooming, hoteles y más en Arequipa, con reseñas de otros dueños.</p>
        </header>

        {/* Búsqueda */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <label className="flex-1 flex items-center gap-3 bg-white rounded-full px-5 ring-1 ring-sand focus-within:ring-2 focus-within:ring-primary transition-shadow">
            <Search size={18} className="text-bark shrink-0" />
            <span className="sr-only">Buscar en el directorio</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, servicio o distrito"
              className="flex-1 bg-transparent outline-none py-3.5 text-dark placeholder:text-bark/60"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Borrar búsqueda" className="p-1 rounded-full hover:bg-sand text-bark">
                <X size={16} />
              </button>
            )}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setOnly24((v) => !v)}
              aria-pressed={only24}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-bold border transition-colors ${only24 ? 'bg-rose text-white border-rose' : 'bg-white text-dark border-sand hover:border-bark-light'}`}
            >
              <Clock size={15} /> Abierto 24h
            </button>
            <label className="inline-flex items-center gap-2 rounded-full bg-white border border-sand pl-4 pr-2 text-sm font-semibold text-dark">
              <SlidersHorizontal size={15} className="text-bark" />
              <span className="sr-only">Ordenar por</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent outline-none py-3 pr-1 cursor-pointer">
                <option value="rating">Mejor valorados</option>
                <option value="reviews">Más reseñas</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </label>
          </div>
        </div>

        {/* Categorías */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1" role="group" aria-label="Filtrar por categoría">
          <button
            onClick={() => setParam('category', null)}
            aria-pressed={!category}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${!category ? 'bg-dark text-white' : 'bg-white text-dark border border-sand hover:border-bark-light'}`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setParam('category', category === cat ? null : cat)}
              aria-pressed={category === cat}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors inline-flex items-center gap-1.5 ${
                category === cat ? 'bg-dark text-white' : 'bg-white text-dark border border-sand hover:border-bark-light'
              }`}
            >
              <CategoryIcon category={cat} size={15} /> {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 mb-5 min-h-[32px]">
          <p className="text-sm text-bark" aria-live="polite">
            <strong className="text-dark">{filtered.length}</strong> {filtered.length === 1 ? 'resultado' : 'resultados'}
            {petType && <> para {(PET_TYPE_LABELS[petType] ?? petType).toLowerCase()}</>}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery('');
                setOnly24(false);
                router.replace('/directory', { scroll: false });
              }}
              className="text-sm font-bold text-primary link-route"
            >
              Quitar filtros
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-card p-10 text-center">
            <PawMark className="w-14 h-14 mx-auto text-primary/25" />
            <h2 className="font-heading font-bold text-xl text-dark mt-4">No encontramos servicios con esos filtros</h2>
            <p className="text-bark mt-2">Prueba con otra palabra o quita el filtro de categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((biz, i) => {
              const color = CATEGORY_COLORS[biz.category];
              return (
                <Link
                  href={`/directory/${biz.id}`}
                  key={biz.id}
                  className="group relative bg-white rounded-card overflow-hidden card-hover animate-slide-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                >
                  <div className="h-28 relative" style={{ backgroundColor: color + '14' }}>
                    <span className="absolute inset-0 overflow-hidden" aria-hidden>
                      <CategoryIcon
                        category={biz.category}
                        size={120}
                        strokeWidth={1.2}
                        className="absolute -right-4 -bottom-6 opacity-20 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-500"
                        style={{ color }}
                      />
                    </span>
                    <span className="absolute left-5 bottom-0 translate-y-1/2 w-14 h-14 rounded-2xl bg-white shadow-card flex items-center justify-center" style={{ color }}>
                      <CategoryIcon category={biz.category} size={26} />
                    </span>
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {biz.is24Hours && <span className="text-[11px] font-bold text-white bg-rose px-2 py-0.5 rounded-full">24h</span>}
                    </div>
                  </div>

                  <div className="p-5 pt-10">
                    <h2 className="font-heading font-bold text-dark text-lg leading-tight flex items-center gap-1.5 group-hover:text-primary transition-colors">
                      <span className="line-clamp-1">{biz.name}</span>
                      {biz.isVerified && <BadgeCheck size={18} className="text-primary shrink-0" aria-label="Verificado" />}
                    </h2>
                    <p className="text-sm text-bark mt-1">
                      {((biz.categories || [biz.category]) as string[]).map((c) => CATEGORY_LABELS[c]).join(', ')}
                    </p>
                    <p className="text-sm text-bark/90 mt-3 line-clamp-2">{biz.description}</p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-sand text-sm">
                      <span className="inline-flex items-center gap-1 font-bold text-dark">
                        <Star size={15} className="fill-accent text-accent" /> {biz.avgRating}
                        <span className="font-normal text-bark">({biz._count?.reviews ?? 0})</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-bark truncate">
                        <MapPin size={14} /> {biz.district}
                      </span>
                      {biz.priceRange && <span className="ml-auto text-bark whitespace-nowrap hidden sm:inline">{biz.priceRange}</span>}
                    </div>
                  </div>
                  <FavoriteButton kind="business" id={String(biz.id)} label={biz.name} subtitle={`${CATEGORY_LABELS[biz.category] ?? ''} en ${biz.district ?? biz.city ?? ''}`} className="absolute top-3 right-3" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default function DirectoryPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<main id="contenido" className="min-h-screen bg-cream" />}>
        <DirectoryContent />
      </Suspense>
      <Footer />
    </>
  );
}
