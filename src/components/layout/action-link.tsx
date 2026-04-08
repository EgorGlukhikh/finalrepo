import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ActionLinkVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

const variantClasses: Record<ActionLinkVariant, string> = {
  primary:
    'border border-transparent bg-primary text-primary-foreground shadow-card hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-panel',
  secondary:
    'border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:bg-surface-elevated hover:shadow-card',
  ghost: 'border border-transparent bg-transparent text-foreground hover:bg-surface-muted',
  outline: 'border border-border bg-transparent text-foreground hover:bg-surface',
};

type ActionLinkProps = {
  children: ReactNode;
  className?: string;
  variant?: ActionLinkVariant;
} & LinkProps;

export function ActionLink({ children, className, variant = 'secondary', ...props }: ActionLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-2xl px-4.5 text-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
