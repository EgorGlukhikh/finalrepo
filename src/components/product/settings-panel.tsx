import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@chakra-ui/react';

import { Panel } from './panel';

type SettingsPanelProps = StackProps & {
  children: ReactNode;
};

export function SettingsPanel({ children, ...props }: SettingsPanelProps) {
  return (
    <Panel tone="muted">
      <Stack gap="5" {...props}>
        {children}
      </Stack>
    </Panel>
  );
}
