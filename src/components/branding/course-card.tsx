import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { ProgressPill } from './progress-pill';
import { IconChip } from './icon-chip';
import { BookOpenIcon } from './icons';

type CourseCardProps = {
  title: string;
  description?: string;
  meta?: string[];
  status?: string;
  progress?: number;
  footer?: ReactNode;
  className?: string;
  featured?: boolean;
};

export function CourseCard({
  title,
  description,
  meta = [],
  status,
  progress,
  footer,
  className,
  featured = false,
}: CourseCardProps) {
  return (
    <Card
      tone={featured ? 'highlight' : 'default'}
      className={cn(
        'group flex h-full flex-col gap-5 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-panel',
        featured && 'gap-6',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <IconChip icon={<BookOpenIcon size={16} />} tone={featured ? 'primary' : 'muted'} className="size-9" />
            {status ? <Badge tone="secondary">{status}</Badge> : null}
          </div>
          <h3 className={cn('font-semibold tracking-[-0.03em] text-foreground', featured ? 'text-xl' : 'text-base')}>{title}</h3>
        </div>
        {typeof progress === 'number' ? <ProgressPill value={progress} /> : null}
      </div>
      {description ? <p className="text-sm leading-7 text-muted-foreground">{description}</p> : null}
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {meta.map((item) => (
            <Badge key={item} tone="outline">
              {item}
            </Badge>
          ))}
        </div>
      ) : null}
      {footer ? <div className="mt-auto border-t border-border/70 pt-4">{footer}</div> : null}
    </Card>
  );
}

