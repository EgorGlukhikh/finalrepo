import type { ReactNode } from 'react';

import { HStack, Text } from '@chakra-ui/react';

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
      gap="1.5"
      borderRadius="full"
      bg="accent.secondary"
      px="2.5"
      py="1"
      fontSize="xs"
      fontWeight="600"
      color="fg.default"
    >
      <Text as="span" boxSize="1.5" borderRadius="full" bg="currentColor" opacity="0.72" />
      <Text as="span">{label ?? `${safeValue}%`}</Text>
    </HStack>
  );
}
