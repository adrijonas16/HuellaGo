import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventos pet friendly en Arequipa',
  description: 'Mascotatones, caminatas, ferias de adopción y más. Inscríbete con tu mascota en un toque.',
  alternates: { canonical: '/events' },
  openGraph: { title: 'Eventos pet friendly en Arequipa', description: 'Mascotatones, caminatas, ferias de adopción y más. Inscríbete con tu mascota en un toque.', url: '/events' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
