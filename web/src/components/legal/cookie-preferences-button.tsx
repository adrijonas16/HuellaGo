'use client';

import { useConsent } from '@/lib/consent';
import { cn } from '@/lib/utils';

export function CookiePreferencesButton({ className, label = 'Configurar cookies' }: { className?: string; label?: string }) {
  const open = useConsent((s) => s.openPanel);
  return (
    <button type="button" onClick={open} className={cn('inline-flex items-center rounded-full bg-dark text-white text-sm font-bold px-4 py-2 hover:bg-primary transition-colors', className)}>
      {label}
    </button>
  );
}
