import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recibe un enlace para crear una contraseña nueva.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
