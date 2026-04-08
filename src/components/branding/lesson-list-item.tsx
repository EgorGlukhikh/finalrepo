import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Card } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/status-pill';

type LessonListItemProps = {
  title: string;
  meta?: string;
  status?: ReactNode;
  duration?: string;
  active?: boolean;
  completed?: boolean;
  className?: string;
};

export function LessonListItem({
  title,
  meta,
  status,
  duration,
  active = false,
  completed = false,
  className,
}: LessonListItemProps) {
  return (
    <Card
      padding="sm"
      className={cn(
        'flex items-center justify-between gap-4 transition-colors duration-200',
        active ? 'border-primary/35 bg-primary/5' : 'bg-surface',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          {completed ? <StatusPill tone="success">Done</StatusPill> : null}
          <h4 className="truncate text-sm font-medium text-foreground">{title}</h4>
        </div>
        {meta ? <p className="text-sm text-muted-foreground">{meta}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {status ? status : null}
        {duration ? <span className="text-xs text-muted-foreground">{duration}</span> : null}
      </div>
    </Card>
  );
}

