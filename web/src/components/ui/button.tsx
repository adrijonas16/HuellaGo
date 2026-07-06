import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white rounded-button shadow-button hover:bg-primary-dark',
        secondary:
          'bg-transparent border-2 border-primary text-primary rounded-button hover:bg-primary/10',
        cta: 'bg-secondary text-white rounded-button shadow-button-cta hover:bg-secondary-dark',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 rounded-button',
        danger: 'bg-error text-white rounded-button hover:bg-red-700',
      },
      size: {
        sm: 'text-sm px-4 py-2',
        md: 'text-base px-6 py-3',
        lg: 'text-lg px-8 py-4',
        icon: 'p-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
