import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type GridColumns = 2 | 3 | 4;
type GridGap = 'sm' | 'md' | 'lg' | 'xl';

const gapClasses: Record<GridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const columnClasses: Record<GridColumns, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
};

type GridProps = {
  children: ReactNode;
  className?: string;
  cols?: GridColumns;
  gap?: GridGap;
} & HTMLAttributes<HTMLDivElement>;

export function Grid({ children, className, cols = 2, gap = 'md', ...props }: GridProps) {
  return <div className={cn('grid', columnClasses[cols], gapClasses[gap], className)} {...props}>{children}</div>;
}

