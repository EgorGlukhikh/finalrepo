import type { ReactNode } from 'react';

import { DataList, Stack, type StackProps } from '@chakra-ui/react';

import { Panel } from './panel';

type DataPanelItem = {
  label: string;
  value: ReactNode;
};

type DataPanelProps = StackProps & {
  title?: string;
  items: DataPanelItem[];
};

export function DataPanel({ title, items, ...props }: DataPanelProps) {
  return (
    <Panel tone="default">
      <Stack gap="5" {...props}>
        {title ? (
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>{title}</DataList.ItemLabel>
            </DataList.Item>
          </DataList.Root>
        ) : null}
        <DataList.Root orientation="horizontal" gap="3">
          {items.map((item) => (
            <DataList.Item key={item.label}>
              <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
              <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Stack>
    </Panel>
  );
}
