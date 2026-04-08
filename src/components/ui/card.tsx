import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardTone = 'default' | 'muted' | 'highlight';

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const toneClasses: Record<CardTone, string> = {
  default: 'bg-surface',
  muted: 'bg-surface-elevated/90',
  highlight: 'bg-linear-to-br from-surface via-surface to-primary-soft/55',
};

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  tone?: CardTone;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, padding = 'md', tone = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-border/70 shadow-card ring-1 ring-white/55',
        toneClasses[tone],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

