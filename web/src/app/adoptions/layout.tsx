import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopta una mascota en Arequipa',
  description: 'Perros, gatos y conejos rescatados por refugios locales buscan hogar. Adopta, apadrina o sé hogar temporal.',
  alternates: { canonical: '/adoptions' },
  openGraph: { title: 'Adopta una mascota en Arequipa', description: 'Perros, gatos y conejos rescatados por refugios locales buscan hogar. Adopta, apadrina o sé hogar temporal.', url: '/adoptions' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
