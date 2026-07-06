import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'primary'
  | 'secondary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-600',
  success: 'bg-success/15 text-success',
  warning: 'bg-accent/15 text-amber-700',
  error: 'bg-error/15 text-error',
  info: 'bg-info/15 text-info',
  primary: 'bg-primary/15 text-primary-dark',
  secondary: 'bg-secondary/15 text-secondary-dark',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg font-body',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
