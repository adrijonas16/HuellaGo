import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis mascotas',
  description: 'Administra los perfiles de tus mascotas.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
