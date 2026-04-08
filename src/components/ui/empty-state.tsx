import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Button } from './button';
import { Card } from './card';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <Card className={cn('text-center', className)} padding="lg">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
        {icon ? (
          <div className="flex size-12 items-center justify-center rounded-xl bg-surface-muted text-muted-foreground">
            {icon}
          </div>
        ) : null}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {action ? (
          <Button variant="secondary" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

