import Link from 'next/link';

import { cn } from '@/lib/cn';

type BrandMarkProps = {
  className?: string;
  href?: string;
};

export function BrandMark({ className, href = '/' }: BrandMarkProps) {
  return (
    <Link href={href} className={cn('inline-flex items-center gap-3.5', className)} aria-label="Академия риэлторов">
      <span className="relative flex size-11 items-center justify-center rounded-2xl bg-surface text-sm font-semibold text-foreground ring-1 ring-border/80 shadow-card">
        <span className="absolute inset-[2px] rounded-[1rem] bg-linear-to-br from-primary-soft via-surface to-surface-elevated" />
        <span className="relative z-10 tracking-[-0.06em] text-primary">AR</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Академия
        </span>
        <span className="text-sm font-semibold tracking-[-0.02em] text-foreground">риэлторов</span>
      </span>
    </Link>
  );
}
