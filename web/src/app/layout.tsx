import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { AppBanner } from '@/components/layout/app-banner';
import { NotificationToast } from '@/components/notifications/notification-toast';
import { Toaster } from '@/components/ui/toaster';
import { CookieConsent } from '@/components/legal/cookie-consent';
import { Analytics } from '@/components/legal/analytics';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['mascotas', 'perros', 'gatos', 'veterinaria Arequipa', 'eventos pet friendly', 'rutas de paseo', 'adopción', 'Perú'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    locale: SITE.locale,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#F5F6F1',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'es-PE',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/directory?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppBanner />
        <NotificationToast />
        <Toaster />
        <div className="relative">{children}</div>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
