'use client';

/**
 * Eventos de Google Analytics 4. Si no hay ID configurado o la persona no
 * aceptó la analítica, las llamadas no hacen nada.
 *
 * Eventos clave (configúralos como conversiones en GA4):
 *  sign_up, login, event_register, business_register, contact_submit,
 *  adoption_request, cta_click
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
