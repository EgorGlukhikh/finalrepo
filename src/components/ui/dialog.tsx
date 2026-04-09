'use client';

import type { ReactNode } from 'react';

import { CloseButton, Dialog as ChakraDialog, Portal, Stack, Text } from '@chakra-ui/react';

import { Button } from './button';

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
}: DialogProps) {
  return (
    <ChakraDialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      lazyMount
      unmountOnExit
      placement={{ base: 'bottom', md: 'center' }}
    >
      <Portal>
        <ChakraDialog.Backdrop bg="rgba(24, 33, 47, 0.32)" backdropFilter="blur(4px)" />
        <ChakraDialog.Positioner px={{ base: '4', md: '6' }}>
          <ChakraDialog.Content bg="bg.elevated" borderRadius="3xl" borderWidth="1px" borderColor="border.subtle" boxShadow="lg">
            <ChakraDialog.Header pb="0">
              <Stack gap="2" flex="1">
                <ChakraDialog.Title textStyle="sectionTitle">{title}</ChakraDialog.Title>
                {description ? (
                  <ChakraDialog.Description>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      {description}
                    </Text>
                  </ChakraDialog.Description>
                ) : null}
              </Stack>
              <ChakraDialog.CloseTrigger asChild>
                <CloseButton size="md" />
              </ChakraDialog.CloseTrigger>
            </ChakraDialog.Header>
            <ChakraDialog.Body pt="5">{children}</ChakraDialog.Body>
            <ChakraDialog.Footer gap="3">
              {actions ?? (
                <Button variant="secondary" onClick={() => onOpenChange(false)}>
                  Закрыть
                </Button>
              )}
            </ChakraDialog.Footer>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
}

