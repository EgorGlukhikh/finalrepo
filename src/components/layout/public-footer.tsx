import Link from 'next/link';

import { Box, Container, HStack, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';

export function PublicFooter() {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="80rem" py={{ base: 8, md: 10 }}>
        <Stack gap={{ base: 6, md: 3 }} direction={{ base: 'column', md: 'row' }} justify="space-between">
          <Stack gap="2" maxW="lg">
            <Text textStyle="overline" color="fg.subtle">
              Академия риэлторов
            </Text>
            <Text textStyle="bodyMuted" color="fg.muted">
              Курсы для риэлторов с каталогом, личным кабинетом и сохраненным прогрессом.
            </Text>
          </Stack>
          <HStack gap="5" align="start" color="fg.muted">
            <ChakraLink asChild _hover={{ color: 'fg.default', textDecoration: 'none' }}>
              <Link href="/courses">Каталог</Link>
            </ChakraLink>
            <ChakraLink asChild _hover={{ color: 'fg.default', textDecoration: 'none' }}>
              <Link href="/sign-in">Войти</Link>
            </ChakraLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
