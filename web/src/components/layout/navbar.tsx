'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Heart, LayoutDashboard, LogOut, User, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { NotificationDropdown } from '@/components/notifications/notification-toast';
import { GlobalSearch } from '@/components/search/global-search';
import { useAuth } from '@/hooks';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">🐾</span>
            </div>
            <span className="font-heading font-extrabold text-xl text-dark">
              Huella<span className="text-primary">Go</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/map" className="text-sm font-medium text-bark hover:text-primary transition-colors">Mapa</Link>
            <Link href="/events" className="text-sm font-medium text-bark hover:text-primary transition-colors">Eventos</Link>
            <Link href="/directory" className="text-sm font-medium text-bark hover:text-primary transition-colors">Servicios</Link>
            <Link href="/community" className="text-sm font-medium text-bark hover:text-primary transition-colors">Comunidad</Link>
            <Link href="/adoptions" className="text-sm font-medium text-rose hover:text-rose-dark transition-colors">Adopciones</Link>
            <Link href="/pricing" className="text-sm font-medium text-bark hover:text-primary transition-colors">Planes</Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-1.5">
            <GlobalSearch />
            <NotificationDropdown />

            <Link href="/favorites" className="p-2 rounded-lg hover:bg-sand transition-colors hidden sm:block">
              <Heart size={20} className="text-bark" />
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-sm flex items-center justify-center boop-btn"
              >
                M
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-card shadow-card-hover border border-sand z-50 animate-slide-up overflow-hidden">
                    <div className="px-4 py-3 border-b border-sand">
                      <p className="text-sm font-bold text-dark">Maria Garcia</p>
                      <p className="text-xs text-bark">Arequipa, Peru</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-dark hover:bg-cream transition-colors">
                        <LayoutDashboard size={16} className="text-bark" /> Mi dashboard
                      </Link>
                      <Link href="/favorites" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-dark hover:bg-cream transition-colors">
                        <Heart size={16} className="text-bark" /> Favoritos
                      </Link>
                      <Link href="/pets" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-dark hover:bg-cream transition-colors">
                        <User size={16} className="text-bark" /> Mis mascotas
                      </Link>
                      <Link href="/profile/edit" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-dark hover:bg-cream transition-colors">
                        <Settings size={16} className="text-bark" /> Configuracion
                      </Link>
                    </div>
                    <div className="p-2 border-t border-sand">
                      <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-error hover:bg-error/5 transition-colors w-full">
                        <LogOut size={16} /> Cerrar sesion
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-sand">
              {mobileMenuOpen ? <X size={20} className="text-bark" /> : <Menu size={20} className="text-bark" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-sand animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {[
              { href: '/map', label: 'Mapa' },
              { href: '/events', label: 'Eventos' },
              { href: '/directory', label: 'Servicios' },
              { href: '/community', label: 'Comunidad' },
              { href: '/adoptions', label: 'Adopciones' },
              { href: '/routes', label: 'Rutas' },
              { href: '/dashboard', label: 'Mi dashboard' },
              { href: '/pets', label: 'Mis mascotas' },
              { href: '/favorites', label: 'Favoritos' },
              { href: '/pricing', label: 'Planes' },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-dark hover:bg-cream transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
