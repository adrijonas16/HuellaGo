'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { ChevronLeft, Camera, Save } from 'lucide-react';
import { LocationPicker } from '@/components/map/location-picker';

export default function EditProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria@email.com',
    phone: '954 234 567',
    city: 'Arequipa',
    district: 'Cayma',
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver al dashboard
          </Link>

          <h1 className="font-heading font-extrabold text-3xl text-dark mb-8">Editar perfil</h1>

          <div className="bg-white rounded-card shadow-card p-6 md:p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white text-3xl font-extrabold flex items-center justify-center">
                  {form.firstName[0]}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-sand rounded-full flex items-center justify-center boop-btn hover:bg-cream">
                  <Camera size={14} className="text-bark" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-dark">{form.firstName} {form.lastName}</p>
                <button className="text-xs text-primary font-semibold hover:underline">Cambiar foto</button>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Nombre</label>
                <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Apellido</label>
                <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-dark block mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-semibold text-dark block mb-1.5">Telefono</label>
              <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Ciudad</label>
                <select className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary outline-none bg-white" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                  <option>Arequipa</option><option>Lima</option><option>Cusco</option><option>Trujillo</option><option>Chiclayo</option><option>Piura</option><option>Tacna</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Distrito</label>
                <input className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
              </div>
            </div>

            <div className="pt-4 border-t border-sand flex items-center justify-between">
              <Link href="/dashboard" className="text-sm text-bark font-medium hover:text-primary">Cancelar</Link>
              <button onClick={handleSave} className="boop-btn flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-button shadow-button hover:bg-primary-dark transition-all">
                <Save size={16} /> {saved ? 'Guardado!' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* Change password */}
          <div className="bg-white rounded-card shadow-card p-6 mt-6">
            <h2 className="font-heading font-bold text-dark text-lg mb-4">Cambiar contrasena</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Contrasena actual</label>
                <input type="password" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Tu contrasena actual" />
              </div>
              <div>
                <label className="text-sm font-semibold text-dark block mb-1.5">Nueva contrasena</label>
                <input type="password" className="w-full px-4 py-3 rounded-button border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Minimo 8 caracteres" />
              </div>
              <button className="bg-sand text-bark font-semibold px-6 py-2.5 rounded-button hover:bg-bark/10 transition-all text-sm">Cambiar contrasena</button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-card shadow-card p-6 mt-6 border-2 border-error/10">
            <h2 className="font-heading font-bold text-error text-lg mb-2">Zona peligrosa</h2>
            <p className="text-sm text-bark mb-4">Estas acciones no se pueden deshacer.</p>
            <button className="text-sm font-semibold text-error bg-error/5 px-4 py-2 rounded-button hover:bg-error/10 transition-all">Eliminar mi cuenta</button>
          </div>
        </div>
      </main>
    </>
  );
}
