import Link from 'next/link';

import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';

const navItems = [
  { href: '/courses', label: 'COURSES' },
  { href: '/#programs', label: 'PROGRAMS' },
  { href: '/#about', label: 'ABOUT' },
  { href: '/#support', label: 'SUPPORT' },
];

export function PublicNav() {
  return (
    <HStack as="nav" gap="10" align="center">
      {navItems.map((item) => (
        <ChakraLink
          key={item.label}
          asChild
          color="fg.subtle"
          _hover={{ color: 'fg.default', textDecoration: 'none' }}
        >
          <Link href={item.href}>
            <Text fontFamily="label" fontSize="xs" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase">
              {item.label}
            </Text>
          </Link>
        </ChakraLink>
      ))}
    </HStack>
  );
}
