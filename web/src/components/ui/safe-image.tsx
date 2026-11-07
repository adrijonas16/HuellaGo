'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Contenido mostrado si la imagen falla o no existe (emoji, icono…) */
  fallback?: React.ReactNode;
  fallbackClassName?: string;
  /** Ancho con que se muestra la imagen (atributo sizes). Por defecto, una tarjeta. */
  sizes?: string;
  /** Carga prioritaria para la imagen principal visible al abrir la página. */
  priority?: boolean;
}

/** Dominios que pasan por el optimizador de Next (deben estar en next.config.js). */
const OPTIMIZABLE = /^https:\/\/(res\.cloudinary\.com|lh3\.googleusercontent\.com|picsum\.photos)\//;
const WIDTHS = [256, 384, 640, 828, 1200];

/** Sirve la imagen en WebP/AVIF, comprimida y al tamaño justo, mediante /_next/image. */
function optimized(src: string) {
  if (!OPTIMIZABLE.test(src)) return null;
  const url = (w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=70`;
  return { src: url(828), srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ') };
}

/**
 * Imagen con estado de carga y respaldo: nunca muestra el icono roto
 * ni el texto alternativo desbordado cuando el recurso externo falla.
 */
export function SafeImage({ src, alt, className, fallback = '🐾', fallbackClassName, sizes = '(max-width: 768px) 100vw, 400px', priority, ...rest }: SafeImageProps) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>(src ? 'loading' : 'error');

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex items-center justify-center bg-primary-soft text-4xl select-none', className, fallbackClassName)}
      >
        <span aria-hidden>{fallback}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...(typeof src === 'string' && optimized(src) ? { ...optimized(src)!, sizes } : { src })}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onLoad={() => setStatus('ok')}
      onError={() => setStatus('error')}
      className={cn(className, 'transition-opacity duration-500', status === 'loading' ? 'opacity-0' : 'opacity-100')}
      {...rest}
    />
  );
}
