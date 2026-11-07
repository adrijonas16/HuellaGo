import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi perfil',
  description: 'Edita tus datos de HuellaGo.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
