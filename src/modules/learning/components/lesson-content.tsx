import { AspectRatio, Box, List, Stack, Text, chakra } from '@chakra-ui/react';

import { Panel } from '@/components/product';
import { Badge } from '@/components/ui/badge';
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
        <Text textStyle="body" lineHeight="7" color={block.tone === 'muted' ? 'fg.muted' : 'fg.default'}>
          {block.text}
        </Text>
      );
    case 'video': {
      const mediaUrl = getMediaUrl(block.url);
      const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(block.url);

      return (
        <Panel tone="default" p="5">
          <Stack gap="3">
            {block.title ? (
              <Text textStyle="bodyStrong" color="fg.default">
                {block.title}
              </Text>
            ) : null}
            <Box overflow="hidden" borderRadius="xl" borderWidth="1px" borderColor="border.subtle" bg="blackAlpha.100">
              <AspectRatio ratio={16 / 9}>
                {isDirectVideo && mediaUrl ? (
                  <video controls src={block.url} />
                ) : mediaUrl ? (
                  <iframe
                    src={block.url}
                    title={block.title ?? 'Видео'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" color="fg.muted">
                    Видео будет доступно по ссылке
                  </Box>
                )}
              </AspectRatio>
            </Box>
            {block.caption ? (
              <Text textStyle="caption" color="fg.muted">
                {block.caption}
              </Text>
            ) : null}
          </Stack>
        </Panel>
      );
    }
    case 'file':
      return (
        <Panel tone="default" p="5">
          <Stack gap="2">
            <Text textStyle="bodyStrong" color="fg.default">
              {block.title}
            </Text>
            {block.description ? (
              <Text textStyle="bodyMuted" color="fg.muted">
                {block.description}
              </Text>
            ) : null}
            <chakra.a href={block.url} target="_blank" rel="noreferrer">
              <Text textStyle="bodyStrong" color="fg.brand">
                Скачать файл
              </Text>
            </chakra.a>
          </Stack>
        </Panel>
      );
    case 'image':
      return (
        <Stack as="figure" gap="2">
          <Box overflow="hidden" borderRadius="xl" borderWidth="1px" borderColor="border.subtle" bg="bg.surface">
            <chakra.img alt={block.alt} src={block.url} display="block" width="100%" height="auto" />
          </Box>
          {block.caption ? (
            <Text as="figcaption" textStyle="caption" color="fg.muted">
              {block.caption}
            </Text>
          ) : null}
        </Stack>
      );
    case 'embed':
      return (
        <Panel tone="default" p="5">
          <Stack gap="2">
            {block.title ? (
              <Text textStyle="bodyStrong" color="fg.default">
                {block.title}
              </Text>
            ) : null}
            {block.description ? (
              <Text textStyle="bodyMuted" color="fg.muted">
                {block.description}
              </Text>
            ) : null}
            <AspectRatio ratio={16 / 9}>
              <chakra.iframe
                src={block.url}
                title={block.title ?? 'Встраиваемый блок'}
                border="0"
                display="block"
                width="100%"
                height="100%"
              />
            </AspectRatio>
          </Stack>
        </Panel>
      );
    case 'callout':
      return (
        <Panel
          p="5"
          borderColor={block.tone === 'success' ? 'status.success' : block.tone === 'warning' ? 'status.warning' : 'accent.primary'}
          bg={block.tone === 'success' ? 'status.successBg' : block.tone === 'warning' ? 'status.warningBg' : 'bg.inset'}
        >
          <Stack gap="2">
            {block.title ? (
              <Text textStyle="bodyStrong" color="fg.default">
                {block.title}
              </Text>
            ) : null}
            <Text textStyle="body" lineHeight="7" color="fg.default">
              {block.text}
            </Text>
          </Stack>
        </Panel>
      );
    case 'checklist':
      return (
        <Panel tone="default" p="5">
          <Stack gap="3">
            <Text textStyle="bodyStrong" color="fg.default">
              Чеклист
            </Text>
            <List.Root gap="2">
              {block.items.map((item) => (
                <List.Item key={item.id ?? item.label} display="flex" alignItems="start" gap="3" listStyleType="none">
                  <Box
                    mt="1"
                    display="inline-flex"
                    boxSize="4"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderWidth={item.checked ? '0' : '1px'}
                    borderColor="border.default"
                    bg={item.checked ? 'status.successBg' : 'transparent'}
                    color={item.checked ? 'status.success' : 'fg.muted'}
                  >
                    <Box boxSize="1.5" borderRadius="full" bg="currentColor" opacity="0.75" />
                  </Box>
                  <Text textStyle="body" color={item.checked ? 'fg.muted' : 'fg.default'} textDecoration={item.checked ? 'line-through' : 'none'}>
                    {item.label}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          </Stack>
        </Panel>
      );
    default:
      return null;
  }
}

export function LessonContent({ content, summary }: LessonContentProps) {
  const blocks = normalizeLessonBlocks(content);

  if (blocks.length === 0) {
    return (
      <Panel tone="inset" p="6">
        <Stack gap="4">
          <Stack gap="2">
            <Text textStyle="sectionTitle" color="fg.default">
              Содержимое урока
            </Text>
            {summary ? (
              <Text textStyle="bodyMuted" color="fg.muted" maxW="prose">
                {summary}
              </Text>
            ) : null}
          </Stack>
          <Separator />
          <Text textStyle="bodyMuted" color="fg.muted">
            Пока у этого урока нет добавленных блоков.
          </Text>
        </Stack>
      </Panel>
    );
  }

  return (
    <Stack gap="4">
      {summary ? (
        <Panel tone="inset" p="5">
          <Stack gap="3">
            <Badge tone="secondary">Кратко</Badge>
            <Text textStyle="bodyMuted" color="fg.muted" maxW="prose">
              {summary}
            </Text>
          </Stack>
        </Panel>
      ) : null}
      <Stack gap="4">{blocks.map((block, index) => <Box key={index}>{renderBlock(block)}</Box>)}</Stack>
    </Stack>
  );
}
