import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centro de ayuda',
  description: 'Respuestas a las preguntas frecuentes sobre cuentas, mascotas, eventos, negocios y pagos en HuellaGo.',
  alternates: { canonical: '/help' },
  openGraph: { title: 'Centro de ayuda', description: 'Respuestas a las preguntas frecuentes sobre cuentas, mascotas, eventos, negocios y pagos en HuellaGo.', url: '/help' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
