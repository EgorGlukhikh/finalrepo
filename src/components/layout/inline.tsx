import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type InlineGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InlineAlign = 'start' | 'center' | 'end' | 'stretch';
type InlineJustify = 'start' | 'center' | 'end' | 'between';

const gapClasses: Record<InlineGap, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignClasses: Record<InlineAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<InlineJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

type InlineProps = {
  children: ReactNode;
  className?: string;
  gap?: InlineGap;
  align?: InlineAlign;
  justify?: InlineJustify;
  wrap?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Inline({
  children,
  className,
  gap = 'md',
  align = 'center',
  justify = 'start',
  wrap = false,
  ...props
}: InlineProps) {
  return (
    <div
      className={cn(
        'flex',
        wrap && 'flex-wrap',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

