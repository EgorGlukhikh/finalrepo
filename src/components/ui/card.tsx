import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, padding = 'md', ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-xl border border-border bg-surface shadow-card', paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

