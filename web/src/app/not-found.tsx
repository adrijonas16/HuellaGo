import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PawMark } from '@/components/layout/logo';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/directory', label: 'Buscar servicios', desc: 'Veterinarias, grooming, hoteles' },
  { href: '/events', label: 'Ver eventos', desc: 'Mascotatones y caminatas' },
  { href: '/routes', label: 'Explorar rutas', desc: 'Para pasear con tu perro' },
  { href: '/adoptions', label: 'Adoptar', desc: 'Mascotas que buscan hogar' },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-[70vh] bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          {/* Huellas que se pierden: la animación respeta prefers-reduced-motion */}
          <div className="flex justify-center items-end gap-3 h-16" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <PawMark
                key={i}
                className="w-9 h-9 text-primary paw-step"
                style={{ ['--rot' as string]: `${i % 2 ? 18 : -12}deg`, animationDelay: `${0.15 + i * 0.18}s`, opacity: 1 - i * 0.22, marginBottom: i % 2 ? 18 : 0 }}
              />
            ))}
            <span className="font-heading font-extrabold text-4xl text-bark/40 animate-fade-in delay-900">?</span>
          </div>
          <p className="font-heading font-extrabold text-primary text-lg mt-8">Error 404</p>
          <h1 className="font-heading font-extrabold text-dark leading-[0.95] mt-2" style={{ fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.045em' }}>
            Aquí se perdió el rastro
          </h1>
          <p className="text-bark text-lg mt-4 max-w-md mx-auto">
            La página que buscas no existe o cambió de lugar. Sigue por uno de estos caminos:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mt-10 text-left">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block bg-white rounded-2xl border border-sand p-4 card-hover">
                  <span className="block font-heading font-bold text-dark">{l.label}</span>
                  <span className="block text-sm text-bark">{l.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="inline-flex mt-10 bg-primary text-white font-bold rounded-full px-6 py-3.5 shadow-button boop-btn hover:bg-primary-dark">
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
