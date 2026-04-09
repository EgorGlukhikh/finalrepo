'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { Box, Button, HStack, Text } from '@chakra-ui/react';

type NavLinkProps = {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  exact?: boolean;
  className?: string;
} & LinkProps;

export function NavLink({
  children,
  icon,
  active = false,
  disabled = false,
  exact = false,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const href = typeof props.href === 'string' ? props.href : '';
  const pathnameMatches =
    href &&
    (exact
      ? pathname === href
      : pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) || (href === '/' && pathname === '/'));
  const isActive = active || pathnameMatches;

  const content = (
    <HStack gap="3" justify="flex-start">
      {icon ? <Box color={isActive ? 'fg.brand' : 'fg.subtle'}>{icon}</Box> : null}
      <Text>{children}</Text>
    </HStack>
  );

  if (disabled) {
    return (
      <Button
        className={className}
        variant="ghost"
        size="md"
        justifyContent="flex-start"
        width="full"
        disabled
        pointerEvents="none"
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={className}
      variant={isActive ? 'surface' : 'ghost'}
      size="md"
      justifyContent="flex-start"
      width="full"
      color={isActive ? 'fg.default' : 'fg.muted'}
    >
      <Link {...props}>{content}</Link>
    </Button>
  );
}
