import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organiza un evento pet friendly',
  description: 'Crea un evento para tu comunidad: fecha, punto de encuentro, requisitos y cupos.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
