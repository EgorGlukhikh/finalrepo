import type { ReactNode } from 'react';

import { HStack, Stack, Text, type StackProps } from '@chakra-ui/react';

import { ActionBar } from './action-bar';
import { Panel } from './panel';

type EntityListItemProps = StackProps & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
};

export function EntityListItem({ eyebrow, title, description, meta, actions, ...props }: EntityListItemProps) {
  return (
    <Panel tone="default" p="5">
      <Stack gap="4" {...props}>
        <Stack gap="2">
          {eyebrow ? (
            <Text textStyle="overline" color="fg.subtle">
              {eyebrow}
            </Text>
          ) : null}
          <Text textStyle="h4" color="fg.default">
            {title}
          </Text>
          {description ? (
            <Text textStyle="bodyMuted" color="fg.muted">
              {description}
            </Text>
          ) : null}
        </Stack>
        {meta ? <HStack gap="3" flexWrap="wrap">{meta}</HStack> : null}
        {actions ? <ActionBar pt="1">{actions}</ActionBar> : null}
      </Stack>
    </Panel>
  );
}
