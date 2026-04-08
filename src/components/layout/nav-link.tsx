 'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type NavLinkProps = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  exact?: boolean;
  className?: string;
} & LinkProps;

export function NavLink({ children, active = false, disabled = false, exact = false, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const href = typeof props.href === 'string' ? props.href : '';
  const pathnameMatches =
    href &&
    (exact
      ? pathname === href
      : pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) || (href === '/' && pathname === '/'));
  const isActive = active || pathnameMatches;
  const baseClasses = cn(
    'inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-medium transition-[background-color,color,opacity] duration-200 ease-[var(--ease-standard)]',
    disabled
      ? 'cursor-not-allowed text-muted-foreground/60'
      : isActive
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
