import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { AppBanner } from '@/components/layout/app-banner';
import { NotificationToast } from '@/components/notifications/notification-toast';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'HuellaGo · Cada paseo deja huella',
    template: '%s · HuellaGo',
  },
  description:
    'Veterinarias, eventos, rutas de paseo y comunidad pet friendly en Arequipa. Todo lo que tu mascota necesita, en un solo lugar.',
  keywords: ['mascotas', 'perros', 'gatos', 'veterinaria', 'eventos pet', 'rutas de paseo', 'Perú', 'Arequipa'],
  openGraph: {
    title: 'HuellaGo · Cada paseo deja huella',
    description: 'Servicios, eventos, rutas y comunidad para tu mascota en Arequipa.',
    locale: 'es_PE',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F6F1',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppBanner />
        <NotificationToast />
        <Toaster />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
