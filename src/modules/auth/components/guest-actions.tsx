import { HStack } from '@chakra-ui/react';

import { ButtonLink } from '@/components/compositions';

export function GuestActions() {
  return (
    <HStack gap="2">
      <ButtonLink href="/sign-in" variant="ghost" color="fg.muted" _hover={{ bg: 'bg.inset', color: 'fg.default' }}>
        Войти
      </ButtonLink>
      <ButtonLink href="/sign-up" colorPalette="brand" variant="solid">
        Создать аккаунт
      </ButtonLink>
    </HStack>
  );
}
