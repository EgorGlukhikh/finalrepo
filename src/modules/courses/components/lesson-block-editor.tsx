'use client';

import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

import { createBlock, createTextBlock, duplicateBlockById, insertBlockAt, moveBlock, removeBlockById, replaceBlockById, updateBlockById } from '../lesson-block-editor-utils';
import { getBlockOption, type LessonBlockType } from '../lesson-block-options';
import { normalizeLessonBlocks, type LessonBlock } from '../lesson-blocks';
import {
  CalloutBlockFields,
  ChecklistBlockFields,
  EmbedBlockFields,
  FileBlockFields,
  ImageBlockFields,
  resizeTextarea,
  TextBlockFields,
  VideoBlockFields,
} from './lesson-block-fields';
import { filterBlockOptions, LessonBlockPicker, type PickerState } from './lesson-block-picker';

type LessonBlockEditorProps = {
  defaultValue: unknown;
  name: string;
};

type FocusPosition = 'start' | 'end';
type FocusState = {
  blockId: string;
  position?: FocusPosition;
} | null;

export function LessonBlockEditor({ defaultValue, name }: LessonBlockEditorProps) {
  const [blocks, setBlocks] = useState<LessonBlock[]>(() => normalizeLessonBlocks(defaultValue));
  const [picker, setPicker] = useState<PickerState | null>(null);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const serialized = useMemo(() => JSON.stringify({ blocks }), [blocks]);
  const filteredOptions = useMemo(() => filterBlockOptions(picker?.query ?? ''), [picker?.query]);
  const fieldRefs = useRef(new Map<string, HTMLInputElement | HTMLTextAreaElement | null>());
  const pendingFocus = useRef<FocusState>(null);

  useEffect(() => {
    for (const element of fieldRefs.current.values()) {
      if (element instanceof HTMLTextAreaElement) {
        resizeTextarea(element);
      }
    }
  }, [blocks]);

  useEffect(() => {
    setActivePickerIndex(0);
  }, [picker?.index, picker?.mode, picker?.query]);

  useEffect(() => {
    if (!pendingFocus.current) {
      return;
    }

    const nextFocus = pendingFocus.current;
    pendingFocus.current = null;

    requestAnimationFrame(() => {
      const element = fieldRefs.current.get(nextFocus.blockId);

      if (!element) {
        return;
      }

      element.focus();

      if ('selectionStart' in element && 'selectionEnd' in element) {
        const position = nextFocus.position === 'start' ? 0 : element.value.length;
        element.setSelectionRange(position, position);
      }

      if (element instanceof HTMLTextAreaElement) {
        resizeTextarea(element);
      }
    });
  }, [blocks]);

  const registerFieldRef = (blockId: string, element: HTMLInputElement | HTMLTextAreaElement | null) => {
    fieldRefs.current.set(blockId, element);
  };

  const focusBlock = (blockId: string, position: FocusPosition = 'end') => {
    pendingFocus.current = { blockId, position };
  };

  const closePicker = () => {
    setPicker(null);
    setActivePickerIndex(0);
  };

  const openInsertPicker = (index: number) => {
    setPicker({
      index,
      mode: 'insert',
      query: '',
    });
  };

  const openReplacePicker = (blockId: string, index: number) => {
    setPicker({
      index,
      mode: 'replace',
      blockId,
      query: '',
    });
  };

  const selectBlockType = (type: LessonBlockType) => {
    if (!picker) {
      return;
    }

    const nextBlock = createBlock(type);

    setBlocks((current) => {
      if (picker.mode === 'replace' && picker.blockId) {
        return replaceBlockById(current, picker.blockId, nextBlock);
      }

      return insertBlockAt(current, picker.index, nextBlock);
    });

    focusBlock(nextBlock.id ?? '');
    closePicker();
  };

  const addFirstTextBlock = () => {
    const nextBlock = createTextBlock();
    setBlocks([nextBlock]);
    focusBlock(nextBlock.id ?? '');
  };

  const insertTextBlockAfter = (index: number) => {
    const nextBlock = createTextBlock();
    setBlocks((current) => insertBlockAt(current, index + 1, nextBlock));
    focusBlock(nextBlock.id ?? '');
  };

  const removeBlock = (blockId: string) => {
    const index = blocks.findIndex((block) => block.id === blockId);
    const previousBlock = index > 0 ? blocks[index - 1] : null;
    const nextBlock = index >= 0 && index < blocks.length - 1 ? blocks[index + 1] : null;

    setBlocks((current) => removeBlockById(current, blockId));

    if (previousBlock?.id) {
      focusBlock(previousBlock.id, 'end');
      return;
    }

    if (nextBlock?.id) {
      focusBlock(nextBlock.id, 'start');
    }
  };

  const duplicateBlock = (blockId: string) => {
    setBlocks((current) => {
      const result = duplicateBlockById(current, blockId);

      if (result.duplicatedBlockId) {
        focusBlock(result.duplicatedBlockId);
      }

      return result.blocks;
    });
  };

  const moveBlockByDirection = (blockId: string, direction: 'up' | 'down') => {
    setBlocks((current) => moveBlock(current, blockId, direction));
    focusBlock(blockId);
  };

  const updateBlock = (blockId: string, updater: (block: LessonBlock) => LessonBlock) => {
    setBlocks((current) => updateBlockById(current, blockId, updater));
  };

  const focusNeighbor = (currentIndex: number, direction: 'up' | 'down', position: FocusPosition) => {
    const neighborIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const neighbor = blocks[neighborIndex];

    if (neighbor?.id) {
      focusBlock(neighbor.id, position);
    }
  };

  const handlePickerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePicker();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActivePickerIndex((current) => Math.min(current + 1, Math.max(filteredOptions.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActivePickerIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      const option = filteredOptions[activePickerIndex];

      if (!option) {
        return;
      }

      event.preventDefault();
      selectBlockType(option.type);
    }
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={serialized} />

      {blocks.length === 0 ? (
        <button
          type="button"
          onClick={addFirstTextBlock}
          className="w-full rounded-lg border border-dashed border-border/80 px-4 py-5 text-left text-sm text-muted-foreground transition-colors duration-200 ease-[var(--ease-standard)] hover:border-border hover:bg-surface/50 hover:text-foreground"
        >
          Начните ввод или нажмите /
        </button>
      ) : (
        <div className="space-y-1">
          {blocks.map((block, index) => (
            <div key={block.id ?? `${block.type}-${index}`} className="space-y-1">
              <BlockRow
                block={block}
                index={index}
                registerFieldRef={registerFieldRef}
                setBlocks={setBlocks}
                updateBlock={updateBlock}
                openInsertPicker={openInsertPicker}
                openReplacePicker={openReplacePicker}
                insertTextBlockAfter={insertTextBlockAfter}
                removeBlock={removeBlock}
                duplicateBlock={duplicateBlock}
                moveBlockByDirection={moveBlockByDirection}
                focusNeighbor={focusNeighbor}
              />

              {picker &&
              ((picker.mode === 'insert' && picker.index === index + 1) ||
                (picker.mode === 'replace' && picker.blockId === block.id)) ? (
                <LessonBlockPicker
                  picker={picker}
                  activeIndex={activePickerIndex}
                  filteredOptions={filteredOptions}
                  onClose={closePicker}
                  onQueryChange={(query) => setPicker((current) => (current ? { ...current, query } : null))}
                  onKeyDown={handlePickerKeyDown}
                  onSelect={selectBlockType}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

      {blocks.length > 0 ? (
        <>
          {picker && picker.mode === 'insert' && picker.index === blocks.length ? (
            <LessonBlockPicker
              picker={picker}
              activeIndex={activePickerIndex}
              filteredOptions={filteredOptions}
              onClose={closePicker}
              onQueryChange={(query) => setPicker((current) => (current ? { ...current, query } : null))}
              onKeyDown={handlePickerKeyDown}
              onSelect={selectBlockType}
            />
          ) : null}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => openInsertPicker(blocks.length)}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 text-sm text-muted-foreground transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted hover:text-foreground"
              aria-label="Добавить блок"
            >
              +
            </button>
            <span className="text-sm text-muted-foreground">Продолжайте ввод или добавьте следующий блок</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function BlockRow({
  block,
  index,
  registerFieldRef,
  setBlocks,
  updateBlock,
  openInsertPicker,
  openReplacePicker,
  insertTextBlockAfter,
  removeBlock,
  duplicateBlock,
  moveBlockByDirection,
  focusNeighbor,
}: {
  block: LessonBlock;
  index: number;
  registerFieldRef: (blockId: string, element: HTMLInputElement | HTMLTextAreaElement | null) => void;
  setBlocks: Dispatch<SetStateAction<LessonBlock[]>>;
  updateBlock: (blockId: string, updater: (block: LessonBlock) => LessonBlock) => void;
  openInsertPicker: (index: number) => void;
  openReplacePicker: (blockId: string, index: number) => void;
  insertTextBlockAfter: (index: number) => void;
  removeBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => void;
  moveBlockByDirection: (blockId: string, direction: 'up' | 'down') => void;
  focusNeighbor: (currentIndex: number, direction: 'up' | 'down', position: FocusPosition) => void;
}) {
  const option = getBlockOption(block.type);
  const isTextBlock = block.type === 'text';

  return (
    <div
      className={cn(
        'group rounded-lg px-3 py-2 transition-[background-color,border-color] duration-200 ease-[var(--ease-standard)] hover:bg-surface/45 focus-within:bg-surface/55',
        !isTextBlock && 'border border-transparent hover:border-border/70 focus-within:border-border/70',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 flex flex-col items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => openInsertPicker(index + 1)}
            className="inline-flex size-7 items-center justify-center rounded-full border border-border/80 text-xs text-muted-foreground transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted hover:text-foreground"
            aria-label="Добавить блок ниже"
          >
            +
          </button>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">::</span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          {!isTextBlock ? (
            <div className="inline-flex rounded-full bg-surface-muted px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {option?.label ?? block.type}
            </div>
          ) : null}

          {block.type === 'text' ? (
            <TextBlockFields
              block={block}
              index={index}
              registerFieldRef={registerFieldRef}
              updateBlock={updateBlock}
              openReplacePicker={openReplacePicker}
              insertTextBlockAfter={insertTextBlockAfter}
              removeBlock={removeBlock}
              focusNeighbor={focusNeighbor}
            />
          ) : null}
          {block.type === 'video' ? <VideoBlockFields block={block} registerFieldRef={registerFieldRef} updateBlock={updateBlock} /> : null}
          {block.type === 'file' ? <FileBlockFields block={block} registerFieldRef={registerFieldRef} updateBlock={updateBlock} /> : null}
          {block.type === 'image' ? <ImageBlockFields block={block} registerFieldRef={registerFieldRef} updateBlock={updateBlock} /> : null}
          {block.type === 'embed' ? <EmbedBlockFields block={block} registerFieldRef={registerFieldRef} updateBlock={updateBlock} /> : null}
          {block.type === 'callout' ? <CalloutBlockFields block={block} registerFieldRef={registerFieldRef} updateBlock={updateBlock} /> : null}
          {block.type === 'checklist' ? <ChecklistBlockFields block={block} registerFieldRef={registerFieldRef} setBlocks={setBlocks} /> : null}
        </div>

        <div className="flex flex-col gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <InlineControl label="Вверх" onClick={() => moveBlockByDirection(block.id ?? '', 'up')}>
            ↑
          </InlineControl>
          <InlineControl label="Вниз" onClick={() => moveBlockByDirection(block.id ?? '', 'down')}>
            ↓
          </InlineControl>
          <InlineControl label="Дублировать" onClick={() => duplicateBlock(block.id ?? '')}>
            ⧉
          </InlineControl>
          <InlineControl label="Удалить" onClick={() => removeBlock(block.id ?? '')} tone="danger">
            ×
          </InlineControl>
        </div>
      </div>
    </div>
  );
}

function InlineControl({
  children,
  label,
  onClick,
  tone = 'default',
}: {
  children: string;
  label: string;
  onClick: () => void;
  tone?: 'default' | 'danger';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'inline-flex size-7 items-center justify-center rounded-md text-xs transition-colors duration-200 ease-[var(--ease-standard)]',
        tone === 'danger'
          ? 'text-muted-foreground hover:bg-danger/10 hover:text-danger'
          : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}
