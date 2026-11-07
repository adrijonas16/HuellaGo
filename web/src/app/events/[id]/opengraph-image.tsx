import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE } from '@/components/og/og-card';
import { fetchApi } from '@/lib/api';
import { MOCK_EVENTS } from '@/lib/mock-data';

export const alt = 'Evento pet friendly en HuellaGo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const event: any = (await fetchApi<any>(`/events/${params.id}`)) ?? MOCK_EVENTS.find((e) => e.id === params.id);
  if (!event) return new ImageResponse(<OgCard title="Eventos pet friendly" />, size);
  const date = new Date(event.date).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Lima' });
  return new ImageResponse(
    <OgCard eyebrow={date.charAt(0).toUpperCase() + date.slice(1)} title={event.title} footer={event.meetingPoint} />,
    size,
  );
}
