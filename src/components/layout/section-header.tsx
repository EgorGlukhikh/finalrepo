import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Inline } from './inline';
import { Stack } from './stack';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, actions, className }: SectionHeaderProps) {
  return (
    <Inline className={cn('w-full', className)} justify="between" align="end" wrap>
      <Stack gap="xs" className="max-w-content">
        {eyebrow ? (
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-page-title font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="max-w-prose text-sm text-muted-foreground">{description}</p> : null}
      </Stack>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Inline>
  );
}
