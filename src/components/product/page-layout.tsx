import type { ReactNode } from 'react';

import { Container, Grid, Stack } from '@chakra-ui/react';

type PageLayoutProps = {
  children: ReactNode;
  spacing?: 'lg' | 'xl';
};

const gapMap = {
  lg: '10',
  xl: '12',
} as const;

export function PageLayout({ children, spacing = 'xl' }: PageLayoutProps) {
  return (
    <Container maxW="wide" px={{ base: '4', md: '6', lg: '8' }} py={{ base: '10', md: '12' }}>
      <Stack gap={gapMap[spacing]}>{children}</Stack>
    </Container>
  );
}

type SplitPageLayoutProps = {
  sidebar: ReactNode;
  content: ReactNode;
};

export function SplitPageLayout({ sidebar, content }: SplitPageLayoutProps) {
  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(20rem, 31%) minmax(0, 1fr)' }} gap={{ base: '6', xl: '10' }}>
      {sidebar}
      {content}
    </Grid>
  );
}
