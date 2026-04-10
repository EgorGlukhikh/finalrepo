import Link from 'next/link';

import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';

const navItems = [
  { href: '/courses', label: 'Курсы' },
  { href: '/app', label: 'Кабинет' },
];

export function PublicNav() {
  return (
    <HStack as="nav" gap="4" align="center">
      {navItems.map((item) => (
        <ChakraLink
          key={item.href}
          asChild
          color="fg.muted"
          _hover={{ color: 'fg.default', textDecoration: 'none' }}
        >
          <Link href={item.href}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase">
              {item.label}
            </Text>
          </Link>
        </ChakraLink>
      ))}
    </HStack>
  );
}
