'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { useConsent } from '@/lib/consent';
import { useHydrated } from '@/lib/store';

/**
 * Banner de consentimiento. Rechazar es tan fácil como aceptar; las cookies
 * necesarias van siempre y la analítica solo con permiso.
 */
export function CookieConsent() {
  const hydrated = useHydrated();
  const { decided, analytics, panelOpen, acceptAll, rejectAll, save, closePanel } = useConsent();
  const [custom, setCustom] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(analytics);

  useEffect(() => setAnalyticsChoice(analytics), [analytics, panelOpen]);
  useEffect(() => {
    if (panelOpen) setCustom(true);
  }, [panelOpen]);

  if (!hydrated || (decided && !panelOpen)) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-title"
      className="fixed z-[120] bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md bg-white border border-sand rounded-2xl shadow-card-hover p-5 animate-toast-in"
    >
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 rounded-xl bg-accent-soft text-dark flex items-center justify-center shrink-0">
          <Cookie size={20} />
        </span>
        <div className="flex-1">
          <h2 id="cookies-title" className="font-heading font-bold text-dark text-lg leading-tight">
            Tu privacidad, tu decisión
          </h2>
          <p className="text-sm text-bark mt-1.5">
            Usamos cookies necesarias para que el sitio funcione y, si aceptas, cookies de analítica para entender qué mejorar.{' '}
            <Link href="/cookies" className="font-semibold text-primary underline underline-offset-2">
              Ver política de cookies
            </Link>
          </p>
        </div>
        {panelOpen && (
          <button onClick={closePanel} aria-label="Cerrar preferencias de cookies" className="p-1.5 -m-1 rounded-full text-bark hover:bg-sand">
            <X size={16} />
          </button>
        )}
      </div>

      {custom && (
        <div className="mt-4 space-y-2 animate-slide-up">
          <label className="flex items-start gap-3 rounded-xl bg-cream p-3">
            <input type="checkbox" checked disabled className="mt-1 accent-primary" />
            <span className="text-sm">
              <span className="block font-semibold text-dark">Necesarias</span>
              <span className="text-bark">Sesión, favoritos y preferencias. Siempre activas.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-xl bg-cream p-3 cursor-pointer">
            <input
              type="checkbox"
              checked={analyticsChoice}
              onChange={(e) => setAnalyticsChoice(e.target.checked)}
              className="mt-1 accent-primary w-4 h-4"
            />
            <span className="text-sm">
              <span className="block font-semibold text-dark">Analítica</span>
              <span className="text-bark">Google Analytics, con IP anonimizada, para medir visitas y mejorar el sitio.</span>
            </span>
          </label>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={rejectAll} className="rounded-full border-2 border-dark text-dark font-bold text-sm py-2.5 hover:bg-dark hover:text-white transition-colors">
          Rechazar
        </button>
        <button onClick={acceptAll} className="rounded-full bg-primary text-white font-bold text-sm py-2.5 shadow-button boop-btn hover:bg-primary-dark">
          Aceptar todas
        </button>
      </div>
      {custom ? (
        <button onClick={() => save(analyticsChoice)} className="w-full mt-2 text-sm font-bold text-primary py-2 rounded-full hover:bg-primary-soft">
          Guardar mi elección
        </button>
      ) : (
        <button onClick={() => setCustom(true)} className="w-full mt-2 text-sm font-semibold text-bark py-2 rounded-full hover:bg-cream">
          Elegir cuáles
        </button>
      )}
    </section>
  );
}
