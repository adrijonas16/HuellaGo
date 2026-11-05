import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Política de Privacidad</h1>
          <p className="text-bark mb-8">Ultima actualizacion: 1 de julio de 2026</p>

          <div className="bg-white rounded-card shadow-card p-6 md:p-8 space-y-6 text-sm text-bark leading-relaxed">
            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">1. Información que recopilamos</h2>
              <p className="mb-2">Recopilamos la siguiente información:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Datos de registro: nombre, email, ciudad, teléfono</li>
                <li>Datos de mascotas: nombre, tipo, raza, edad, fotos</li>
                <li>Ubicación: para mostrar servicios y eventos cercanos</li>
                <li>Actividad: paseos, eventos asistidos, rutas creadas</li>
                <li>Fotos: imagenes que subes a la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">2. Cómo usamos tu información</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personalizar tu experiencia y recomendaciones</li>
                <li>Mostrar servicios y eventos relevantes en tu ciudad</li>
                <li>Enviar notificaciónes sobre eventos y recordatorios</li>
                <li>Mejorar la plataforma y sus funcionalidades</li>
                <li>Comunicarnos contigo sobre tu cuenta</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">3. Ubicación</h2>
              <p>Usamos tu ubicación para mostrarte servicios cercanos, marcar tu posición en rutas y eventos, y personalizar el contenido. Puedes desactivar el acceso a ubicación en cualquier momento desde la configuracion de tu dispositivo.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">4. Compartir información</h2>
              <p>No vendemos tu información personal. Compartimos datos solo con:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Negocios con los que interactuas (al reservar o contactar)</li>
                <li>Otros usuarios (tu perfil público y publicaciones)</li>
                <li>Proveedores de servicio (hosting, mapas, notificaciónes)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">5. Seguridad</h2>
              <p>Protegemos tu información con encriptacion, autenticacion segura y acceso restringido. Sin embargo, ninguna transmision por internet es 100% segura.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">6. Tus derechos</h2>
              <p>Puedes solicitar acceso, correccion o eliminacion de tus datos personales en cualquier momento escribiendo a <span className="text-primary font-semibold">privacidad@huellago.pe</span></p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">7. Cookies</h2>
              <p>Usamos cookies para mejorar tu experiencia, recordar tus preferencias y analizar el uso de la plataforma.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">8. Contacto</h2>
              <p>Para consultas sobre privacidad: <span className="text-primary font-semibold">privacidad@huellago.pe</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
