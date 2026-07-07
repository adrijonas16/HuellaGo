'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MOCK_BUSINESSES, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/mock-data';
import { Star, MapPin, Heart, Clock } from 'lucide-react';

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(MOCK_BUSINESSES.map((b) => b.category)));

  const filtered = activeCategory
    ? MOCK_BUSINESSES.filter((b) => {
        const cats = (b as any).categories || [b.category];
        return cats.includes(activeCategory) || b.category === activeCategory;
      })
    : MOCK_BUSINESSES;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl text-dark mb-2">Directorio de Servicios 🐾</h1>
            <p className="text-gray-500 text-lg">Los mejores servicios pet en Arequipa</p>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !activeCategory ? 'bg-primary text-white shadow-button' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Todos ({MOCK_BUSINESSES.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeCategory === cat ? 'bg-primary text-white shadow-button' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((biz, i) => (
              <Link href={`/directory/${biz.id}`} key={biz.id}>
                <div className="group bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                  {/* Color header */}
                  <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[biz.category]}20, ${CATEGORY_COLORS[biz.category]}05)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                        {CATEGORY_ICONS[biz.category]}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-all" onClick={(e) => e.preventDefault()}>
                        <Heart size={14} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {biz.is24Hours && (
                        <span className="text-[10px] font-bold text-white bg-red-500/80 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                          <Clock size={10} /> 24H
                        </span>
                      )}
                      {biz.isVerified && (
                        <span className="text-[10px] font-bold text-white bg-primary/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          ✓ Verificado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
                          {biz.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {((biz as any).categories || [biz.category]).map((cat: string) => (
                            <span key={cat} className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] + '12', color: CATEGORY_COLORS[cat] }}>
                              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{biz.description}</p>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= Math.round(biz.avgRating) ? 'fill-accent text-accent' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-dark">{biz.avgRating}</span>
                      <span className="text-xs text-gray-400">({biz._count.reviews})</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin size={13} />
                      <span className="line-clamp-1">{biz.district}</span>
                    </div>

                    {biz.priceRange && (
                      <div className="mt-2 text-xs font-medium text-gray-500">{biz.priceRange}</div>
                    )}
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
