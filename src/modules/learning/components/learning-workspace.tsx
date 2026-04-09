import { HStack, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ContentArea, Panel, Sidebar, SplitPageLayout } from '@/components/product';
import { Badge } from '@/components/ui';

import type { LearningLessonView } from '../types';

import { CourseCurriculum } from './course-curriculum';
import { LessonActions } from './lesson-actions';
import { LessonContent } from './lesson-content';

type LearningWorkspaceProps = {
  view: LearningLessonView;
};

const lessonTypeLabels: Record<string, string> = {
  REGULAR: 'Обычный урок',
  ASSIGNMENT: 'Задание',
  TEST: 'Тест',
  WEBINAR: 'Вебинар',
};

const lessonStatusLabels: Record<string, string> = {
  DRAFT: 'Черновик',
  PUBLISHED: 'Опубликован',
  ARCHIVED: 'Архив',
};

export function LearningWorkspace({ view }: LearningWorkspaceProps) {
  const { tree, lesson, previousLesson, nextLesson, course } = view;

  return (
    <SplitPageLayout
      sidebar={
        <Sidebar position={{ xl: 'sticky' }} top={{ xl: '24' }} alignSelf={{ xl: 'start' }}>
          <CourseCurriculum title="Программа курса" description={course.title} modules={tree.modules} mode="learning" />
        </Sidebar>
      }
      content={
        <ContentArea gap="6">
          <Panel tone="default">
            <Stack gap="6">
              <Stack gap="4">
                <HStack gap="2" flexWrap="wrap">
                  <Badge tone="secondary">{lessonTypeLabels[lesson.lessonType] ?? lesson.lessonType}</Badge>
                  <Badge tone={lesson.isCompleted ? 'success' : lesson.isCurrent ? 'primary' : 'default'}>
                    {lesson.isCompleted ? 'Завершён' : lesson.isCurrent ? 'Текущий' : 'В процессе'}
                  </Badge>
                  <Badge tone={lesson.status === 'PUBLISHED' ? 'secondary' : 'outline'}>
                    {lessonStatusLabels[lesson.status] ?? lesson.status}
                  </Badge>
                  <Badge tone="outline">{tree.progressPercent}% курса завершено</Badge>
                </HStack>

                <Stack gap="2">
                  <Heading as="h1" textStyle="pageTitle">
                    {lesson.title}
                  </Heading>
                  {lesson.summary ? (
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="3xl">
                      {lesson.summary}
                    </Text>
                  ) : null}
                </Stack>
              </Stack>

              <Panel tone="inset" p="5">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                  <Stack gap="1">
                    <Text textStyle="overline" color="fg.subtle">
                      Курс
                    </Text>
                    <Text textStyle="bodyStrong" color="fg.default">
                      {course.title}
                    </Text>
                  </Stack>
                  <Stack gap="1">
                    <Text textStyle="overline" color="fg.subtle">
                      Текущий урок
                    </Text>
                    <Text textStyle="bodyStrong" color="fg.default">
                      {lesson.title}
                    </Text>
                  </Stack>
                  <Stack gap="1">
                    <Text textStyle="overline" color="fg.subtle">
                      Следующий шаг
                    </Text>
                    <Text textStyle="bodyStrong" color="fg.default">
                      {nextLesson?.title ?? 'Завершите этот урок'}
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Panel>

              <LessonContent content={lesson.content} summary={lesson.summary} />
            </Stack>
          </Panel>

          <LessonActions
            courseId={course.id}
            courseSlug={course.slug}
            lessonId={lesson.id}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            isCompleted={lesson.isCompleted}
          />
        </ContentArea>
      }
    />
  );
}
