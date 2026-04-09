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
      py={{ base: 12, md: 16 }}
      bg={tone === 'muted' ? 'bg.subtle' : 'transparent'}
      borderTopWidth={tone === 'muted' ? '1px' : undefined}
      borderBottomWidth={tone === 'muted' ? '1px' : undefined}
      borderColor={tone === 'muted' ? 'border.subtle' : undefined}
    >
      <Container maxW="80rem">{children}</Container>
    </Box>
  );
}
