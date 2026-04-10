import { Accordion, HStack, Stack, Text } from '@chakra-ui/react';

import { LessonListItem, ProgressPill } from '@/components/branding';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import type { LearningModuleState } from '../types';

const lessonTypeLabels: Record<string, string> = {
  REGULAR: 'Обычный урок',
  ASSIGNMENT: 'Задание',
  TEST: 'Тест',
  WEBINAR: 'Вебинар',
};

type CourseCurriculumProps = {
  title?: string;
  description?: string;
  modules: LearningModuleState[];
  mode?: 'preview' | 'learning';
  className?: string;
};

export function CourseCurriculum({
  title = 'Программа курса',
  description,
  modules,
  mode = 'learning',
  className,
}: CourseCurriculumProps) {
  const defaultValue = modules
    .filter((courseModule) => courseModule.lessons.some((lesson) => lesson.isCurrent) || courseModule.sortOrder === 0)
    .map((courseModule) => courseModule.id);

  return (
    <Card padding="md" className={className}>
      <Stack gap="4">
        <Stack gap="1">
          <Text textStyle="overline" color="fg.subtle">
            {title}
          </Text>
          {description ? (
            <Text textStyle="bodyMuted" color="fg.muted">
              {description}
            </Text>
          ) : null}
        </Stack>

        <Accordion.Root collapsible multiple defaultValue={defaultValue} variant="plain">
          <Stack gap="3">
            {modules.map((courseModule) => (
              <Accordion.Item
                key={courseModule.id}
                value={courseModule.id}
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="xl"
                bg="bg.surface"
                overflow="hidden"
              >
                <Accordion.ItemTrigger px="4" py="3.5">
                  <HStack justify="space-between" align="start" gap="3" w="full">
                    <Stack gap="1" minW="0" textAlign="left">
                      <Text textStyle="bodyStrong" color="fg.default">
                        {courseModule.title}
                      </Text>
                      <Text textStyle="caption" color="fg.muted">
                        {courseModule.lessons.length} уроков
                        {mode === 'learning' ? ` · ${courseModule.completedLessonsCount} завершено` : ''}
                      </Text>
                    </Stack>
                    <HStack gap="3">
                      {mode === 'learning' ? <ProgressPill value={courseModule.progressPercent} /> : null}
                      <Accordion.ItemIndicator color="fg.subtle" />
                    </HStack>
                  </HStack>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Accordion.ItemBody pt="0" px="3" pb="3">
                    <Stack gap="2" borderTopWidth="1px" borderColor="border.subtle" pt="3">
                      {courseModule.lessons.map((lesson) => (
                        <LessonListItem
                          key={lesson.id}
                          href={mode === 'learning' && lesson.canAccess ? lesson.href ?? undefined : undefined}
                          title={lesson.title}
                          meta={lesson.summary ?? lessonTypeLabels[lesson.lessonType] ?? lesson.lessonType}
                          active={lesson.isCurrent}
                          completed={lesson.isCompleted}
                          disabled={mode === 'preview' || !lesson.canAccess || lesson.isLocked}
                          status={
                            mode === 'preview' && lesson.preview ? (
                              <Badge tone="secondary">Можно посмотреть</Badge>
                            ) : lesson.isCurrent ? (
                              <Badge tone="primary">Сейчас</Badge>
                            ) : lesson.isLocked ? (
                              <Badge tone="outline">Откроется после доступа</Badge>
                            ) : null
                          }
                        />
                      ))}
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Stack>
        </Accordion.Root>
      </Stack>
    </Card>
  );
}
