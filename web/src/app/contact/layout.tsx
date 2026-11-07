import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos para dudas, soporte, alianzas o para registrar tu negocio en HuellaGo.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contacto', description: 'Escríbenos para dudas, soporte, alianzas o para registrar tu negocio en HuellaGo.', url: '/contact' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
