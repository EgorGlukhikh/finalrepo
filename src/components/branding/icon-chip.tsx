import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type IconChipProps = {
  icon: ReactNode;
  className?: string;
  tone?: 'default' | 'primary' | 'muted';
};

const toneClasses = {
  default: 'bg-surface text-foreground ring-1 ring-border/80',
  primary: 'bg-primary-soft text-primary ring-1 ring-primary/12',
  muted: 'bg-surface-muted text-muted-foreground ring-1 ring-border/60',
} as const;

export function IconChip({ icon, className, tone = 'default' }: IconChipProps) {
  return (
    <span
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-2xl shadow-card transition-colors duration-fast ease-[var(--ease-standard)]',
        toneClasses[tone],
        className,
      )}
    >
      {icon}
    </span>
  );
}
