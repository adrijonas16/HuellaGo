'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { MOCK_COMMUNITIES, PET_TYPES } from '@/lib/mock-data';
import { Users, MessageCircle, Hash, TrendingUp } from 'lucide-react';
import { AdSlot } from '@/components/ads/ad-slot';

const MOCK_POSTS = [
  { id: 'p1', user: 'Maria G.', avatar: 'M', pet: 'Toby', breed: 'Golden Retriever', text: 'Hoy paseamos por el Parque Selva Alegre! Toby hizo nuevos amigos 🐕', time: 'Hace 20 min', likes: 24, comments: 5, icon: '🐕' },
  { id: 'p2', user: 'Carlos Q.', avatar: 'C', pet: 'Michi', breed: 'Persa', text: 'Mi gatito recien vacunado en Patitas Felices. Excelente atencion!', time: 'Hace 1h', likes: 18, comments: 3, icon: '🐱' },
  { id: 'p3', user: 'Ana T.', avatar: 'A', pet: 'Coco', breed: 'Pomerania', text: 'Alguien conoce un buen grooming en Cayma? Coco necesita un corte urgente 😅', time: 'Hace 2h', likes: 7, comments: 12, icon: '🐕' },
  { id: 'p4', user: 'Luis M.', avatar: 'L', pet: 'Nieve', breed: 'Conejo enano', text: 'Mi conejita Nieve cumple 2 anitos hoy! 🎂🐰', time: 'Hace 3h', likes: 45, comments: 8, icon: '🐰' },
  { id: 'p5', user: 'Sofia R.', avatar: 'S', pet: 'Kiwi', breed: 'Loro', text: 'Kiwi aprendio a decir "HuellaGo"! Jaja no es cierto pero ya casi 🦜', time: 'Hace 5h', likes: 32, comments: 15, icon: '🦜' },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'communities'>('feed');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream paw-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Comunidad 👥</h1>
              <p className="text-bark text-lg">Conecta con otros duenos de mascotas en tu ciudad</p>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button onClick={() => setActiveTab('feed')} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'feed' ? 'bg-primary text-white shadow-button' : 'bg-white text-bark border border-sand'}`}>
              Feed
            </button>
            <button onClick={() => setActiveTab('communities')} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'communities' ? 'bg-primary text-white shadow-button' : 'bg-white text-bark border border-sand'}`}>
              Comunidades
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-4">
              {activeTab === 'feed' && (
                <>
                  {/* New post */}
                  <ScrollReveal>
                    <div className="bg-white rounded-card shadow-card p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold flex items-center justify-center">U</div>
                        <input className="flex-1 px-4 py-2.5 rounded-full bg-cream border border-sand text-sm focus:border-primary outline-none" placeholder="Que hiciste hoy con tu mascota?" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-bark bg-cream px-3 py-1.5 rounded-full hover:bg-sand transition-all">📸 Foto</button>
                          <button className="text-xs font-semibold text-bark bg-cream px-3 py-1.5 rounded-full hover:bg-sand transition-all">📍 Ubicacion</button>
                          <button className="text-xs font-semibold text-bark bg-cream px-3 py-1.5 rounded-full hover:bg-sand transition-all">🐾 Mascota</button>
                        </div>
                        <button className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full boop-btn">Publicar</button>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Posts */}
                  {MOCK_POSTS.map((post, i) => (
                    <ScrollReveal key={post.id} delay={i * 60}>
                      <div className="bg-white rounded-card shadow-card p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose text-white text-sm font-bold flex items-center justify-center">{post.avatar}</div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-dark">{post.user}</div>
                            <div className="text-[11px] text-bark">{post.icon} {post.pet} · {post.breed} · {post.time}</div>
                          </div>
                        </div>
                        <p className="text-sm text-dark mb-4 leading-relaxed">{post.text}</p>
                        {/* Placeholder image */}
                        <div className="h-48 bg-gradient-to-br from-sand to-cream rounded-xl mb-4 flex items-center justify-center text-5xl opacity-30">
                          {post.icon}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-bark">
                          <button className="flex items-center gap-1 hover:text-primary transition-colors boop-btn">
                            🐾 <span className="font-semibold">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageCircle size={14} /> <span>{post.comments}</span>
                          </button>
                          <button className="ml-auto text-bark/40 hover:text-primary transition-colors text-xs">Compartir</button>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </>
              )}

              {activeTab === 'communities' && (
                <>
                  {/* Pet type filter */}
                  <ScrollReveal>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {PET_TYPES.map((pt) => (
                        <button key={pt.id} className="bg-white rounded-card px-4 py-3 card-hover border-2 border-sand hover:border-primary/20 text-center boop-btn">
                          <div className="text-2xl">{pt.icon}</div>
                          <div className="text-[10px] font-semibold text-bark mt-1">{pt.name}</div>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>

                  {MOCK_COMMUNITIES.map((com, i) => (
                    <ScrollReveal key={com.id} delay={i * 60}>
                      <div className="bg-white rounded-card shadow-card p-5 card-hover">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: com.color + '15' }}>{com.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-heading font-bold text-dark">{com.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-bark">
                              <Users size={12} /> {com.members} miembros · {com.posts} publicaciones
                            </div>
                          </div>
                          <button className="px-4 py-2 rounded-full text-sm font-bold boop-btn transition-all" style={{ backgroundColor: com.color + '15', color: com.color }}>
                            Unirse
                          </button>
                        </div>
                        <p className="text-sm text-bark mb-3">{com.description}</p>
                        <div className="flex gap-1.5">
                          {com.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sand text-bark">
                              <Hash size={8} className="inline" />{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 hidden lg:block">
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-5">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" /> Tendencias
                  </h3>
                  <div className="space-y-2">
                    {['#MascotaTonAQP', '#PaseoPorYanahuara', '#GatitosFelices', '#AdoptaNoCompres', '#RutaSelvaAlegre'].map((tag) => (
                      <div key={tag} className="text-sm text-primary font-semibold hover:underline cursor-pointer">{tag}</div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="bg-white rounded-card shadow-card p-5">
                  <h3 className="font-heading font-bold text-dark text-sm mb-3">Comunidades sugeridas</h3>
                  {MOCK_COMMUNITIES.slice(0, 3).map((com) => (
                    <div key={com.id} className="flex items-center gap-2 py-2">
                      <span className="text-lg">{com.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-dark truncate">{com.name}</div>
                        <div className="text-[10px] text-bark">{com.members} miembros</div>
                      </div>
                      <button className="text-[10px] font-bold text-primary hover:underline">Unirse</button>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <AdSlot slot="event_sidebar" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
