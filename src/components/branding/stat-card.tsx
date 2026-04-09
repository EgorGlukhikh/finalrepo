import type { ReactNode } from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { Card } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: ReactNode;
  description?: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
  eyebrow?: string;
};

const toneColorMap = {
  default: 'fg.default',
  primary: 'fg.brand',
  success: 'status.success',
  warning: 'status.warning',
  danger: 'status.danger',
} as const;

export function StatCard({ label, value, description, tone = 'default', className, eyebrow }: StatCardProps) {
  return (
    <Card tone="muted" className={className}>
      <Stack gap="3">
        <Stack gap="1">
          {eyebrow ? (
            <Text textStyle="overline" color="fg.subtle">
              {eyebrow}
            </Text>
          ) : null}
          <Text fontSize="sm" color="fg.muted">
            {label}
          </Text>
        </Stack>
        <Text textStyle="pageTitle" fontSize="3xl" color={toneColorMap[tone]}>
          {value}
        </Text>
        {description ? (
          <Text textStyle="bodyMuted" color="fg.muted">
            {description}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}
