import type { ReactNode } from 'react';

import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

type HeaderBarProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
};

export function HeaderBar({ eyebrow, title, description, actions, meta }: HeaderBarProps) {
  return (
    <Stack gap="4">
      <HStack justify="space-between" align="start" gap="4" flexWrap="wrap">
        <Stack gap="3" maxW="3xl">
          {eyebrow ? (
            <Text textStyle="overline" color="fg.subtle">
              {eyebrow}
            </Text>
          ) : null}
          <Heading textStyle="pageTitle" maxW="3xl">
            {title}
          </Heading>
          {description ? (
            <Text textStyle="body" color="fg.muted" maxW="3xl">
              {description}
            </Text>
          ) : null}
        </Stack>

        {actions ? <Box flexShrink="0">{actions}</Box> : null}
      </HStack>

      {meta ? <Box>{meta}</Box> : null}
    </Stack>
  );
}
