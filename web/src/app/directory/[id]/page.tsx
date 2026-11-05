'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_BUSINESSES, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS, PET_TYPE_ICONS, PET_TYPE_LABELS } from '@/lib/mock-data';
import { fetchApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Star, MapPin, Phone, MessageCircle, Heart, Clock, ChevronLeft, Shield, ExternalLink, Globe, Tag, Percent } from 'lucide-react';
import { AdSlot } from '@/components/ads/ad-slot';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { ShareButton } from '@/components/ui/share-button';
import { Sheet } from '@/components/ui/sheet';
import { CategoryIcon } from '@/components/ui/category-icon';
import { useAppStore, useHydrated } from '@/lib/store';
import { useAuth } from '@/hooks';
import { hasRealSession, isApiId, createReview, errorMessage } from '@/lib/backend';

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const mockBiz = MOCK_BUSINESSES.find((b) => b.id === id);
  const [biz, setBiz] = useState<any>(mockBiz || null);
  const [loaded, setLoaded] = useState(!!mockBiz);
  const hydrated = useHydrated();
  const isFav = useAppStore((s) => !!s.favorites[`business:${id}`]) && hydrated;
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const notify = useAppStore((s) => s.notify);
  const { user } = useAuth();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [myRating, setMyRating] = useState(5);
  const [myComment, setMyComment] = useState('');
  const [extraReviews, setExtraReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchApi<any>(`/businesses/${id}`).then((res) => {
      setLoaded(true);
      if (res) setBiz({ services: [], reviews: [], ...res });
    });
  }, [id]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (myComment.trim().length < 10) return;
    if (hasRealSession() && isApiId(String(biz.id))) {
      try {
        await createReview({ businessId: String(biz.id), rating: myRating, comment: myComment.trim() });
      } catch (err) {
        notify(errorMessage(err, 'No pudimos publicar tu reseña.'), { tone: 'error' });
        return;
      }
    }
    setExtraReviews((r) => [
      { user: { firstName: user?.firstName ?? 'Tú', lastName: user?.lastName ?? '' }, rating: myRating, comment: myComment.trim(), createdAt: new Date().toISOString(), mine: true },
      ...r,
    ]);
    setReviewOpen(false);
    setMyComment('');
    notify('Reseña publicada. ¡Gracias por ayudar a otros dueños!', { tone: 'success' });
  }

  if (!biz && !loaded) {
    return (
      <>
        <Navbar />
        <main id="contenido" className="min-h-screen bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4" aria-busy="true" aria-label="Cargando">
            <div className="skeleton h-56 rounded-card" />
            <div className="skeleton h-8 w-2/3" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-32 rounded-card" />
          </div>
        </main>
      </>
    );
  }

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

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  biz.services = biz.services ?? [];
  biz.hours = biz.hours ?? [];
  biz.promotions = biz.promotions ?? [];
  const reviews = [...extraReviews, ...(biz.reviews ?? [])];
  const phone = String(biz.phone ?? '').replace(/[^0-9+]/g, '');
  const whatsapp = String(biz.whatsapp ?? '').replace(/\D/g, '');
  const directions = biz.latitude && biz.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${biz.latitude},${biz.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${biz.name} ${biz.address ?? ''} Arequipa`)}`;

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
      <main id="contenido" className="min-h-screen bg-cream">
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
                  <CategoryIcon category={biz.category} size={220} strokeWidth={1} className="absolute -right-6 -bottom-10 opacity-20" style={{ color: CATEGORY_COLORS[biz.category] }} />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <FavoriteButton kind="business" id={String(biz.id)} label={biz.name} subtitle={`${CATEGORY_LABELS[biz.category] ?? ''} en ${biz.district ?? biz.city ?? ''}`} size={18} className="w-10 h-10" />
                    <ShareButton title={biz.name} className="w-10 h-10" />
                    {biz.website && (
                      <a href={biz.website} target="_blank" rel="noopener noreferrer" aria-label={`Abrir la web de ${biz.name}`} className="w-10 h-10 bg-white/90 rounded-full shadow-card flex items-center justify-center hover:bg-white">
                        <ExternalLink size={18} className="text-bark" />
                      </a>
                    )}
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
                    <span className="text-sm text-bark">({biz._count.reviews} reseñas) · {biz._count.favorites} favoritos</span>
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
              {(
                <ScrollReveal delay={300}>
                  <div className="bg-white rounded-card p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-heading font-bold text-dark text-lg">Reseñas ({reviews.length})</h2>
                      <button onClick={() => setReviewOpen(true)} className="text-sm font-bold text-white bg-dark px-4 py-2 rounded-full boop-btn hover:bg-primary">Escribir reseña</button>
                    </div>
                    <div className="space-y-4">
                      {reviews.length === 0 && <p className="text-sm text-bark">Aún no hay reseñas. Sé el primero en contar cómo te fue.</p>}
                      {reviews.map((r: any, i: number) => (
                        <div key={i} className={`border-b border-sand pb-4 last:border-0 last:pb-0 ${r.mine ? 'animate-slide-up' : ''}`}>
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
                    <a href={phone ? `tel:${phone}` : undefined} aria-disabled={!phone} className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-full boop-btn hover:bg-primary-dark shadow-button aria-disabled:opacity-40 aria-disabled:pointer-events-none">
                      <Phone size={16} /> Llamar
                    </a>
                    <a
                      href={whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola ${biz.name}, los encontré en HuellaGo y quisiera información.`)}` : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!whatsapp}
                      className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3.5 rounded-full boop-btn hover:bg-secondary-dark shadow-button-secondary aria-disabled:opacity-40 aria-disabled:pointer-events-none"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  </div>
                  <a href={directions} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 border-2 border-dark text-dark font-bold py-3 rounded-full hover:bg-dark hover:text-white transition-colors mb-3">
                    <MapPin size={16} /> Cómo llegar
                  </a>
                  <button
                    onClick={() => toggleFavorite('business', String(biz.id), biz.name, { subtitle: `${CATEGORY_LABELS[biz.category] ?? ''} en ${biz.district ?? biz.city ?? ''}` })}
                    aria-pressed={isFav}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full transition-colors ${isFav ? 'bg-rose/10 text-rose-dark' : 'bg-cream text-dark hover:bg-sand'}`}
                  >
                    <Heart size={16} className={isFav ? 'fill-rose text-rose animate-heart-pop' : ''} /> {isFav ? 'Guardado en favoritos' : 'Guardar en favoritos'}
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
                      <span className="text-bark">Categorías</span>
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
                      <span className="text-bark">Reseñas</span>
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
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Ubicación</h3>
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
      <Sheet open={reviewOpen} onClose={() => setReviewOpen(false)} title={`Tu reseña de ${biz.name}`}>
        <form onSubmit={submitReview}>
          <fieldset>
            <legend className="text-sm font-semibold text-dark mb-2">¿Cómo te fue?</legend>
            <div className="flex gap-1" role="radiogroup">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  role="radio"
                  aria-checked={myRating === n}
                  aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
                  onClick={() => setMyRating(n)}
                  className="p-1 rounded-lg hover:scale-110 transition-transform"
                >
                  <Star size={32} className={n <= myRating ? 'fill-accent text-accent' : 'text-sand'} />
                </button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="review" className="block text-sm font-semibold text-dark mt-5 mb-2">Cuéntale a otros dueños</label>
          <textarea
            id="review"
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            rows={4}
            placeholder="¿Cómo trataron a tu mascota? ¿Volverías?"
            className="w-full rounded-2xl border-[1.5px] border-sand px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 resize-none"
          />
          <p className={`text-xs mt-1 ${myComment.trim().length >= 10 ? 'text-bark' : 'text-bark/70'}`}>
            {myComment.trim().length < 10 ? `Escribe al menos ${10 - myComment.trim().length} caracteres más` : 'Listo para publicar'}
          </p>
          <button disabled={myComment.trim().length < 10} className="w-full mt-5 bg-primary text-white font-bold py-3.5 rounded-full shadow-button boop-btn disabled:opacity-40 disabled:shadow-none">
            Publicar reseña
          </button>
        </form>
      </Sheet>
      <Footer />
    </>
  );
}
