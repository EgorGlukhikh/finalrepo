import type { ReactNode } from 'react';

import { Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { ProgressPill } from './progress-pill';
import { IconChip } from './icon-chip';
import { BookOpenIcon } from './icons';

type CourseCardProps = {
  title: string;
  description?: string;
  meta?: string[];
  status?: string;
  progress?: number;
  footer?: ReactNode;
  className?: string;
  featured?: boolean;
};

export function CourseCard({
  title,
  description,
  meta = [],
  status,
  progress,
  footer,
  className,
  featured = false,
}: CourseCardProps) {
  return (
    <Card className={className} tone={featured ? 'highlight' : 'default'}>
      <Stack gap={featured ? '6' : '5'} h="full">
        <HStack align="start" justify="space-between" gap="4">
          <Stack gap="3">
            <HStack gap="3">
              <IconChip icon={<BookOpenIcon size={16} />} tone={featured ? 'primary' : 'muted'} className="size-9" />
              {status ? <Badge tone="secondary">{status}</Badge> : null}
            </HStack>
            <Heading
              as="h3"
              fontSize={featured ? 'xl' : 'lg'}
              lineHeight="1.2"
              letterSpacing="-0.03em"
              color="fg.default"
            >
              {title}
            </Heading>
          </Stack>
          {typeof progress === 'number' ? <ProgressPill value={progress} /> : null}
        </HStack>
        {description ? (
          <Text textStyle="bodyMuted" color="fg.muted">
            {description}
          </Text>
        ) : null}
        {meta.length > 0 ? (
          <HStack gap="2.5" flexWrap="wrap">
            {meta.map((item) => (
              <Badge key={item} tone="outline">
                {item}
              </Badge>
            ))}
          </HStack>
        ) : null}
        {footer ? (
          <Text as="div" mt="auto" pt="4" borderTopWidth="1px" borderColor="border.subtle">
            {footer}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}
