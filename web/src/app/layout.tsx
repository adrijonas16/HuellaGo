import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'HuellaGo - Cada paseo deja huella',
  description:
    'Veterinarias, eventos, rutas y comunidad pet friendly. Todo lo que tu perro necesita, en un solo lugar.',
  keywords: [
    'mascotas',
    'perros',
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
      <body>{children}</body>
    </html>
  );
}
