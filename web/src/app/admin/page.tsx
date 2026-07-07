'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ScrollReveal } from '@/components/effects/scroll-reveal';
import { Users, Building2, CalendarDays, Route, Flag, Image, TrendingUp, Shield, AlertTriangle, Check, X, Eye } from 'lucide-react';

const TABS = ['Dashboard', 'Negocios', 'Eventos', 'Contenido', 'Anuncios', 'Reportes'];

const PENDING_BUSINESSES = [
  { id: 'pb1', name: 'Veterinaria San Martin', category: 'VETERINARY', city: 'Arequipa', district: 'Miraflores', date: '2026-07-05', owner: 'Roberto Diaz' },
  { id: 'pb2', name: 'PetSpa Luxury', category: 'GROOMING', city: 'Arequipa', district: 'Cayma', date: '2026-07-04', owner: 'Carla Medina' },
  { id: 'pb3', name: 'Paseos con Amor', category: 'WALKER', city: 'Arequipa', district: 'Yanahuara', date: '2026-07-03', owner: 'Miguel Flores' },
];

const STATS = [
  { label: 'Usuarios', value: '2,847', change: '+12%', icon: Users, color: '#E8825A' },
  { label: 'Negocios', value: '48', change: '+5', icon: Building2, color: '#7C5CBF' },
  { label: 'Eventos activos', value: '6', change: '+2', icon: CalendarDays, color: '#FFB627' },
  { label: 'Rutas creadas', value: '23', change: '+8', icon: Route, color: '#2EC4B6' },
  { label: 'Reportes pendientes', value: '3', change: '', icon: AlertTriangle, color: '#E53E3E' },
  { label: 'Fotos subidas', value: '1,204', change: '+156', icon: Image, color: '#E85D75' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-60 bg-dark text-white hidden lg:block shrink-0">
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              <span className="font-heading font-bold">Panel Admin</span>
            </div>
          </div>
          <nav className="p-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                  activeTab === tab ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-cream p-6 lg:p-8 overflow-y-auto">
          {/* Mobile tabs */}
          <div className="flex gap-2 overflow-x-auto mb-6 lg:hidden pb-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-primary text-white' : 'bg-white text-bark border border-sand'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-dark mb-1">Dashboard</h1>
                <p className="text-bark text-sm">Vista general de HuellaGo</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {STATS.map((stat) => (
                  <ScrollReveal key={stat.label}>
                    <div className="bg-white rounded-card p-4 shadow-card">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon size={18} style={{ color: stat.color }} />
                        {stat.change && (
                          <span className="text-[10px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                        )}
                      </div>
                      <div className="text-xl font-extrabold text-dark">{stat.value}</div>
                      <div className="text-[11px] text-bark">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Pending businesses */}
              <ScrollReveal>
                <div className="bg-white rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-dark">Negocios pendientes de aprobacion</h2>
                    <span className="text-xs font-bold bg-accent/15 text-amber-700 px-2 py-1 rounded-full">{PENDING_BUSINESSES.length} pendientes</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand">
                          <th className="text-left py-3 text-bark font-semibold">Negocio</th>
                          <th className="text-left py-3 text-bark font-semibold hidden md:table-cell">Categoria</th>
                          <th className="text-left py-3 text-bark font-semibold hidden md:table-cell">Ubicacion</th>
                          <th className="text-left py-3 text-bark font-semibold">Propietario</th>
                          <th className="text-right py-3 text-bark font-semibold">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PENDING_BUSINESSES.map((biz) => (
                          <tr key={biz.id} className="border-b border-sand/50 hover:bg-cream/50">
                            <td className="py-3 font-semibold text-dark">{biz.name}</td>
                            <td className="py-3 text-bark hidden md:table-cell">{biz.category}</td>
                            <td className="py-3 text-bark hidden md:table-cell">{biz.district}</td>
                            <td className="py-3 text-bark">{biz.owner}</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-1.5 bg-cream hover:bg-primary/10 rounded-lg transition-all" title="Ver"><Eye size={14} className="text-bark" /></button>
                                <button className="p-1.5 bg-success/10 hover:bg-success/20 rounded-lg transition-all" title="Aprobar"><Check size={14} className="text-success" /></button>
                                <button className="p-1.5 bg-error/10 hover:bg-error/20 rounded-lg transition-all" title="Rechazar"><X size={14} className="text-error" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>

              {/* Quick activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScrollReveal>
                  <div className="bg-white rounded-card shadow-card p-6">
                    <h3 className="font-heading font-bold text-dark mb-4">Actividad reciente</h3>
                    <div className="space-y-3">
                      {[
                        { text: 'Maria Garcia registro a su perro Toby', time: 'Hace 5 min', icon: '🐕' },
                        { text: 'Veterinaria Patitas actualizo su perfil', time: 'Hace 15 min', icon: '🏥' },
                        { text: 'Nuevo evento: Mascotatone Arequipa', time: 'Hace 1h', icon: '🎉' },
                        { text: 'Carlos Q. completo la ruta del centro', time: 'Hace 2h', icon: '🗺️' },
                        { text: '3 nuevas resenas en PetCare 24h', time: 'Hace 3h', icon: '⭐' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-2">
                          <span className="text-lg">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-dark truncate">{item.text}</p>
                            <p className="text-[11px] text-bark">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="bg-white rounded-card shadow-card p-6">
                    <h3 className="font-heading font-bold text-dark mb-4">Ciudades activas</h3>
                    <div className="space-y-3">
                      {[
                        { city: 'Arequipa', users: 2103, businesses: 38, pct: 85 },
                        { city: 'Lima', users: 534, businesses: 8, pct: 30 },
                        { city: 'Cusco', users: 89, businesses: 2, pct: 10 },
                      ].map((c) => (
                        <div key={c.city}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-dark">{c.city}</span>
                            <span className="text-bark">{c.users} usuarios · {c.businesses} negocios</span>
                          </div>
                          <div className="h-2 bg-sand rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${c.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )}

          {activeTab === 'Negocios' && (
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-dark mb-6">Gestion de Negocios</h1>
              <p className="text-bark">Aqui se gestionan aprobaciones, verificaciones y suspensiones de negocios.</p>
            </div>
          )}

          {activeTab === 'Anuncios' && (
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-dark mb-4">Gestion de Anuncios</h1>
              <p className="text-bark mb-6">Administra los espacios publicitarios de la plataforma.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['home_banner', 'directory_top', 'map_featured', 'event_sidebar'].map((slot) => (
                  <div key={slot} className="bg-white rounded-card p-5 shadow-card">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-heading font-bold text-dark text-sm">{slot.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h3>
                      <span className="text-[10px] font-bold bg-sand text-bark px-2 py-0.5 rounded-full">Disponible</span>
                    </div>
                    <div className="bg-sand/50 border border-dashed border-bark/15 rounded-xl p-6 text-center">
                      <p className="text-xs text-bark/40">Sin anuncio activo</p>
                    </div>
                    <button className="mt-3 w-full text-sm font-semibold text-primary bg-primary/5 py-2 rounded-button hover:bg-primary/10 transition-all">
                      Crear anuncio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'Dashboard' && activeTab !== 'Anuncios' && (
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-dark mb-4">{activeTab}</h1>
              <p className="text-bark">Seccion en desarrollo.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
