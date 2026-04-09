'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import {
  CloseButton,
  HStack,
  Portal,
  Popover,
  Text,
  chakra,
} from '@chakra-ui/react';

type HelpTooltipProps = {
  content: ReactNode;
  label?: string;
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'left';
};

export function HelpTooltip({
  content,
  label = 'Пояснение',
  placement = 'top',
}: HelpTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ placement, offset: { mainAxis: 10, crossAxis: 0 } }}
      closeOnEscape
      closeOnInteractOutside
      lazyMount
      unmountOnExit
    >
      <Popover.Trigger asChild>
        <chakra.button
          type="button"
          aria-label={label}
          title={label}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen((current) => !current)}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="1.25rem"
          h="1.25rem"
          minW="1.25rem"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="full"
          bg="bg.surfaceMuted"
          color="fg.muted"
          fontSize="xs"
          fontWeight="700"
          lineHeight="1"
          cursor="pointer"
          _hover={{
            bg: 'bg.surface',
            borderColor: 'border.strong',
            color: 'fg.default',
          }}
          _focusVisible={{
            outline: 'none',
            boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
          }}
          _active={{
            bg: 'bg.inset',
          }}
        >
          ?
        </chakra.button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            maxW="20rem"
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="xl"
            bg="bg.elevated"
            boxShadow="md"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Popover.Arrow>
              <Popover.ArrowTip bg="bg.elevated" />
            </Popover.Arrow>
            <Popover.Body p="3">
              <HStack align="start" justify="space-between" gap="3">
                <Text textStyle="bodyMuted" color="fg.muted" flex="1">
                  {content}
                </Text>
                <Popover.CloseTrigger asChild>
                  <CloseButton size="sm" mt="-1" mr="-1" />
                </Popover.CloseTrigger>
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
