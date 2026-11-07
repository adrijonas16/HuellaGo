'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Smartphone } from 'lucide-react';
import { PawMark } from '@/components/layout/logo';
import { useAppStore } from '@/lib/store';
import { useConsent } from '@/lib/consent';

const KEY = 'hg-app-banner-dismissed-at';
const WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Invitación a la app móvil. Menos intrusiva que antes:
 * - Escritorio: franja fina arriba.
 * - Móvil: tarjeta compacta que aparece solo tras hacer scroll,
 *   nunca en pantallas de acceso, y se oculta 7 días al cerrarla.
 */
export function AppBanner() {
  const pathname = usePathname();
  const notify = useAppStore((s) => s.notify);
  const consentDecided = useConsent((s) => s.decided);
  const [eligible, setEligible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const at = Number(localStorage.getItem(KEY) || 0);
    setEligible(Date.now() - at > WEEK);
    const onScroll = () => window.scrollY > 700 && setScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    setEligible(false);
    localStorage.setItem(KEY, String(Date.now()));
  }

  function openApp() {
    dismiss();
    notify('La app de HuellaGo llega pronto a iOS y Android. Te avisaremos.', { tone: 'info' });
  }

  if (!eligible || /^\/(login|register|forgot-password)/.test(pathname || '')) return null;

  return (
    <>
      {scrolled && consentDecided && (
        <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden animate-toast-in">
          <div className="bg-white border border-sand rounded-2xl shadow-card-hover p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 -rotate-6">
              <PawMark className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-dark text-sm leading-tight">Registra tus paseos con la app</p>
              <p className="text-xs text-bark truncate">Rutas, fotos y huellas desde tu celular</p>
            </div>
            <button onClick={openApp} className="bg-dark text-white text-xs font-bold px-3 py-2 rounded-full shrink-0">
              Avísame
            </button>
            <button onClick={dismiss} aria-label="Cerrar" className="p-1.5 text-bark hover:bg-sand rounded-full shrink-0">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:block bg-dark text-white">
        <div className="max-w-7xl mx-auto px-8 py-1.5 flex items-center justify-center gap-3 text-[13px]">
          <Smartphone size={14} className="text-accent" />
          <span className="text-white/75">La app de HuellaGo llega pronto: registra rutas, fotos y huellas de cada paseo.</span>
          <button onClick={openApp} className="font-bold text-accent hover:underline">Quiero que me avisen</button>
          <button onClick={dismiss} aria-label="Cerrar aviso de la app" className="ml-2 text-white/50 hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
