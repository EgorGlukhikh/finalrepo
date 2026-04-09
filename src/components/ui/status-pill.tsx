import type { ReactNode } from 'react';

import { Badge } from './badge';

type StatusTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

type StatusPillProps = {
  children: ReactNode;
  className?: string;
  tone?: StatusTone;
};

export function StatusPill({ children, className, tone = 'neutral', ...props }: StatusPillProps & Record<string, unknown>) {
  return (
    <Badge
      className={className}
      tone={tone === 'neutral' ? 'default' : tone === 'primary' ? 'secondary' : tone}
      {...props}
    >
      {children}
    </Badge>
  );
}
