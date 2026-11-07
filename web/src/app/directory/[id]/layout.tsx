import type { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { MOCK_BUSINESSES, CATEGORY_LABELS } from '@/lib/mock-data';

const clip = (s: string, n = 155) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const biz: any =
    (await fetchApi<any>(`/businesses/${params.id}`)) ?? MOCK_BUSINESSES.find((b) => String(b.id) === params.id);
  if (!biz) return { title: 'Negocio no encontrado', robots: { index: false } };
  const title = `${biz.name} · ${CATEGORY_LABELS[biz.category] ?? 'Servicio pet'} en ${biz.district ?? 'Arequipa'}`;
  const description = clip(biz.description ?? `${biz.name}, ${CATEGORY_LABELS[biz.category] ?? ''} en ${biz.district ?? 'Arequipa'}.`);
  return {
    title,
    description,
    alternates: { canonical: `/directory/${params.id}` },
    openGraph: { type: 'website', title, description, url: `/directory/${params.id}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
