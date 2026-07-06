import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 16,
  showValue = true,
  count,
  className,
}: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(value)
              ? 'fill-accent text-accent'
              : i < value
                ? 'fill-accent/50 text-accent'
                : 'fill-gray-200 text-gray-200',
          )}
        />
      ))}
      {showValue && (
        <span className="text-sm font-semibold text-dark ml-1">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-sm text-gray-400">({count})</span>
      )}
    </div>
  );
}
