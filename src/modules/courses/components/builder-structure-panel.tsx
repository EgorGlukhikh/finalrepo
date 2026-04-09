'use client';

import Link from 'next/link';

import { Accordion, Box, HStack, Menu, Portal, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Badge, Button, Input } from '@/components/ui';
import type { CourseStructure } from '@/modules/courses';

import { buildBuilderLessonHref } from '../builder';
import { lessonTypeDescriptions, lessonTypeLabels, lessonTypeMarkers } from '../lesson-meta';

type BuilderStructurePanelProps = {
  course: CourseStructure;
  selectedLessonId: string | null;
  createModuleAction: (formData: FormData) => void | Promise<void>;
  createLessonDraftAction: (formData: FormData) => void | Promise<void>;
};

export function BuilderStructurePanel({
  course,
  selectedLessonId,
  createModuleAction,
  createLessonDraftAction,
}: BuilderStructurePanelProps) {
  const defaultValue = course.modules
    .filter((courseModule) => courseModule.lessons.some((lesson) => lesson.id === selectedLessonId) || courseModule.sortOrder === 0)
    .map((courseModule) => courseModule.id);

  return (
    <Stack gap="6">
      <Stack gap="3">
        <HStack align="start" justify="space-between" gap="3">
          <Stack gap="1">
            <Text textStyle="overline" color="fg.subtle">
              Структура курса
            </Text>
            <Text textStyle="sectionTitle" color="fg.default">
              {course.title}
            </Text>
          </Stack>
          <ActionLink href={`/admin/courses/${course.id}/settings`} variant="ghost">
            Настройки курса
          </ActionLink>
        </HStack>
        <Text textStyle="bodyMuted" color="fg.muted">
          Слева остаётся только структура и создание нового материала. Метаданные курса вынесены отдельно, чтобы редактор не
          превращался в перегруженную форму.
        </Text>
      </Stack>

      <Box layerStyle="panelMuted" borderRadius="2xl" p="6">
        <form action={createModuleAction}>
          <Stack gap="3">
            <input type="hidden" name="courseId" value={course.id} />
            <Text textStyle="label" color="fg.default">
              + Модуль
            </Text>
            <Input name="title" placeholder="Например, Введение в профессию" required />
            <Button type="submit" variant="secondary" w="full">
              Добавить модуль
            </Button>
          </Stack>
        </form>
      </Box>

      {course.modules.length === 0 ? (
        <Box layerStyle="panel" borderRadius="2xl" p="6">
          <Text textStyle="bodyMuted" color="fg.muted">
            Начните со структуры: создайте первый модуль, а затем добавьте урок внутри него.
          </Text>
        </Box>
      ) : (
        <Accordion.Root collapsible multiple defaultValue={defaultValue} variant="plain">
          <Stack gap="4">
            {course.modules.map((courseModule) => {
              const hasActiveLesson = courseModule.lessons.some((lesson) => lesson.id === selectedLessonId);

              return (
                <Accordion.Item
                  key={courseModule.id}
                  value={courseModule.id}
                  borderWidth="1px"
                  borderColor={hasActiveLesson ? 'accent.primary' : 'border.subtle'}
                  borderRadius="2xl"
                  bg={hasActiveLesson ? 'bg.inset' : 'bg.surface'}
                  overflow="hidden"
                >
                  <Accordion.ItemTrigger px="4" py="3.5">
                    <HStack align="start" justify="space-between" gap="3" w="full">
                      <Stack gap="1" minW="0" textAlign="left">
                        <Text textStyle="bodyStrong" color="fg.default">
                          {courseModule.title}
                        </Text>
                        <Text textStyle="caption" color="fg.muted">
                          {courseModule.lessons.length} уроков
                        </Text>
                      </Stack>
                      <HStack gap="3">
                        <Badge tone={courseModule.published ? 'secondary' : 'outline'}>
                          {courseModule.published ? 'Live' : 'Draft'}
                        </Badge>
                        <Accordion.ItemIndicator color="fg.subtle" />
                      </HStack>
                    </HStack>
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody pt="0" px="4" pb="4">
                      <Stack gap="2" borderTopWidth="1px" borderColor="border.subtle" pt="4">
                        {courseModule.lessons.map((lesson) => (
                          <Box
                            key={lesson.id}
                            asChild
                            layerStyle={lesson.id === selectedLessonId ? 'panelHighlight' : 'panelMuted'}
                            borderRadius="xl"
                          >
                            <Link href={buildBuilderLessonHref(course.id, lesson.id)}>
                              <Box p="3">
                                <Stack gap="2">
                                  <HStack justify="space-between" gap="3" align="start">
                                    <Text textStyle="bodyStrong" color="fg.default" minW="0">
                                      {lesson.title}
                                    </Text>
                                    <Badge tone="outline">{lessonTypeMarkers[lesson.lessonType]}</Badge>
                                  </HStack>
                                  <Text textStyle="caption" color="fg.muted">
                                    {lessonTypeLabels[lesson.lessonType]} · {lesson.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
                                  </Text>
                                </Stack>
                              </Box>
                            </Link>
                          </Box>
                        ))}

                        <LessonTypeChooser
                          courseId={course.id}
                          moduleId={courseModule.id}
                          createLessonDraftAction={createLessonDraftAction}
                        />
                      </Stack>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              );
            })}
          </Stack>
        </Accordion.Root>
      )}
    </Stack>
  );
}

function LessonTypeChooser({
  courseId,
  moduleId,
  createLessonDraftAction,
}: {
  courseId: string;
  moduleId: string;
  createLessonDraftAction: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <Button type="button" variant="ghost" alignSelf="start">
          + Урок
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW={{ base: '18rem', md: '22rem' }} p="2">
            <Stack gap="1">
              {Object.entries(lessonTypeLabels).map(([value, label]) => (
                <form key={value} action={createLessonDraftAction}>
                  <input type="hidden" name="courseId" value={courseId} />
                  <input type="hidden" name="moduleId" value={moduleId} />
                  <input type="hidden" name="lessonType" value={value} />
                  <Button type="submit" variant="ghost" justifyContent="start" h="auto" py="3" px="3" w="full">
                    <HStack align="start" gap="3" w="full">
                      <Badge tone="outline">{lessonTypeMarkers[value as keyof typeof lessonTypeMarkers]}</Badge>
                      <Stack gap="1" align="start" textAlign="left">
                        <Text textStyle="bodyStrong" color="fg.default">
                          {label}
                        </Text>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {lessonTypeDescriptions[value as keyof typeof lessonTypeDescriptions]}
                        </Text>
                      </Stack>
                    </HStack>
                  </Button>
                </form>
              ))}
            </Stack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
