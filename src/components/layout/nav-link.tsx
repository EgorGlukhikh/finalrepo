 'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type NavLinkProps = {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  exact?: boolean;
  className?: string;
} & LinkProps;

export function NavLink({
  children,
  icon,
  active = false,
  disabled = false,
  exact = false,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const href = typeof props.href === 'string' ? props.href : '';
  const pathnameMatches =
    href &&
    (exact
      ? pathname === href
      : pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) || (href === '/' && pathname === '/'));
  const isActive = active || pathnameMatches;
  const baseClasses = cn(
    'group inline-flex min-h-11 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-[background-color,color,opacity,transform,box-shadow] duration-200 ease-[var(--ease-standard)]',
    disabled
      ? 'cursor-not-allowed text-muted-foreground/60'
      : isActive
        ? 'bg-surface text-foreground shadow-[inset_0_0_0_1px_var(--color-border),0_10px_28px_-24px_rgb(15_23_42_/_0.4)]'
        : 'text-muted-foreground hover:bg-surface hover:text-foreground',
    className,
  );
  const content = (
    <>
      {icon ? (
        <span className={cn('text-muted-foreground transition-colors duration-fast ease-[var(--ease-standard)]', isActive && 'text-primary')}>
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (disabled) {
    return <span className={baseClasses}>{content}</span>;
  }

  return (
    <Link className={baseClasses} {...props}>
      {content}
    </Link>
  );
}
