import type { ReactNode } from 'react';

import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';

type PublicHeaderProps = {
  navigation?: ReactNode;
  actions?: ReactNode;
};

export function PublicHeader({ navigation, actions }: PublicHeaderProps) {
  return (
    <Box as="header" position="fixed" top="0" insetX="0" zIndex="50" bg="bg.canvas">
      <Container maxW="wide" px={{ base: '6', md: '12' }} py={{ base: '5', md: '6' }}>
        <Flex align="center" justify="space-between" gap="8">
          <Text color="fg.default" fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800" letterSpacing="-0.045em">
            Academy Realtors
          </Text>

          {navigation ? <Box display={{ base: 'none', md: 'block' }}>{navigation}</Box> : <Box flex="1" />}

          {actions ? <HStack gap="4" justify="flex-end">{actions}</HStack> : <Box boxSize="10" />}
        </Flex>
      </Container>
    </Box>
  );
}
