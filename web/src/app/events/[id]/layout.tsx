import type { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { MOCK_EVENTS } from '@/lib/mock-data';

const clip = (s: string, n = 155) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event: any = (await fetchApi<any>(`/events/${params.id}`)) ?? MOCK_EVENTS.find((e) => e.id === params.id);
  if (!event) return { title: 'Evento no encontrado', robots: { index: false } };
  const date = new Date(event.date).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Lima' });
  const description = clip(`${date} · ${event.meetingPoint}. ${event.description ?? ''}`);
  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${params.id}` },
    openGraph: { type: 'website', title: event.title, description, url: `/events/${params.id}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
