'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';

import { Button, Input, Select, Textarea } from '@/components/ui';

import { normalizeLessonBlocks, type LessonBlock } from '../lesson-blocks';

type LessonBlockEditorProps = {
  defaultValue: unknown;
  name: string;
};

type LessonBlockType = LessonBlock['type'];

type BlockOption = {
  type: LessonBlockType;
  label: string;
  description: string;
  marker: string;
};

const blockOptions: BlockOption[] = [
  { type: 'text', label: 'Текст', description: 'Абзац, краткое объяснение или заметка.', marker: 'TXT' },
  { type: 'video', label: 'Видео', description: 'Встраиваемая ссылка или прямой видеофайл.', marker: 'VID' },
  { type: 'file', label: 'Файл', description: 'Материал для скачивания или шаблон.', marker: 'FILE' },
  { type: 'image', label: 'Изображение', description: 'Скриншот, схема или иллюстрация.', marker: 'IMG' },
  { type: 'embed', label: 'Embed', description: 'Внешний фрейм или интерактивный блок.', marker: 'EMB' },
  { type: 'callout', label: 'Callout', description: 'Подсветка важной мысли или предупреждения.', marker: 'NOTE' },
  { type: 'checklist', label: 'Checklist', description: 'Набор шагов или критериев выполнения.', marker: 'LIST' },
];

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `block-${Math.random().toString(36).slice(2, 10)}`;
}

function createBlock(type: LessonBlockType): LessonBlock {
  const id = createId();

  switch (type) {
    case 'text':
      return { id, type, text: '' };
    case 'video':
      return { id, type, url: '', title: '', caption: '' };
    case 'file':
      return { id, type, url: '', title: 'Файл', description: '' };
    case 'image':
      return { id, type, url: '', alt: 'Изображение', caption: '' };
    case 'embed':
      return { id, type, url: '', title: '', description: '' };
    case 'callout':
      return { id, type, title: '', text: '', tone: 'info' };
    case 'checklist':
      return { id, type, items: [{ id: createId(), label: '', checked: false }] };
  }
}

function updateBlockAt(blocks: LessonBlock[], blockId: string, updater: (block: LessonBlock) => LessonBlock) {
  return blocks.map((block) => (block.id === blockId ? updater(block) : block));
}

export function LessonBlockEditor({ defaultValue, name }: LessonBlockEditorProps) {
  const [blocks, setBlocks] = useState<LessonBlock[]>(() => normalizeLessonBlocks(defaultValue));
  const [pickerOpen, setPickerOpen] = useState(blocks.length === 0);
  const [commandValue, setCommandValue] = useState('');
  const serialized = useMemo(() => JSON.stringify({ blocks }), [blocks]);

  const closePicker = () => {
    setPickerOpen(false);
    setCommandValue('');
  };

  const appendBlock = (type: LessonBlockType) => {
    setBlocks((current) => [...current, createBlock(type)]);
    closePicker();
  };

  return (
    <div className="space-y-5">
      <input type="hidden" name={name} value={serialized} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Контент урока</p>
          <p className="text-sm text-muted-foreground">Добавляйте блоки по кнопке “+” или командой “/”.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
            + Блок
          </Button>
          <Input
            value={commandValue}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              setCommandValue(nextValue);

              if (nextValue.startsWith('/')) {
                setPickerOpen(true);
              }
            }}
            placeholder="Введите / для выбора блока"
            className="w-56"
          />
        </div>
      </div>

      {pickerOpen ? (
        <div className="grid gap-2 rounded-xl border border-border bg-surface p-3 md:grid-cols-2">
          {blockOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick={() => appendBlock(option.type)}
              className="flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted"
            >
              <span className="inline-flex min-w-12 justify-center rounded-full bg-surface-muted px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {option.marker}
              </span>
              <span className="space-y-1">
                <span className="block text-sm font-medium text-foreground">{option.label}</span>
                <span className="block text-sm text-muted-foreground">{option.description}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
          Выберите тип блока, чтобы начать собирать содержимое урока.
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <BlockFields key={block.id ?? `${block.type}-${index}`} block={block} setBlocks={setBlocks} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlockFields({
  block,
  setBlocks,
}: {
  block: LessonBlock;
  setBlocks: Dispatch<SetStateAction<LessonBlock[]>>;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border/70 bg-surface/55 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-full bg-surface-muted px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {blockOptions.find((option) => option.type === block.type)?.label ?? block.type}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setBlocks((current) => current.filter((currentBlock) => currentBlock.id !== block.id))}
        >
          Удалить
        </Button>
      </div>

      {block.type === 'text' ? <TextBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'video' ? <VideoBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'file' ? <FileBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'image' ? <ImageBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'embed' ? <EmbedBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'callout' ? <CalloutBlockFields block={block} setBlocks={setBlocks} /> : null}
      {block.type === 'checklist' ? <ChecklistBlockFields block={block} setBlocks={setBlocks} /> : null}
    </div>
  );
}

function TextBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'text' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="space-y-2">
      <Textarea
        rows={6}
        value={block.text}
        onChange={(event) =>
          setBlocks((current) =>
            updateBlockAt(current, block.id ?? '', (currentBlock) =>
              currentBlock.type === 'text' ? { ...currentBlock, text: event.currentTarget.value } : currentBlock,
            ),
          )
        }
        placeholder="Текст урока"
      />
      <Select
        value={block.tone ?? 'default'}
        onChange={(event) =>
          setBlocks((current) =>
            updateBlockAt(current, block.id ?? '', (currentBlock) =>
              currentBlock.type === 'text'
                ? { ...currentBlock, tone: event.currentTarget.value === 'muted' ? 'muted' : 'default' }
                : currentBlock,
            ),
          )
        }
      >
        <option value="default">Обычный текст</option>
        <option value="muted">Поддерживающий текст</option>
      </Select>
    </div>
  );
}

function VideoBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'video' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input value={block.title ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'video' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock))} placeholder="Название видео" />
      <Input value={block.url} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'video' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock))} placeholder="Ссылка на видео" />
      <div className="md:col-span-2">
        <Textarea rows={3} value={block.caption ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'video' ? { ...currentBlock, caption: event.currentTarget.value } : currentBlock))} placeholder="Подпись или пояснение" />
      </div>
    </div>
  );
}

function FileBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'file' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input value={block.title} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'file' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock))} placeholder="Название файла" />
      <Input value={block.url} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'file' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock))} placeholder="Ссылка на файл" />
      <div className="md:col-span-2">
        <Textarea rows={3} value={block.description ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'file' ? { ...currentBlock, description: event.currentTarget.value } : currentBlock))} placeholder="Короткое описание" />
      </div>
    </div>
  );
}

function ImageBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'image' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input value={block.url} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'image' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock))} placeholder="Ссылка на изображение" />
      <Input value={block.alt} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'image' ? { ...currentBlock, alt: event.currentTarget.value } : currentBlock))} placeholder="Alt-текст" />
      <div className="md:col-span-2">
        <Textarea rows={3} value={block.caption ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'image' ? { ...currentBlock, caption: event.currentTarget.value } : currentBlock))} placeholder="Подпись" />
      </div>
    </div>
  );
}

function EmbedBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'embed' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input value={block.title ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'embed' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock))} placeholder="Название блока" />
      <Input value={block.url} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'embed' ? { ...currentBlock, url: event.currentTarget.value } : currentBlock))} placeholder="Ссылка для встраивания" />
      <div className="md:col-span-2">
        <Textarea rows={3} value={block.description ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'embed' ? { ...currentBlock, description: event.currentTarget.value } : currentBlock))} placeholder="Что увидит пользователь" />
      </div>
    </div>
  );
}

function CalloutBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'callout' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem]">
        <Input value={block.title ?? ''} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'callout' ? { ...currentBlock, title: event.currentTarget.value } : currentBlock))} placeholder="Заголовок callout" />
        <Select value={block.tone ?? 'info'} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'callout' ? { ...currentBlock, tone: event.currentTarget.value === 'success' || event.currentTarget.value === 'warning' ? event.currentTarget.value : 'info' } : currentBlock))}>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </Select>
      </div>
      <Textarea rows={4} value={block.text} onChange={(event) => setBlocks((current) => updateBlockAt(current, block.id ?? '', (currentBlock) => currentBlock.type === 'callout' ? { ...currentBlock, text: event.currentTarget.value } : currentBlock))} placeholder="Текст акцента" />
    </div>
  );
}

function ChecklistBlockFields({ block, setBlocks }: { block: Extract<LessonBlock, { type: 'checklist' }>; setBlocks: Dispatch<SetStateAction<LessonBlock[]>> }) {
  return (
    <div className="space-y-3">
      {block.items.map((item, itemIndex) => (
        <div key={item.id ?? `${block.id}-item-${itemIndex}`} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(item.checked)}
            onChange={(event) =>
              setBlocks((current) =>
                updateBlockAt(current, block.id ?? '', (currentBlock) =>
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
            value={item.label}
            onChange={(event) =>
              setBlocks((current) =>
                updateBlockAt(current, block.id ?? '', (currentBlock) =>
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
            placeholder="Шаг чеклиста"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setBlocks((current) =>
                updateBlockAt(current, block.id ?? '', (currentBlock) =>
                  currentBlock.type === 'checklist'
                    ? { ...currentBlock, items: currentBlock.items.filter((currentItem) => currentItem.id !== item.id) }
                    : currentBlock,
                ),
              )
            }
          >
            Удалить
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          setBlocks((current) =>
            updateBlockAt(current, block.id ?? '', (currentBlock) =>
              currentBlock.type === 'checklist'
                ? { ...currentBlock, items: [...currentBlock.items, { id: createId(), label: '', checked: false }] }
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
