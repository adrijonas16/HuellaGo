import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planes para negocios pet',
  description: 'Aparece en el mapa, publica promociones y recibe reseñas. Empieza gratis y crece con los planes Pro y Premium.',
  alternates: { canonical: '/pricing' },
  openGraph: { title: 'Planes para negocios pet', description: 'Aparece en el mapa, publica promociones y recibe reseñas. Empieza gratis y crece con los planes Pro y Premium.', url: '/pricing' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
