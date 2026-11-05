import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PawMark({ className = '', ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="currentColor" {...rest}>
      <ellipse cx="11" cy="17" rx="3.6" ry="4.6" transform="rotate(-18 11 17)" />
      <ellipse cx="29" cy="17" rx="3.6" ry="4.6" transform="rotate(18 29 17)" />
      <ellipse cx="16.5" cy="10.5" rx="3.4" ry="4.4" transform="rotate(-6 16.5 10.5)" />
      <ellipse cx="23.5" cy="10.5" rx="3.4" ry="4.4" transform="rotate(6 23.5 10.5)" />
      <path d="M20 19.5c-4.6 0-9 4.6-9 8.6 0 3 2.3 4.4 4.8 4.4 1.6 0 2.7-.8 4.2-.8s2.6.8 4.2.8c2.5 0 4.8-1.4 4.8-4.4 0-4-4.4-8.6-9-8.6z" />
    </svg>
  );
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="HuellaGo, ir al inicio" className={cn('group flex items-center gap-2', className)}>
      <span className="relative w-9 h-9 rounded-[12px] bg-primary text-white flex items-center justify-center rotate-[-8deg] group-hover:rotate-[4deg] transition-transform duration-300 ease-spring">
        <PawMark className="w-6 h-6" />
        <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-accent ring-2 ring-white" />
      </span>
      <span className={cn('font-heading font-extrabold text-[22px] tracking-[-0.04em]', light ? 'text-white' : 'text-dark')}>
        huellago
      </span>
    </Link>
  );
}
