'use client';

import { Badge, Box, Button, HStack, Text } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

import { ButtonLink } from '@/components/compositions';

export type SessionMenuView = {
  displayName: string;
  roleLabel: string;
  homeHref: string;
  homeLabel: string;
  showAdminLink: boolean;
};

type SessionMenuProps = {
  view: SessionMenuView;
};

export function SessionMenu({ view }: SessionMenuProps) {
  return (
    <HStack gap="2" align="center" flexWrap="wrap" justify="flex-end">
      <HStack
        display={{ base: 'none', sm: 'inline-flex' }}
        gap="3"
        borderRadius="full"
        borderWidth="1px"
        borderColor="border.subtle"
        bg="bg.surface"
        px="3"
        py="1.5"
        color="fg.muted"
      >
        <Box boxSize="2" borderRadius="full" bg="bg.brand" />
        <Text maxW="9rem" truncate fontSize="sm">
          {view.displayName}
        </Text>
        <Badge
          borderRadius="full"
          px="2"
          py="0.5"
          textStyle="overline"
          colorPalette={view.roleLabel === 'Админ' ? 'brand' : 'gray'}
          variant="subtle"
        >
          {view.roleLabel}
        </Badge>
      </HStack>

      <ButtonLink href={view.homeHref} variant="subtle" colorPalette="brand">
        {view.homeLabel}
      </ButtonLink>

      {view.showAdminLink ? (
        <ButtonLink href="/admin" variant="outline" borderColor="border.strong">
          Админка
        </ButtonLink>
      ) : null}

      <Button
        variant="ghost"
        color="fg.muted"
        _hover={{ bg: 'bg.inset', color: 'fg.default' }}
        onClick={() => {
          void signOut({ callbackUrl: '/' });
        }}
      >
        Выйти
      </Button>
    </HStack>
  );
}
