'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useConsent } from '@/lib/consent';
import { useHydrated } from '@/lib/store';
import { SITE } from '@/lib/site';

/**
 * GA4 con Consent Mode v2: no se carga nada hasta que la persona acepta
 * la analítica. Sin NEXT_PUBLIC_GA_ID tampoco se carga.
 */
export function Analytics() {
  const hydrated = useHydrated();
  const allowed = useConsent((s) => s.analytics);
  const pathname = usePathname();
  const id = SITE.gaId;

  // Si retira el consentimiento, se informa a GA y se dejan de enviar datos.
  useEffect(() => {
    if (!hydrated || !id || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', { analytics_storage: allowed ? 'granted' : 'denied' });
  }, [allowed, hydrated, id]);

  // Páginas vistas en navegación del lado del cliente
  useEffect(() => {
    if (!allowed || !id || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', { page_path: pathname, page_location: window.location.href });
  }, [pathname, allowed, id]);

  if (!hydrated || !id || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true, send_page_view: false });`}
      </Script>
    </>
  );
}
