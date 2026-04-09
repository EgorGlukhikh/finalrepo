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
    <Panel tone="muted" p="4">
      <ActionBar justifyContent="space-between">
        <ActionBar>
          {previousLesson ? <ActionLink href={previousLesson.href}>Предыдущий урок</ActionLink> : null}
          {nextLesson ? (
            <ActionLink href={nextLesson.href} variant="secondary">
              Следующий урок
            </ActionLink>
          ) : null}
        </ActionBar>
        <form action={completeLessonAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="courseSlug" value={courseSlug} />
          <input type="hidden" name="lessonId" value={lessonId} />
          <Button type="submit" variant={isCompleted ? 'secondary' : 'primary'}>
            {isCompleted ? 'Уже завершён' : 'Отметить как завершённый'}
          </Button>
        </form>
      </ActionBar>
    </Panel>
  );
}
