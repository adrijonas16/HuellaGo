import Link from 'next/link';
import { MapPin, Calendar, Route, Heart, Shield, Camera } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-cream to-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading font-extrabold text-4xl lg:text-6xl text-dark leading-tight mb-6">
                Haz que cada paseo{' '}
                <span className="text-primary">deje huella</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl">
                Veterinarias, eventos, rutas y comunidad pet friendly. Todo lo
                que tu perro necesita, en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-4 rounded-button shadow-button hover:bg-primary-dark transition-all"
                >
                  Empezar gratis
                </Link>
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold px-8 py-4 rounded-button hover:bg-primary/10 transition-all"
                >
                  Explorar servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-3xl text-center text-dark mb-12">
              Empezar es facilisimo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Registra a tu perro',
                  desc: 'Crea su perfil con foto, raza, tamano y nivel de energia.',
                },
                {
                  icon: MapPin,
                  title: 'Encuentra servicios cerca',
                  desc: 'Veterinarias, paseadores, grooming y mas en el mapa.',
                },
                {
                  icon: Camera,
                  title: 'Pasea, explora y comparte',
                  desc: 'Crea rutas, asiste a eventos y guarda cada Huella.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-3xl text-center text-dark mb-4">
              Todo para tu perro, cerca de ti
            </h2>
            <p className="text-center text-gray-500 mb-12">
              Encuentra los mejores servicios pet en tu ciudad.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🏥', label: 'Veterinarias', color: 'bg-red-50' },
                { icon: '🚶', label: 'Paseadores', color: 'bg-green-50' },
                { icon: '🏨', label: 'Hoteles', color: 'bg-purple-50' },
                { icon: '✂️', label: 'Grooming', color: 'bg-pink-50' },
                { icon: '🛒', label: 'Tiendas', color: 'bg-blue-50' },
                { icon: '🚨', label: 'Emergencias 24h', color: 'bg-red-50' },
              ].map(({ icon, label, color }) => (
                <div
                  key={label}
                  className={`${color} rounded-card p-6 text-center hover:shadow-card transition-shadow cursor-pointer`}
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-heading font-bold text-dark">{label}</h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/directory"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-3xl text-center text-dark mb-12">
              Lo que hace unico a HuellaGo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Route,
                  title: 'Rutas calificadas',
                  desc: 'Sabe de antemano si la ruta es segura, tiene sombra y agua.',
                },
                {
                  icon: Calendar,
                  title: 'Eventos pet friendly',
                  desc: 'Mascotatones, caminatas y mas. Inscribete con un tap.',
                },
                {
                  icon: Camera,
                  title: 'Huella del Paseo',
                  desc: 'Cada paseo genera un recuerdo visual con ruta, fotos y stats.',
                },
                {
                  icon: Heart,
                  title: 'Perritos asistentes',
                  desc: 'Ve que perros iran al evento, no solo los duenos.',
                },
                {
                  icon: Shield,
                  title: 'Rutas seguras',
                  desc: 'Califica seguridad, limpieza, sombra y trafico.',
                },
                {
                  icon: MapPin,
                  title: 'Mapa centralizado',
                  desc: 'Veterinarias, tiendas, parques y mas, todo en un mapa.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-cream rounded-card p-6 hover:shadow-card transition-shadow"
                >
                  <Icon size={24} className="text-primary mb-3" />
                  <h3 className="font-heading font-bold text-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Negocios */}
        <section className="py-20 bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl mb-4">
              Lleva tu negocio pet al siguiente nivel
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Registra tu veterinaria, hotel o servicio y conecta con miles de
              duenos de mascotas en tu zona.
            </p>
            <Link
              href="/business/register"
              className="inline-flex items-center bg-secondary text-white font-semibold px-8 py-4 rounded-button shadow-button-cta hover:bg-secondary-dark transition-all"
            >
              Registrar mi negocio gratis
            </Link>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl text-dark mb-4">
              Tu perro merece la mejor experiencia
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Descubre un mundo de servicios, eventos, rutas y comunidad para ti
              y tu mejor amigo.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center bg-primary text-white font-semibold px-8 py-4 rounded-button shadow-button hover:bg-primary-dark transition-all"
            >
              Empezar gratis
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Gratis. Sin anuncios. Hecho con amor en Peru.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
