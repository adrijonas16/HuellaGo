import Link from 'next/link';
import { Logo, PawMark } from '@/components/layout/logo';

const COLS = [
  {
    title: 'Explora',
    links: [
      { href: '/map', label: 'Mapa' },
      { href: '/events', label: 'Eventos' },
      { href: '/routes', label: 'Rutas de paseo' },
      { href: '/directory', label: 'Servicios' },
      { href: '/community', label: 'Comunidad' },
      { href: '/adoptions', label: 'Adopción' },
    ],
  },
  {
    title: 'Para negocios',
    links: [
      { href: '/business/register', label: 'Registrar negocio' },
      { href: '/pricing', label: 'Planes' },
      { href: '/events/create', label: 'Organizar un evento' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { href: '/help', label: 'Centro de ayuda' },
      { href: '/contact', label: 'Contacto' },
      { href: '/terms', label: 'Términos' },
      { href: '/privacy', label: 'Privacidad' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      {/* Rastro de huellas que cruza el pie de página */}
      <div aria-hidden className="absolute inset-x-0 top-6 flex justify-around opacity-[0.06] pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <PawMark key={i} className={`w-8 h-8 ${i % 2 ? 'translate-y-5 rotate-[20deg]' : '-rotate-[10deg]'}`} />
        ))}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo light />
            <p className="text-white/60 text-sm mt-4 max-w-xs leading-relaxed">
              Servicios, eventos, rutas y comunidad para quienes caminan Arequipa con su mascota.
            </p>
            <Link href="/business/register" className="inline-flex mt-6 text-sm font-bold bg-accent text-dark rounded-full px-4 py-2 boop-btn">
              ¿Tienes un negocio pet? Regístralo gratis
            </Link>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h2 className="font-heading font-bold text-base mb-4">{col.title}</h2>
              <ul className="space-y-2.5 text-sm text-white/60">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-route hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-sm text-white/45">
          <span>© {new Date().getFullYear()} HuellaGo · Arequipa, Perú</span>
          <span>Hecho para los que caminan con su mejor amigo.</span>
        </div>
      </div>
    </footer>
  );
}
