import type { ReactNode } from 'react';

import { Stack, Stat, Text } from '@chakra-ui/react';

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
      <Stat.Root>
        <Stack gap="3">
          <Stack gap="1">
            {eyebrow ? (
              <Text textStyle="overline" color="fg.subtle">
                {eyebrow}
              </Text>
            ) : null}
            <Stat.Label textStyle="label" color="fg.muted">
              {label}
            </Stat.Label>
          </Stack>
          <Stat.ValueText textStyle="pageTitle" fontSize="3xl" color={toneColorMap[tone]}>
            {value}
          </Stat.ValueText>
          {description ? (
            <Stat.HelpText textStyle="bodyMuted" color="fg.muted">
              {description}
            </Stat.HelpText>
          ) : null}
        </Stack>
      </Stat.Root>
    </Card>
  );
}
