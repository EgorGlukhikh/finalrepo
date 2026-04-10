import Link from 'next/link';

import { Box, Container, HStack, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';

export function PublicFooter() {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border.subtle" bg="bg.canvas">
      <Container maxW="wide" py={{ base: 8, md: 10 }}>
        <Stack gap={{ base: 6, md: 3 }} direction={{ base: 'column', md: 'row' }} justify="space-between">
          <Stack gap="2" maxW="lg">
            <Text textStyle="overline" color="fg.subtle">
              Академия риэлторов
            </Text>
            <Text textStyle="bodyMuted" color="fg.muted">
              Курсы для риэлторов, к которым удобно возвращаться и которыми действительно хочется пользоваться каждый день.
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
