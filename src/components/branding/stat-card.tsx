import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Card } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: ReactNode;
  description?: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
};

const toneClasses = {
  default: 'text-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-foreground',
  danger: 'text-danger',
} as const;

export function StatCard({ label, value, description, tone = 'default', className }: StatCardProps) {
  return (
    <Card className={cn('space-y-2', className)}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className={cn('text-2xl font-semibold tracking-tight', toneClasses[tone])}>{value}</div>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </Card>
  );
}

