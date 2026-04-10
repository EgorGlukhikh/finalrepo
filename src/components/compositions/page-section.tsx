import type { ReactNode } from 'react';

import { Box, Container } from '@chakra-ui/react';

type PageSectionProps = {
  children: ReactNode;
  tone?: 'default' | 'muted';
};

export function PageSection({ children, tone = 'default' }: PageSectionProps) {
  return (
    <Box
      as="section"
      py={{ base: 20, md: 28 }}
      bg={tone === 'muted' ? 'bg.subtle' : 'transparent'}
    >
      <Container maxW="wide">{children}</Container>
    </Box>
  );
}
