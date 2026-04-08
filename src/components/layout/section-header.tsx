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
    <Inline className={cn('w-full gap-6', className)} justify="between" align="end" wrap>
      <Stack gap="sm" className="max-w-content">
        {eyebrow ? (
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-page-title font-semibold tracking-[-0.04em] text-foreground">{title}</h2>
        {description ? <p className="max-w-prose text-sm leading-7 text-muted-foreground">{description}</p> : null}
      </Stack>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Inline>
  );
}
