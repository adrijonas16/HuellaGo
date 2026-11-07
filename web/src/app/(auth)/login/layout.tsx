import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingresar',
  description: 'Ingresa a HuellaGo para ver tus mascotas, favoritos y eventos.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
