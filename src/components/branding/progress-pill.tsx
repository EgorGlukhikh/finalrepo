import type { ReactNode } from 'react';

import { HStack, Progress, Text } from '@chakra-ui/react';

type ProgressPillProps = {
  value: number;
  label?: ReactNode;
  className?: string;
};

export function ProgressPill({ value, label, className }: ProgressPillProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <HStack
      className={className}
      gap="2"
      borderRadius="full"
      bg="bg.inset"
      px="3"
      py="1.5"
      borderWidth="1px"
      borderColor="border.subtle"
      fontSize="xs"
      fontWeight="600"
      color="fg.default"
    >
      <Progress.Root value={safeValue} size="xs" width="14" colorPalette="blue" borderRadius="full" bg="bg.surfaceMuted">
        <Progress.Track borderRadius="full">
          <Progress.Range borderRadius="full" bg="accent.primary" />
        </Progress.Track>
      </Progress.Root>
      <Text as="span">{label ?? `${safeValue}%`}</Text>
    </HStack>
  );
}
