import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ContainerSize = 'content' | 'page' | 'wide';

const sizeClasses: Record<ContainerSize, string> = {
  content: 'max-w-content',
  page: 'max-w-page',
  wide: 'max-w-wide',
};

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  size = 'page',
  ...props
}: ContainerProps<T>) {
  const Comp = (as ?? 'div') as ElementType;

  return (
    <Comp className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)} {...props}>
      {children}
    </Comp>
  );
}
