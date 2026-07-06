import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-heading font-bold text-xl">HuellaGo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Cada paseo deja huella. Todo para tu perro, en un solo lugar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Explora</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/map" className="hover:text-primary transition-colors">Mapa</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Eventos</Link></li>
              <li><Link href="/routes" className="hover:text-primary transition-colors">Rutas</Link></li>
              <li><Link href="/directory" className="hover:text-primary transition-colors">Servicios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Para negocios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/business/register" className="hover:text-primary transition-colors">Registrar negocio</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Planes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help" className="hover:text-primary transition-colors">Ayuda</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terminos</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          Hecho con amor en Peru para los que caminan con su mejor amigo.
        </div>
      </div>
    </footer>
  );
}
