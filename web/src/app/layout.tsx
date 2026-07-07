import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppBanner } from '@/components/layout/app-banner';
import { NotificationToast } from '@/components/notifications/notification-toast';

export const metadata: Metadata = {
  title: 'HuellaGo - Cada paseo deja huella',
  description:
    'Veterinarias, eventos, rutas y comunidad pet friendly. Todo lo que tu mascota necesita, en un solo lugar.',
  keywords: [
    'mascotas',
    'perros',
    'gatos',
    'veterinaria',
    'eventos pet',
    'rutas de paseo',
    'Peru',
    'Arequipa',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppBanner />
        <NotificationToast />
        <div style={{ position: 'relative' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
