import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@chakra-ui/react';

import { Panel } from './panel';

type ContentCanvasProps = StackProps & {
  children: ReactNode;
};

export function ContentCanvas({ children, ...props }: ContentCanvasProps) {
  return (
    <Panel tone="elevated" p={{ base: '6', md: '7' }}>
      <Stack gap="6" {...props}>
        {children}
      </Stack>
    </Panel>
  );
}
