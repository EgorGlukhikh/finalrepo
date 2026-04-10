import Link from 'next/link';

import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';

const navItems = [
  { href: '/courses', label: 'Курсы' },
  { href: '/courses', label: 'Программы' },
  { href: '/app', label: 'Кабинет' },
  { href: '/support', label: 'Поддержка' },
];

export function PublicNav() {
  return (
    <HStack as="nav" gap="5" align="center">
      {navItems.map((item) => (
        <ChakraLink
          key={item.label}
          asChild
          color="fg.muted"
          _hover={{ color: 'fg.default', textDecoration: 'none' }}
        >
          <Link href={item.href}>
            <Text fontFamily="label" fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase">
              {item.label}
            </Text>
          </Link>
        </ChakraLink>
      ))}
    </HStack>
  );
}
