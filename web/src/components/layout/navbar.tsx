'use client';

import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-heading font-bold text-xl text-dark">
              HuellaGo
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/map"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Mapa
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Eventos
            </Link>
            <Link
              href="/routes"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Rutas
            </Link>
            <Link
              href="/directory"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Servicios
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-500" />
            </button>

            {isAuthenticated ? (
              <>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                  <Bell size={20} className="text-gray-500" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
                </button>
                <button
                  onClick={logout}
                  className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm"
                >
                  {user?.firstName?.[0]}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar sesion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}

            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
