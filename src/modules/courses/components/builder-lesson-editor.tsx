'use client';

import { Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ActionBar } from '@/components/product';
import { Badge, Button, EmptyState, FormField, Input, Select, Textarea } from '@/components/ui';
import type { LessonAnalytics } from '@/modules/analytics';
import type { CourseLessonNode, CourseModuleNode } from '@/modules/courses';

import { lessonTypeLabels } from '../lesson-meta';
import { LessonBlockEditor } from './lesson-block-editor';

type BuilderLessonEditorProps = {
  courseId: string;
  courseTitle: string;
  selectedLesson: CourseLessonNode | null;
  selectedModule: CourseModuleNode | null;
  selectedLessonMetrics: LessonAnalytics | null;
  updateLessonAction: (formData: FormData) => void | Promise<void>;
  setLessonStatusAction: (formData: FormData) => void | Promise<void>;
  deleteLessonAction: (formData: FormData) => void | Promise<void>;
};

export function BuilderLessonEditor({
  courseId,
  courseTitle,
  selectedLesson,
  selectedModule,
  selectedLessonMetrics,
  updateLessonAction,
  setLessonStatusAction,
  deleteLessonAction,
}: BuilderLessonEditorProps) {
  if (!selectedLesson || !selectedModule) {
    return (
      <Stack minH={{ base: '26rem', xl: '60vh' }} justify="center">
        <EmptyState
          title="Выберите урок слева"
          description="Рабочая область остаётся пустой, пока не выбран конкретный урок. Создайте его внутри нужного модуля."
        />
      </Stack>
    );
  }

  const returnPath = `/admin/courses/${courseId}?lessonId=${selectedLesson.id}`;

  return (
    <Stack gap="8">
      <HStack justify="space-between" align="start" gap="4" pb="5" borderBottomWidth="1px" borderColor="border.subtle" flexWrap="wrap">
        <Stack gap="2">
          <Text textStyle="overline" color="fg.subtle">
            Редактор урока
          </Text>
          <Heading textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
            {selectedLesson.title}
          </Heading>
          <Text textStyle="bodyMuted" color="fg.muted">
            {courseTitle} / {selectedModule.title}
          </Text>
          <Text textStyle="caption" color="fg.subtle">
            Начали {selectedLessonMetrics?.startsCount ?? 0} · Завершили {selectedLessonMetrics?.completionsCount ?? 0}
          </Text>
        </Stack>

        <ActionBar>
          <ActionLink href="/admin/courses" variant="outline">
            К списку
          </ActionLink>
          <form action={setLessonStatusAction}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={selectedLesson.id} />
            <input type="hidden" name="status" value={selectedLesson.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'} />
            <Button type="submit" variant="ghost">
              {selectedLesson.status === 'PUBLISHED' ? 'Снять с публикации' : 'Опубликовать'}
            </Button>
          </form>
          <form action={deleteLessonAction}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={selectedLesson.id} />
            <Button type="submit" variant="danger">
              Удалить
            </Button>
          </form>
        </ActionBar>
      </HStack>

      <form action={updateLessonAction}>
        <Stack gap="8">
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="lessonId" value={selectedLesson.id} />
          <input type="hidden" name="returnPath" value={returnPath} />
          <input type="hidden" name="status" value={selectedLesson.status} />

          <HStack gap="2" flexWrap="wrap">
            <Badge tone={selectedLesson.status === 'PUBLISHED' ? 'secondary' : 'outline'}>
              {selectedLesson.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
            </Badge>
            {selectedLesson.preview ? <Badge tone="secondary">Превью</Badge> : null}
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" alignItems="start">
            <Stack gap="4">
              <FormField id="title" label="Название урока" required>
                <Input id="title" name="title" defaultValue={selectedLesson.title} placeholder="Название урока" required />
              </FormField>

              <FormField id="summary" label="Краткое описание">
                <Textarea
                  id="summary"
                  name="summary"
                  rows={4}
                  defaultValue={selectedLesson.summary ?? ''}
                  placeholder="Короткий контекст для автора и ученика"
                />
              </FormField>
            </Stack>

            <Stack gap="4">
              <FormField id="lessonType" label="Тип урока">
                <Select id="lessonType" name="lessonType" defaultValue={selectedLesson.lessonType}>
                  {Object.entries(lessonTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </Stack>
          </SimpleGrid>

          <LessonBlockEditor name="content" defaultValue={selectedLesson.content} />

          <ActionBar justifyContent="end" pt="4" borderTopWidth="1px" borderColor="border.subtle">
            <Button type="submit">Сохранить изменения</Button>
          </ActionBar>
        </Stack>
      </form>
    </Stack>
  );
}
