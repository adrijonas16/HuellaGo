import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Solo la URL de producción se indexa; las vistas previas de Vercel no.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;
  return {
    rules: isProduction
      ? [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard', '/favorites', '/pets', '/profile', '/admin', '/events/create', '/login', '/register', '/forgot-password'],
          },
        ]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
