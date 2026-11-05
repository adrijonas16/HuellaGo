'use client';

import { Share2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/** Comparte con la hoja nativa del sistema o copia el enlace como respaldo. */
export function ShareButton({ title, className, size = 18 }: { title: string; className?: string; size?: number }) {
  const notify = useAppStore((s) => s.notify);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      notify('Enlace copiado. Pégalo donde quieras compartirlo.', { tone: 'success' });
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') notify('No se pudo compartir. Copia el enlace desde la barra del navegador.', { tone: 'error' });
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Compartir ${title}`}
      className={cn('inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-card hover:bg-white transition-colors', className)}
    >
      <Share2 size={size} className="text-bark" />
    </button>
  );
}
