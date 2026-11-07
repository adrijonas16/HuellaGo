import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso de HuellaGo para dueños de mascotas, negocios y organizadores de eventos.',
  alternates: { canonical: '/terms' },
  openGraph: { title: 'Términos y condiciones', description: 'Condiciones de uso de HuellaGo para dueños de mascotas, negocios y organizadores de eventos.', url: '/terms' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
