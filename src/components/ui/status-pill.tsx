import type { ReactNode } from 'react';

import { HStack, Text } from '@chakra-ui/react';

type StatusTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const toneMap: Record<StatusTone, { bg: string; color: string }> = {
  neutral: { bg: 'bg.inset', color: 'fg.default' },
  primary: { bg: 'accent.secondary', color: 'fg.default' },
  success: { bg: 'status.successBg', color: 'status.success' },
  warning: { bg: 'status.warningBg', color: 'status.warning' },
  danger: { bg: 'status.dangerBg', color: 'status.danger' },
};

type StatusPillProps = {
  children: ReactNode;
  className?: string;
  tone?: StatusTone;
};

export function StatusPill({ children, className, tone = 'neutral', ...props }: StatusPillProps & Record<string, unknown>) {
  return (
    <HStack
      className={className}
      gap="1.5"
      borderRadius="full"
      px="2.5"
      py="1"
      fontSize="xs"
      fontWeight="600"
      lineHeight="1"
      {...toneMap[tone]}
      {...props}
    >
      <Text as="span" boxSize="1.5" borderRadius="full" bg="currentColor" opacity="0.72" />
      <Text as="span">{children}</Text>
    </HStack>
  );
}
