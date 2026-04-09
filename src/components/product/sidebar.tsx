import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@chakra-ui/react';

type SidebarProps = StackProps & {
  children: ReactNode;
};

export function Sidebar({ children, ...props }: SidebarProps) {
  return (
    <Stack gap="6" minW="0" {...props}>
      {children}
    </Stack>
  );
}
