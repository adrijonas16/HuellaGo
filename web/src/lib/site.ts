/**
 * Datos del sitio en un solo lugar: SEO, textos legales, contacto y analítica.
 * Cambia aquí el dominio o los datos de contacto y se actualizan en todo el sitio.
 */
export const SITE = {
  name: 'HuellaGo',
  tagline: 'Cada paseo deja huella',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://huellago-sooty.vercel.app').replace(/\/$/, ''),
  description:
    'Encuentra veterinarias, grooming, hoteles y paseadores en Arequipa, descubre rutas para pasear con tu perro e inscríbete en eventos pet friendly.',
  locale: 'es_PE',
  city: 'Arequipa, Perú',
  /** Correo de contacto y de privacidad. Se muestra ofuscado para evitar spam. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@huellago.pe',
  /** Redes oficiales: deja vacío lo que no exista todavía para no enlazar cuentas ajenas. */
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || '',
  },
  /** ID de medición de Google Analytics 4 (G-XXXXXXX). Sin ID no se carga GA. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  legalUpdatedAt: '7 de noviembre de 2026',
  /**
   * Datos del responsable del tratamiento. Complétalos antes del lanzamiento
   * comercial (razón social, RUC y domicilio son obligatorios para la ley peruana).
   */
  legal: {
    name: process.env.NEXT_PUBLIC_LEGAL_NAME || '',
    ruc: process.env.NEXT_PUBLIC_LEGAL_RUC || '',
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || '',
  },
} as const;

export const absoluteUrl = (path = '/') => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
