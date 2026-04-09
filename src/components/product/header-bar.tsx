import type { ReactNode } from 'react';

import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { HelpTooltip } from '@/components/ui';

type HeaderBarProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  help?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
};

export function HeaderBar({ eyebrow, title, description, help, actions, meta }: HeaderBarProps) {
  return (
    <Stack gap="4">
      <HStack justify="space-between" align="start" gap="4" flexWrap="wrap">
        <Stack gap="3" maxW="3xl">
          {eyebrow ? (
            <Text textStyle="overline" color="fg.subtle">
              {eyebrow}
            </Text>
          ) : null}
          <HStack align="center" gap="2" flexWrap="wrap">
            <Heading textStyle="pageTitle" maxW="3xl">
              {title}
            </Heading>
            {help ? <HelpTooltip content={help} label={`Пояснение к разделу ${title}`} /> : null}
          </HStack>
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
