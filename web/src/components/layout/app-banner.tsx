'use client';

import { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';

export function AppBanner() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('app-banner-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }
    // Show after 2 seconds
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('app-banner-dismissed', 'true');
  }

  if (dismissed || !show) return null;

  return (
    <>
      {/* Mobile bottom banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
        <div className="bg-white border-t border-sand shadow-2xl px-4 py-3 safe-bottom">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-button">
              🐾
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-dark text-sm">Mejor experiencia en la app</p>
              <p className="text-xs text-bark truncate">Crea rutas, inicia paseos y mas desde tu celular</p>
            </div>
            <button
              onClick={dismiss}
              className="p-1.5 text-bark hover:bg-sand rounded-lg shrink-0"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-primary text-white font-bold text-sm py-2.5 rounded-button boop-btn flex items-center justify-center gap-1.5">
              <Smartphone size={14} /> Abrir en la app
            </button>
            <button
              onClick={dismiss}
              className="px-4 text-bark text-sm font-medium py-2.5 rounded-button border border-sand hover:bg-sand/50"
            >
              Continuar en la web
            </button>
          </div>
        </div>
      </div>

      {/* Desktop top banner (subtle) */}
      <div className="hidden lg:block bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span>📱</span>
            <span className="text-bark">
              <span className="font-semibold text-dark">HuellaGo</span> esta disponible como app.
              Crea rutas, inicia paseos y registra huellas desde tu celular.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-primary text-white font-semibold text-xs px-4 py-1.5 rounded-full boop-btn hover:bg-primary-dark transition-all">
              Descargar app
            </button>
            <button onClick={dismiss} className="text-bark hover:text-dark">
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
