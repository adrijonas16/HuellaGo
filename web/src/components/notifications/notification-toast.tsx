'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Calendar, MapPin, Users, Bell, ChevronRight } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import { MOCK_EVENTS, ENERGY_LABELS } from '@/lib/mock-data';

interface Notification {
  id: string;
  type: 'new_event' | 'event_reminder' | 'promo' | 'system';
  title: string;
  body: string;
  icon: string;
  link?: string;
  eventId?: string;
  timestamp: Date;
  read: boolean;
}

function generateNotifications(): Notification[] {
  return [
    {
      id: 'n1',
      type: 'new_event',
      title: 'Nuevo evento en Arequipa!',
      body: `${MOCK_EVENTS[0].title} - ${formatDate(MOCK_EVENTS[0].date)}`,
      icon: '🎉',
      link: `/events/${MOCK_EVENTS[0].id}`,
      eventId: MOCK_EVENTS[0].id,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: 'n2',
      type: 'event_reminder',
      title: 'Evento mañana!',
      body: `${MOCK_EVENTS[1].title} empieza mañana a las ${formatTime(MOCK_EVENTS[1].date)}`,
      icon: '⏰',
      link: `/events/${MOCK_EVENTS[1].id}`,
      eventId: MOCK_EVENTS[1].id,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: 'n3',
      type: 'new_event',
      title: 'Nuevo evento cerca de ti',
      body: `${MOCK_EVENTS[2].title} en ${MOCK_EVENTS[2].district}`,
      icon: '📍',
      link: `/events/${MOCK_EVENTS[2].id}`,
      eventId: MOCK_EVENTS[2].id,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
    },
    {
      id: 'n4',
      type: 'promo',
      title: 'Promoción en Veterinaria Patitas Felices',
      body: '20% OFF en vacunación por tiempo limitado',
      icon: '🏷️',
      link: '/directory/1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
    },
    {
      id: 'n5',
      type: 'new_event',
      title: 'Jornada de Vacunación Gratuita',
      body: 'Campaña gratuita en Plaza de Cayma este domingo',
      icon: '💉',
      link: `/events/${MOCK_EVENTS[4].id}`,
      eventId: MOCK_EVENTS[4].id,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      read: true,
    },
  ];
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Hace un momento';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours}h`;
  return `Hace ${Math.floor(hours / 24)}d`;
}

// Toast that appears for new event notifications
export function NotificationToast() {
  const [toast, setToast] = useState<Notification | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    // Solo una vez por sesión y nunca en pantallas de acceso
    if (window.innerWidth < 640 || sessionStorage.getItem('hg-toast-shown') || /\/(login|register|forgot-password)/.test(location.pathname)) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem('hg-toast-shown', '1');
      setToast({
        id: 'toast-1',
        type: 'new_event',
        title: 'Nuevo evento en tu ciudad',
        body: `${MOCK_EVENTS[0].title} - ${MOCK_EVENTS[0].meetingPoint}`,
        icon: '🎉',
        link: `/events/${MOCK_EVENTS[0].id}`,
        eventId: MOCK_EVENTS[0].id,
        timestamp: new Date(),
        read: false,
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 9000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto z-[100] animate-slide-in-right sm:max-w-sm">
      <div className="bg-white rounded-2xl shadow-card-hover border border-sand p-4 relative overflow-hidden">
        {/* Color accent bar */}

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-xl shrink-0 -rotate-6">
            {toast.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-dark text-sm">{toast.title}</h4>
            <p className="text-xs text-bark mt-0.5 line-clamp-2">{toast.body}</p>
            <div className="flex gap-2 mt-3">
              {toast.link && (
                <Link
                  href={toast.link}
                  onClick={() => { setToast(null); setDismissed(true); }}
                  className="text-xs font-bold text-white bg-primary px-4 py-1.5 rounded-full boop-btn hover:bg-primary-dark transition-all"
                >
                  Ver evento
                </Link>
              )}
              <button
                onClick={() => { setToast(null); setDismissed(true); }}
                className="text-xs font-semibold text-bark px-3 py-1.5 rounded-full hover:bg-sand transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
          <button
            onClick={() => { setToast(null); setDismissed(true); }}
            aria-label="Cerrar aviso"
            className="p-1 text-bark/60 hover:text-bark shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Notification dropdown for the bell icon
export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => generateNotifications());

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Notificaciones${unreadCount ? `, ${unreadCount} sin leer` : ''}`}
        aria-expanded={open}
        className="p-2 rounded-full hover:bg-sand transition-colors relative"
      >
        <Bell size={20} className="text-bark" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose text-white text-[9px] ring-2 ring-white font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-16 sm:top-12 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-sand z-50 animate-slide-down overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-sand">
              <h3 className="font-heading font-bold text-dark text-sm">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Marcar todo como leído
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id}>
                  {notif.link ? (
                    <Link
                      href={notif.link}
                      onClick={() => { markAsRead(notif.id); setOpen(false); }}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-cream/50 transition-colors border-b border-sand/50 ${!notif.read ? 'bg-primary/[0.03]' : ''}`}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: !notif.read ? '#3352F515' : '#E6E8EF' }}>
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm line-clamp-1 ${!notif.read ? 'font-bold text-dark' : 'font-medium text-bark'}`}>{notif.title}</h4>
                          {!notif.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                        </div>
                        <p className="text-xs text-bark mt-0.5 line-clamp-1">{notif.body}</p>
                        <p className="text-[10px] text-bark/50 mt-1">{timeAgo(notif.timestamp)}</p>
                      </div>
                      <ChevronRight size={14} className="text-bark/30 mt-2 shrink-0" />
                    </Link>
                  ) : (
                    <div className={`flex items-start gap-3 px-4 py-3 border-b border-sand/50 ${!notif.read ? 'bg-primary/[0.03]' : ''}`}>
                      <div className="w-9 h-9 bg-sand rounded-xl flex items-center justify-center text-lg shrink-0">{notif.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-bark">{notif.title}</h4>
                        <p className="text-xs text-bark/60 mt-0.5">{notif.body}</p>
                        <p className="text-[10px] text-bark/50 mt-1">{timeAgo(notif.timestamp)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-sand text-center">
              <Link href="/events" onClick={() => setOpen(false)} className="text-xs font-semibold text-primary hover:underline">
                Ver todos los eventos
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
