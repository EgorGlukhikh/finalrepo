import type { ReactNode } from 'react';

import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, actions }: SectionHeadingProps) {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      gap={{ base: 5, lg: 8 }}
      align={{ base: 'stretch', lg: 'end' }}
      justify="space-between"
    >
      <Stack gap="3" maxW="3xl">
        <Text textStyle="overline" color="fg.subtle">
          {eyebrow}
        </Text>
        <Heading textStyle="sectionTitle" maxW="2xl">
          {title}
        </Heading>
        {description ? (
          <Text textStyle="body" color="fg.muted" maxW="2xl">
            {description}
          </Text>
        ) : null}
      </Stack>
      {actions ? <HStack alignSelf={{ base: 'flex-start', lg: 'flex-end' }}>{actions}</HStack> : <Box />}
    </Stack>
  );
}
