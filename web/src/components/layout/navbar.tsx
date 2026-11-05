'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Heart, LayoutDashboard, LogOut, PawPrint, Settings, X, LogIn } from 'lucide-react';
import { NotificationDropdown } from '@/components/notifications/notification-toast';
import { GlobalSearch } from '@/components/search/global-search';
import { Logo } from '@/components/layout/logo';
import { useAuth } from '@/hooks';
import { useAppStore, useHydrated } from '@/lib/store';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/map', label: 'Mapa' },
  { href: '/events', label: 'Eventos' },
  { href: '/directory', label: 'Servicios' },
  { href: '/routes', label: 'Rutas' },
  { href: '/community', label: 'Comunidad' },
  { href: '/adoptions', label: 'Adopción' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydrated();
  const { isAuthenticated, user, logout } = useAuth();
  const notify = useAppStore((s) => s.notify);
  const favCount = useAppStore((s) => Object.keys(s.favorites).length);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const loggedIn = hydrated && isAuthenticated && !!user;
  const initial = user?.firstName?.[0]?.toUpperCase() ?? '?';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menús al navegar y con Escape
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    notify('Cerraste sesión. ¡Hasta el próximo paseo!', { tone: 'info' });
    router.push('/');
  }

  return (
    <nav
      aria-label="Principal"
      className={cn(
        'sticky top-0 z-50 border-b transition-[box-shadow,border-color] duration-300',
        scrolled ? 'border-sand shadow-[0_8px_24px_-18px_rgba(25,28,51,0.35)]' : 'border-transparent',
      )}
    >
      {/* Fondo desenfocado en una capa aparte: si el filtro estuviera en <nav>,
          los overlays `fixed` (búsqueda, menús) quedarían atrapados dentro de la barra. */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 transition-colors duration-300 backdrop-blur-xl',
          scrolled ? 'bg-white/85' : 'bg-cream/70',
        )}
      />
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 bg-dark text-white px-4 py-2 rounded-full text-sm z-[60]">
        Saltar al contenido
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Logo />

          {/* Enlaces principales */}
          <div className="hidden lg:flex items-center gap-1 bg-white/70 border border-sand rounded-full p-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors',
                  isActive(l.href) ? 'bg-dark text-white' : 'text-bark hover:text-dark hover:bg-sand/70',
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-1">
            <GlobalSearch />
            <NotificationDropdown />

            <Link
              href="/favorites"
              aria-label={`Favoritos${hydrated && favCount ? ` (${favCount})` : ''}`}
              className="relative p-2 rounded-full hover:bg-sand transition-colors hidden sm:flex"
            >
              <Heart size={20} className="text-bark" />
              {hydrated && favCount > 0 && (
                <span key={favCount} className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose text-white text-[10px] font-bold flex items-center justify-center animate-bounce-in">
                  {favCount}
                </span>
              )}
            </Link>

            {loggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  aria-label="Abrir menú de usuario"
                  className="w-9 h-9 rounded-full bg-accent text-dark font-heading font-extrabold text-sm flex items-center justify-center boop-btn ring-2 ring-white"
                >
                  {initial}
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div role="menu" className="absolute right-0 top-12 w-60 bg-white rounded-2xl shadow-card-hover border border-sand z-50 animate-slide-down overflow-hidden">
                      <div className="px-4 py-3 border-b border-sand">
                        <p className="text-sm font-bold text-dark truncate">{user!.firstName} {user!.lastName}</p>
                        <p className="text-xs text-bark truncate">{user!.email}</p>
                      </div>
                      <div className="p-1.5">
                        {[
                          { href: '/dashboard', icon: LayoutDashboard, label: 'Mi panel' },
                          { href: '/pets', icon: PawPrint, label: 'Mis mascotas' },
                          { href: '/favorites', icon: Heart, label: 'Favoritos' },
                          { href: '/profile/edit', icon: Settings, label: 'Configuración' },
                        ].map(({ href, icon: Icon, label }) => (
                          <Link key={href} role="menuitem" href={href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-dark hover:bg-cream transition-colors">
                            <Icon size={16} className="text-bark" /> {label}
                          </Link>
                        ))}
                      </div>
                      <div className="p-1.5 border-t border-sand">
                        <button role="menuitem" onClick={handleLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-error hover:bg-error/5 transition-colors w-full">
                          <LogOut size={16} /> Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  'hidden sm:inline-flex items-center gap-1.5 bg-dark text-white text-sm font-bold px-4 py-2 rounded-full boop-btn hover:bg-primary transition-colors',
                  !hydrated && 'invisible',
                )}
              >
                <LogIn size={15} /> Ingresar
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-movil"
              className="lg:hidden p-2 rounded-full hover:bg-sand"
            >
              {mobileMenuOpen ? <X size={22} className="text-dark" /> : <Menu size={22} className="text-dark" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil: panel a pantalla completa con entrada escalonada */}
      {mobileMenuOpen && hydrated && createPortal(
        <div id="menu-movil" className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-cream z-[45] overflow-y-auto animate-fade-in">
          <div className="px-5 pt-4 pb-10">
            <ul className="space-y-1">
              {LINKS.map((l, i) => (
                <li key={l.href} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between font-heading font-extrabold text-[32px] tracking-[-0.04em] py-1.5',
                      isActive(l.href) ? 'text-primary' : 'text-dark',
                    )}
                  >
                    {l.label}
                    {isActive(l.href) && <PawPrint size={22} />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-2 animate-slide-up" style={{ animationDelay: '260ms' }}>
              {(loggedIn
                ? [
                    { href: '/dashboard', label: 'Mi panel' },
                    { href: '/pets', label: 'Mis mascotas' },
                    { href: '/favorites', label: 'Favoritos' },
                    { href: '/pricing', label: 'Planes' },
                  ]
                : [
                    { href: '/favorites', label: 'Favoritos' },
                    { href: '/pricing', label: 'Planes' },
                    { href: '/business/register', label: 'Registrar negocio' },
                    { href: '/help', label: 'Ayuda' },
                  ]
              ).map((l) => (
                <Link key={l.href} href={l.href} className="bg-white border border-sand rounded-2xl px-4 py-3 text-sm font-semibold text-dark">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 animate-slide-up" style={{ animationDelay: '320ms' }}>
              {loggedIn ? (
                <button onClick={handleLogout} className="w-full border border-error/30 text-error font-bold rounded-full py-3">
                  Cerrar sesión
                </button>
              ) : (
                <Link href="/login" className="block text-center bg-primary text-white font-bold rounded-full py-3.5 shadow-button">
                  Ingresar o crear cuenta
                </Link>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </nav>
  );
}
