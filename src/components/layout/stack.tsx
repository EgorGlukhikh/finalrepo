import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type StackAlign = 'start' | 'center' | 'end' | 'stretch';

const gapClasses: Record<StackGap, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

type StackProps = {
  children: ReactNode;
  className?: string;
  gap?: StackGap;
  align?: StackAlign;
} & HTMLAttributes<HTMLDivElement>;

export function Stack({ children, className, gap = 'md', align = 'stretch', ...props }: StackProps) {
  return <div className={cn('flex flex-col', gapClasses[gap], alignClasses[align], className)} {...props}>{children}</div>;
}

