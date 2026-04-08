import type { LessonBlock } from './lesson-blocks';

export type LessonBlockType = LessonBlock['type'];

export type BlockOption = {
  type: LessonBlockType;
  label: string;
  description: string;
  marker: string;
};

export const blockOptions: BlockOption[] = [
  { type: 'text', label: 'Текст', description: 'Абзац, короткое объяснение или заметка.', marker: 'TXT' },
  { type: 'video', label: 'Видео', description: 'Встраиваемая ссылка или прямой видеофайл.', marker: 'VID' },
  { type: 'file', label: 'Файл', description: 'Материал для скачивания или шаблон.', marker: 'FILE' },
  { type: 'image', label: 'Изображение', description: 'Скриншот, схема или иллюстрация.', marker: 'IMG' },
  { type: 'embed', label: 'Embed', description: 'Внешний фрейм или интерактивный блок.', marker: 'EMB' },
  { type: 'callout', label: 'Callout', description: 'Выделение важной мысли или предупреждения.', marker: 'NOTE' },
  { type: 'checklist', label: 'Checklist', description: 'Шаги или критерии выполнения.', marker: 'LIST' },
];

export function getBlockOption(type: LessonBlockType) {
  return blockOptions.find((option) => option.type === type) ?? null;
}
