'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/** Diálogo modal: hoja inferior en móvil, tarjeta centrada en escritorio. */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button, a, input, select, textarea')?.focus(), 30);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] shadow-card-hover p-6 pb-8 sm:pb-6 animate-toast-in max-h-[90vh] overflow-y-auto"
      >
        <div className="sm:hidden mx-auto -mt-2 mb-4 w-10 h-1.5 rounded-full bg-sand" />
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="font-heading font-extrabold text-2xl text-dark leading-tight">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="p-2 -m-1 rounded-full hover:bg-sand text-bark">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
