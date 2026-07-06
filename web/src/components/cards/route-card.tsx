'use client';

import { Route, Clock, Footprints } from 'lucide-react';
import { Card, CardContent, Badge, Rating } from '@/components/ui';
import { WalkRoute } from '@/interfaces';
import { formatDistance, formatDuration, DIFFICULTY_LABELS } from '@/lib/utils';

const DIFFICULTY_VARIANT: Record<string, 'success' | 'warning' | 'error'> = {
  EASY: 'success',
  MODERATE: 'warning',
  HARD: 'error',
};

interface RouteCardProps {
  route: WalkRoute;
  onClick?: () => void;
}

export function RouteCard({ route, onClick }: RouteCardProps) {
  return (
    <Card hover className="cursor-pointer overflow-hidden">
      <div onClick={onClick}>
        <div className="h-36 bg-gray-100 flex items-center justify-center">
          <Route size={48} className="text-primary/30" />
        </div>

        <CardContent>
          <h3 className="font-heading font-bold text-dark text-base mb-2 line-clamp-1">
            {route.name}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Footprints size={14} />
              {formatDistance(route.distance)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatDuration(route.duration)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Rating
              value={route.avgRating}
              count={route._count?.reviews}
              size={14}
            />
            <Badge variant={DIFFICULTY_VARIANT[route.difficulty]}>
              {DIFFICULTY_LABELS[route.difficulty]}
            </Badge>
          </div>

          <div className="flex gap-1.5 mt-2">
            {route.hasShade && <Badge>Sombra</Badge>}
            {route.hasWater && <Badge>Agua</Badge>}
            {route.hasRestArea && <Badge>Descanso</Badge>}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
