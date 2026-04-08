import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { LessonListItem, ProgressPill } from '@/components/branding';

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
  return (
    <Card padding="md" className={className}>
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <div className="space-y-3">
          {modules.map((courseModule) => {
            const isOpen = courseModule.lessons.some((lesson) => lesson.isCurrent) || courseModule.sortOrder === 0;

            return (
              <details
                key={courseModule.id}
                open={isOpen}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <summary className="cursor-pointer list-none px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold tracking-tight text-foreground">{courseModule.title}</h3>
                        {courseModule.published ? <Badge tone="secondary">Опубликован</Badge> : <Badge tone="outline">Черновик</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {courseModule.lessons.length} уроков · {courseModule.completedLessonsCount} завершено
                      </p>
                    </div>
                    <ProgressPill value={courseModule.progressPercent} />
                  </div>
                </summary>
                <div className="space-y-2 border-t border-border px-3 py-3">
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
                        lesson.isLocked ? (
                          <Badge tone="outline">Закрыт</Badge>
                        ) : lesson.preview && mode === 'preview' ? (
                          <Badge tone="secondary">Превью</Badge>
                        ) : lesson.isCurrent ? (
                          <Badge tone="primary">Сейчас</Badge>
                        ) : null
                      }
                    />
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
