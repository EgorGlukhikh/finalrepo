import type { ReactNode } from 'react';

import { HStack, Text } from '@chakra-ui/react';

type InfoRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <HStack justify="space-between" align="start" gap="4" py="3" className={className}>
      <Text textStyle="bodyMuted" color="fg.muted">
        {label}
      </Text>
      <Text textStyle="bodyStrong" color="fg.default" textAlign="right">
        {value}
      </Text>
    </HStack>
  );
}
