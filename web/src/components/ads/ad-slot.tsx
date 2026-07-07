'use client';

interface AdSlotProps {
  slot: 'home_banner' | 'directory_top' | 'map_featured' | 'event_sidebar';
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  // Placeholder - will be replaced with real ads
  const labels: Record<string, string> = {
    home_banner: 'Espacio publicitario',
    directory_top: 'Negocio destacado',
    map_featured: 'Servicio destacado',
    event_sidebar: 'Evento patrocinado',
  };

  return (
    <div className={`bg-sand/50 border border-dashed border-bark/15 rounded-card p-4 text-center ${className}`}>
      <p className="text-[10px] text-bark/40 font-semibold uppercase tracking-wider mb-1">Publicidad</p>
      <p className="text-xs text-bark/30">{labels[slot]}</p>
    </div>
  );
}
