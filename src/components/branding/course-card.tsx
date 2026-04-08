import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { ProgressPill } from './progress-pill';

type CourseCardProps = {
  title: string;
  description?: string;
  meta?: string[];
  status?: string;
  progress?: number;
  footer?: ReactNode;
  className?: string;
};

export function CourseCard({
  title,
  description,
  meta = [],
  status,
  progress,
  footer,
  className,
}: CourseCardProps) {
  return (
    <Card
      className={cn('flex h-full flex-col gap-4 transition-shadow duration-200 hover:shadow-panel', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          {status ? <Badge tone="secondary">{status}</Badge> : null}
          <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        {typeof progress === 'number' ? <ProgressPill value={progress} /> : null}
      </div>
      {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.map((item) => (
            <Badge key={item} tone="outline">
              {item}
            </Badge>
          ))}
        </div>
      ) : null}
      {footer ? <div className="mt-auto pt-1">{footer}</div> : null}
    </Card>
  );
}

