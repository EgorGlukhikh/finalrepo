import type { ComponentProps } from 'react';

import { Flex } from '@chakra-ui/react';

type InlineGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '1' | '1.5' | '2' | '3' | '4' | '5' | '6' | '8';
type InlineAlign = 'start' | 'center' | 'end' | 'stretch';
type InlineJustify = 'start' | 'center' | 'end' | 'between';

const gapMap: Record<InlineGap, string> = {
  1: '1',
  '1.5': '1.5',
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

const alignMap: Record<InlineAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap: Record<InlineJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

type InlineProps = Omit<ComponentProps<typeof Flex>, 'gap' | 'align' | 'justify' | 'wrap'> & {
  gap?: InlineGap;
  align?: InlineAlign;
  justify?: InlineJustify;
  wrap?: boolean;
};

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
    <Flex
      className={className}
      gap={gapMap[gap]}
      align={alignMap[align]}
      justify={justifyMap[justify]}
      wrap={wrap ? 'wrap' : 'nowrap'}
      {...props}
    >
      {children}
    </Flex>
  );
}
