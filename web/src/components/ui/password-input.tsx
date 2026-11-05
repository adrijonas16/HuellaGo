'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(({ label, error, hint, id, className, ...props }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-dark">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={show ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-help` : undefined}
          className={cn(
            'w-full pl-4 pr-12 py-3.5 rounded-2xl border-[1.5px] border-sand bg-white text-base text-dark placeholder:text-bark/50',
            'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all',
            error && 'border-error focus:border-error focus:ring-error/15',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-bark hover:bg-sand"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {(error || hint) && (
        <span id={`${id}-help`} className={cn('text-sm', error ? 'text-error' : 'text-bark')}>{error || hint}</span>
      )}
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';
