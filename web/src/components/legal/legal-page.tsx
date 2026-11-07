import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SITE } from '@/lib/site';
import { ObfuscatedEmail } from '@/components/legal/obfuscated-email';

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

const OTHER = [
  { href: '/privacy', label: 'Privacidad' },
  { href: '/terms', label: 'Términos' },
  { href: '/cookies', label: 'Cookies' },
];

/** Plantilla común para las páginas legales: índice, secciones numeradas y contacto. */
export function LegalPage({ title, intro, sections, current }: { title: string; intro: React.ReactNode; sections: LegalSection[]; current: string }) {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <nav aria-label="Secciones" className="sticky top-24 text-sm">
              <p className="font-heading font-bold text-dark mb-3">En esta página</p>
              <ol className="space-y-2 border-l-2 border-sand">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block -ml-0.5 pl-3 border-l-2 border-transparent text-bark hover:text-dark hover:border-primary">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-2">
                {OTHER.filter((o) => o.href !== current).map((o) => (
                  <Link key={o.href} href={o.href} className="rounded-full border border-sand bg-white px-3 py-1.5 font-semibold text-dark hover:border-primary">
                    {o.label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>

          <article className="max-w-[72ch]">
            <h1 className="font-heading font-extrabold text-dark leading-[0.95]" style={{ fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-0.045em' }}>
              {title}
            </h1>
            <p className="text-sm text-bark mt-3">Última actualización: {SITE.legalUpdatedAt}</p>
            <div className="text-[17px] text-dark/85 leading-relaxed mt-6">{intro}</div>

            <div className="mt-10 space-y-10">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="font-heading font-bold text-dark text-2xl" style={{ letterSpacing: '-0.02em' }}>
                    {i + 1}. {s.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-[16px] text-dark/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-dark [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-card bg-white border border-sand p-6">
              <p className="font-heading font-bold text-dark text-lg">¿Tienes preguntas?</p>
              <p className="text-bark mt-1">
                Escríbenos a <ObfuscatedEmail className="font-semibold text-primary underline underline-offset-2" /> o usa el{' '}
                <Link href="/contact" className="font-semibold text-primary underline underline-offset-2">formulario de contacto</Link>.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
