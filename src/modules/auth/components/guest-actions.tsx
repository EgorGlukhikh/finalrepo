import { HStack } from '@chakra-ui/react';

import { ButtonLink } from '@/components/compositions';

export function GuestActions() {
  return (
    <HStack gap="2">
      <ButtonLink href="/courses" variant="solid" colorPalette="brand">
        Выбрать курс
      </ButtonLink>
      <ButtonLink href="/sign-in" variant="ghost" color="fg.muted" _hover={{ bg: 'bg.inset', color: 'fg.default' }}>
        Войти
      </ButtonLink>
    </HStack>
  );
}
