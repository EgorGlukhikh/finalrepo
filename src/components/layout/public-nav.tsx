import Link from 'next/link';

import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';

const navItems = [
  { href: '/courses', label: 'Курсы' },
  { href: '/app', label: 'Кабинет' },
];

export function PublicNav() {
  return (
    <HStack as="nav" gap="5" align="center">
      {navItems.map((item) => (
        <ChakraLink
          key={item.href}
          asChild
          color="fg.muted"
          _hover={{ color: 'fg.default', textDecoration: 'none' }}
        >
          <Link href={item.href}>
            <Text fontSize="sm" fontWeight="600" letterSpacing="-0.02em">
              {item.label}
            </Text>
          </Link>
        </ChakraLink>
      ))}
    </HStack>
  );
}
