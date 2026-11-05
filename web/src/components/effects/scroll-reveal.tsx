'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** retraso en ms (se aplica una sola vez, como transition-delay) */
  delay?: number;
}

/**
 * Revela contenido al entrar en pantalla.
 * - Sin JS el contenido es visible (el ocultado depende de la clase `js-reveal` en <html>).
 * - Usa rootMargin para revelar un poco antes y no dejar huecos vacíos.
 * - Respeta prefers-reduced-motion vía CSS.
 */
export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add('js-reveal');

    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-revealed', '');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-revealed', '');
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={delay ? { transitionDelay: `${Math.min(delay, 240)}ms` } : undefined}>
      {children}
    </div>
  );
}
