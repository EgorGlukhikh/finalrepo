'use client';

import type { Dispatch, SetStateAction } from 'react';

import { Button, Input, Select, Textarea } from '@/components/ui';

import { updateBlockById } from '../lesson-block-editor-utils';
import type { LessonBlock } from '../lesson-blocks';

type RegisterFieldRef = (blockId: string, element: HTMLInputElement | HTMLTextAreaElement | null) => void;
type UpdateBlock = (blockId: string, updater: (block: LessonBlock) => LessonBlock) => void;

type FocusPosition = 'start' | 'end';

export function resizeTextarea(node: HTMLTextAreaElement | null) {
  if (!node) {
    return;
  }

  node.style.height = '0px';
  node.style.height = `${node.scrollHeight}px`;
}

export function TextBlockFields({
  block,
  index,
  registerFieldRef,
  updateBlock,
  openReplacePicker,
  insertTextBlockAfter,
  removeBlock,
  focusNeighbor,
}: {
  block: Extract<LessonBlock, { type: 'text' }>;
  index: number;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
  openReplacePicker: (blockId: string, index: number) => void;
  insertTextBlockAfter: (index: number) => void;
  removeBlock: (blockId: string) => void;
  focusNeighbor: (currentIndex: number, direction: 'up' | 'down', position: FocusPosition) => void;
}) {
  return (
    <Textarea
      ref={(node) => {
        registerFieldRef(block.id ?? '', node);
        resizeTextarea(node);
      }}
      rows={1}
      value={block.text}
      onInput={(event) => resizeTextarea(event.currentTarget)}
      onChange={(event) =>
        updateBlock(block.id ?? '', (currentBlock) =>
          currentBlock.type === 'text' ? { ...currentBlock, text: event.currentTarget.value } : currentBlock,
        )
      }
      onKeyDown={(event) => {
        const target = event.currentTarget;
        const atStart = target.selectionStart === 0 && target.selectionEnd === 0;
        const atEnd = target.selectionStart === target.value.length && target.selectionEnd === target.value.length;

        if (event.key === '/' && target.value.trim().length === 0) {
          event.preventDefault();
          openReplacePicker(block.id ?? '', index);
          return;
        }

        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          insertTextBlockAfter(index);
          return;
        }

        if (event.key === 'Backspace' && atStart && block.text.trim().length === 0) {
          event.preventDefault();
          removeBlock(block.id ?? '');
          return;
        }

        if (event.key === 'ArrowUp' && atStart) {
          focusNeighbor(index, 'up', 'end');
          return;
        }

        if (event.key === 'ArrowDown' && atEnd) {
          focusNeighbor(index, 'down', 'start');
        }
      }}
      placeholder="Начните ввод или нажмите /"
      className="min-h-[2.5rem] resize-none overflow-hidden border-transparent bg-transparent px-0 py-0 text-base leading-7 shadow-none placeholder:text-muted-foreground/85 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export function VideoBlockFields({
  block,
  registerFieldRef,
  updateBlock,
}: {
  block: Extract<LessonBlock, { type: 'video' }>;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input
        ref={(node) => registerFieldRef(block.id ?? '', node)}
        value={block.title ?? ''}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'video' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Название видео"
      />
      <Input
        value={block.url}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'video' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Ссылка на видео"
      />
      <div className="md:col-span-2">
        <Textarea
          rows={3}
          value={block.caption ?? ''}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'video' ? { ...currentBlock, caption: event.currentTarget.value } : currentBlock,
            )
          }
          placeholder="Короткая подпись"
        />
      </div>
    </div>
  );
}

export function FileBlockFields({
  block,
  registerFieldRef,
  updateBlock,
}: {
  block: Extract<LessonBlock, { type: 'file' }>;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input
        ref={(node) => registerFieldRef(block.id ?? '', node)}
        value={block.title}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'file' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Название файла"
      />
      <Input
        value={block.url}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'file' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Ссылка на файл"
      />
      <div className="md:col-span-2">
        <Textarea
          rows={3}
          value={block.description ?? ''}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'file' ? { ...currentBlock, description: event.currentTarget.value } : currentBlock,
            )
          }
          placeholder="Короткое описание"
        />
      </div>
    </div>
  );
}

export function ImageBlockFields({
  block,
  registerFieldRef,
  updateBlock,
}: {
  block: Extract<LessonBlock, { type: 'image' }>;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input
        ref={(node) => registerFieldRef(block.id ?? '', node)}
        value={block.url}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'image' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Ссылка на изображение"
      />
      <Input
        value={block.alt}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'image' ? { ...currentBlock, alt: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Alt-текст"
      />
      <div className="md:col-span-2">
        <Textarea
          rows={3}
          value={block.caption ?? ''}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'image' ? { ...currentBlock, caption: event.currentTarget.value } : currentBlock,
            )
          }
          placeholder="Короткая подпись"
        />
      </div>
    </div>
  );
}

export function EmbedBlockFields({
  block,
  registerFieldRef,
  updateBlock,
}: {
  block: Extract<LessonBlock, { type: 'embed' }>;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input
        ref={(node) => registerFieldRef(block.id ?? '', node)}
        value={block.title ?? ''}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'embed' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Название блока"
      />
      <Input
        value={block.url}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'embed' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Ссылка для встраивания"
      />
      <div className="md:col-span-2">
        <Textarea
          rows={3}
          value={block.description ?? ''}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'embed' ? { ...currentBlock, description: event.currentTarget.value } : currentBlock,
            )
          }
          placeholder="Что увидит пользователь"
        />
      </div>
    </div>
  );
}

export function CalloutBlockFields({
  block,
  registerFieldRef,
  updateBlock,
}: {
  block: Extract<LessonBlock, { type: 'callout' }>;
  registerFieldRef: RegisterFieldRef;
  updateBlock: UpdateBlock;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem]">
        <Input
          ref={(node) => registerFieldRef(block.id ?? '', node)}
          value={block.title ?? ''}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'callout' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock,
            )
          }
          placeholder="Заголовок callout"
        />
        <Select
          value={block.tone ?? 'info'}
          onChange={(event) =>
            updateBlock(block.id ?? '', (currentBlock) =>
              currentBlock.type === 'callout'
                ? {
                    ...currentBlock,
                    tone:
                      event.currentTarget.value === 'success' || event.currentTarget.value === 'warning'
                        ? event.currentTarget.value
                        : 'info',
                  }
                : currentBlock,
            )
          }
        >
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </Select>
      </div>
      <Textarea
        rows={4}
        value={block.text}
        onChange={(event) =>
          updateBlock(block.id ?? '', (currentBlock) =>
            currentBlock.type === 'callout' ? { ...currentBlock, text: event.currentTarget.value } : currentBlock,
          )
        }
        placeholder="Текст акцента"
      />
    </div>
  );
}

export function ChecklistBlockFields({
  block,
  registerFieldRef,
  setBlocks,
}: {
  block: Extract<LessonBlock, { type: 'checklist' }>;
  registerFieldRef: RegisterFieldRef;
  setBlocks: Dispatch<SetStateAction<LessonBlock[]>>;
}) {
  return (
    <div className="space-y-3">
      {block.items.map((item, itemIndex) => (
        <div key={item.id ?? `${block.id}-item-${itemIndex}`} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(item.checked)}
            onChange={(event) =>
              setBlocks((current) =>
                updateBlockById(current, block.id ?? '', (currentBlock) =>
                  currentBlock.type === 'checklist'
                    ? {
                        ...currentBlock,
                        items: currentBlock.items.map((currentItem) =>
                          currentItem.id === item.id ? { ...currentItem, checked: event.currentTarget.checked } : currentItem,
                        ),
                      }
                    : currentBlock,
                ),
              )
            }
            className="size-4 rounded border-border"
          />
          <Input
            ref={itemIndex === 0 ? (node) => registerFieldRef(block.id ?? '', node) : undefined}
            value={item.label}
            onChange={(event) =>
              setBlocks((current) =>
                updateBlockById(current, block.id ?? '', (currentBlock) =>
                  currentBlock.type === 'checklist'
                    ? {
                        ...currentBlock,
                        items: currentBlock.items.map((currentItem) =>
                          currentItem.id === item.id ? { ...currentItem, label: event.currentTarget.value } : currentItem,
                        ),
                      }
                    : currentBlock,
                ),
              )
            }
            placeholder="Пункт чеклиста"
          />
          <button
            type="button"
            onClick={() =>
              setBlocks((current) =>
                updateBlockById(current, block.id ?? '', (currentBlock) =>
                  currentBlock.type === 'checklist'
                    ? { ...currentBlock, items: currentBlock.items.filter((currentItem) => currentItem.id !== item.id) }
                    : currentBlock,
                ),
              )
            }
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted hover:text-foreground"
            aria-label="Удалить пункт"
          >
            ×
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          setBlocks((current) =>
            updateBlockById(current, block.id ?? '', (currentBlock) =>
              currentBlock.type === 'checklist'
                ? {
                    ...currentBlock,
                    items: [
                      ...currentBlock.items,
                      {
                        id:
                          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                            ? crypto.randomUUID()
                            : `item-${Math.random().toString(36).slice(2, 10)}`,
                        label: '',
                        checked: false,
                      },
                    ],
                  }
                : currentBlock,
            ),
          )
        }
      >
        + Пункт
      </Button>
    </div>
  );
}
