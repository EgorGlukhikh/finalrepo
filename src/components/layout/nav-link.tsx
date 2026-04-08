import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type NavLinkProps = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
} & LinkProps;

export function NavLink({ children, active = false, disabled = false, className, ...props }: NavLinkProps) {
  const baseClasses = cn(
    'inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-medium transition-[background-color,color,opacity] duration-200 ease-[var(--ease-standard)]',
    disabled
      ? 'cursor-not-allowed text-muted-foreground/60'
      : active
        ? 'bg-surface text-foreground shadow-[inset_0_0_0_1px_var(--color-border)]'
        : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
    className,
  );

  if (disabled) {
    return <span className={baseClasses}>{children}</span>;
  }

  return (
    <Link className={baseClasses} {...props}>
      {children}
    </Link>
  );
}
