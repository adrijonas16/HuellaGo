'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Contenido mostrado si la imagen falla o no existe (emoji, icono…) */
  fallback?: React.ReactNode;
  fallbackClassName?: string;
}

/**
 * Imagen con estado de carga y respaldo: nunca muestra el icono roto
 * ni el texto alternativo desbordado cuando el recurso externo falla.
 */
export function SafeImage({ src, alt, className, fallback = '🐾', fallbackClassName, ...rest }: SafeImageProps) {
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
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setStatus('ok')}
      onError={() => setStatus('error')}
      className={cn(className, 'transition-opacity duration-500', status === 'loading' ? 'opacity-0' : 'opacity-100')}
      {...rest}
    />
  );
}
