import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-600 font-body"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full px-4 py-3.5 rounded-button border-[1.5px] border-gray-200 bg-white',
          'text-base font-body text-dark placeholder:text-gray-400',
          'focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20',
          'transition-all duration-200',
          error && 'border-error focus:border-error focus:ring-error/20',
          className,
        )}
        {...props}
      />
      {error && <span className="text-sm text-error font-body">{error}</span>}
    </div>
  ),
);

Input.displayName = 'Input';
