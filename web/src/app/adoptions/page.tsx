'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Heart, MapPin, Calendar, Filter, Plus, Building2, HandHeart, Search, X, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import { useAppStore } from '@/lib/store';
import { validators } from '@/lib/validation';
import { track } from '@/lib/analytics';

const ADOPTABLE_PETS = [
  { id: 'a1', name: 'Canela', type: 'DOG', icon: '🐕', breed: 'Mestiza', age: '2 años aprox.', size: 'Mediana', gender: 'Hembra', photo: 'https://picsum.photos/seed/adopt-dog1/400/400', description: 'Canela fue rescatada de la calle. Es muy cariñosa, le encanta jugar y se lleva bien con otros perros. Esta vacunada y esterilizada.', location: 'Refugio Patitas Sin Hogar, Cayma', source: 'shelter', shelterName: 'Patitas Sin Hogar', date: '28 jun 2026', vaccinated: true, sterilized: true },
  { id: 'a2', name: 'Negro', type: 'DOG', icon: '🐕', breed: 'Labrador mestizo', age: '4 años aprox.', size: 'Grande', gender: 'Macho', photo: 'https://picsum.photos/seed/adopt-dog2/400/400', description: 'Encontrado en el parque Selva Alegre, muy dócil y obediente. Busca un hogar donde lo quieran.', location: 'Cercado, Arequipa', source: 'found', finderName: 'Carlos Quispe', date: '3 jul 2026', vaccinated: false, sterilized: false },
  { id: 'a3', name: 'Misi', type: 'CAT', icon: '🐱', breed: 'Mestiza', age: '1 año aprox.', size: 'Pequeña', gender: 'Hembra', photo: 'https://picsum.photos/seed/adopt-cat1/400/400', description: 'Gatita rescatada muy juguetona. Ya usa su arenero y esta desparasitada. Ideal para departamento.', location: 'Refugio Gaticos AQP, JLByR', source: 'shelter', shelterName: 'Gaticos AQP', date: '1 jul 2026', vaccinated: true, sterilized: true },
  { id: 'a4', name: 'Copito', type: 'RABBIT', icon: '🐰', breed: 'Enano', age: '6 meses', size: 'Mini', gender: 'Macho', photo: 'https://picsum.photos/seed/adopt-rabbit/400/400', description: 'Conejito enano muy tranquilo. Su dueño anterior no podia cuidarlo. Viene con su jaula y accesorios.', location: 'Yanahuara, Arequipa', source: 'rehome', ownerName: 'Ana Torres', date: '5 jul 2026', vaccinated: true, sterilized: false },
  { id: 'a5', name: 'Pelusa', type: 'DOG', icon: '🐕', breed: 'Poodle mestizo', age: '5 años', size: 'Pequeña', gender: 'Hembra', photo: 'https://picsum.photos/seed/adopt-dog3/400/400', description: 'Pelusa es una perrita tranquila, ideal para personas mayores. Muy limpia y educada.', location: 'Refugio Patitas Sin Hogar, Cayma', source: 'shelter', shelterName: 'Patitas Sin Hogar', date: '25 jun 2026', vaccinated: true, sterilized: true },
  { id: 'a6', name: 'Tigre', type: 'CAT', icon: '🐱', breed: 'Atigrado', age: '3 años aprox.', size: 'Mediano', gender: 'Macho', photo: 'https://picsum.photos/seed/adopt-cat2/400/400', description: 'Gato rescatado de un incendio. Ya esta recuperado. Muy independiente pero cariñoso cuando quiere.', location: 'Sachaca, Arequipa', source: 'found', finderName: 'Sofía Ramos', date: '30 jun 2026', vaccinated: true, sterilized: true },
];

const SHELTERS = [
  { id: 's1', name: 'Patitas Sin Hogar', location: 'Cayma, Arequipa', pets: 24, photo: 'https://picsum.photos/seed/shelter1/200/200', description: 'Refugio sin fines de lucro dedicado al rescate de perros y gatos.', needsDonations: true },
  { id: 's2', name: 'Gaticos AQP', location: 'JLByR, Arequipa', pets: 15, photo: 'https://picsum.photos/seed/shelter2/200/200', description: 'Refugio especializado en rescate de gatos.', needsDonations: true },
  { id: 's3', name: 'Huellitas de Amor', location: 'Cerro Colorado, Arequipa', pets: 32, photo: 'https://picsum.photos/seed/shelter3/200/200', description: 'Uno de los refugios más grandes de Arequipa.', needsDonations: true },
];

export default function AdoptionsPage() {
  const [tab, setTab] = useState<'adoptar' | 'refugios' | 'publicar'>('adoptar');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [adoptModal, setAdoptModal] = useState<any>(null);
  const [adoptStep, setAdoptStep] = useState(0); // 0=info, 1=form, 2=sent
  const [req, setReq] = useState({ name: '', phone: '', district: '', reason: '' });
  const [reqTried, setReqTried] = useState(false);
  const reqErrors = {
    name: validators.name(req.name),
    phone: req.phone.trim() ? validators.phonePe(req.phone) : 'Escribe tu celular para que el refugio te contacte',
    district: validators.required(req.district, 'tu distrito'),
    reason: validators.minLength(req.reason, 20, 'tu respuesta'),
  };
  const reqErr = (k: keyof typeof reqErrors) => (reqTried ? reqErrors[k] : '');
  function sendRequest() {
    setReqTried(true);
    const first = (Object.keys(reqErrors) as (keyof typeof reqErrors)[]).find((k) => reqErrors[k]);
    if (first) { document.getElementById(`adopt-${first}`)?.focus(); return; }
    track('adoption_request', { pet: String(adoptModal?.name ?? '') });
    setAdoptStep(2);
    setReq({ name: '', phone: '', district: '', reason: '' });
    setReqTried(false);
  }
  const notify = useAppStore((s) => s.notify);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#refugios') setTab('refugios');
  }, []);

  const filtered = typeFilter ? ADOPTABLE_PETS.filter((p) => p.type === typeFilter) : ADOPTABLE_PETS;

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Heart size={40} className="mx-auto mb-3 text-rose" />
              <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Adopciones</h1>
              <p className="text-bark text-lg max-w-xl mx-auto">Dale un hogar a una mascota que lo necesita. Adopta, no compres.</p>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {[
              { key: 'adoptar', label: 'Mascotas en adopción', icon: <Heart size={14} /> },
              { key: 'refugios', label: 'Refugios', icon: <Building2 size={14} /> },
              { key: 'publicar', label: 'Publicar mascota', icon: <Plus size={14} /> },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key as any)} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === t.key ? 'bg-primary text-white shadow-button' : 'bg-white text-bark border border-sand'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Adoptar tab */}
          {tab === 'adoptar' && (
            <>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setTypeFilter(null)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${!typeFilter ? 'bg-rose text-white' : 'bg-white text-bark border border-sand'}`}>Todos ({ADOPTABLE_PETS.length})</button>
                <button onClick={() => setTypeFilter(typeFilter === 'DOG' ? null : 'DOG')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${typeFilter === 'DOG' ? 'bg-rose text-white' : 'bg-white text-bark border border-sand'}`}>🐕 Perros</button>
                <button onClick={() => setTypeFilter(typeFilter === 'CAT' ? null : 'CAT')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${typeFilter === 'CAT' ? 'bg-rose text-white' : 'bg-white text-bark border border-sand'}`}>🐱 Gatos</button>
                <button onClick={() => setTypeFilter(typeFilter === 'RABBIT' ? null : 'RABBIT')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${typeFilter === 'RABBIT' ? 'bg-rose text-white' : 'bg-white text-bark border border-sand'}`}>🐰 Conejos</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((pet, i) => (
                  <ScrollReveal key={pet.id} delay={i * 70}>
                    <div className="bg-white rounded-card shadow-card card-hover overflow-hidden">
                      <div className="h-52 relative overflow-hidden">
                        <SafeImage src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${pet.source === 'shelter' ? 'bg-secondary/80 text-white' : pet.source === 'found' ? 'bg-accent/80 text-dark' : 'bg-teal/80 text-white'}`}>
                            {pet.source === 'shelter' ? 'Refugio' : pet.source === 'found' ? 'Encontrado' : 'Busca hogar'}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <h3 className="text-white font-heading font-extrabold text-xl">{pet.name} {pet.icon}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{pet.breed}</span>
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{pet.age}</span>
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{pet.size}</span>
                          <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{pet.gender}</span>
                          {pet.vaccinated && <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full">Vacunado</span>}
                          {pet.sterilized && <span className="text-[10px] font-bold bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">Esterilizado</span>}
                        </div>
                        <p className="text-sm text-bark mb-3 line-clamp-2">{pet.description}</p>
                        <div className="flex items-center gap-1.5 text-xs text-bark/60 mb-4">
                          <MapPin size={12} /> {pet.location}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setAdoptModal(pet); setAdoptStep(0); }} className="flex-1 boop-btn bg-rose text-white font-bold py-2.5 rounded-button text-sm hover:bg-rose-dark transition-all flex items-center justify-center gap-1.5">
                            <Heart size={14} /> Quiero adoptarlo
                          </button>
                          <button
                            onClick={() => notify(`Gracias por querer apadrinar a ${pet.name}. El refugio te contactará.`, { tone: 'success' })}
                            aria-label={`Apadrinar a ${pet.name}`}
                            title="Apadrinar"
                            className="px-3 py-2.5 bg-sand text-bark rounded-full boop-btn hover:bg-bark/10 transition-all"
                          >
                            <HandHeart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

          {/* Refugios tab */}
          {tab === 'refugios' && (
            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-rose/5 border-2 border-rose/15 rounded-card p-5 text-center mb-6">
                  <HandHeart size={28} className="mx-auto mb-2 text-rose" />
                  <h2 className="font-heading font-bold text-dark text-lg mb-1">Los refugios necesitan tu ayuda</h2>
                  <p className="text-sm text-bark">Puedes donar alimento, medicinas, mantas o dinero directamente a los refugios registrados.</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SHELTERS.map((shelter, i) => (
                  <ScrollReveal key={shelter.id} delay={i * 80}>
                    <div className="bg-white rounded-card shadow-card p-5 card-hover">
                      <div className="flex items-center gap-3 mb-4">
                        <SafeImage src={shelter.photo} alt={shelter.name} className="w-14 h-14 rounded-2xl object-cover" />
                        <div>
                          <h3 className="font-heading font-bold text-dark">{shelter.name}</h3>
                          <div className="text-xs text-bark flex items-center gap-1"><MapPin size={10} /> {shelter.location}</div>
                        </div>
                      </div>
                      <p className="text-sm text-bark mb-3">{shelter.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{shelter.pets} mascotas en adopción</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setTab('adoptar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 boop-btn bg-primary text-white font-bold py-2.5 rounded-full text-sm">Ver mascotas</button>
                        <button onClick={() => notify(`Te enviaremos los datos de donación de ${shelter.name} por email.`, { tone: 'success' })} className="flex-1 boop-btn bg-rose/10 text-rose-dark font-bold py-2.5 rounded-full text-sm flex items-center justify-center gap-1"><HandHeart size={14} /> Donar</button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-6 text-center">
                  <Building2 size={32} className="mx-auto mb-3 text-bark/30" />
                  <h3 className="font-heading font-bold text-dark mb-2">¿Tienes un refugio?</h3>
                  <p className="text-sm text-bark mb-4">Registra tu refugio en HuellaGo para recibir donaciones y publicar mascotas en adopción.</p>
                  <Link href="/business/register" className="boop-btn inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-button shadow-button text-sm">Registrar refugio</Link>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Publicar tab */}
          {tab === 'publicar' && (
            <ScrollReveal>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                  <h2 className="font-heading font-bold text-dark text-xl mb-2">Publicar mascota en adopción</h2>
                  <p className="text-sm text-bark mb-6">Encontraste una mascota o necesitas buscarle un hogar? Publicala aquí.</p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="adopti-f1" className="text-sm font-semibold text-dark block mb-1.5">Situacion</label>
                      <select id="adopti-f1" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white">
                        <option>Encontre una mascota en la calle</option>
                        <option>Mi mascota necesita un nuevo hogar</option>
                        <option>Soy refugio y quiero publicar</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="adopti-f2" className="text-sm font-semibold text-dark block mb-1.5">Nombre (o apodo)</label>
                        <input id="adopti-f2" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="¿Cómo le dices?" />
                      </div>
                      <div>
                        <label htmlFor="adopti-f3" className="text-sm font-semibold text-dark block mb-1.5">Tipo de mascota</label>
                        <select id="adopti-f3" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white">
                          <option>Perro</option><option>Gato</option><option>Conejo</option><option>Ave</option><option>Otro</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="adopti-f4" className="text-sm font-semibold text-dark block mb-1.5">Edad aprox.</label>
                        <input id="adopti-f4" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none" placeholder="2 años" />
                      </div>
                      <div>
                        <label htmlFor="adopti-f5" className="text-sm font-semibold text-dark block mb-1.5">Tamaño</label>
                        <select id="adopti-f5" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white">
                          <option>Pequeño</option><option>Mediano</option><option>Grande</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="adopti-f6" className="text-sm font-semibold text-dark block mb-1.5">Género</label>
                        <select id="adopti-f6" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white">
                          <option>Macho</option><option>Hembra</option><option>No se</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="adopti-f7" className="text-sm font-semibold text-dark block mb-1.5">Descripción</label>
                      <textarea id="adopti-f7" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]" placeholder="Cuenta su historia, cómo lo encontraste, cómo se comporta..." />
                    </div>
                    <div>
                      <label htmlFor="adopti-f8" className="text-sm font-semibold text-dark block mb-1.5">¿Dónde está?</label>
                      <input id="adopti-f8" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none" placeholder="Distrito y ciudad" />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm text-dark"><input type="checkbox" className="rounded" /> Vacunado</label>
                      <label className="flex items-center gap-2 text-sm text-dark"><input type="checkbox" className="rounded" /> Esterilizado</label>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark block mb-1.5">Fotos</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-bark/20 bg-cream flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all boop-btn">
                            <Plus size={20} className="text-bark/30" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => { setPublished(true); notify('Publicación enviada. La revisaremos en menos de 24 horas.', { tone: 'success' }); }}
                      disabled={published}
                      className="w-full boop-btn bg-rose text-white font-bold py-3.5 rounded-full text-sm hover:bg-rose-dark transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-secondary"
                    >
                      {published ? <><CheckCircle size={16} /> Enviada a revisión</> : <><Heart size={16} /> Publicar en adopción</>}
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />

      {/* Modal de adopción */}
      {adoptModal && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" onClick={() => setAdoptModal(null)} />
          <div className="relative max-w-lg mx-auto mt-[10vh] px-4 animate-slide-up">
            <div className="bg-white rounded-card shadow-card-hover overflow-hidden max-h-[80vh] overflow-y-auto">
              {/* Header con foto */}
              <div className="h-40 relative overflow-hidden">
                <SafeImage src={adoptModal.photo} alt={adoptModal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <button onClick={() => setAdoptModal(null)} className="absolute top-3 right-3 bg-white/80 p-2 rounded-full boop-btn"><X size={16} /></button>
                <div className="absolute bottom-3 left-4">
                  <h2 className="text-white font-heading font-extrabold text-2xl">{adoptModal.name} {adoptModal.icon}</h2>
                  <p className="text-white/80 text-sm">{adoptModal.breed} · {adoptModal.age}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Step 0: Info */}
                {adoptStep === 0 && (
                  <div>
                    <p className="text-bark text-sm mb-4">{adoptModal.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{adoptModal.size}</span>
                      <span className="text-[10px] font-bold bg-cream text-bark px-2 py-0.5 rounded-full">{adoptModal.gender}</span>
                      {adoptModal.vaccinated && <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full">Vacunado</span>}
                      {adoptModal.sterilized && <span className="text-[10px] font-bold bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">Esterilizado</span>}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-bark mb-4"><MapPin size={14} className="text-primary" /> {adoptModal.location}</div>

                    <div className="bg-cream rounded-xl p-4 mb-4">
                      <h3 className="font-heading font-bold text-dark text-sm mb-2">Antes de adoptar, considera:</h3>
                      <ul className="text-xs text-bark space-y-1.5">
                        <li className="flex items-start gap-2"><CheckCircle size={12} className="text-success mt-0.5 shrink-0" /> Tener espacio adecuado para la mascota</li>
                        <li className="flex items-start gap-2"><CheckCircle size={12} className="text-success mt-0.5 shrink-0" /> Compromiso de cuidado a largo plazo</li>
                        <li className="flex items-start gap-2"><CheckCircle size={12} className="text-success mt-0.5 shrink-0" /> Presupuesto para alimentacion y veterinario</li>
                        <li className="flex items-start gap-2"><CheckCircle size={12} className="text-success mt-0.5 shrink-0" /> Tiempo para darle atención y carino</li>
                      </ul>
                    </div>

                    <button onClick={() => setAdoptStep(1)} className="w-full boop-btn bg-rose text-white font-bold py-3.5 rounded-button text-sm flex items-center justify-center gap-2">
                      <Heart size={16} /> Si, quiero adoptar a {adoptModal.name}
                    </button>
                  </div>
                )}

                {/* Step 1: Formulario */}
                {adoptStep === 1 && (
                  <div>
                    <h3 className="font-heading font-bold text-dark text-lg mb-1">Solicitud de adopción</h3>
                    <p className="text-xs text-bark mb-4">Completa tus datos para contactar al responsable de {adoptModal.name}</p>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="adopt-name" className="text-sm font-semibold text-dark block mb-1">Tu nombre completo</label>
                        <input id="adopt-name" value={req.name} onChange={(e) => setReq({ ...req, name: e.target.value })} aria-invalid={!!reqErr('name')} aria-describedby="adopt-name-e" className={`w-full px-4 py-2.5 rounded-button border-[1.5px] ${reqErr('name') ? 'border-error' : 'border-sand'} focus:border-primary outline-none text-sm`} placeholder="María García" />
                        <p id="adopt-name-e" className="text-xs text-error mt-1 empty:hidden">{reqErr('name')}</p>
                      </div>
                      <div>
                        <label htmlFor="adopt-phone" className="text-sm font-semibold text-dark block mb-1">Teléfono / WhatsApp</label>
                        <input id="adopt-phone" value={req.phone} onChange={(e) => setReq({ ...req, phone: e.target.value })} aria-invalid={!!reqErr('phone')} aria-describedby="adopt-phone-e" className={`w-full px-4 py-2.5 rounded-button border-[1.5px] ${reqErr('phone') ? 'border-error' : 'border-sand'} focus:border-primary outline-none text-sm`} placeholder="987 654 321" inputMode="tel" />
                        <p id="adopt-phone-e" className="text-xs text-error mt-1 empty:hidden">{reqErr('phone')}</p>
                      </div>
                      <div>
                        <label htmlFor="adopt-district" className="text-sm font-semibold text-dark block mb-1">Distrito</label>
                        <input id="adopt-district" value={req.district} onChange={(e) => setReq({ ...req, district: e.target.value })} aria-invalid={!!reqErr('district')} aria-describedby="adopt-district-e" className={`w-full px-4 py-2.5 rounded-button border-[1.5px] ${reqErr('district') ? 'border-error' : 'border-sand'} focus:border-primary outline-none text-sm`} placeholder="Cayma, Arequipa" />
                        <p id="adopt-district-e" className="text-xs text-error mt-1 empty:hidden">{reqErr('district')}</p>
                      </div>
                      <div>
                        <label htmlFor="adopti-f13" className="text-sm font-semibold text-dark block mb-1">¿Tienes otras mascotas?</label>
                        <select id="adopti-f13" className="w-full px-4 py-2.5 rounded-button border-[1.5px] border-sand focus:border-primary outline-none text-sm bg-white">
                          <option>No</option><option>Sí, 1 perro</option><option>Sí, 1 gato</option><option>Sí, varias mascotas</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="adopti-f14" className="text-sm font-semibold text-dark block mb-1">Tipo de vivienda</label>
                        <select id="adopti-f14" className="w-full px-4 py-2.5 rounded-button border-[1.5px] border-sand focus:border-primary outline-none text-sm bg-white">
                          <option>Casa con jardín</option><option>Casa sin jardín</option><option>Departamento grande</option><option>Departamento pequeño</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="adopt-reason" className="text-sm font-semibold text-dark block mb-1">¿Por qué quieres adoptar a {adoptModal.name}?</label>
                        <textarea id="adopt-reason" value={req.reason} onChange={(e) => setReq({ ...req, reason: e.target.value })} aria-invalid={!!reqErr('reason')} aria-describedby="adopt-reason-e" className={`w-full px-4 py-2.5 rounded-button border-[1.5px] ${reqErr('reason') ? 'border-error' : 'border-sand'} focus:border-primary outline-none text-sm min-h-[80px]`} placeholder="Cuéntanos sobre tu hogar y tu rutina…" />
                        <p id="adopt-reason-e" className="text-xs text-error mt-1 empty:hidden">{reqErr('reason')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => setAdoptStep(0)} className="flex-1 bg-sand text-bark font-semibold py-3 rounded-button text-sm">Volver</button>
                      <button onClick={sendRequest} className="flex-1 boop-btn bg-rose text-white font-bold py-3 rounded-button text-sm">Enviar solicitud</button>
                    </div>
                  </div>
                )}

                {/* Step 2: Enviado */}
                {adoptStep === 2 && (
                  <div className="text-center py-4 animate-bounce-in">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-success" />
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-dark mb-2">Solicitud enviada!</h3>
                    <p className="text-sm text-bark mb-4">
                      Tu solicitud para adoptar a <span className="font-bold text-dark">{adoptModal.name}</span> fue enviada.
                      El responsable se contactara contigo en las proximas 24-48 horas.
                    </p>
                    <div className="bg-cream rounded-xl p-4 mb-4 text-left">
                      <p className="text-xs font-semibold text-dark mb-2">Mientras tanto puedes:</p>
                      <div className="space-y-2 text-xs text-bark">
                        <div className="flex items-center gap-2"><Phone size={12} className="text-primary" /> Llamar directamente al refugio</div>
                        <div className="flex items-center gap-2"><MessageCircle size={12} className="text-success" /> Escribir por WhatsApp</div>
                      </div>
                    </div>
                    <button onClick={() => setAdoptModal(null)} className="w-full bg-primary text-white font-bold py-3 rounded-button boop-btn text-sm">Entendido</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
