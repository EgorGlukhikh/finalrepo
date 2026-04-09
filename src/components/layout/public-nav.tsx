import Link from 'next/link';
import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { BookIcon } from '@/components/branding';

const navItems: Array<{ href: string; label: string; icon?: ReactNode }> = [
  { href: '/courses', label: 'Курсы', icon: <BookIcon size={16} /> },
  { href: '/app', label: 'Кабинет' },
];

export function PublicNav() {
  return (
    <HStack as="nav" gap="1" align="center">
      {navItems.map((item) => (
        <ChakraLink
          key={item.href}
          asChild
          color="fg.muted"
          _hover={{ color: 'fg.default', textDecoration: 'none', bg: 'bg.inset' }}
          px="3"
          py="2"
          borderRadius="full"
        >
          <Link href={item.href}>
            <HStack gap="2">
              {item.icon ?? null}
              <Text fontSize="sm" fontWeight="600" letterSpacing="-0.01em">
                {item.label}
              </Text>
            </HStack>
          </Link>
        </ChakraLink>
      ))}
    </HStack>
  );
}
