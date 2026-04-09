'use client';

import type { ReactNode } from 'react';

import { Tabs as ChakraTabs } from '@chakra-ui/react';

type TabsProps = {
  children: ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ children, defaultValue, value, onValueChange, className }: TabsProps) {
  return (
    <ChakraTabs.Root
      className={className}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(details) => onValueChange?.(details.value)}
      fitted
      lazyMount
      unmountOnExit
    >
      {children}
    </ChakraTabs.Root>
  );
}

type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  return (
    <ChakraTabs.List
      className={className}
      bg="bg.surfaceMuted"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="2xl"
      p="1"
      gap="1"
    >
      {children}
      <ChakraTabs.Indicator borderRadius="xl" bg="bg.elevated" boxShadow="sm" />
    </ChakraTabs.List>
  );
}

type TabsTriggerProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

export function TabsTrigger({ children, value, className }: TabsTriggerProps) {
  return (
    <ChakraTabs.Trigger
      value={value}
      className={className}
      borderRadius="xl"
      px="4"
      py="2.5"
      fontSize="sm"
      fontWeight="600"
      color="fg.muted"
      _selected={{ color: 'fg.default' }}
      _focusVisible={{ boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)' }}
    >
      {children}
    </ChakraTabs.Trigger>
  );
}

type TabsPanelProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

export function TabsPanel({ children, value, className }: TabsPanelProps) {
  return (
    <ChakraTabs.Content value={value} className={className} pt="4">
      {children}
    </ChakraTabs.Content>
  );
}

