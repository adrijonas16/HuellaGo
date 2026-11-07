import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa de servicios pet en Arequipa',
  description: 'Mira en el mapa veterinarias, tiendas, grooming y parques pet friendly cerca de ti en Arequipa.',
  alternates: { canonical: '/map' },
  openGraph: { title: 'Mapa de servicios pet en Arequipa', description: 'Mira en el mapa veterinarias, tiendas, grooming y parques pet friendly cerca de ti en Arequipa.', url: '/map' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
