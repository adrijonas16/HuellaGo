'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { ChevronLeft, ChevronRight, Check, Upload, Clock } from 'lucide-react';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/lib/mock-data';
import { LocationPicker } from '@/components/map/location-picker';

const STEPS = [
  { title: 'Tipo de negocio', icon: '🏪' },
  { title: 'Datos básicos', icon: '📝' },
  { title: 'Ubicación', icon: '📍' },
  { title: 'Servicios y horarios', icon: '🕐' },
  { title: 'Fotos', icon: '📸' },
  { title: 'Confirmar', icon: '✅' },
];

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function BusinessRegisterPage() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: 'Arequipa',
    district: '',
    is24Hours: false,
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const canNext = step === 0 ? !!selectedCategory : step === 1 ? formData.name.trim().length > 1 : true;

  if (submitted) {
    return (
      <>
        <Navbar />
        <main id="contenido" className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white rounded-card p-8 text-center animate-bounce-in">
            <span className="w-16 h-16 mx-auto rounded-full bg-secondary text-white flex items-center justify-center"><Check size={30} strokeWidth={3} /></span>
            <h1 className="font-heading font-extrabold text-3xl text-dark mt-5" style={{ letterSpacing: '-0.035em' }}>Registro enviado</h1>
            <p className="text-bark mt-3">
              Revisaremos <strong className="text-dark">{formData.name || 'tu negocio'}</strong> en un plazo de 24 a 48 horas y te avisaremos por email cuando aparezca en el mapa.
            </p>
            <div className="flex flex-col gap-2 mt-7">
              <Link href="/directory" className="bg-primary text-white font-bold rounded-full py-3.5 shadow-button boop-btn">Ver el directorio</Link>
              <Link href="/pricing" className="font-bold text-dark rounded-full py-3 hover:bg-cream">Conocer los planes</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Back */}
          <Link href="/pricing" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Ver planes
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-extrabold text-3xl text-dark mb-2">Registra tu negocio</h1>
            <p className="text-bark">Completa los pasos y empieza a recibir clientes en HuellaGo</p>
          </div>

          {/* Progreso compacto en móvil */}
          <div className="sm:hidden mb-8">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-dark">{STEPS[step].title}</span>
              <span className="text-bark">Paso {step + 1} de {STEPS.length}</span>
            </div>
            <div className="h-2 rounded-full bg-sand overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>
          {/* Progress */}
          <div className="hidden sm:flex items-center justify-between mb-10 px-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    i < step ? 'bg-success text-white' :
                    i === step ? 'bg-primary text-white shadow-button scale-110' :
                    'bg-sand text-bark'
                  }`}>
                    {i < step ? <Check size={18} /> : s.icon}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-semibold hidden md:block ${i === step ? 'text-primary' : 'text-bark'}`}>
                    {s.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-1 ${i < step ? 'bg-success' : 'bg-sand'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-card shadow-card p-6 md:p-8 animate-slide-up" key={step}>
            {/* Step 0: Tipo de negocio */}
            {step === 0 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-dark mb-2">Que tipo de negocio tienes?</h2>
                <p className="text-sm text-bark mb-6">Selecciona la categoría que mejor describe tu negocio</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(CATEGORY_ICONS).map(([key, icon]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`p-4 rounded-card border-2 text-left transition-all boop-btn ${
                        selectedCategory === key
                          ? 'border-primary bg-primary/5 shadow-glow'
                          : 'border-sand hover:border-primary/30 hover:bg-cream'
                      }`}
                    >
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className="font-heading font-bold text-dark text-sm">{CATEGORY_LABELS[key]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Datos básicos */}
            {step === 1 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-dark mb-2">Datos de tu negocio</h2>
                <p className="text-sm text-bark mb-6">Información que verán tus clientes</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Nombre del negocio *</label>
                    <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: Veterinaria Patitas Felices" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Descripción</label>
                    <textarea className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]" placeholder="Describe tu negocio, servicios principales, experiencia..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-dark block mb-1.5">Teléfono</label>
                      <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="054-234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-dark block mb-1.5">WhatsApp</label>
                      <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="51 954 234 567" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Email del negocio</label>
                    <input type="email" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="contacto@tunegocio.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Ubicación */}
            {step === 2 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-dark mb-2">Donde esta tu negocio?</h2>
                <p className="text-sm text-bark mb-6">Tu ubicación aparecerá en el mapa de HuellaGo</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-dark block mb-1.5">Dirección *</label>
                    <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Av. Ejército 420" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-dark block mb-1.5">Ciudad *</label>
                      <select className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}>
                        <option>Arequipa</option>
                        <option>Lima</option>
                        <option>Cusco</option>
                        <option>Trujillo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-dark block mb-1.5">Distrito</label>
                      <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Cayma, Yanahuara, Cercado..." value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} />
                    </div>
                  </div>
                  {/* Location picker with geolocation */}
                  <LocationPicker
                    label="Ubicación exacta *"
                    onChange={(loc) => setFormData({...formData, address: loc.address || formData.address })}
                    placeholder="Selecciona la ubicación de tu negocio"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Servicios y horarios */}
            {step === 3 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-dark mb-2">Servicios y horarios</h2>
                <p className="text-sm text-bark mb-6">Que ofreces y cuando atiendes</p>

                {/* 24h toggle */}
                <div className="flex items-center justify-between bg-cream rounded-card p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-rose" />
                    <span className="text-sm font-semibold text-dark">Atención 24 horas</span>
                  </div>
                  <button
                    onClick={() => setFormData({...formData, is24Hours: !formData.is24Hours})}
                    className={`w-12 h-6 rounded-full transition-all ${formData.is24Hours ? 'bg-primary' : 'bg-sand'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.is24Hours ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* Hours */}
                {!formData.is24Hours && (
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-semibold text-dark block mb-2">Horarios por día</label>
                    {DAYS.map((day) => (
                      <div key={day} className="flex items-center gap-3 py-2">
                        <span className="text-sm text-dark w-24 font-medium">{day}</span>
                        <input className="px-3 py-2 rounded-button border border-sand text-sm w-24 text-center focus:border-primary outline-none" placeholder="08:00" />
                        <span className="text-bark text-sm">a</span>
                        <input className="px-3 py-2 rounded-button border border-sand text-sm w-24 text-center focus:border-primary outline-none" placeholder="18:00" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Services */}
                <div>
                  <label className="text-sm font-semibold text-dark block mb-2">Servicios que ofreces</label>
                  <p className="text-xs text-bark mb-3">Agrega los servicios con precio aproximado</p>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input className="flex-1 px-4 py-2.5 rounded-button border border-sand text-sm focus:border-primary outline-none" placeholder="Nombre del servicio" />
                      <input className="w-28 px-4 py-2.5 rounded-button border border-sand text-sm focus:border-primary outline-none" placeholder="S/ Precio" />
                    </div>
                  ))}
                  <button className="text-sm text-primary font-semibold mt-2 hover:underline">+ Agregar otro servicio</button>
                </div>
              </div>
            )}

            {/* Step 4: Fotos */}
            {step === 4 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-dark mb-2">Fotos de tu negocio</h2>
                <p className="text-sm text-bark mb-6">Sube al menos 3 fotos para que tus clientes conozcan tu espacio</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-sand rounded-card border-2 border-dashed border-bark/20 flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
                      <div className="text-center">
                        <Upload size={24} className="mx-auto mb-1 text-bark group-hover:text-primary transition-colors" />
                        <span className="text-xs text-bark group-hover:text-primary">Subir foto</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-bark mt-3">Formatos: JPG, PNG. Máximo 5MB por foto.</p>
              </div>
            )}

            {/* Step 5: Confirmar */}
            {step === 5 && (
              <div className="text-center py-6">
                <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
                <h2 className="font-heading font-extrabold text-2xl text-dark mb-3">Todo listo para enviar!</h2>
                <p className="text-bark mb-6 max-w-md mx-auto">
                  Revisaremos tu registro en las proximas 24-48 horas. Te notificaremos cuando tu negocio este activo en HuellaGo.
                </p>

                <div className="bg-cream rounded-card p-5 text-left mb-6 max-w-sm mx-auto">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Resumen</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-bark">Tipo:</span>
                      <span className="font-semibold text-dark">{selectedCategory ? `${CATEGORY_ICONS[selectedCategory]} ${CATEGORY_LABELS[selectedCategory]}` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bark">Nombre:</span>
                      <span className="font-semibold text-dark">{formData.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bark">Ciudad:</span>
                      <span className="font-semibold text-dark">{formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bark">Plan:</span>
                      <span className="font-semibold text-success">Gratis</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-bark">
                  Puedes mejorar tu plan después desde tu dashboard. <Link href="/pricing" className="text-primary font-semibold hover:underline">Ver planes</Link>
                </p>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`flex items-center gap-1 px-6 py-3 rounded-button font-semibold text-sm transition-all ${
                step === 0 ? 'invisible' : 'bg-white text-bark border border-sand hover:bg-sand/50'
              }`}
            >
              <ChevronLeft size={16} /> Anterior
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => { if (canNext) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                aria-disabled={!canNext}
                className={`flex items-center gap-1 px-6 py-3 rounded-button font-semibold text-sm transition-all ${
                  canNext
                    ? 'bg-primary text-white shadow-button hover:bg-primary-dark boop-btn'
                    : 'bg-sand text-bark cursor-not-allowed'
                }`}
              >
                Siguiente <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => { setSubmitted(true); window.scrollTo({ top: 0 }); }} className="flex items-center gap-1 px-8 py-3 rounded-full font-bold text-sm bg-secondary text-white shadow-button-secondary hover:bg-secondary-dark boop-btn transition-all">
                <Check size={16} /> Enviar registro
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
