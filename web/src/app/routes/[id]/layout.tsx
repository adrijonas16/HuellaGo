import type { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { MOCK_ROUTES } from '@/lib/mock-data';

const clip = (s: string, n = 155) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const route: any = (await fetchApi<any>(`/routes/${params.id}`)) ?? MOCK_ROUTES.find((r) => r.id === params.id);
  if (!route) return { title: 'Ruta no encontrada', robots: { index: false } };
  const title = `${route.name}: ruta para pasear con tu perro`;
  const description = clip(`${route.distance} km, ${route.duration} min en ${route.district ?? 'Arequipa'}. ${route.description ?? ''}`);
  return {
    title,
    description,
    alternates: { canonical: `/routes/${params.id}` },
    openGraph: { type: 'website', title, description, url: `/routes/${params.id}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
