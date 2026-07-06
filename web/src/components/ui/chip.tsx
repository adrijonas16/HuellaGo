import { cn } from '@/lib/utils';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ children, active = false, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-chip text-sm font-medium font-body',
        'transition-all duration-200 whitespace-nowrap',
        active
          ? 'bg-primary text-white'
          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100',
        className,
      )}
    >
      {children}
    </button>
  );
}
