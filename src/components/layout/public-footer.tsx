import Link from 'next/link';

import { Box, Container, HStack, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';

const footerLinks = [
  { href: '/#privacy', label: 'Privacy Policy' },
  { href: '/#terms', label: 'Terms of Service' },
  { href: '/#contact', label: 'Contact' },
  { href: '/#faq', label: 'FAQ' },
];

export function PublicFooter() {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor="rgba(59, 73, 76, 0.2)" bg="bg.canvas">
      <Container maxW="wide" px={{ base: '6', md: '12' }} py={{ base: 12, md: 16 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap="8"
        >
          <Text color="fg.default" fontFamily="heading" fontSize="lg" fontWeight="800" letterSpacing="-0.045em">
            Academy Realtors
          </Text>

          <HStack gap={{ base: '5', md: '8' }} flexWrap="wrap">
            {footerLinks.map((item) => (
              <ChakraLink
                key={item.label}
                asChild
                color="fg.subtle"
                _hover={{ color: 'accent.primary', textDecoration: 'none' }}
              >
                <Link href={item.href}>
                  <Text fontFamily="body" fontSize="xs" letterSpacing="0.16em" textTransform="uppercase">
                    {item.label}
                  </Text>
                </Link>
              </ChakraLink>
            ))}
          </HStack>

          <Text color="fg.subtle" fontFamily="body" fontSize="xs" letterSpacing="0.16em" textTransform="uppercase">
            © 2024 Academy Realtors. Architecture of Excellence.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
