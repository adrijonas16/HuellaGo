'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardImage, CardContent, Badge } from '@/components/ui';
import { HuellaEvent, EventStatus } from '@/interfaces';
import { formatDate, formatTime, ENERGY_LABELS } from '@/lib/utils';

const STATUS_CONFIG: Record<EventStatus, { label: string; variant: 'warning' | 'success' | 'default' | 'error' }> = {
  UPCOMING: { label: 'Próximo', variant: 'warning' },
  ACTIVE: { label: 'Activo', variant: 'success' },
  FINISHED: { label: 'Finalizado', variant: 'default' },
  CANCELLED: { label: 'Cancelado', variant: 'error' },
};

interface EventCardProps {
  event: HuellaEvent;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const statusConfig = STATUS_CONFIG[event.status];
  const attendeesCount = event._count?.attendances || 0;

  return (
    <Card hover className="cursor-pointer overflow-hidden" >
      <div onClick={onClick}>
        <div className="relative">
          <CardImage
            src={event.photos?.[0]?.url || '/placeholder-event.jpg'}
            alt={event.title}
            className="h-44"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
          </div>
        </div>

        <CardContent>
          <h3 className="font-heading font-bold text-dark text-base mb-2 line-clamp-2">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-bark mb-1.5">
            <Calendar size={14} />
            <span>
              {formatDate(event.date)} - {formatTime(event.date)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-bark mb-3">
            <MapPin size={14} />
            <span className="line-clamp-1">{event.meetingPoint}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-bark">
              <Users size={14} />
              <span>
                {attendeesCount}
                {event.maxAttendees ? ` / ${event.maxAttendees}` : ''} inscritos
              </span>
            </div>

            <div className="flex gap-1.5">
              {event.energyLevel && (
                <Badge variant="primary">
                  {ENERGY_LABELS[event.energyLevel]}
                </Badge>
              )}
              {event.isFree && <Badge variant="success">Gratis</Badge>}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
