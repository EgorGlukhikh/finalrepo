import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';

import { AppHeader } from './app-header';
import { PublicFooter } from './public-footer';
import { PublicNav } from './public-nav';

type PublicShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PublicShell({ children, headerActions }: PublicShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <AppHeader brand={<BrandMark />} navigation={<PublicNav />} actions={headerActions} />
      <Box as="main">{children}</Box>
      <PublicFooter />
    </Box>
  );
}
