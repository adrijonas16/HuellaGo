'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MOCK_COMMUNITIES, PET_TYPES } from '@/lib/mock-data';
import { Users, MessageCircle, TrendingUp, ImagePlus, X, Check, Send } from 'lucide-react';
import { AdSlot } from '@/components/ads/ad-slot';
import { PawMark } from '@/components/layout/logo';
import { useAppStore, useHydrated } from '@/lib/store';
import { useAuth } from '@/hooks';
import { ShareButton } from '@/components/ui/share-button';

interface Post {
  id: string;
  user: string;
  avatar: string;
  pet: string;
  icon: string;
  text: string;
  time: string;
  likes: number;
  comments: { user: string; text: string }[];
  photo?: string;
  mine?: boolean;
}

const INITIAL_POSTS: Post[] = [
  { id: 'p1', user: 'María G.', avatar: 'M', pet: 'Toby', icon: '🐕', text: '¡Hoy paseamos por el Parque Selva Alegre! Toby hizo nuevos amigos.', time: 'Hace 20 min', likes: 24, comments: [{ user: 'Ana', text: '¡Qué lindo! ¿A qué hora suelen ir?' }] },
  { id: 'p2', user: 'Carlos Q.', avatar: 'C', pet: 'Michi', icon: '🐱', text: 'Mi gatito recién vacunado en Patitas Felices. Excelente atención.', time: 'Hace 1 h', likes: 18, comments: [] },
  { id: 'p3', user: 'Ana T.', avatar: 'A', pet: 'Coco', icon: '🐕', text: '¿Alguien conoce un buen grooming en Cayma? Coco necesita un corte urgente.', time: 'Hace 2 h', likes: 7, comments: [{ user: 'Luis', text: 'Happy Paws en JLByR es muy bueno.' }, { user: 'Sofía', text: 'Te recomiendo reservar con un día de anticipación.' }] },
  { id: 'p4', user: 'Luis M.', avatar: 'L', pet: 'Nieve', icon: '🐰', text: '¡Mi conejita Nieve cumple 2 añitos hoy!', time: 'Hace 3 h', likes: 45, comments: [] },
  { id: 'p5', user: 'Sofía R.', avatar: 'S', pet: 'Kiwi', icon: '🦜', text: 'Kiwi aprendió a decir "hola" cuando alguien entra a casa.', time: 'Hace 5 h', likes: 32, comments: [] },
];

const MY_PETS = [
  { name: 'Firulais', icon: '🐕' },
  { name: 'Michi', icon: '🐱' },
];

const TYPE_TAG: Record<string, string[]> = {
  dog: ['perros', 'golden'],
  cat: ['gatos'],
  rabbit: ['conejos'],
  bird: ['aves'],
  hamster: ['hámsters', 'pequeñas'],
  fish: ['exóticas'],
  turtle: ['exóticas'],
  other: ['pet friendly', 'rescate'],
};

function JoinButton({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const hydrated = useHydrated();
  const joined = useAppStore((s) => !!s.communities[id]) && hydrated;
  const toggle = useAppStore((s) => s.toggleCommunity);
  return (
    <button
      onClick={() => toggle(id, name)}
      aria-pressed={joined}
      className={`shrink-0 inline-flex items-center gap-1 rounded-full font-bold transition-colors boop-btn ${compact ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2'} ${
        joined ? 'bg-secondary/10 text-secondary-dark' : 'bg-dark text-white hover:bg-primary'
      }`}
    >
      {joined ? (<><Check size={14} strokeWidth={3} /> Miembro</>) : 'Unirme'}
    </button>
  );
}

export default function CommunityPage() {
  const { user } = useAuth();
  const hydrated = useHydrated();
  const notify = useAppStore((s) => s.notify);
  const [activeTab, setActiveTab] = useState<'feed' | 'communities'>('feed');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState('');
  const [draftPet, setDraftPet] = useState(MY_PETS[0]);
  const [photo, setPhoto] = useState<string | undefined>();
  const [reply, setReply] = useState<Record<string, string>>({});
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const me = hydrated && user ? `${user.firstName} ${user.lastName?.[0] ?? ''}.`.trim() : 'Tú';
  const myInitial = (hydrated && user?.firstName?.[0]) || 'T';

  function publish(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setPosts((p) => [
      { id: `mine-${Date.now()}`, user: me, avatar: myInitial, pet: draftPet.name, icon: draftPet.icon, text: draft.trim(), time: 'Ahora', likes: 0, comments: [], photo, mine: true },
      ...p,
    ]);
    setDraft('');
    setPhoto(undefined);
    notify('Publicado en la comunidad', { tone: 'success' });
  }

  function sendReply(postId: string) {
    const text = reply[postId]?.trim();
    if (!text) return;
    setPosts((p) => p.map((x) => (x.id === postId ? { ...x, comments: [...x.comments, { user: me, text }] } : x)));
    setReply((r) => ({ ...r, [postId]: '' }));
  }

  const communities = typeFilter ? MOCK_COMMUNITIES.filter((c) => c.tags.some((t) => TYPE_TAG[typeFilter]?.includes(t))) : MOCK_COMMUNITIES;

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <header className="mb-8">
            <h1 className="font-heading font-extrabold text-dark leading-[0.95]" style={{ fontSize: 'clamp(38px, 5.4vw, 64px)', letterSpacing: '-0.045em' }}>
              Comunidad
            </h1>
            <p className="text-bark text-lg mt-3">Comparte paseos, pide recomendaciones y conoce a otros dueños de Arequipa.</p>
          </header>

          <div className="inline-flex gap-1 p-1 bg-white border border-sand rounded-full mb-8" role="tablist">
            {(['feed', 'communities'] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={activeTab === t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === t ? 'bg-dark text-white' : 'text-bark hover:text-dark'}`}
              >
                {t === 'feed' ? 'Publicaciones' : 'Comunidades'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {activeTab === 'feed' && (
                <>
                  <form onSubmit={publish} className="bg-white rounded-card p-5">
                    <div className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-full bg-accent text-dark font-heading font-extrabold flex items-center justify-center shrink-0">{myInitial}</span>
                      <div className="flex-1">
                        <label htmlFor="post" className="sr-only">Escribe una publicación</label>
                        <textarea
                          id="post"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          rows={draft ? 3 : 1}
                          maxLength={500}
                          className="w-full px-4 py-2.5 rounded-2xl bg-cream border border-sand text-[15px] focus:border-primary focus:bg-white outline-none resize-none transition-all"
                          placeholder="¿Qué hiciste hoy con tu mascota?"
                        />
                        {photo && (
                          <div className="relative mt-3 inline-block animate-scale-in">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo} alt="Vista previa de la foto" className="h-28 rounded-xl object-cover" />
                            <button type="button" onClick={() => setPhoto(undefined)} aria-label="Quitar foto" className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-dark text-white flex items-center justify-center">
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-3 mt-3 pl-[52px]">
                      <div className="flex flex-wrap gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-bark bg-cream px-3 py-1.5 rounded-full hover:bg-sand transition-colors focus-within:ring-2 focus-within:ring-primary">
                          <ImagePlus size={14} /> Foto
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) setPhoto(URL.createObjectURL(f));
                            }}
                          />
                        </label>
                        {MY_PETS.map((p) => (
                          <button
                            type="button"
                            key={p.name}
                            onClick={() => setDraftPet(p)}
                            aria-pressed={draftPet.name === p.name}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${draftPet.name === p.name ? 'bg-primary-soft text-primary-dark ring-1 ring-primary/30' : 'bg-cream text-bark hover:bg-sand'}`}
                          >
                            {p.icon} {p.name}
                          </button>
                        ))}
                      </div>
                      <button disabled={!draft.trim()} className="bg-primary text-white text-sm font-bold px-5 py-2 rounded-full boop-btn disabled:opacity-40">
                        Publicar
                      </button>
                    </div>
                  </form>

                  {posts.map((post) => {
                    const isLiked = !!liked[post.id];
                    return (
                      <article key={post.id} className={`bg-white rounded-card p-5 ${post.mine ? 'animate-slide-up ring-2 ring-accent' : ''}`}>
                        <header className="flex items-center gap-3 mb-3">
                          <span className="w-10 h-10 rounded-full bg-primary-soft text-primary-dark font-heading font-extrabold flex items-center justify-center">{post.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-dark">{post.user}</p>
                            <p className="text-xs text-bark">con {post.icon} {post.pet}, {post.time.toLowerCase()}</p>
                          </div>
                        </header>
                        <p className="text-[15px] text-dark leading-relaxed">{post.text}</p>
                        {post.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.photo} alt={`Foto de ${post.pet}`} className="mt-4 w-full max-h-96 object-cover rounded-2xl" />
                        )}
                        <div className="flex items-center gap-1 mt-4 -ml-2 text-sm text-bark">
                          <button
                            onClick={() => setLiked((l) => ({ ...l, [post.id]: !isLiked }))}
                            aria-pressed={isLiked}
                            aria-label={isLiked ? 'Quitar huella' : 'Dejar una huella'}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${isLiked ? 'text-primary bg-primary-soft' : 'hover:bg-cream'}`}
                          >
                            <PawMark className={`w-4 h-4 ${isLiked ? 'animate-heart-pop' : ''}`} />
                            <span className="font-bold tabular-nums">{post.likes + (isLiked ? 1 : 0)}</span>
                          </button>
                          <button
                            onClick={() => setOpenComments((o) => ({ ...o, [post.id]: !o[post.id] }))}
                            aria-expanded={!!openComments[post.id]}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-cream"
                          >
                            <MessageCircle size={16} /> <span className="font-bold tabular-nums">{post.comments.length}</span>
                          </button>
                          <ShareButton title={`Publicación de ${post.user} en HuellaGo`} className="ml-auto w-8 h-8 shadow-none bg-transparent hover:bg-cream" size={16} />
                        </div>
                        {openComments[post.id] && (
                          <div className="mt-3 pt-3 border-t border-sand space-y-2 animate-slide-up">
                            {post.comments.map((c, i) => (
                              <p key={i} className="text-sm bg-cream rounded-2xl px-3 py-2">
                                <strong className="text-dark">{c.user}</strong> <span className="text-dark/80">{c.text}</span>
                              </p>
                            ))}
                            <form
                              onSubmit={(e) => { e.preventDefault(); sendReply(post.id); }}
                              className="flex items-center gap-2"
                            >
                              <label htmlFor={`r-${post.id}`} className="sr-only">Escribe un comentario</label>
                              <input
                                id={`r-${post.id}`}
                                value={reply[post.id] ?? ''}
                                onChange={(e) => setReply((r) => ({ ...r, [post.id]: e.target.value }))}
                                placeholder="Escribe un comentario"
                                className="flex-1 bg-cream rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                              />
                              <button aria-label="Enviar comentario" className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40" disabled={!reply[post.id]?.trim()}>
                                <Send size={15} />
                              </button>
                            </form>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </>
              )}

              {activeTab === 'communities' && (
                <>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1" role="group" aria-label="Filtrar por tipo de mascota">
                    {PET_TYPES.map((pt) => (
                      <button
                        key={pt.id}
                        onClick={() => setTypeFilter(typeFilter === pt.id ? null : pt.id)}
                        aria-pressed={typeFilter === pt.id}
                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${typeFilter === pt.id ? 'bg-dark text-white' : 'bg-white border border-sand text-dark hover:border-bark-light'}`}
                      >
                        <span aria-hidden>{pt.icon}</span> {pt.name}
                      </button>
                    ))}
                  </div>
                  {communities.length === 0 && (
                    <p className="bg-white rounded-card p-8 text-center text-bark">Aún no hay comunidades para ese tipo de mascota.</p>
                  )}
                  {communities.map((com) => (
                    <div key={com.id} className="bg-white rounded-card p-5 animate-slide-up">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: com.color + '18' }} aria-hidden>{com.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-heading font-bold text-dark text-lg leading-tight">{com.name}</h2>
                          <p className="flex items-center gap-1.5 text-sm text-bark">
                            <Users size={13} /> {com.members.toLocaleString('es-PE')} miembros, {com.posts} publicaciones
                          </p>
                        </div>
                        <JoinButton id={com.id} name={com.name} />
                      </div>
                      <p className="text-sm text-bark">{com.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {com.tags.map((tag) => (
                          <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream text-bark">#{tag.replace(/\s/g, '')}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <aside className="space-y-6 hidden lg:block">
              <div className="bg-white rounded-card p-5">
                <h2 className="font-heading font-bold text-dark mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Tendencias en Arequipa
                </h2>
                <ul className="space-y-1">
                  {['MascotaTonAQP', 'PaseoPorYanahuara', 'GatitosFelices', 'AdoptaNoCompres', 'RutaSelvaAlegre'].map((tag) => (
                    <li key={tag}>
                      <button onClick={() => setDraft((d) => `${d}${d ? ' ' : ''}#${tag} `)} className="text-sm text-primary font-semibold link-route">
                        #{tag}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-card p-5">
                <h2 className="font-heading font-bold text-dark mb-3">Comunidades sugeridas</h2>
                {MOCK_COMMUNITIES.slice(0, 3).map((com) => (
                  <div key={com.id} className="flex items-center gap-2 py-2">
                    <span className="text-xl" aria-hidden>{com.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-dark truncate">{com.name}</p>
                      <p className="text-xs text-bark">{com.members.toLocaleString('es-PE')} miembros</p>
                    </div>
                    <JoinButton id={com.id} name={com.name} compact />
                  </div>
                ))}
                <Link href="/adoptions" className="block mt-3 text-sm font-bold text-rose-dark link-route w-fit">¿Buscas adoptar? Ver mascotas</Link>
              </div>

              <AdSlot slot="event_sidebar" />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
