import { Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ActionBar, Panel } from '@/components/product';
import { Button } from '@/components/ui';

import { completeLessonAction } from '../actions';
import type { LearningLessonReference } from '../types';

type LessonActionsProps = {
  courseId: string;
  courseSlug: string;
  lessonId: string;
  previousLesson: LearningLessonReference | null;
  nextLesson: LearningLessonReference | null;
  isCompleted: boolean;
};

export function LessonActions({
  courseId,
  courseSlug,
  lessonId,
  previousLesson,
  nextLesson,
  isCompleted,
}: LessonActionsProps) {
  return (
    <Panel tone="inset" p="4">
      <ActionBar justifyContent="space-between" gap="4">
        <ActionBar gap="3">
          {previousLesson ? (
            <ActionLink href={previousLesson.href} variant="ghost">
              Предыдущий урок
            </ActionLink>
          ) : null}
          {nextLesson ? (
            <ActionLink href={nextLesson.href} variant="secondary">
              Следующий урок
            </ActionLink>
          ) : (
            <Text textStyle="bodyMuted" color="fg.muted">
              Это последний урок в текущем маршруте.
            </Text>
          )}
        </ActionBar>
        <form action={completeLessonAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="courseSlug" value={courseSlug} />
          <input type="hidden" name="lessonId" value={lessonId} />
          <Button type="submit" variant={isCompleted ? 'secondary' : 'primary'}>
            {isCompleted ? 'Урок уже завершён' : 'Отметить как завершённый'}
          </Button>
        </form>
      </ActionBar>
    </Panel>
  );
}
