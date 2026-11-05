'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAppStore, useHydrated, FavoriteKind } from '@/lib/store';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  kind: FavoriteKind;
  id: string;
  label: string;
  size?: number;
  className?: string;
}

const BURST = ['#F0506E', '#FFC531', '#3352F5', '#F0506E', '#0F8A5F', '#FFC531'];

/** Corazón de favoritos persistente, con animación de "pop" y partículas. */
export function FavoriteButton({ kind, id, label, size = 16, className }: FavoriteButtonProps) {
  const hydrated = useHydrated();
  const active = useAppStore((s) => !!s.favorites[`${kind}:${id}`]) && hydrated;
  const toggle = useAppStore((s) => s.toggleFavorite);
  const [burstKey, setBurstKey] = useState(0);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Quitar ${label} de favoritos` : `Guardar ${label} en favoritos`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(kind, id, label);
        if (added) setBurstKey((k) => k + 1);
      }}
      className={cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-card hover:bg-white transition-colors',
        className,
      )}
    >
      <Heart
        key={active ? `on-${burstKey}` : 'off'}
        size={size}
        className={cn(active ? 'fill-rose text-rose animate-heart-pop' : 'text-bark')}
      />
      {burstKey > 0 && active && (
        <span key={burstKey} aria-hidden>
          {BURST.map((c, i) => (
            <span key={i} className="burst-dot" style={{ background: c, ['--r' as string]: `${i * 60}deg` }} />
          ))}
        </span>
      )}
    </button>
  );
}
