import type { ElementType, ReactNode } from 'react';

import { Container as ChakraContainer } from '@chakra-ui/react';

type ContainerSize = 'content' | 'page' | 'wide';

const maxWBySize: Record<ContainerSize, string> = {
  content: '54rem',
  page: '72rem',
  wide: '80rem',
};

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  size = 'page',
  ...props
}: ContainerProps<T>) {
  return (
    <ChakraContainer
      as={(as ?? 'div') as ElementType}
      className={className}
      maxW={maxWBySize[size]}
      px={{ base: 4, md: 6, lg: 8 }}
      w="full"
      {...props}
    >
      {children}
    </ChakraContainer>
  );
}
