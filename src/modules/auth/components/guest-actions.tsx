import { HStack } from '@chakra-ui/react';

import { ButtonLink } from '@/components/compositions';
import { buildCatalogPath } from '@/modules/courses/paths';

export function GuestActions() {
  return (
    <HStack gap="2">
      <ButtonLink href={buildCatalogPath()} variant="solid" colorPalette="brand" size="md">
        Выбрать курс
      </ButtonLink>
    </HStack>
  );
}
