import Link from 'next/link';
import { LegalPage, LegalSection } from '@/components/legal/legal-page';
import { ObfuscatedEmail } from '@/components/legal/obfuscated-email';

const sections: LegalSection[] = [
  {
    id: 'aceptacion',
    title: 'Aceptación',
    body: (
      <p>
        Al crear una cuenta o usar HuellaGo aceptas estos términos y la <Link href="/privacy">política de privacidad</Link>. Si no estás de acuerdo, no
        uses la plataforma.
      </p>
    ),
  },
  {
    id: 'servicio',
    title: 'Qué es HuellaGo',
    body: (
      <p>
        HuellaGo es una plataforma que conecta a dueños de mascotas con servicios pet, eventos, rutas de paseo, refugios y una comunidad. HuellaGo no
        presta directamente los servicios veterinarios, de grooming, hospedaje, paseo ni adopción: estos los ofrecen negocios, organizadores y
        refugios independientes, que son responsables de ellos.
      </p>
    ),
  },
  {
    id: 'cuenta',
    title: 'Tu cuenta',
    body: (
      <ul>
        <li>Debes ser mayor de 18 años o contar con la autorización de tu madre, padre o tutor.</li>
        <li>La información que registras debe ser verdadera y estar actualizada.</li>
        <li>Eres responsable de cuidar tu contraseña y de lo que se haga con tu cuenta.</li>
        <li>Puedes eliminar tu cuenta cuando quieras desde tu perfil.</li>
      </ul>
    ),
  },
  {
    id: 'contenido',
    title: 'Contenido que publicas',
    body: (
      <>
        <p>
          Las reseñas, fotos y publicaciones siguen siendo tuyas. Al publicarlas nos das permiso para mostrarlas dentro de HuellaGo y en su promoción,
          mientras sigan publicadas. No está permitido publicar:
        </p>
        <ul>
          <li>Contenido falso, ofensivo, discriminatorio o que promueva el maltrato animal.</li>
          <li>Datos personales de otras personas sin su permiso.</li>
          <li>Spam, publicidad no autorizada o enlaces maliciosos.</li>
          <li>Reseñas de negocios propios o pagadas.</li>
          <li>Venta de animales.</li>
        </ul>
        <p>Podemos retirar contenido o suspender cuentas que incumplan estas reglas.</p>
      </>
    ),
  },
  {
    id: 'eventos',
    title: 'Eventos',
    body: (
      <ul>
        <li>El organizador es responsable de la seguridad, los permisos y el desarrollo del evento.</li>
        <li>Asistes bajo tu responsabilidad y la de tu mascota: debe estar vacunada, con correa y bajo tu supervisión.</li>
        <li>Si no puedes asistir, cancela tu inscripción para liberar el cupo.</li>
      </ul>
    ),
  },
  {
    id: 'negocios',
    title: 'Negocios y planes',
    body: (
      <ul>
        <li>Los negocios deben mostrar información real (dirección, horarios, precios y licencias cuando corresponda).</li>
        <li>Revisamos cada negocio antes de publicarlo y podemos rechazar o retirar fichas que no cumplan.</li>
        <li>
          Los planes pagados (Pro y Premium) se cobran por adelantado de forma mensual y se pueden cancelar en cualquier momento; la cancelación aplica
          al siguiente período. Los precios están en soles e incluyen IGV, salvo que se indique otra cosa.
        </li>
      </ul>
    ),
  },
  {
    id: 'adopcion',
    title: 'Adopciones',
    body: (
      <p>
        Las publicaciones de adopción son responsabilidad de los refugios y personas que las publican. La adopción se coordina directamente con ellos,
        que pueden pedirte requisitos y una visita. HuellaGo no cobra por las adopciones.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Limitación de responsabilidad',
    body: (
      <p>
        Trabajamos para que la información sea correcta y el servicio esté disponible, pero no garantizamos que siempre lo esté. HuellaGo no responde
        por los servicios que prestan terceros ni por los acuerdos entre usuarios y negocios, sin perjuicio de los derechos que te reconoce el Código de
        Protección y Defensa del Consumidor.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios en los términos',
    body: <p>Podemos actualizar estos términos. Si el cambio es importante, te avisaremos antes de que entre en vigencia.</p>,
  },
  {
    id: 'ley',
    title: 'Ley aplicable',
    body: (
      <p>
        Estos términos se rigen por las leyes de la República del Perú. Ante cualquier consulta o reclamo, escríbenos a <ObfuscatedEmail />; buscaremos
        resolverlo de forma directa antes de acudir a las autoridades competentes.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      current="/terms"
      title="Términos y condiciones"
      intro={<p>Las reglas para usar HuellaGo como dueño de mascota, negocio, organizador de eventos o refugio.</p>}
      sections={sections}
    />
  );
}
