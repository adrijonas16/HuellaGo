import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veterinarias, grooming y servicios para mascotas',
  description: 'Directorio de veterinarias, peluquerías, hoteles, paseadores y tiendas para mascotas en Arequipa, con reseñas de otros dueños.',
  alternates: { canonical: '/directory' },
  openGraph: { title: 'Veterinarias, grooming y servicios para mascotas', description: 'Directorio de veterinarias, peluquerías, hoteles, paseadores y tiendas para mascotas en Arequipa, con reseñas de otros dueños.', url: '/directory' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
