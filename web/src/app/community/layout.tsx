import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comunidad de dueños de mascotas',
  description: 'Comparte paseos, pide recomendaciones y únete a grupos de dueños de mascotas en Arequipa.',
  alternates: { canonical: '/community' },
  openGraph: { title: 'Comunidad de dueños de mascotas', description: 'Comparte paseos, pide recomendaciones y únete a grupos de dueños de mascotas en Arequipa.', url: '/community' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
