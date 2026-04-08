import type { ReactNode } from 'react';

import { Stack } from './stack';
import { Card } from '@/components/ui';

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ eyebrow, title, description, children, footer }: AuthCardProps) {
  return (
    <Card padding="lg">
      <Stack gap="lg">
        <Stack gap="xs">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
          <h1 className="text-page-title font-semibold tracking-tight text-foreground">{title}</h1>
          {description ? <p className="max-w-prose text-sm text-muted-foreground">{description}</p> : null}
        </Stack>
        {children}
        {footer ? <div className="border-t border-border pt-4">{footer}</div> : null}
      </Stack>
    </Card>
  );
}
