'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { ChevronLeft, Camera, Save, Check } from 'lucide-react';
import { useAuth } from '@/hooks';
import { useAppStore } from '@/lib/store';
import { Sheet } from '@/components/ui/sheet';
import { PasswordInput } from '@/components/ui/password-input';
import { LocationPicker } from '@/components/map/location-picker';

export default function EditProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: 'María',
    lastName: 'García',
    email: 'maria@email.com',
    phone: '954 234 567',
    city: 'Arequipa',
    district: 'Cayma',
  });

  const router = useRouter();
  const { user, setUser, logout } = useAuth();
  const notify = useAppStore((s) => s.notify);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [pw, setPw] = useState({ current: '', next: '' });
  const [pwTried, setPwTried] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, firstName: user.firstName, lastName: user.lastName, email: user.email, city: user.city ?? f.city, district: user.district ?? f.district }));
  }, [user]);

  function handleSave() {
    if (!form.firstName.trim()) {
      notify('El nombre no puede quedar vacío', { tone: 'error' });
      return;
    }
    if (user) setUser({ ...user, firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email, city: form.city, district: form.district });
    setSaved(true);
    notify('Cambios guardados', { tone: 'success' });
    setTimeout(() => setSaved(false), 2500);
  }

  function changePassword() {
    setPwTried(true);
    if (!pw.current || pw.next.length < 8) return;
    setPw({ current: '', next: '' });
    setPwTried(false);
    notify('Contraseña actualizada', { tone: 'success' });
  }

  function deleteAccount() {
    logout();
    setConfirmDelete(false);
    notify('Tu cuenta fue eliminada. Te vamos a extrañar.', { tone: 'info' });
    router.push('/');
  }

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-bark hover:text-primary mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Volver a mi panel
          </Link>

          <h1 className="font-heading font-extrabold text-3xl text-dark mb-8">Editar perfil</h1>

          <div className="bg-white rounded-card shadow-card p-6 md:p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="Tu foto de perfil" className="w-20 h-20 rounded-3xl object-cover animate-scale-in" />
                ) : (
                  <div className="w-20 h-20 rounded-3xl bg-accent text-dark text-3xl font-heading font-extrabold flex items-center justify-center">
                    {form.firstName[0] ?? '?'}
                  </div>
                )}
                <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-sand rounded-full flex items-center justify-center boop-btn hover:bg-cream cursor-pointer focus-within:ring-2 focus-within:ring-primary">
                  <Camera size={14} className="text-bark" />
                  <span className="sr-only">Cambiar foto</span>
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setAvatar(URL.createObjectURL(f)); notify('Foto actualizada', { tone: 'success' }); } }} />
                </label>
              </div>
              <div>
                <p className="font-semibold text-dark">{form.firstName} {form.lastName}</p>
                <p className="text-xs text-bark">JPG o PNG, idealmente cuadrada</p>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-f1" className="text-sm font-semibold text-dark block mb-1.5">Nombre</label>
                <input id="edit-f1" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <label htmlFor="edit-f2" className="text-sm font-semibold text-dark block mb-1.5">Apellido</label>
                <input id="edit-f2" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>

            <div>
              <label htmlFor="edit-f3" className="text-sm font-semibold text-dark block mb-1.5">Email</label>
              <input id="edit-f3" type="email" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label htmlFor="edit-f4" className="text-sm font-semibold text-dark block mb-1.5">Teléfono</label>
              <input id="edit-f4" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-f5" className="text-sm font-semibold text-dark block mb-1.5">Ciudad</label>
                <select id="edit-f5" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary outline-none bg-white" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                  <option>Arequipa</option><option>Lima</option><option>Cusco</option><option>Trujillo</option><option>Chiclayo</option><option>Piura</option><option>Tacna</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-f6" className="text-sm font-semibold text-dark block mb-1.5">Distrito</label>
                <input id="edit-f6" className="w-full px-4 py-3 rounded-2xl border-[1.5px] border-sand focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
              </div>
            </div>

            <div className="pt-4 border-t border-sand flex items-center justify-between">
              <Link href="/dashboard" className="text-sm text-bark font-medium hover:text-primary">Cancelar</Link>
              <button onClick={handleSave} className="boop-btn flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-button shadow-button hover:bg-primary-dark transition-all">
                {saved ? <Check size={16} strokeWidth={3} /> : <Save size={16} />} {saved ? 'Guardado' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* Change password */}
          <div className="bg-white rounded-card shadow-card p-6 mt-6">
            <h2 className="font-heading font-bold text-dark text-lg mb-4">Cambiar contraseña</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
              <PasswordInput id="pw-current" label="Contraseña actual" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} error={pwTried && !pw.current ? 'Escribe tu contraseña actual' : ''} />
              <PasswordInput id="pw-next" label="Contraseña nueva" autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} error={pwTried && pw.next.length < 8 ? 'Usa al menos 8 caracteres' : ''} />
              <button className="bg-dark text-white font-bold px-6 py-2.5 rounded-full hover:bg-primary transition-colors text-sm">Cambiar contraseña</button>
            </form>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-card shadow-card p-6 mt-6 border-2 border-error/10">
            <h2 className="font-heading font-bold text-error text-lg mb-2">Zona peligrosa</h2>
            <p className="text-sm text-bark mb-4">Estas acciones no se pueden deshacer.</p>
            <button onClick={() => setConfirmDelete(true)} className="text-sm font-semibold text-error bg-error/5 px-4 py-2 rounded-full hover:bg-error/10 transition-all">Eliminar mi cuenta</button>
          </div>
        </div>
      </main>
      <Sheet open={confirmDelete} onClose={() => setConfirmDelete(false)} title="¿Eliminar tu cuenta?">
        <p className="text-bark">Se borrarán tus mascotas, favoritos e inscripciones. Esta acción no se puede deshacer.</p>
        <div className="flex flex-col gap-2 mt-6">
          <button onClick={deleteAccount} className="w-full bg-error text-white font-bold py-3.5 rounded-full">Sí, eliminar mi cuenta</button>
          <button onClick={() => setConfirmDelete(false)} className="w-full font-bold text-dark py-3 rounded-full hover:bg-cream">Conservar mi cuenta</button>
        </div>
      </Sheet>
    </>
  );
}
