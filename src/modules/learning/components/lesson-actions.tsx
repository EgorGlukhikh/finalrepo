import { ActionLink } from '@/components/layout';
import { Button, Card } from '@/components/ui';

import type { LearningLessonReference } from '../types';
import { completeLessonAction } from '../actions';

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
    <Card padding="sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {previousLesson ? <ActionLink href={previousLesson.href}>Предыдущий урок</ActionLink> : null}
          {nextLesson ? <ActionLink href={nextLesson.href} variant="secondary">Следующий урок</ActionLink> : null}
        </div>
        <form action={completeLessonAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="courseSlug" value={courseSlug} />
          <input type="hidden" name="lessonId" value={lessonId} />
          <Button type="submit" variant={isCompleted ? 'secondary' : 'primary'}>
            {isCompleted ? 'Уже завершен' : 'Отметить как завершенный'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
