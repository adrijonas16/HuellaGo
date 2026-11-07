import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis favoritos',
  description: 'Los servicios, rutas y eventos que guardaste.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
