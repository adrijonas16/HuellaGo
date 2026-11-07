import { LegalPage, LegalSection } from '@/components/legal/legal-page';
import { CookiePreferencesButton } from '@/components/legal/cookie-preferences-button';

const ROWS = [
  { name: 'huellago-auth', type: 'Necesaria', purpose: 'Mantener tu sesión iniciada', duration: 'Hasta cerrar sesión' },
  { name: 'accessToken, refreshToken', type: 'Necesaria', purpose: 'Autenticarte ante la API', duration: '1 y 7 días' },
  { name: 'huellago-app', type: 'Necesaria', purpose: 'Favoritos, inscripciones y preferencias en este dispositivo', duration: 'Hasta que las borres' },
  { name: 'huellago-consent-v1', type: 'Necesaria', purpose: 'Recordar tu elección sobre cookies', duration: '12 meses' },
  { name: '_ga, _ga_*', type: 'Analítica (opcional)', purpose: 'Google Analytics 4: contar visitas y páginas vistas de forma agregada', duration: 'Hasta 2 años' },
];

const sections: LegalSection[] = [
  {
    id: 'que-son',
    title: 'Qué son',
    body: (
      <p>
        Las cookies y el almacenamiento local son pequeños archivos que el sitio guarda en tu navegador para recordar cosas, como tu sesión o tus
        favoritos.
      </p>
    ),
  },
  {
    id: 'cuales',
    title: 'Cuáles usamos',
    body: (
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm border-collapse min-w-[560px]">
          <thead>
            <tr className="text-left text-dark">
              <th className="py-2 pr-3 font-semibold border-b border-sand">Nombre</th>
              <th className="py-2 pr-3 font-semibold border-b border-sand">Tipo</th>
              <th className="py-2 pr-3 font-semibold border-b border-sand">Para qué</th>
              <th className="py-2 font-semibold border-b border-sand">Duración</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className="align-top">
                <td className="py-2 pr-3 border-b border-sand font-medium text-dark">{r.name}</td>
                <td className="py-2 pr-3 border-b border-sand">{r.type}</td>
                <td className="py-2 pr-3 border-b border-sand">{r.purpose}</td>
                <td className="py-2 border-b border-sand">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'consentimiento',
    title: 'Tu consentimiento',
    body: (
      <>
        <p>
          Las cookies necesarias se usan siempre porque sin ellas el sitio no funciona. Las de analítica solo se activan si las aceptas, y Google Analytics
          no se carga hasta entonces. Puedes cambiar tu elección cuando quieras:
        </p>
        <CookiePreferencesButton />
      </>
    ),
  },
  {
    id: 'navegador',
    title: 'Cómo borrarlas desde tu navegador',
    body: (
      <p>
        También puedes borrar o bloquear cookies desde la configuración de tu navegador. Si bloqueas las necesarias, no podrás iniciar sesión ni guardar
        favoritos.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      current="/cookies"
      title="Política de cookies"
      intro={<p>Qué guardamos en tu navegador, para qué y cómo decidir qué aceptas.</p>}
      sections={sections}
    />
  );
}
