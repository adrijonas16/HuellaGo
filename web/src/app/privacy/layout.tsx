import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo HuellaGo recopila, usa y protege tus datos personales conforme a la Ley N.º 29733 del Perú.',
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Política de privacidad', description: 'Cómo HuellaGo recopila, usa y protege tus datos personales conforme a la Ley N.º 29733 del Perú.', url: '/privacy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
