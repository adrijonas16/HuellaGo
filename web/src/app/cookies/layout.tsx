import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Qué cookies usa HuellaGo, para qué sirven y cómo cambiar tu consentimiento.',
  alternates: { canonical: '/cookies' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
