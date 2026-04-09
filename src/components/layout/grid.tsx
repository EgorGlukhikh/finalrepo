import type { ComponentProps } from 'react';

import { Grid as ChakraGrid } from '@chakra-ui/react';

type GridColumns = 2 | 3 | 4;
type GridGap = 'sm' | 'md' | 'lg' | 'xl';

const gapMap: Record<GridGap, string> = {
  sm: '3',
  md: '4',
  lg: '6',
  xl: '8',
};

const templateColumnsByCount: Record<GridColumns, { base: string; sm?: string; md?: string; xl?: string }> = {
  2: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
  3: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
  4: { base: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' },
};

type GridProps = Omit<ComponentProps<typeof ChakraGrid>, 'templateColumns' | 'gap'> & {
  cols?: GridColumns;
  gap?: GridGap;
};

export function Grid({ children, className, cols = 2, gap = 'md', ...props }: GridProps) {
  return (
    <ChakraGrid className={className} templateColumns={templateColumnsByCount[cols]} gap={gapMap[gap]} {...props}>
      {children}
    </ChakraGrid>
  );
}
