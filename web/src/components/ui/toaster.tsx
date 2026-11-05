'use client';

import Link from 'next/link';
import { Check, Info, X, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function Toaster() {
  const toasts = useAppStore((s) => s.toasts);
  const dismiss = useAppStore((s) => s.dismissToast);

  return (
    <div
      aria-live="polite"
      role="status"
      className="fixed z-[300] bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto animate-toast-in flex items-center gap-3 bg-dark text-white rounded-2xl pl-3 pr-2 py-2.5 shadow-card-hover"
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              t.tone === 'success' ? 'bg-accent text-dark' : t.tone === 'error' ? 'bg-rose text-white' : 'bg-white/15 text-white'
            }`}
          >
            {t.tone === 'success' ? <Check size={15} strokeWidth={3} /> : t.tone === 'error' ? <AlertTriangle size={14} /> : <Info size={15} />}
          </span>
          <p className="text-sm font-medium flex-1">{t.message}</p>
          {t.action && (
            <Link href={t.action.href} onClick={() => dismiss(t.id)} className="text-sm font-bold text-accent px-2 py-1 rounded-lg hover:bg-white/10">
              {t.action.label}
            </Link>
          )}
          <button onClick={() => dismiss(t.id)} aria-label="Cerrar aviso" className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
