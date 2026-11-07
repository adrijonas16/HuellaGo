import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Crea tu cuenta gratis en HuellaGo y registra a tu mascota.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
