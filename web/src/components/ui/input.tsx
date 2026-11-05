import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, hint, id, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-sm font-semibold text-dark font-body">
        {label}
      </label>
    )}
    <input
      ref={ref}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error || hint ? `${id}-help` : undefined}
      className={cn(
        'w-full px-4 py-3.5 rounded-2xl border-[1.5px] border-sand bg-white',
        'text-base font-body text-dark placeholder:text-bark/50',
        'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
        'transition-all duration-200',
        error && 'border-error focus:border-error focus:ring-error/15',
        className,
      )}
      {...props}
    />
    {(error || hint) && (
      <span id={`${id}-help`} className={cn('text-sm font-body', error ? 'text-error' : 'text-bark')}>
        {error || hint}
      </span>
    )}
  </div>
));

Input.displayName = 'Input';
