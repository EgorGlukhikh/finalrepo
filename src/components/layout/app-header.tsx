import type { ReactNode } from 'react';

import { Box, Container, Flex, HStack } from '@chakra-ui/react';

type AppHeaderProps = {
  brand: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
};

export function AppHeader({ brand, navigation, actions }: AppHeaderProps) {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="40"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      bg="color-mix(in srgb, var(--chakra-colors-bg-canvas) 90%, transparent)"
      backdropFilter="blur(14px)"
    >
      <Container maxW="wide" px={{ base: '4', md: '6', lg: '8' }} py="4">
        <Flex align="center" justify="space-between" gap="6">
          <HStack gap={{ base: '4', md: '8' }} align="center" minW="0">
            {brand}
            {navigation ? <Box display={{ base: 'none', md: 'block' }}>{navigation}</Box> : null}
          </HStack>
          {actions ? (
            <HStack gap="2" align="center" flexWrap="wrap" justify="flex-end">
              {actions}
            </HStack>
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
}
