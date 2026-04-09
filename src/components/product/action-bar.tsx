import type { ReactNode } from 'react';

import { HStack, type StackProps } from '@chakra-ui/react';

type ActionBarProps = StackProps & {
  children: ReactNode;
};

export function ActionBar({ children, ...props }: ActionBarProps) {
  return (
    <HStack gap="2" flexWrap="wrap" align="center" {...props}>
      {children}
    </HStack>
  );
}
