'use client';

import { MapPin } from 'lucide-react';
import { Card, CardImage, CardContent, Badge, Rating } from '@/components/ui';
import { Business } from '@/interfaces';
import { CATEGORY_LABELS, formatDistance } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
  distance?: number;
  onClick?: () => void;
}

export function BusinessCard({ business, distance, onClick }: BusinessCardProps) {
  return (
    <Card hover className="cursor-pointer overflow-hidden">
      <div onClick={onClick}>
        <CardImage
          src={business.photos?.[0]?.url || '/placeholder-business.jpg'}
          alt={business.name}
          className="h-40"
        />

        <CardContent>
          <h3 className="font-heading font-bold text-dark text-base mb-1 line-clamp-1">
            {business.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">
              {CATEGORY_LABELS[business.category]}
            </Badge>
            {business.is24Hours && <Badge variant="warning">24h</Badge>}
          </div>

          <div className="flex items-center justify-between mb-2">
            <Rating
              value={business.avgRating || 0}
              count={business._count?.reviews}
              size={14}
            />
          </div>

          {distance !== undefined && (
            <div className="flex items-center gap-1.5 text-sm text-bark">
              <MapPin size={14} />
              <span>{formatDistance(distance)}</span>
            </div>
          )}

          <div className="mt-2">
            <Badge variant={business.isVerified ? 'success' : 'default'}>
              {business.isVerified ? 'Verificado' : 'Sin verificar'}
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
