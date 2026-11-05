'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { MOCK_BUSINESSES, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/mock-data';
import { Star, Phone, MapPin, Clock, X, ExternalLink, Heart, MessageCircle } from 'lucide-react';

const MapView = dynamic(() => import('@/components/map/map-view'), { ssr: false });

export default function MapPage() {
  const [selectedBiz, setSelectedBiz] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? MOCK_BUSINESSES.filter((b) => {
        const cats = (b as any).categories || [b.category];
        return cats.includes(activeCategory) || b.category === activeCategory;
      })
    : MOCK_BUSINESSES;

  const categories = Array.from(new Set(MOCK_BUSINESSES.map((b) => b.category)));

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos ({MOCK_BUSINESSES.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="flex-1 flex relative">
          {/* Map */}
          <div className="flex-1">
            <MapView
              businesses={filtered}
              onMarkerClick={(biz) => setSelectedBiz(biz)}
              selectedId={selectedBiz?.id}
            />
          </div>

          {/* Side panel */}
          {selectedBiz && (
            <div className="w-[420px] bg-white border-l border-gray-100 overflow-y-auto animate-slide-up hidden lg:block">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: CATEGORY_COLORS[selectedBiz.category] + '15' }}
                    >
                      {CATEGORY_ICONS[selectedBiz.category]}
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-lg text-dark">{selectedBiz.name}</h2>
                      <p className="text-sm text-gray-500">{CATEGORY_LABELS[selectedBiz.category]}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedBiz(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} className={s <= Math.round(selectedBiz.avgRating) ? 'fill-accent text-accent' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="font-bold text-sm">{selectedBiz.avgRating}</span>
                  <span className="text-sm text-gray-400">({selectedBiz._count.reviews} reseñas)</span>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {selectedBiz.is24Hours && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock size={12} /> 24 HORAS
                    </span>
                  )}
                  {selectedBiz.isVerified && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">✓ VERIFICADO</span>
                  )}
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Heart size={12} /> {selectedBiz._count.favorites}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{selectedBiz.address}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{selectedBiz.description}</p>

                {/* Services */}
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Servicios</h3>
                  <div className="space-y-2">
                    {selectedBiz.services.map((s: { name: string; price?: number }, i: number) => (
                      <div key={i} className="flex justify-between items-center py-2 px-3 bg-cream rounded-lg">
                        <span className="text-sm text-dark">{s.name}</span>
                        {s.price && <span className="text-sm font-bold text-primary">S/ {s.price}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                {selectedBiz.reviews.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-heading font-bold text-dark text-sm mb-3">Reseñas recientes</h3>
                    <div className="space-y-3">
                      {selectedBiz.reviews.map((r: any, i: number) => (
                        <div key={i} className="bg-cream rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                              {r.user.firstName[0]}
                            </div>
                            <span className="text-sm font-semibold text-dark">{r.user.firstName} {r.user.lastName}</span>
                            <div className="flex gap-0.5 ml-auto">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={10} className={s <= r.rating ? 'fill-accent text-accent' : 'text-gray-200'} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 sticky bottom-0 bg-white pt-4 border-t border-gray-100">
                  <a href={`tel:${String(selectedBiz.phone ?? '').replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-full boop-btn hover:bg-primary-dark">
                    <Phone size={16} /> Llamar
                  </a>
                  <a href={`https://wa.me/${String(selectedBiz.whatsapp ?? '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 rounded-full boop-btn hover:bg-secondary-dark">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom sheet */}
        {selectedBiz && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-5 z-50 animate-slide-up">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{CATEGORY_ICONS[selectedBiz.category]}</div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-dark">{selectedBiz.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star size={12} className="fill-accent text-accent" /> {selectedBiz.avgRating}
                  <span>({selectedBiz._count.reviews})</span>
                  <span className="mx-1">·</span>
                  {selectedBiz.address}
                </div>
              </div>
              <button onClick={() => setSelectedBiz(null)} aria-label="Cerrar" className="p-1.5 bg-gray-100 rounded-full">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${String(selectedBiz.phone ?? '').replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-full boop-btn hover:bg-primary-dark">
                    <Phone size={16} /> Llamar
                  </a>
              <a href={`https://wa.me/${String(selectedBiz.whatsapp ?? '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 rounded-full boop-btn hover:bg-secondary-dark">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
