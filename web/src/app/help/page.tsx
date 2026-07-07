'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Search, ChevronRight, ChevronDown, MessageCircle } from 'lucide-react';

const CATEGORIES = [
  { icon: '👤', label: 'Cuenta y perfil', count: 8 },
  { icon: '🐾', label: 'Mis mascotas', count: 6 },
  { icon: '🗺️', label: 'Mapa y servicios', count: 10 },
  { icon: '🎉', label: 'Eventos', count: 12 },
  { icon: '📍', label: 'Rutas y paseos', count: 9 },
  { icon: '🏪', label: 'Para negocios', count: 14 },
  { icon: '💳', label: 'Pagos y planes', count: 7 },
  { icon: '⚠️', label: 'Reportar problema', count: 4 },
];

const FAQS = [
  { q: 'Como registro a mi mascota?', a: 'Despues de crear tu cuenta, ve a tu perfil y toca "Agregar mascota". Puedes registrar perros, gatos, conejos, aves y cualquier tipo de mascota con foto, raza, edad y nivel de energia.', cat: 'Mis mascotas' },
  { q: 'Como encuentro veterinarias cercanas?', a: 'Abre el Mapa desde el menu principal. Usa los filtros para seleccionar "Veterinarias" y veras todas las que estan cerca de tu ubicacion, con calificaciones y horarios.', cat: 'Mapa y servicios' },
  { q: 'Como me inscribo a un evento?', a: 'Ve a la seccion Eventos, selecciona uno que te interese y toca "Inscribirme". Selecciona la mascota que llevaras y confirma. Recibiras una notificacion antes del evento.', cat: 'Eventos' },
  { q: 'Puedo crear eventos yo mismo?', a: 'Si! Cualquier usuario puede crear eventos. Ve a Eventos y toca "Crear evento". Define el punto de partida, fecha, requisitos y publica. Los usuarios de tu ciudad seran notificados.', cat: 'Eventos' },
  { q: 'Como registro mi negocio?', a: 'Ve a "Registrar negocio" desde el menu o desde la pagina de Planes. Completa los 6 pasos del formulario con los datos de tu negocio. Lo revisaremos en 24-48 horas.', cat: 'Para negocios' },
  { q: 'Las rutas se crean en la web?', a: 'No, las rutas se crean unicamente desde la app movil porque necesitan GPS en tiempo real para grabar el recorrido. En la web puedes ver y explorar las rutas existentes.', cat: 'Rutas y paseos' },
  { q: 'Cuanto cuesta usar HuellaGo?', a: 'HuellaGo es gratuito para usuarios. Los negocios pueden registrarse gratis con funciones basicas, o elegir un plan Pro (S/49/mes) o Premium (S/99/mes) para mas funciones.', cat: 'Pagos y planes' },
  { q: 'Como cambio mi ciudad?', a: 'Ve a tu perfil, toca "Editar perfil" y cambia tu ciudad. Esto actualizara los eventos y servicios que ves en tu feed y mapa.', cat: 'Cuenta y perfil' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = searchQuery
    ? FAQS.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : FAQS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">🤝</div>
              <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Centro de ayuda</h1>
              <p className="text-bark text-lg mb-6">Como podemos ayudarte?</p>

              {/* Search */}
              <div className="max-w-xl mx-auto relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bark/40" />
                <input
                  className="w-full pl-11 pr-4 py-3.5 rounded-card border-2 border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-sm"
                  placeholder="Buscar en ayuda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Categories */}
          {!searchQuery && (
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {CATEGORIES.map((cat) => (
                  <div key={cat.label} className="bg-white rounded-card p-4 text-center card-hover cursor-pointer border-2 border-transparent hover:border-primary/15">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-heading font-bold text-dark text-sm">{cat.label}</div>
                    <div className="text-[10px] text-bark mt-1">{cat.count} articulos</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* FAQs */}
          <ScrollReveal>
            <div className="bg-white rounded-card shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-sand">
                <h2 className="font-heading font-bold text-dark">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Preguntas frecuentes'}
                </h2>
              </div>
              <div>
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-bark">No encontramos resultados. Intenta con otras palabras.</p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, i) => (
                    <div key={i} className="border-b border-sand/50 last:border-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-dark">{faq.q}</div>
                          <div className="text-[10px] text-bark mt-0.5">{faq.cat}</div>
                        </div>
                        <ChevronDown size={16} className={`text-bark shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-4 animate-slide-up">
                          <p className="text-sm text-bark leading-relaxed bg-cream rounded-xl p-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div className="mt-8 text-center bg-white rounded-card shadow-card p-8">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-heading font-bold text-dark text-lg mb-2">No encontraste lo que buscabas?</h3>
              <p className="text-bark text-sm mb-4">Escribenos y te responderemos en menos de 24 horas.</p>
              <Link href="/contact" className="boop-btn inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-button shadow-button hover:bg-primary-dark transition-all">
                <MessageCircle size={16} /> Contactar soporte
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
