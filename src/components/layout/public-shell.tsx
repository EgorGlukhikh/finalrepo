import type { ReactNode } from 'react';

import { Box, Container, Flex, HStack } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';

import { PublicFooter } from './public-footer';
import { PublicNav } from './public-nav';

type PublicShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PublicShell({ children, headerActions }: PublicShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="40"
        borderBottomWidth="1px"
        borderColor="border.subtle"
        bg="color-mix(in srgb, var(--chakra-colors-bg-canvas) 84%, transparent)"
        backdropFilter="blur(18px)"
      >
        <Container maxW="80rem" py="4">
          <Flex
            layerStyle="shell"
            borderRadius="3xl"
            px={{ base: 4, md: 5 }}
            py="3"
            align="center"
            justify="space-between"
            gap="4"
          >
            <HStack gap={{ base: 4, md: 6 }} align="center">
              <BrandMark />
              <Box display={{ base: 'none', md: 'block' }}>
                <PublicNav />
              </Box>
            </HStack>
            <HStack gap="2" align="center">
              {headerActions}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Box as="main">{children}</Box>
      <PublicFooter />
    </Box>
  );
}
