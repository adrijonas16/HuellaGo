import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Logo, PawMark } from '@/components/layout/logo';

/** Pantalla dividida para acceso: panel de marca + formulario. */
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-cream">
      {/* Panel de marca */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-primary text-white p-12 overflow-hidden">
        <Logo light className="[&>span:first-child]:bg-white [&>span:first-child]:text-primary" />
        {/* rastro de huellas en diagonal */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <PawMark
              key={i}
              className="paw-step absolute w-10 h-10 text-white/15"
              style={{
                left: `${12 + i * 9 + (i % 2 ? 4 : -4)}%`,
                top: `${78 - i * 8}%`,
                ['--rot' as string]: `${32 + (i % 2 ? 10 : -10)}deg`,
                animationDelay: `${0.2 + i * 0.14}s`,
              }}
            />
          ))}
        </div>
        <div className="relative">
          <p className="font-heading font-extrabold leading-[0.9]" style={{ fontSize: 'clamp(44px, 4.6vw, 72px)', letterSpacing: '-0.05em' }}>
            Cada paseo
            <br />
            deja huella
          </p>
          <p className="text-white/75 text-lg mt-5 max-w-sm">
            Guarda tus lugares favoritos, inscríbete en eventos y lleva el registro de cada paseo con tu mascota.
          </p>
        </div>
        <p className="relative text-sm text-white/60">Arequipa, Perú</p>
      </aside>

      {/* Formulario */}
      <main id="contenido" className="flex flex-col px-5 sm:px-10 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-bark hover:text-dark">
            <ChevronLeft size={16} /> Volver al inicio
          </Link>
          <div className="lg:hidden"><Logo /></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-[420px] animate-fade-up">
            <h1 className="font-heading font-extrabold text-dark text-4xl leading-none" style={{ letterSpacing: '-0.045em' }}>{title}</h1>
            <p className="text-bark mt-3 mb-8">{subtitle}</p>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
