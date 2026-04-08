export type LessonBlock =
  | {
      id?: string;
      type: 'text';
      text: string;
      tone?: 'default' | 'muted';
    }
  | {
      id?: string;
      type: 'video';
      url: string;
      title?: string;
      caption?: string;
    }
  | {
      id?: string;
      type: 'file';
      url: string;
      title: string;
      description?: string;
    }
  | {
      id?: string;
      type: 'image';
      url: string;
      alt: string;
      caption?: string;
    }
  | {
      id?: string;
      type: 'embed';
      url: string;
      title?: string;
      description?: string;
    }
  | {
      id?: string;
      type: 'callout';
      text: string;
      title?: string;
      tone?: 'info' | 'success' | 'warning';
    }
  | {
      id?: string;
      type: 'checklist';
      items: Array<{
        id?: string;
        label: string;
        checked?: boolean;
      }>;
    };

export function normalizeLessonBlocks(content: unknown): LessonBlock[] {
  if (!content) {
    return [];
  }

  if (typeof content === 'string') {
    return [
      {
        type: 'text',
        text: content,
      },
    ];
  }

  if (Array.isArray(content)) {
    return content.flatMap((item) => normalizeLessonBlocks(item));
  }

  if (typeof content !== 'object') {
    return [];
  }

  const record = content as Record<string, unknown>;
  const blocks = Array.isArray(record.blocks) ? record.blocks : null;

  if (blocks) {
    return blocks.flatMap((item) => normalizeLessonBlocks(item));
  }

  const type = typeof record.type === 'string' ? record.type : null;

  switch (type) {
    case 'text': {
      const text = typeof record.text === 'string' ? record.text : typeof record.value === 'string' ? record.value : '';

      return text
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'text',
              text,
              tone: record.tone === 'muted' ? 'muted' : 'default',
            },
          ]
        : [];
    }
    case 'video': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'video',
              url,
              title: typeof record.title === 'string' ? record.title : undefined,
              caption: typeof record.caption === 'string' ? record.caption : undefined,
            },
          ]
        : [];
    }
    case 'file': {
      const url = typeof record.url === 'string' ? record.url : '';
      const title = typeof record.title === 'string' ? record.title : 'Файл';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'file',
              url,
              title,
              description: typeof record.description === 'string' ? record.description : undefined,
            },
          ]
        : [];
    }
    case 'image': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'image',
              url,
              alt: typeof record.alt === 'string' ? record.alt : typeof record.title === 'string' ? record.title : 'Изображение',
              caption: typeof record.caption === 'string' ? record.caption : undefined,
            },
          ]
        : [];
    }
    case 'embed': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'embed',
              url,
              title: typeof record.title === 'string' ? record.title : undefined,
              description: typeof record.description === 'string' ? record.description : undefined,
            },
          ]
        : [];
    }
    case 'callout': {
      const text = typeof record.text === 'string' ? record.text : '';

      return text
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'callout',
              text,
              title: typeof record.title === 'string' ? record.title : undefined,
              tone:
                record.tone === 'success' || record.tone === 'warning' || record.tone === 'info'
                  ? record.tone
                  : 'info',
            },
          ]
        : [];
    }
    case 'checklist': {
      const items = Array.isArray(record.items) ? record.items : [];

      return [
        {
          id: typeof record.id === 'string' ? record.id : undefined,
          type: 'checklist',
          items: items
            .map((item) => {
              if (!item || typeof item !== 'object') {
                return null;
              }

              const itemRecord = item as Record<string, unknown>;
              const label = typeof itemRecord.label === 'string' ? itemRecord.label : typeof itemRecord.text === 'string' ? itemRecord.text : '';

              if (!label) {
                return null;
              }

              return {
                id: typeof itemRecord.id === 'string' ? itemRecord.id : undefined,
                label,
                checked: Boolean(itemRecord.checked),
              };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null),
        },
      ];
    }
    default: {
      const text = typeof record.text === 'string' ? record.text : '';

      return text
        ? [
            {
              type: 'text',
              text,
            },
          ]
        : [];
    }
  }
}
