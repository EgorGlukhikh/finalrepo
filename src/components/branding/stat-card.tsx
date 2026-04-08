import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Card } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: ReactNode;
  description?: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
  eyebrow?: string;
};

const toneClasses = {
  default: 'text-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-foreground',
  danger: 'text-danger',
} as const;

export function StatCard({ label, value, description, tone = 'default', className, eyebrow }: StatCardProps) {
  return (
    <Card tone="muted" className={cn('space-y-3', className)}>
      <div className="space-y-1">
        {eyebrow ? <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</div> : null}
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <div className={cn('text-3xl font-semibold tracking-[-0.05em]', toneClasses[tone])}>{value}</div>
      {description ? <p className="text-sm leading-7 text-muted-foreground">{description}</p> : null}
    </Card>
  );
}

