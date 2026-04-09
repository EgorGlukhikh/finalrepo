import type { ReactNode } from 'react';

import { EmptyState as ChakraEmptyState } from '@chakra-ui/react';

import { Button } from './button';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <ChakraEmptyState.Root
      className={className}
      bg="bg.elevated"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="3xl"
      boxShadow="sm"
      px={{ base: '6', md: '8' }}
      py={{ base: '7', md: '8' }}
    >
      <ChakraEmptyState.Content maxW="sm">
        {icon ? (
          <ChakraEmptyState.Indicator
            boxSize="12"
            borderRadius="xl"
            bg="bg.inset"
            color="fg.muted"
          >
            {icon}
          </ChakraEmptyState.Indicator>
        ) : null}
        <ChakraEmptyState.Title textStyle="sectionTitle" color="fg.default">
          {title}
        </ChakraEmptyState.Title>
        {description ? (
          <ChakraEmptyState.Description textStyle="bodyMuted" color="fg.muted">
            {description}
          </ChakraEmptyState.Description>
        ) : null}
        {action ? (
          <Button variant="secondary" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  );
}
