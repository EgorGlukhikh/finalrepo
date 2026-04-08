import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { normalizeLessonBlocks } from '../mappers';
import type { LessonBlock } from '../types';

type LessonContentProps = {
  content: unknown;
  summary?: string | null;
};

function getMediaUrl(url: string) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function renderBlock(block: LessonBlock) {
  switch (block.type) {
    case 'text':
      return (
        <p className={block.tone === 'muted' ? 'text-sm leading-7 text-muted-foreground' : 'text-sm leading-7 text-foreground'}>
          {block.text}
        </p>
      );
    case 'video': {
      const mediaUrl = getMediaUrl(block.url);
      const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(block.url);

      return (
        <Card padding="sm" className="space-y-3">
          {block.title ? <div className="text-sm font-medium text-foreground">{block.title}</div> : null}
          <div className="overflow-hidden rounded-lg border border-border bg-black/5">
            {isDirectVideo && mediaUrl ? (
              <video controls className="aspect-video w-full bg-black" src={block.url} />
            ) : mediaUrl ? (
              <iframe
                className="aspect-video w-full"
                src={block.url}
                title={block.title ?? 'Видео'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video items-center justify-center text-sm text-muted-foreground">
                Видео будет доступно по ссылке
              </div>
            )}
          </div>
          {block.caption ? <p className="text-xs text-muted-foreground">{block.caption}</p> : null}
        </Card>
      );
    }
    case 'file':
      return (
        <Card padding="sm" className="space-y-2">
          <div className="text-sm font-medium text-foreground">{block.title}</div>
          {block.description ? <p className="text-sm text-muted-foreground">{block.description}</p> : null}
          <a className="text-sm font-medium text-primary hover:underline" href={block.url} target="_blank" rel="noreferrer">
            Скачать файл
          </a>
        </Card>
      );
    case 'image':
      return (
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={block.alt} className="h-auto w-full object-cover" src={block.url} />
          </div>
          {block.caption ? <figcaption className="text-xs text-muted-foreground">{block.caption}</figcaption> : null}
        </figure>
      );
    case 'embed':
      return (
        <Card padding="sm" className="space-y-2">
          {block.title ? <div className="text-sm font-medium text-foreground">{block.title}</div> : null}
          {block.description ? <p className="text-sm text-muted-foreground">{block.description}</p> : null}
          <iframe className="aspect-video w-full rounded-lg border border-border" src={block.url} title={block.title ?? 'Встраиваемый блок'} />
        </Card>
      );
    case 'callout':
      return (
        <Card
          padding="sm"
          className={
            block.tone === 'success'
              ? 'border-success/20 bg-success/5'
              : block.tone === 'warning'
                ? 'border-warning/25 bg-warning/10'
                : 'border-primary/15 bg-primary/5'
          }
        >
          <div className="space-y-2">
            {block.title ? <div className="text-sm font-medium text-foreground">{block.title}</div> : null}
            <p className="text-sm leading-7 text-foreground/90">{block.text}</p>
          </div>
        </Card>
      );
    case 'checklist':
      return (
        <Card padding="sm" className="space-y-3">
          <div className="text-sm font-medium text-foreground">Чеклист</div>
          <ul className="space-y-2">
            {block.items.map((item) => (
              <li key={item.id ?? item.label} className="flex items-start gap-3 text-sm text-foreground">
                <span
                  className={
                    item.checked
                      ? 'mt-1 inline-flex size-4 items-center justify-center rounded-full bg-success/15 text-success'
                      : 'mt-1 inline-flex size-4 items-center justify-center rounded-full border border-border text-muted-foreground'
                  }
                >
                  <span className="size-1.5 rounded-full bg-current/70" />
                </span>
                <span className={item.checked ? 'text-foreground/70 line-through' : undefined}>{item.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      );
    default:
      return null;
  }
}

export function LessonContent({ content, summary }: LessonContentProps) {
  const blocks = normalizeLessonBlocks(content);

  if (blocks.length === 0) {
    return (
      <Card padding="lg" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Содержимое урока</h3>
          {summary ? <p className="max-w-prose text-sm leading-7 text-muted-foreground">{summary}</p> : null}
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">Пока у этого урока нет добавленных блоков.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {summary ? (
        <Card padding="sm">
          <Badge tone="secondary">Кратко</Badge>
          <p className="mt-3 max-w-prose text-sm leading-7 text-muted-foreground">{summary}</p>
        </Card>
      ) : null}
      <div className="space-y-4">{blocks.map((block, index) => <div key={index}>{renderBlock(block)}</div>)}</div>
    </div>
  );
}
