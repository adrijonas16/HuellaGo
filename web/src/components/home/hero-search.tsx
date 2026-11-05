'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { CategoryIcon } from '@/components/ui/category-icon';

const QUICK = [
  { key: 'VETERINARY', label: 'Veterinaria' },
  { key: 'EMERGENCY_CLINIC', label: 'Urgencias 24h' },
  { key: 'GROOMING', label: 'Baño y corte' },
  { key: 'WALKER', label: 'Paseador' },
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/directory?q=${encodeURIComponent(query)}` : '/directory');
  }

  return (
    <div>
      <form onSubmit={onSubmit} role="search" className="group flex items-center gap-2 bg-white rounded-full p-1.5 pl-5 shadow-card ring-1 ring-sand focus-within:ring-2 focus-within:ring-primary transition-shadow max-w-xl">
        <Search size={20} className="text-bark shrink-0" aria-hidden />
        <label htmlFor="hero-q" className="sr-only">Buscar servicios para tu mascota</label>
        <input
          id="hero-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Veterinaria en Cayma, grooming, hotel…"
          className="flex-1 min-w-0 bg-transparent outline-none text-dark placeholder:text-bark/60 py-2.5 text-[15px] sm:text-base"
          autoComplete="off"
        />
        <button type="submit" className="bg-primary text-white font-bold rounded-full px-5 sm:px-6 py-3 shadow-button boop-btn hover:bg-primary-dark">
          Buscar
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mt-4">
        {QUICK.map((c) => (
          <Link
            key={c.key}
            href={`/directory?category=${c.key}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-dark bg-white/70 border border-sand hover:border-primary hover:text-primary rounded-full px-3.5 py-1.5 transition-colors"
          >
            <CategoryIcon category={c.key} size={15} /> {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
