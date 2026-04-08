'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ActionLink } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/cn';
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
    <div className="space-y-6 xl:sticky xl:top-24 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto xl:pr-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Структура курса</p>
            <h2 className="text-section font-semibold tracking-tight text-foreground">{course.title}</h2>
          </div>
          <ActionLink href={`/admin/courses/${course.id}/settings`} variant="ghost" className="h-8 px-2 text-xs">
            Настройки курса
          </ActionLink>
        </div>
        <p className="max-w-prose text-sm leading-7 text-muted-foreground">
          Левая панель остается навигацией и точкой создания. Метаданные курса вынесены из builder в отдельные настройки.
        </p>
      </div>

      <form action={createModuleAction} className="space-y-3 border-b border-border/70 pb-6">
        <input type="hidden" name="courseId" value={course.id} />
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">+ Модуль</span>
          <Input name="title" placeholder="Например, Введение в профессию" required />
        </label>
        <Button type="submit" variant="secondary" className="w-full">
          Добавить модуль
        </Button>
      </form>

      <div className="space-y-5">
        {course.modules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
            Начните со структуры: создайте первый модуль, а затем добавьте урок внутри него.
          </div>
        ) : (
          course.modules.map((courseModule) => {
            const hasActiveLesson = courseModule.lessons.some((lesson) => lesson.id === selectedLessonId);
            const isOpen = openModuleId === courseModule.id || hasActiveLesson || openModuleId === null;

            return (
              <details
                key={courseModule.id}
                open={isOpen}
                onToggle={(event) => {
                  setOpenModuleId(event.currentTarget.open ? courseModule.id : null);
                }}
                className="space-y-3"
              >
                <summary className="cursor-pointer list-none rounded-lg px-1 py-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">{courseModule.title}</div>
                      <div className="text-xs text-muted-foreground">{courseModule.lessons.length} уроков</div>
                    </div>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {courseModule.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </summary>

                <div className="space-y-2 border-l border-border/70 pl-4">
                  {courseModule.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={buildBuilderLessonHref(course.id, lesson.id)}
                      className={cn(
                        'block rounded-lg px-3 py-3 transition-colors duration-200 ease-[var(--ease-standard)]',
                        lesson.id === selectedLessonId ? 'bg-primary/8 text-foreground' : 'text-foreground hover:bg-surface-muted',
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium">{lesson.title}</span>
                          <span className="inline-flex rounded-full bg-surface-muted px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {lessonTypeMarkers[lesson.lessonType]}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {lessonTypeLabels[lesson.lessonType]} · {lesson.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
                        </div>
                      </div>
                    </Link>
                  ))}

                  <LessonTypeChooser courseId={course.id} moduleId={courseModule.id} createLessonDraftAction={createLessonDraftAction} />
                </div>
              </details>
            );
          })
        )}
      </div>
    </div>
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
    <div className="space-y-3 pt-2">
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen((current) => !current)}>
        + Урок
      </Button>

      {open ? (
        <div className="space-y-2 rounded-xl border border-border bg-surface p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Сначала выберите тип</p>
          {Object.entries(lessonTypeLabels).map(([value, label]) => (
            <form key={value} action={createLessonDraftAction}>
              <input type="hidden" name="courseId" value={courseId} />
              <input type="hidden" name="moduleId" value={moduleId} />
              <input type="hidden" name="lessonType" value={value} />
              <button
                type="submit"
                className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-surface-muted"
              >
                <span className="inline-flex min-w-10 justify-center rounded-full bg-surface-muted px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {lessonTypeMarkers[value as keyof typeof lessonTypeMarkers]}
                </span>
                <span className="space-y-1">
                  <span className="block text-sm font-medium text-foreground">{label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {lessonTypeDescriptions[value as keyof typeof lessonTypeDescriptions]}
                  </span>
                </span>
              </button>
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
