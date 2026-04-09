'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Box, Heading, HStack, Stack, Text, chakra } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Badge, Button, Card, Input } from '@/components/ui';
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
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  return (
    <Stack gap="6" position={{ xl: 'sticky' }} top={{ xl: '24' }} maxH={{ xl: 'calc(100vh - 8rem)' }} overflowY={{ xl: 'auto' }} pr={{ xl: '4' }}>
      <Stack gap="3">
        <HStack align="start" justify="space-between" gap="3">
          <Stack gap="1">
            <Text textStyle="overline" color="fg.subtle">
              Структура курса
            </Text>
            <Heading as="h2" textStyle="sectionTitle">
              {course.title}
            </Heading>
          </Stack>
          <ActionLink href={`/admin/courses/${course.id}/settings`} variant="ghost" size="sm">
            Настройки курса
          </ActionLink>
        </HStack>
        <Text textStyle="bodyMuted" color="fg.muted" maxW="md">
          Левая панель остаётся навигацией и точкой создания. Метаданные курса вынесены из builder в отдельные
          настройки.
        </Text>
      </Stack>

      <Card padding="lg" tone="muted">
        <form action={createModuleAction}>
          <Stack gap="3">
            <input type="hidden" name="courseId" value={course.id} />
            <Stack gap="2">
              <Text textStyle="label" color="fg.default">
                + Модуль
              </Text>
              <Input name="title" placeholder="Например, Введение в профессию" required />
            </Stack>
            <Button type="submit" variant="secondary" w="full">
              Добавить модуль
            </Button>
          </Stack>
        </form>
      </Card>

      <Stack gap="4">
        {course.modules.length === 0 ? (
          <Card padding="lg">
            <Text textStyle="bodyMuted" color="fg.muted">
              Начните со структуры: создайте первый модуль, а затем добавьте урок внутри него.
            </Text>
          </Card>
        ) : (
          course.modules.map((courseModule) => {
            const hasActiveLesson = courseModule.lessons.some((lesson) => lesson.id === selectedLessonId);
            const isOpen = openModuleId === courseModule.id || hasActiveLesson || openModuleId === null;

            return (
              <chakra.details
                key={courseModule.id}
                open={isOpen}
                onToggle={(event) => {
                  setOpenModuleId(event.currentTarget.open ? courseModule.id : null);
                }}
                layerStyle="panel"
                borderRadius="2xl"
                p="4"
              >
                <chakra.summary listStyleType="none" cursor="pointer">
                  <HStack align="start" justify="space-between" gap="3">
                    <Stack gap="1" minW="0">
                      <Text textStyle="bodyStrong" color="fg.default">
                        {courseModule.title}
                      </Text>
                      <Text textStyle="caption" color="fg.muted">
                        {courseModule.lessons.length} уроков
                      </Text>
                    </Stack>
                    <Badge tone={courseModule.published ? 'secondary' : 'outline'}>
                      {courseModule.published ? 'Live' : 'Draft'}
                    </Badge>
                  </HStack>
                </chakra.summary>

                <Stack gap="2" pl="4" mt="4" borderLeftWidth="1px" borderColor="border.subtle">
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
              </chakra.details>
            );
          })
        )}
      </Stack>
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
  const [open, setOpen] = useState(false);

  return (
    <Stack gap="3" pt="2">
      <Button type="button" variant="ghost" size="sm" alignSelf="start" onClick={() => setOpen((current) => !current)}>
        + Урок
      </Button>

      {open ? (
        <Card padding="md" tone="muted">
          <Stack gap="3">
            <Text textStyle="overline" color="fg.subtle">
              Сначала выберите тип
            </Text>
            <Stack gap="2">
              {Object.entries(lessonTypeLabels).map(([value, label]) => (
                <form key={value} action={createLessonDraftAction}>
                  <input type="hidden" name="courseId" value={courseId} />
                  <input type="hidden" name="moduleId" value={moduleId} />
                  <input type="hidden" name="lessonType" value={value} />
                  <Button type="submit" variant="ghost" justifyContent="start" h="auto" py="3" px="3" w="full">
                    <HStack align="start" gap="3" w="full">
                      <Badge tone="outline">{lessonTypeMarkers[value as keyof typeof lessonTypeMarkers]}</Badge>
                      <Stack gap="1" align="start">
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
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}
