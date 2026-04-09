import type { ReactNode } from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

import { Inline } from './inline';
import { Stack } from './stack';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, actions, className }: SectionHeaderProps) {
  return (
    <Inline className={className} gap="lg" justify="between" align="end" wrap>
      <Stack gap="sm" maxW="54rem">
        {eyebrow ? (
          <Text textStyle="overline" color="fg.subtle">
            {eyebrow}
          </Text>
        ) : null}
        <Heading textStyle="pageTitle" maxW="3xl">
          {title}
        </Heading>
        {description ? (
          <Text textStyle="bodyMuted" color="fg.muted" maxW="42rem">
            {description}
          </Text>
        ) : null}
      </Stack>
      {actions ? <Box flexShrink="0">{actions}</Box> : null}
    </Inline>
  );
}
