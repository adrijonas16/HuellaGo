import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading font-extrabold text-4xl text-dark mb-2">Términos y Condiciones</h1>
          <p className="text-bark mb-8">Ultima actualizacion: 1 de julio de 2026</p>

          <div className="bg-white rounded-card shadow-card p-6 md:p-8 space-y-6 text-sm text-bark leading-relaxed">
            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">1. Aceptacion de los terminos</h2>
              <p>Al acceder y utilizar HuellaGo, aceptas estar sujeto a estos terminos y condiciones de uso. Si no estas de acuerdo con alguna parte, no utilices la plataforma.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">2. Descripción del servicio</h2>
              <p>HuellaGo es una plataforma digital que centraliza servicios, eventos, rutas y comunidad para dueños de mascotas en Perú. Conectamos a dueños de mascotas con veterinarias, paseadores, hoteles, groomers y otros servicios relacionados.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">3. Registro y cuenta</h2>
              <p>Para usar ciertas funciones debes crear una cuenta proporcionando información veraz y actualizada. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">4. Uso aceptable</h2>
              <p>Te comprometes a usar HuellaGo unicamente para fines legales y de manera que no infrinja los derechos de otros usuarios. Esta prohibido publicar contenido ofensivo, falso o que promueva el maltrato animal.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">5. Negocios registrados</h2>
              <p>Los negocios que se registran en HuellaGo son responsables de la veracidad de su información, servicios y precios. HuellaGo no garantiza la calidad de los servicios ofrecidos por terceros.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">6. Eventos</h2>
              <p>Los organizadores de eventos son responsables de la gestion, seguridad y cumplimiento de lo ofrecido. HuellaGo actua como plataforma de difusion y no se responsabiliza por incidentes durante los eventos.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">7. Propiedad intelectual</h2>
              <p>Todo el contenido de HuellaGo, incluyendo la marca, diseno, iconos y software, es propiedad de HuellaGo. Las fotos publicadas por los usuarios siguen siendo propiedad de estos, pero otorgan a HuellaGo una licencia para mostrarlas en la plataforma.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">8. Pagos y suscripciones</h2>
              <p>Los planes de pago para negocios se facturan mensualmente. Puedes cancelar en cualquier momento. No se realizan reembolsos por periodos parciales.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">9. Limitacion de responsabilidad</h2>
              <p>HuellaGo no se hace responsable por danos directos o indirectos derivados del uso de la plataforma, incluyendo pero no limitado a: servicios de terceros, eventos, rutas o interacciones entre usuarios.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">10. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios seran notificados a traves de la plataforma.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-dark text-lg mb-2">11. Contacto</h2>
              <p>Para consultas sobre estos terminos, contactanos en <span className="text-primary font-semibold">legal@huellago.pe</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
