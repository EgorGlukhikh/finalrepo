import { HStack, Heading, Stack, Text } from '@chakra-ui/react';

import { InfoRow } from '@/components/branding';
import { ContentArea, Panel, Sidebar, SplitPageLayout } from '@/components/product';
import { Badge, StatusPill } from '@/components/ui';

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
                  <StatusPill tone={lesson.isCompleted ? 'success' : lesson.isCurrent ? 'primary' : 'neutral'}>
                    {lesson.isCompleted ? 'Завершён' : lesson.isCurrent ? 'Текущий' : 'В процессе'}
                  </StatusPill>
                  <Badge tone={lesson.status === 'PUBLISHED' ? 'secondary' : 'outline'}>
                    {lessonStatusLabels[lesson.status] ?? lesson.status}
                  </Badge>
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

              <HStack gap="4" align="stretch" flexWrap="wrap">
                <Panel tone="muted" flex="1 1 18rem" p="4">
                  <InfoRow label="Курс" value={course.title} />
                </Panel>
                <Panel tone="muted" flex="1 1 18rem" p="4">
                  <InfoRow label="Урок" value={lesson.title} />
                </Panel>
              </HStack>

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
