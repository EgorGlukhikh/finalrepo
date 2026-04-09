import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@chakra-ui/react';

import { Panel } from './panel';

type BuilderSidebarProps = StackProps & {
  children: ReactNode;
};

export function BuilderSidebar({ children, ...props }: BuilderSidebarProps) {
  return (
    <Panel tone="elevated" p={{ base: '5', md: '6' }}>
      <Stack gap="6" {...props}>
        {children}
      </Stack>
    </Panel>
  );
}
