import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rutas para pasear con tu perro',
  description: 'Rutas de paseo en Arequipa con sombra, agua y zonas de descanso, valoradas por la comunidad.',
  alternates: { canonical: '/routes' },
  openGraph: { title: 'Rutas para pasear con tu perro', description: 'Rutas de paseo en Arequipa con sombra, agua y zonas de descanso, valoradas por la comunidad.', url: '/routes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
