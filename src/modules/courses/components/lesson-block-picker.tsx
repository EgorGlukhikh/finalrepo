'use client';

import type { KeyboardEvent } from 'react';

import { Input } from '@/components/ui';
import { cn } from '@/lib/cn';

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
    <div className="rounded-xl border border-border/80 bg-surface p-3 shadow-card">
      <div className="flex items-center gap-2">
        <Input
          autoFocus
          value={picker.query}
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          onKeyDown={onKeyDown}
          placeholder="Введите / или начните поиск блока"
          className="w-full"
        />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted hover:text-foreground"
          aria-label="Закрыть выбор блока"
        >
          ×
        </button>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelect(option.type)}
              className={cn(
                'flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted',
                index === activeIndex && 'bg-surface-muted',
              )}
            >
              <span className="inline-flex min-w-12 justify-center rounded-full bg-surface-muted px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {option.marker}
              </span>
              <span className="space-y-1">
                <span className="block text-sm font-medium text-foreground">{option.label}</span>
                <span className="block text-sm text-muted-foreground">{option.description}</span>
              </span>
            </button>
          ))
        ) : (
          <div className="rounded-lg bg-surface-muted/60 px-3 py-4 text-sm text-muted-foreground">
            Ничего не найдено. Попробуйте другой запрос.
          </div>
        )}
      </div>
    </div>
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
