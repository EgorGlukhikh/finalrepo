import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type BadgeTone = 'default' | 'secondary' | 'outline' | 'primary' | 'success' | 'warning' | 'danger';

const toneClasses: Record<BadgeTone, string> = {
  default: 'bg-surface-muted text-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-border bg-transparent text-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-foreground',
  danger: 'bg-danger/10 text-danger',
};

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none', toneClasses[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}

