import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type InfoRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 py-3', className)}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

