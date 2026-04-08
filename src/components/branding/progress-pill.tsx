import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ProgressPillProps = {
  value: number;
  label?: ReactNode;
  className?: string;
};

export function ProgressPill({ value, label, className }: ProgressPillProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current/70" />
      {label ?? `${safeValue}%`}
    </span>
  );
}

