import type { LessonBlock } from './lesson-blocks';
import type { LessonBlockType } from './lesson-block-options';

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `block-${Math.random().toString(36).slice(2, 10)}`;
}

function cloneBlock<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

export function createBlock(type: LessonBlockType): LessonBlock {
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

export function createTextBlock() {
  return createBlock('text');
}

export function insertBlockAt(blocks: LessonBlock[], index: number, block: LessonBlock) {
  return [...blocks.slice(0, index), block, ...blocks.slice(index)];
}

export function replaceBlockById(blocks: LessonBlock[], blockId: string, block: LessonBlock) {
  return blocks.map((current) => (current.id === blockId ? block : current));
}

export function updateBlockById(blocks: LessonBlock[], blockId: string, updater: (block: LessonBlock) => LessonBlock) {
  return blocks.map((block) => (block.id === blockId ? updater(block) : block));
}

export function removeBlockById(blocks: LessonBlock[], blockId: string) {
  return blocks.filter((block) => block.id !== blockId);
}

export function duplicateBlockById(blocks: LessonBlock[], blockId: string) {
  const index = blocks.findIndex((block) => block.id === blockId);

  if (index === -1) {
    return {
      blocks,
      duplicatedBlockId: null,
    };
  }

  const duplicatedBlock = cloneBlock(blocks[index]);
  duplicatedBlock.id = createId();

  if (duplicatedBlock.type === 'checklist') {
    duplicatedBlock.items = duplicatedBlock.items.map((item) => ({
      ...item,
      id: createId(),
    }));
  }

  return {
    blocks: insertBlockAt(blocks, index + 1, duplicatedBlock),
    duplicatedBlockId: duplicatedBlock.id ?? null,
  };
}

export function moveBlock(blocks: LessonBlock[], blockId: string, direction: 'up' | 'down') {
  const index = blocks.findIndex((block) => block.id === blockId);

  if (index === -1) {
    return blocks;
  }

  const targetIndex = direction === 'up' ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= blocks.length) {
    return blocks;
  }

  const nextBlocks = [...blocks];
  const [movedBlock] = nextBlocks.splice(index, 1);
  nextBlocks.splice(targetIndex, 0, movedBlock);
  return nextBlocks;
}

export function isBlockEmpty(block: LessonBlock) {
  switch (block.type) {
    case 'text':
      return block.text.trim().length === 0;
    case 'video':
      return !block.url.trim() && !(block.title ?? '').trim() && !(block.caption ?? '').trim();
    case 'file':
      return !block.url.trim() && !block.title.trim() && !(block.description ?? '').trim();
    case 'image':
      return !block.url.trim() && !block.alt.trim() && !(block.caption ?? '').trim();
    case 'embed':
      return !block.url.trim() && !(block.title ?? '').trim() && !(block.description ?? '').trim();
    case 'callout':
      return !(block.title ?? '').trim() && !block.text.trim();
    case 'checklist':
      return block.items.every((item) => item.label.trim().length === 0);
  }
}
