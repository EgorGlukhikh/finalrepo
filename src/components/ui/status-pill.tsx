import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type StatusTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const toneClasses: Record<StatusTone, string> = {
  neutral: 'bg-surface-muted text-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-foreground',
  danger: 'bg-danger/10 text-danger',
};

type StatusPillProps = {
  children: ReactNode;
  className?: string;
  tone?: StatusTone;
} & HTMLAttributes<HTMLSpanElement>;

export function StatusPill({ children, className, tone = 'neutral', ...props }: StatusPillProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none', toneClasses[tone], className)}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-current/70" />
      {children}
    </span>
  );
}

