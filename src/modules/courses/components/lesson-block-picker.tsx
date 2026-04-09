'use client';

import type { KeyboardEvent } from 'react';

import { Box, Button as ChakraButton, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { Input } from '@/components/ui';

import { type BlockOption, blockOptions, type LessonBlockType } from '../lesson-block-options';

export type PickerState = {
  index: number;
  mode: 'insert' | 'replace';
  blockId?: string;
  query: string;
};

type LessonBlockPickerProps = {
  picker: PickerState;
  activeIndex: number;
  filteredOptions: BlockOption[];
  onClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onQueryChange: (query: string) => void;
  onSelect: (type: LessonBlockType) => void;
};

export function LessonBlockPicker({
  picker,
  activeIndex,
  filteredOptions,
  onClose,
  onKeyDown,
  onQueryChange,
  onSelect,
}: LessonBlockPickerProps) {
  return (
    <Box borderWidth="1px" borderColor="border.subtle" bg="bg.elevated" borderRadius="2xl" p="3" boxShadow="sm">
      <HStack align="center" gap="2">
        <Input
          autoFocus
          value={picker.query}
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          onKeyDown={onKeyDown}
          placeholder="Введите / или начните поиск блока"
        />
        <ChakraButton type="button" variant="ghost" onClick={onClose}>
          Закрыть
        </ChakraButton>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="2" mt="3">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <ChakraButton
              key={option.type}
              type="button"
              onClick={() => onSelect(option.type)}
              variant="ghost"
              justifyContent="start"
              h="auto"
              px="3"
              py="3"
              bg={index === activeIndex ? 'bg.surfaceMuted' : 'transparent'}
            >
              <HStack align="start" gap="3" w="full">
                <Box
                  minW="12"
                  borderRadius="full"
                  bg="bg.surfaceMuted"
                  px="2"
                  py="1"
                  textStyle="overline"
                  color="fg.subtle"
                  textAlign="center"
                >
                  {option.marker}
                </Box>
                <Stack gap="1" align="start" textAlign="left">
                  <Text textStyle="bodyStrong" color="fg.default">
                    {option.label}
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    {option.description}
                  </Text>
                </Stack>
              </HStack>
            </ChakraButton>
          ))
        ) : (
          <Box borderRadius="xl" bg="bg.surfaceMuted" px="3" py="4">
            <Text textStyle="bodyMuted" color="fg.muted">
              Ничего не найдено. Попробуйте другой запрос.
            </Text>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
}

export function filterBlockOptions(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return blockOptions;
  }

  return blockOptions.filter((option) =>
    [option.label, option.description, option.type].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}
