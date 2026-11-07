import Link from 'next/link';
import { LegalPage, LegalSection } from '@/components/legal/legal-page';
import { ObfuscatedEmail } from '@/components/legal/obfuscated-email';
import { SITE } from '@/lib/site';

const responsible = SITE.legal.name
  ? `${SITE.legal.name}${SITE.legal.ruc ? `, con RUC ${SITE.legal.ruc}` : ''}${SITE.legal.address ? ` y domicilio en ${SITE.legal.address}` : ''}`
  : 'el equipo de HuellaGo';

const sections: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Quién es responsable de tus datos',
    body: (
      <p>
        El responsable del tratamiento de tus datos personales es {responsible} («HuellaGo»). Para cualquier consulta sobre tus datos escríbenos a{' '}
        <ObfuscatedEmail />.
      </p>
    ),
  },
  {
    id: 'datos',
    title: 'Qué datos recopilamos',
    body: (
      <>
        <ul>
          <li><strong>Cuenta:</strong> nombre, apellido, email, contraseña (guardada cifrada), ciudad y, si lo agregas, teléfono y foto.</li>
          <li><strong>Mascotas:</strong> nombre, tipo, raza, tamaño, nivel de energía, fecha de nacimiento, alergias y fotos que subas.</li>
          <li><strong>Actividad:</strong> eventos a los que te inscribes, reseñas, favoritos, publicaciones y rutas o paseos que registres.</li>
          <li><strong>Ubicación:</strong> solo cuando la autorizas en tu dispositivo, para mostrarte servicios y eventos cercanos o registrar un paseo.</li>
          <li><strong>Contacto:</strong> lo que nos escribes en el formulario de contacto.</li>
          <li><strong>Datos técnicos:</strong> tipo de navegador y dispositivo, páginas visitadas y, si aceptas la analítica, datos de uso agregados (ver la <Link href="/cookies">política de cookies</Link>).</li>
        </ul>
        <p>No pedimos datos sensibles. Si eres un negocio, también tratamos los datos de tu ficha pública (nombre comercial, dirección, horarios y teléfono).</p>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: 'Para qué los usamos',
    body: (
      <ul>
        <li>Crear y gestionar tu cuenta y los perfiles de tus mascotas.</li>
        <li>Mostrarte servicios, eventos y rutas relevantes para tu ciudad.</li>
        <li>Gestionar tus inscripciones a eventos y avisar al organizador.</li>
        <li>Publicar tus reseñas y publicaciones con tu nombre y la inicial de tu apellido.</li>
        <li>Responder tus mensajes y darte soporte.</li>
        <li>Mantener la seguridad del servicio y prevenir fraude y spam.</li>
        <li>Si aceptas, medir el uso del sitio para mejorarlo.</li>
        <li>Si lo autorizas expresamente, enviarte novedades y promociones. Puedes darte de baja en cualquier momento.</li>
      </ul>
    ),
  },
  {
    id: 'base-legal',
    title: 'Con qué base legal',
    body: (
      <p>
        Tratamos tus datos conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su Reglamento. Usamos tus datos para ejecutar la
        relación que aceptas al registrarte (los términos y condiciones), con tu consentimiento para lo opcional (analítica, ubicación y
        comunicaciones comerciales) y para cumplir obligaciones legales.
      </p>
    ),
  },
  {
    id: 'compartir',
    title: 'Con quién los compartimos',
    body: (
      <>
        <p>No vendemos tus datos. Solo los compartimos con:</p>
        <ul>
          <li><strong>Organizadores de eventos</strong> en los que te inscribes: tu nombre y el de tu mascota.</li>
          <li><strong>Proveedores que nos dan servicio:</strong> alojamiento web y de la API (Vercel), base de datos (Supabase) y, si lo aceptas, analítica (Google Analytics). Pueden estar fuera del Perú (por ejemplo, en Estados Unidos); en ese caso exigimos garantías adecuadas de protección.</li>
          <li><strong>Autoridades,</strong> cuando la ley lo exija.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'conservacion',
    title: 'Cuánto tiempo los guardamos',
    body: (
      <p>
        Guardamos tus datos mientras tengas una cuenta activa. Si la eliminas, borramos o anonimizamos tus datos en un plazo de 30 días, salvo que
        debamos conservar algo por obligación legal. Los mensajes de contacto se guardan hasta 12 meses.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: 'Tus derechos',
    body: (
      <>
        <p>
          Puedes ejercer tus derechos de <strong>acceso, rectificación, cancelación y oposición</strong> (ARCO), y revocar tu consentimiento, escribiendo a{' '}
          <ObfuscatedEmail /> con el asunto «Datos personales». Te responderemos dentro de los plazos legales. También puedes editar o eliminar tu cuenta
          desde <Link href="/profile/edit">tu perfil</Link>.
        </p>
        <p>
          Si consideras que no atendimos bien tu solicitud, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del
          Ministerio de Justicia y Derechos Humanos.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: 'Cómo protegemos tus datos',
    body: (
      <p>
        Usamos conexiones cifradas (HTTPS), contraseñas cifradas, acceso restringido a la base de datos y límites contra el abuso de formularios. Ningún
        sistema es infalible: si detectamos un incidente que afecte tus datos, te lo comunicaremos.
      </p>
    ),
  },
  {
    id: 'menores',
    title: 'Menores de edad',
    body: <p>HuellaGo está dirigido a mayores de 18 años. Si eres menor, usa la plataforma con autorización de tu madre, padre o tutor.</p>,
  },
  {
    id: 'cambios',
    title: 'Cambios en esta política',
    body: <p>Si cambiamos algo importante, te avisaremos en la plataforma o por email antes de que entre en vigencia.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/privacy"
      title="Política de privacidad"
      intro={<p>Aquí te contamos qué datos tuyos y de tu mascota usamos, para qué, con quién los compartimos y cómo puedes controlarlos.</p>}
      sections={sections}
    />
  );
}
