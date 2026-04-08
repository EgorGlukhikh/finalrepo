import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ActionLinkVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

const variantClasses: Record<ActionLinkVariant, string> = {
  primary: 'border border-transparent bg-primary text-primary-foreground shadow-card hover:bg-primary/90',
  secondary: 'border border-border bg-surface text-foreground hover:bg-surface-muted',
  ghost: 'border border-transparent bg-transparent text-foreground hover:bg-surface-muted',
  outline: 'border border-border bg-transparent text-foreground hover:bg-surface-muted',
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
        'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
