import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi panel',
  description: 'Tus mascotas, eventos y favoritos en HuellaGo.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
