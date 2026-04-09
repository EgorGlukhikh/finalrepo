import type { ReactNode } from 'react';

import { Box, Container, Stack } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <Box as="main" display="flex" minH="dvh" alignItems="center" py={{ base: '10', md: '16' }}>
        <Container maxW="content" px={{ base: '4', md: '6' }}>
          <Stack gap="8">
            <Box display="flex" justifyContent="center">
              <BrandMark />
            </Box>
            {children}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
