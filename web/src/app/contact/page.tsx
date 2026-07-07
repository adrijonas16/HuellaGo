'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">💬</div>
              <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Hablemos</h1>
              <p className="text-bark text-lg">Estamos aqui para ayudarte</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Mail size={18} className="text-primary" /></div>
                    <div>
                      <h3 className="font-heading font-bold text-dark text-sm">Email</h3>
                      <p className="text-sm text-bark">hola@huellago.pe</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={60}>
                <div className="bg-white rounded-card shadow-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center"><MessageCircle size={18} className="text-success" /></div>
                    <div>
                      <h3 className="font-heading font-bold text-dark text-sm">WhatsApp</h3>
                      <p className="text-sm text-bark">+51 954 000 000</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div className="bg-white rounded-card shadow-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center"><MapPin size={18} className="text-secondary" /></div>
                    <div>
                      <h3 className="font-heading font-bold text-dark text-sm">Ubicacion</h3>
                      <p className="text-sm text-bark">Arequipa, Peru</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <div className="bg-white rounded-card shadow-card p-5">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Redes sociales</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: '📸', label: 'Instagram', handle: '@huellago' },
                      { icon: '📘', label: 'Facebook', handle: 'HuellaGo' },
                      { icon: '🎵', label: 'TikTok', handle: '@huellago' },
                    ].map((social) => (
                      <div key={social.label} className="text-center flex-1 bg-cream rounded-xl p-3 hover:bg-primary/5 transition-all cursor-pointer">
                        <div className="text-xl">{social.icon}</div>
                        <div className="text-[10px] font-semibold text-bark mt-1">{social.handle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                  {sent ? (
                    <div className="text-center py-8 animate-bounce-in">
                      <div className="text-6xl mb-4">✅</div>
                      <h2 className="font-heading font-extrabold text-2xl text-dark mb-2">Mensaje enviado!</h2>
                      <p className="text-bark mb-6">Te responderemos en menos de 24 horas.</p>
                      <button onClick={() => setSent(false)} className="text-sm font-semibold text-primary hover:underline">Enviar otro mensaje</button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading font-bold text-dark text-lg mb-6">Envianos un mensaje</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-dark block mb-1.5">Nombre</label>
                            <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Tu nombre" />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-dark block mb-1.5">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="tu@email.com" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-dark block mb-1.5">Asunto</label>
                          <select className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none transition-all bg-white">
                            <option>Consulta general</option>
                            <option>Soporte tecnico</option>
                            <option>Registrar negocio</option>
                            <option>Reportar problema</option>
                            <option>Alianzas comerciales</option>
                            <option>Prensa</option>
                            <option>Otro</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-dark block mb-1.5">Mensaje</label>
                          <textarea className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[140px]" placeholder="Escribe tu mensaje..." />
                        </div>
                        <button onClick={() => setSent(true)} className="w-full bg-primary text-white font-bold py-3.5 rounded-button shadow-button boop-btn hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                          <Send size={16} /> Enviar mensaje
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
