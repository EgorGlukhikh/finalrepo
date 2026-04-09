import type { ComponentProps } from 'react';

import { Stack as ChakraStack } from '@chakra-ui/react';

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type StackAlign = 'start' | 'center' | 'end' | 'stretch';

const gapMap: Record<StackGap, string> = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  8: '8',
  xs: '2',
  sm: '3',
  md: '4',
  lg: '6',
  xl: '8',
};

const alignMap: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

type StackProps = Omit<ComponentProps<typeof ChakraStack>, 'gap' | 'align'> & {
  gap?: StackGap;
  align?: StackAlign;
};

export function Stack({ children, className, gap = 'md', align = 'stretch', ...props }: StackProps) {
  return (
    <ChakraStack className={className} gap={gapMap[gap]} align={alignMap[align]} {...props}>
      {children}
    </ChakraStack>
  );
}
