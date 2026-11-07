'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

/**
 * Muestra el correo sin dejarlo en el HTML que leen los bots:
 * se arma en el navegador después de cargar la página.
 */
export function ObfuscatedEmail({ className, email = SITE.contactEmail }: { className?: string; email?: string }) {
  const [addr, setAddr] = useState<string | null>(null);
  const [user, domain] = email.split('@');

  useEffect(() => setAddr(`${user}@${domain}`), [user, domain]);

  if (!addr) {
    return (
      <span className={className}>
        {user} [arroba] {domain}
      </span>
    );
  }
  return (
    <a href={`mailto:${addr}`} className={className}>
      {addr}
    </a>
  );
}
