'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Consentimiento de cookies. Las cookies necesarias (sesión, preferencias)
 * no requieren permiso; la analítica solo se activa si la persona acepta.
 */
export interface ConsentState {
  decided: boolean;
  analytics: boolean;
  decidedAt?: string;
  /** Para volver a abrir el panel desde el pie de página. */
  panelOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (analytics: boolean) => void;
  openPanel: () => void;
  closePanel: () => void;
}

export const CONSENT_VERSION = 1;

export const useConsent = create<ConsentState>()(
  persist(
    (set) => ({
      decided: false,
      analytics: false,
      panelOpen: false,
      acceptAll: () => set({ decided: true, analytics: true, decidedAt: new Date().toISOString(), panelOpen: false }),
      rejectAll: () => set({ decided: true, analytics: false, decidedAt: new Date().toISOString(), panelOpen: false }),
      save: (analytics) => set({ decided: true, analytics, decidedAt: new Date().toISOString(), panelOpen: false }),
      openPanel: () => set({ panelOpen: true }),
      closePanel: () => set({ panelOpen: false }),
    }),
    {
      name: `huellago-consent-v${CONSENT_VERSION}`,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ decided: s.decided, analytics: s.analytics, decidedAt: s.decidedAt }),
    },
  ),
);
