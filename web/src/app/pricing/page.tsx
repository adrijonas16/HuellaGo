'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Check, X, Star, Zap, Crown, HelpCircle } from 'lucide-react';

const PLANS = [
  {
    name: 'Gratis',
    price: 0,
    period: '',
    icon: '🐾',
    color: '#0F8A5F',
    description: 'Ideal para empezar. Registra tu negocio y aparece en el mapa.',
    popular: false,
    cta: 'Empezar gratis',
    features: [
      { text: 'Perfil de negocio básico', included: true },
      { text: 'Ubicación en el mapa', included: true },
      { text: 'Hasta 5 fotos', included: true },
      { text: 'Recibir reseñas', included: true },
      { text: 'Información de contacto', included: true },
      { text: 'Horarios de atención', included: true },
      { text: 'Estadisticas de visitas', included: false },
      { text: 'Badge de verificado', included: false },
      { text: 'Promociones', included: false },
      { text: 'Prioridad en búsqueda', included: false },
      { text: 'Reservas online', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 49,
    period: '/mes',
    icon: '⭐',
    color: '#3352F5',
    description: 'Para negocios que quieren crecer. Destaca y atrae más clientes.',
    popular: true,
    cta: 'Comenzar prueba gratis',
    features: [
      { text: 'Todo del plan Gratis', included: true },
      { text: 'Hasta 20 fotos', included: true },
      { text: 'Estadisticas de visitas', included: true },
      { text: 'Badge de verificado', included: true },
      { text: 'Publicar promociones', included: true },
      { text: 'Prioridad en búsqueda', included: true },
      { text: 'Responder reseñas', included: true },
      { text: 'Lista de servicios con precios', included: true },
      { text: 'Reservas online', included: false },
      { text: 'Multiples sucursales', included: false },
      { text: 'Soporte prioritario', included: false },
      { text: 'Dashboard avanzado', included: false },
    ],
  },
  {
    name: 'Premium',
    price: 99,
    period: '/mes',
    icon: '👑',
    color: '#7B5CE0',
    description: 'Para negocios que quieren la experiencia completa.',
    popular: false,
    cta: 'Contactar ventas',
    features: [
      { text: 'Todo del plan Pro', included: true },
      { text: 'Fotos ilimitadas', included: true },
      { text: 'Reservas online', included: true },
      { text: 'Destacado en el mapa', included: true },
      { text: 'Multiples sucursales', included: true },
      { text: 'Dashboard avanzado', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Reportes mensuales', included: true },
      { text: 'Integracion WhatsApp Business', included: true },
      { text: 'Notificaciones a clientes', included: true },
      { text: 'Posicion destacada en directorio', included: true },
      { text: 'Analisis de competencia', included: true },
    ],
  },
];

const FAQS = [
  {
    q: '¿Puedo empezar gratis?',
    a: 'Si, el plan Gratis incluye todo lo necesario para que tu negocio aparezca en HuellaGo. Puedes mejorar tu plan cuando quieras.',
  },
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Si, puedes subir o bajar de plan cuando lo necesites. Los cambios se aplican al siguiente periodo de facturacion.',
  },
  {
    q: 'Hay periodo de prueba?',
    a: 'Si, el plan Pro incluye 14 días de prueba gratuita. No necesitas tarjeta de crédito para empezar.',
  },
  {
    q: '¿Cómo funcionan las reservas online?',
    a: 'Tus clientes pueden reservar citas directamente desde tu perfil en HuellaGo. Tu recibes una notificación y puedes confirmar o rechazar.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos Yape, Plin, transferencia bancaria y tarjetas de credito/debito.',
  },
  {
    q: '¿Quién puede registrar un negocio?',
    a: 'Veterinarias, paseadores, hoteles, guarderias, groomers, tiendas de mascotas, entrenadores y cualquier negocio relacionado con mascotas.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="py-16 text-center paw-bg" style={{ background: 'linear-gradient(135deg, #F5F6F1, #EEF1FF)' }}>
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-5xl mb-4">💼</div>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-dark mb-4">
                Planes para tu negocio pet
              </h1>
              <p className="text-bark text-lg max-w-xl mx-auto">
                Registra tu veterinaria, grooming, hotel o cualquier servicio para mascotas. Empieza gratis y crece con HuellaGo.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {PLANS.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 100}>
                  <div className={`relative bg-white rounded-card p-6 lg:p-8 card-hover border-2 ${plan.popular ? 'border-primary shadow-glow' : 'border-sand'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-button">
                          Más popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className="text-4xl mb-3">{plan.icon}</div>
                      <h2 className="font-heading font-extrabold text-2xl text-dark mb-1">{plan.name}</h2>
                      <p className="text-sm text-bark mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        {plan.price === 0 ? (
                          <span className="text-4xl font-extrabold text-dark">Gratis</span>
                        ) : (
                          <>
                            <span className="text-sm text-bark">S/</span>
                            <span className="text-4xl font-extrabold text-dark">{plan.price}</span>
                            <span className="text-sm text-bark">{plan.period}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link href="/business/register" className={`block text-center w-full font-bold py-3.5 rounded-full boop-btn transition-all text-sm ${
                        plan.popular
                          ? 'bg-primary text-white shadow-button hover:bg-primary-dark'
                          : plan.price === 0
                            ? 'bg-sand text-dark hover:bg-primary/10 hover:text-primary'
                            : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-white'
                      }`}>
                        {plan.cta}
                    </Link>

                    <div className="mt-6 pt-6 border-t border-sand space-y-3">
                      {plan.features.map((f) => (
                        <div key={f.text} className="flex items-start gap-2.5">
                          {f.included ? (
                            <Check size={16} className="text-success mt-0.5 shrink-0" />
                          ) : (
                            <X size={16} className="text-gray-300 mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm ${f.included ? 'text-dark' : 'text-gray-400'}`}>
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Who can register */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading font-extrabold text-3xl text-dark text-center mb-10">
                Quien puede registrarse? 🏪
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🏥', label: 'Veterinarias' },
                { icon: '🚶', label: 'Paseadores' },
                { icon: '🏨', label: 'Hoteles pet' },
                { icon: '✂️', label: 'Grooming' },
                { icon: '🐾', label: 'Guarderias' },
                { icon: '🛒', label: 'Tiendas' },
                { icon: '🎓', label: 'Entrenadores' },
                { icon: '🚨', label: 'Emergencias' },
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 50}>
                  <div className="text-center p-4 rounded-card bg-cream hover:bg-primary/5 transition-all">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-heading font-bold text-dark text-sm">{item.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #F5F6F1, #F0F2FA)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading font-extrabold text-3xl text-dark text-center mb-10">
                Preguntas frecuentes
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="bg-white rounded-card p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-heading font-bold text-dark text-sm mb-1">{faq.q}</h3>
                        <p className="text-sm text-bark">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <ScrollReveal>
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="font-heading font-extrabold text-3xl text-dark mb-4">Listo para empezar?</h2>
            <p className="text-bark mb-8 max-w-md mx-auto">Registra tu negocio en menos de 5 minutos. Gratis para empezar.</p>
            <Link href="/business/register" className="boop-btn inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-button shadow-button hover:bg-primary-dark transition-all text-lg">
              Registrar mi negocio
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
