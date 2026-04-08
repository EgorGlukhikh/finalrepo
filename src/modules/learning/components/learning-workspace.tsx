import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/status-pill';
import { InfoRow } from '@/components/branding';
import { Stack } from '@/components/layout';

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
    <div className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="xl:sticky xl:top-24 xl:self-start">
        <CourseCurriculum
          title="Программа курса"
          description={course.title}
          modules={tree.modules}
          mode="learning"
        />
      </aside>

      <main className="min-w-0 space-y-6">
        <Card padding="lg">
          <Stack gap="lg">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="secondary">{lessonTypeLabels[lesson.lessonType] ?? lesson.lessonType}</Badge>
                <StatusPill tone={lesson.isCompleted ? 'success' : lesson.isCurrent ? 'primary' : 'neutral'}>
                  {lesson.isCompleted ? 'Завершен' : lesson.isCurrent ? 'Текущий' : 'В процессе'}
                </StatusPill>
                <Badge tone={lesson.status === 'PUBLISHED' ? 'secondary' : 'outline'}>
                  {lessonStatusLabels[lesson.status] ?? lesson.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <h1 className="text-page-title font-semibold tracking-tight text-foreground">{lesson.title}</h1>
                {lesson.summary ? <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{lesson.summary}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Курс" value={course.title} />
              <InfoRow label="Урок" value={lesson.title} />
            </div>

            <LessonContent content={lesson.content} summary={lesson.summary} />
          </Stack>
        </Card>

        <LessonActions
          courseId={course.id}
          courseSlug={course.slug}
          lessonId={lesson.id}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
          isCompleted={lesson.isCompleted}
        />
      </main>
    </div>
  );
}
