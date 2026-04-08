import Link from 'next/link';

import { cn } from '@/lib/cn';

type BrandMarkProps = {
  className?: string;
  href?: string;
};

export function BrandMark({ className, href = '/' }: BrandMarkProps) {
  return (
    <Link href={href} className={cn('inline-flex items-center gap-3', className)} aria-label="Академия риэлторов">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-card">
        AR
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Академия
        </span>
        <span className="text-sm font-semibold text-foreground">риэлторов</span>
      </span>
    </Link>
  );
}
