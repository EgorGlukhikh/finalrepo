import type { ReactNode } from 'react';

import { Box, Button as ChakraButton, Stack, Text } from '@chakra-ui/react';

import { Card } from './card';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <Card className={className} padding="lg">
      <Stack gap="4" align="center" textAlign="center" maxW="sm" mx="auto">
        {icon ? (
          <Box
            display="flex"
            boxSize="12"
            alignItems="center"
            justifyContent="center"
            borderRadius="xl"
            bg="bg.inset"
            color="fg.muted"
          >
            {icon}
          </Box>
        ) : null}
        <Stack gap="2" align="center">
          <Text fontSize="lg" fontWeight="700" letterSpacing="-0.02em" color="fg.default">
            {title}
          </Text>
          {description ? (
            <Text textStyle="bodyMuted" color="fg.muted">
              {description}
            </Text>
          ) : null}
        </Stack>
        {action ? (
          <ChakraButton variant="surface" onClick={action.onClick}>
            {action.label}
          </ChakraButton>
        ) : null}
      </Stack>
    </Card>
  );
}
