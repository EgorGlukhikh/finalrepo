import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@chakra-ui/react';

type ContentAreaProps = StackProps & {
  children: ReactNode;
};

export function ContentArea({ children, ...props }: ContentAreaProps) {
  return (
    <Stack gap="8" minW="0" {...props}>
      {children}
    </Stack>
  );
}
