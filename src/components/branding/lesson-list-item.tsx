import Link from 'next/link';
import type { ReactNode } from 'react';

import { Box, HStack, Stack, Text } from '@chakra-ui/react';

import { Card } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/status-pill';

type LessonListItemProps = {
  title: string;
  meta?: string;
  status?: ReactNode;
  duration?: string;
  active?: boolean;
  completed?: boolean;
  href?: string;
  disabled?: boolean;
  className?: string;
};

export function LessonListItem({
  title,
  meta,
  status,
  duration,
  active = false,
  completed = false,
  href,
  disabled = false,
  className,
}: LessonListItemProps) {
  const card = (
    <Card
      padding="sm"
      className={className}
      borderColor={active ? 'accent.primary' : undefined}
      bg={active ? 'bg.inset' : undefined}
      opacity={disabled ? 0.7 : 1}
      transition="background-color 0.2s ease, border-color 0.2s ease"
      _hover={disabled ? undefined : { bg: active ? 'bg.inset' : 'bg.surfaceMuted' }}
    >
      <HStack align="start" justify="space-between" gap="4">
        <Stack minW="0" gap="1">
          <HStack gap="2" align="center">
            {completed ? <StatusPill tone="success">Done</StatusPill> : null}
            <Text textStyle="bodyStrong" color="fg.default" truncate>
              {title}
            </Text>
          </HStack>
          {meta ? (
            <Text textStyle="bodyMuted" color="fg.muted">
              {meta}
            </Text>
          ) : null}
        </Stack>
        <HStack flexShrink="0" align="center" gap="2">
          {status ? status : null}
          {duration ? (
            <Text textStyle="caption" color="fg.muted">
              {duration}
            </Text>
          ) : null}
        </HStack>
      </HStack>
    </Card>
  );

  if (!href || disabled) {
    return card;
  }

  return (
    <Box
      asChild
      display="block"
      borderRadius="xl"
      _focusVisible={{ boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)' }}
    >
      <Link href={href}>{card}</Link>
    </Box>
  );
}
