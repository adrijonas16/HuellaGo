'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_BUSINESSES, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS, PET_TYPE_ICONS, PET_TYPE_LABELS } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { Star, MapPin, Phone, MessageCircle, Heart, Clock, ChevronLeft, Shield, ExternalLink, Globe, Tag, Percent } from 'lucide-react';
import { AdSlot } from '@/components/ads/ad-slot';

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const biz = MOCK_BUSINESSES.find((b) => b.id === id);

  if (!biz) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h1 className="font-heading font-bold text-2xl text-dark mb-2">Negocio no encontrado</h1>
            <Link href="/directory" className="text-primary font-semibold hover:underline">Volver al directorio</Link>
          </div>
        </div>
      </>
    );
  }

  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  // Group services by category
  const servicesByCategory: Record<string, typeof biz.services> = {};
  biz.services.forEach((s: any) => {
    const cat = s.category || biz.category;
    if (!servicesByCategory[cat]) servicesByCategory[cat] = [];
    servicesByCategory[cat].push(s);
  });

  const allCategories = (biz as any).categories || [biz.category];
  const petTypes = (biz as any).petTypes || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/directory" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver al directorio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero */}
              <ScrollReveal>
                <div className="rounded-card overflow-hidden h-56 relative" style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[biz.category]}25, ${CATEGORY_COLORS[biz.category]}05)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px] opacity-15">{CATEGORY_ICONS[biz.category]}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white boop-btn"><Heart size={18} className="text-bark" /></button>
                    <button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white boop-btn"><ExternalLink size={18} className="text-bark" /></button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Info */}
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-card p-6 shadow-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ backgroundColor: CATEGORY_COLORS[biz.category] + '15' }}>
                      {CATEGORY_ICONS[biz.category]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="font-heading font-extrabold text-2xl text-dark mb-2">{biz.name}</h1>
                      {/* All categories */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {allCategories.map((cat: string) => (
                          <span key={cat} className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: CATEGORY_COLORS[cat] + '12', color: CATEGORY_COLORS[cat] }}>
                            {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                          </span>
                        ))}
                      </div>
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {biz.is24Hours && <span className="text-[10px] font-bold text-rose bg-rose/10 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> 24 HORAS</span>}
                        {biz.isVerified && <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full flex items-center gap-1"><Shield size={10} /> VERIFICADO</span>}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={18} className={s <= Math.round(biz.avgRating) ? 'fill-accent text-accent' : 'text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-dark">{biz.avgRating}</span>
                    <span className="text-sm text-bark">({biz._count.reviews} resenas) · {biz._count.favorites} favoritos</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-bark mb-4">
                    <MapPin size={16} className="text-primary shrink-0" />
                    {biz.address}
                  </div>

                  <p className="text-bark leading-relaxed">{biz.description}</p>
                </div>
              </ScrollReveal>

              {/* Pet types */}
              {petTypes.length > 0 && (
                <ScrollReveal delay={150}>
                  <div className="bg-white rounded-card p-6 shadow-card">
                    <h2 className="font-heading font-bold text-dark text-lg mb-4">Mascotas que atendemos 🐾</h2>
                    <div className="flex flex-wrap gap-2">
                      {petTypes.map((pt: string) => (
                        <span key={pt} className="flex items-center gap-1.5 bg-cream px-4 py-2 rounded-full text-sm font-medium text-dark border border-sand">
                          {PET_TYPE_ICONS[pt]} {PET_TYPE_LABELS[pt]}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Services grouped by category */}
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-card p-6 shadow-card">
                  <h2 className="font-heading font-bold text-dark text-lg mb-6">Servicios y precios</h2>

                  <div className="space-y-8">
                    {Object.entries(servicesByCategory).map(([cat, services]) => (
                      <div key={cat}>
                        {/* Category header */}
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2" style={{ borderColor: CATEGORY_COLORS[cat] + '30' }}>
                          <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                          <h3 className="font-heading font-bold text-dark">{CATEGORY_LABELS[cat]}</h3>
                          <span className="text-xs text-bark bg-sand px-2 py-0.5 rounded-full">{services.length} servicios</span>
                        </div>

                        <div className="space-y-2">
                          {services.map((s: any, i: number) => (
                            <div key={i} className="flex items-start justify-between py-3 px-4 rounded-xl hover:bg-cream transition-colors group">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-dark text-sm group-hover:text-primary transition-colors">{s.name}</div>
                                {s.description && <div className="text-xs text-bark mt-0.5">{s.description}</div>}
                                {s.duration && <div className="text-[11px] text-bark mt-1 flex items-center gap-1"><Clock size={10} /> {s.duration} min</div>}
                              </div>
                              <div className="text-right shrink-0 ml-4">
                                {s.price ? (
                                  <span className="font-bold text-primary text-sm">S/ {s.price}</span>
                                ) : (
                                  <span className="text-xs text-bark">Consultar</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {biz.priceRange && (
                    <p className="text-xs text-bark mt-6 pt-4 border-t border-sand">Rango de precios general: {biz.priceRange}</p>
                  )}
                </div>
              </ScrollReveal>

              {/* Promotions */}
              {(biz as any).promotions?.length > 0 && (
                <ScrollReveal delay={240}>
                  <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-card p-6 border-2 border-accent/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag size={20} className="text-accent" />
                      <h2 className="font-heading font-bold text-dark text-lg">Promociones activas</h2>
                    </div>
                    <div className="space-y-3">
                      {(biz as any).promotions.map((promo: any, i: number) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center shrink-0">
                              <Percent size={18} className="text-accent" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-dark text-sm">{promo.title}</h3>
                              <p className="text-xs text-bark mt-0.5">{promo.description}</p>
                              <p className="text-[10px] text-bark/60 mt-1">Valido hasta {formatDate(promo.endDate)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Hours */}
              {biz.hours.length > 0 && (
                <ScrollReveal delay={250}>
                  <div className="bg-white rounded-card p-6 shadow-card">
                    <h2 className="font-heading font-bold text-dark text-lg mb-4">Horarios</h2>
                    <div className="space-y-2">
                      {biz.hours.map((h: any, i: number) => {
                        const isToday = new Date().getDay() === h.dayOfWeek;
                        return (
                          <div key={i} className={`flex justify-between items-center py-2.5 px-3 rounded-lg ${isToday ? 'bg-primary/5 border border-primary/20' : ''}`}>
                            <span className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-dark'}`}>
                              {days[h.dayOfWeek]} {isToday && '(Hoy)'}
                            </span>
                            {h.isClosed ? (
                              <span className="text-sm text-error font-medium">Cerrado</span>
                            ) : (
                              <span className="text-sm text-bark">{h.openTime} - {h.closeTime}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Reviews */}
              {biz.reviews.length > 0 && (
                <ScrollReveal delay={300}>
                  <div className="bg-white rounded-card p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-heading font-bold text-dark text-lg">Resenas</h2>
                      <button className="text-sm font-semibold text-primary hover:underline">Escribir resena</button>
                    </div>
                    <div className="space-y-4">
                      {biz.reviews.map((r: any, i: number) => (
                        <div key={i} className="border-b border-sand pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-bold flex items-center justify-center">
                              {r.user.firstName[0]}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-dark">{r.user.firstName} {r.user.lastName}</div>
                              <div className="text-xs text-bark">{formatDate(r.createdAt)}</div>
                            </div>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={12} className={s <= r.rating ? 'fill-accent text-accent' : 'text-gray-200'} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-bark">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-card p-6 shadow-card lg:sticky lg:top-24">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-button boop-btn hover:bg-primary-dark transition-all shadow-button">
                      <Phone size={16} /> Llamar
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-success text-white font-bold py-3.5 rounded-button boop-btn hover:bg-green-700 transition-all">
                      <MessageCircle size={16} /> WhatsApp
                    </button>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold py-3 rounded-button hover:bg-primary/5 transition-all mb-3">
                    <MapPin size={16} /> Como llegar
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-cream text-bark font-medium py-3 rounded-button hover:bg-sand transition-all">
                    <Heart size={16} /> Guardar en favoritos
                  </button>
                </div>
              </ScrollReveal>

              {/* Quick summary */}
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-card p-6 shadow-card">
                  <h3 className="font-heading font-bold text-dark text-sm mb-4">Resumen</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-bark">Servicios</span>
                      <span className="font-bold text-dark">{biz.services.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-bark">Categorias</span>
                      <span className="font-bold text-dark">{allCategories.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-bark">Mascotas</span>
                      <div className="flex gap-0.5">
                        {petTypes.slice(0, 5).map((pt: string) => (
                          <span key={pt} title={PET_TYPE_LABELS[pt]}>{PET_TYPE_ICONS[pt]}</span>
                        ))}
                        {petTypes.length > 5 && <span className="text-xs text-bark">+{petTypes.length - 5}</span>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-bark">Resenas</span>
                      <span className="font-bold text-dark">{biz._count.reviews}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-bark">Favoritos</span>
                      <span className="font-bold text-dark">{biz._count.favorites}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Web & Social */}
              {((biz as any).website || (biz as any).instagram || (biz as any).facebook) && (
                <ScrollReveal delay={280}>
                  <div className="bg-white rounded-card p-6 shadow-card">
                    <h3 className="font-heading font-bold text-dark text-sm mb-3">Enlaces</h3>
                    <div className="space-y-2">
                      {(biz as any).website && (
                        <a href={(biz as any).website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                          <Globe size={14} /> {(biz as any).website.replace('https://', '')}
                        </a>
                      )}
                      {(biz as any).instagram && (
                        <a href={`https://instagram.com/${(biz as any).instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-rose hover:underline">
                          <span>📸</span> {(biz as any).instagram}
                        </a>
                      )}
                      {(biz as any).facebook && (
                        <a href={`https://facebook.com/${(biz as any).facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-info hover:underline">
                          <span>📘</span> {(biz as any).facebook}
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Location */}
              <ScrollReveal delay={300}>
                <div className="bg-white rounded-card p-6 shadow-card">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Ubicacion</h3>
                  <div className="h-48 bg-sand rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={24} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-bark">{biz.address}</p>
                      <p className="text-xs mt-1 text-bark">{biz.district}, {biz.city}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Ad slot */}
              <ScrollReveal delay={350}>
                <AdSlot slot="directory_top" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
