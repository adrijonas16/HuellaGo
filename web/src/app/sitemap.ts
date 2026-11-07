import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { fetchApi } from '@/lib/api';
import { MOCK_BUSINESSES, MOCK_EVENTS, MOCK_ROUTES } from '@/lib/mock-data';

export const revalidate = 3600;

const STATIC: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, freq: 'daily' },
  { path: '/directory', priority: 0.9, freq: 'daily' },
  { path: '/events', priority: 0.9, freq: 'daily' },
  { path: '/map', priority: 0.8, freq: 'weekly' },
  { path: '/routes', priority: 0.8, freq: 'weekly' },
  { path: '/adoptions', priority: 0.8, freq: 'weekly' },
  { path: '/community', priority: 0.6, freq: 'daily' },
  { path: '/pricing', priority: 0.6, freq: 'monthly' },
  { path: '/business/register', priority: 0.6, freq: 'monthly' },
  { path: '/help', priority: 0.4, freq: 'monthly' },
  { path: '/contact', priority: 0.4, freq: 'yearly' },
  { path: '/privacy', priority: 0.2, freq: 'yearly' },
  { path: '/terms', priority: 0.2, freq: 'yearly' },
  { path: '/cookies', priority: 0.2, freq: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [biz, evt, rts] = await Promise.all([
    fetchApi<{ data: any[] }>('/businesses', { limit: '100' }),
    fetchApi<{ data: any[] }>('/events', { limit: '100' }),
    fetchApi<{ data: any[] }>('/routes', { limit: '100' }),
  ]);
  const businesses = biz?.data?.length ? biz.data : MOCK_BUSINESSES;
  const events = evt?.data?.length ? evt.data : MOCK_EVENTS;
  const routes = rts?.data?.length ? rts.data : MOCK_ROUTES;

  return [
    ...STATIC.map((s) => ({ url: `${SITE.url}${s.path}`, lastModified: now, changeFrequency: s.freq, priority: s.priority })),
    ...businesses.map((b: any) => ({ url: `${SITE.url}/directory/${b.id}`, lastModified: b.updatedAt ? new Date(b.updatedAt) : now, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...events.map((e: any) => ({ url: `${SITE.url}/events/${e.id}`, lastModified: e.updatedAt ? new Date(e.updatedAt) : now, changeFrequency: 'daily' as const, priority: 0.7 })),
    ...routes.map((r: any) => ({ url: `${SITE.url}/routes/${r.id}`, lastModified: r.updatedAt ? new Date(r.updatedAt) : now, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
}
