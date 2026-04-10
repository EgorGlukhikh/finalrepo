import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { PublicFooter } from './public-footer';
import { PublicHeader } from './public-header';
import { PublicNav } from './public-nav';

type PublicShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PublicShell({ children, headerActions }: PublicShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <PublicHeader navigation={<PublicNav />} actions={headerActions} />
      <Box as="main" pt="24">
        {children}
      </Box>
      <PublicFooter />
    </Box>
  );
}
