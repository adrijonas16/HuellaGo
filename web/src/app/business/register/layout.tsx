import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registra tu negocio pet gratis',
  description: 'Suma tu veterinaria, tienda, grooming u hotel a HuellaGo y llega a dueños de mascotas de tu distrito.',
  alternates: { canonical: '/business/register' },
  openGraph: { title: 'Registra tu negocio pet gratis', description: 'Suma tu veterinaria, tienda, grooming u hotel a HuellaGo y llega a dueños de mascotas de tu distrito.', url: '/business/register' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
