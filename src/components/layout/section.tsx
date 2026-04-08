import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Container } from './container';

type SectionTone = 'default' | 'muted';
type SectionPadding = 'sm' | 'md' | 'lg';

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-transparent',
  muted: 'bg-surface-muted/45',
};

const paddingClasses: Record<SectionPadding, string> = {
  sm: 'py-10 sm:py-12',
  md: 'py-14 sm:py-18',
  lg: 'py-18 sm:py-24',
};

type SectionProps<T extends ElementType = 'section'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  padding?: SectionPadding;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function Section<T extends ElementType = 'section'>({
  as,
  children,
  className,
  tone = 'default',
  padding = 'md',
  ...props
}: SectionProps<T>) {
  const Comp = (as ?? 'section') as ElementType;

  return (
    <Comp className={cn(toneClasses[tone], paddingClasses[padding], className)} {...props}>
      <Container>{children}</Container>
    </Comp>
  );
}

