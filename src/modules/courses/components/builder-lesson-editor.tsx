'use client';

import { ActionLink } from '@/components/layout';
import { Badge, Button, EmptyState, Input, Select, Textarea } from '@/components/ui';
import type { CourseLessonNode, CourseModuleNode } from '@/modules/courses';

import { lessonTypeLabels } from '../lesson-meta';
import { LessonBlockEditor } from './lesson-block-editor';

type BuilderLessonEditorProps = {
  courseId: string;
  courseTitle: string;
  selectedLesson: CourseLessonNode | null;
  selectedModule: CourseModuleNode | null;
  updateLessonAction: (formData: FormData) => void | Promise<void>;
  setLessonStatusAction: (formData: FormData) => void | Promise<void>;
  deleteLessonAction: (formData: FormData) => void | Promise<void>;
};

export function BuilderLessonEditor({
  courseId,
  courseTitle,
  selectedLesson,
  selectedModule,
  updateLessonAction,
  setLessonStatusAction,
  deleteLessonAction,
}: BuilderLessonEditorProps) {
  if (!selectedLesson || !selectedModule) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          title="Выберите урок слева"
          description="Рабочая область остается пустой, пока не выбран конкретный урок. Создайте его внутри нужного модуля."
        />
      </div>
    );
  }

  const returnPath = `/admin/courses/${courseId}?lessonId=${selectedLesson.id}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Редактор урока</p>
          <div className="space-y-1">
            <h1 className="text-page-title font-semibold tracking-tight text-foreground">{selectedLesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              {courseTitle} / {selectedModule.title}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ActionLink href="/admin/courses" variant="outline">
            К списку
          </ActionLink>
          <form action={setLessonStatusAction}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={selectedLesson.id} />
            <input type="hidden" name="status" value={selectedLesson.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'} />
            <Button type="submit" size="sm" variant="ghost">
              {selectedLesson.status === 'PUBLISHED' ? 'Снять с публикации' : 'Опубликовать'}
            </Button>
          </form>
          <form action={deleteLessonAction}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={selectedLesson.id} />
            <Button type="submit" size="sm" variant="danger">
              Удалить
            </Button>
          </form>
        </div>
      </div>

      <form action={updateLessonAction} className="space-y-8">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="lessonId" value={selectedLesson.id} />
        <input type="hidden" name="returnPath" value={returnPath} />
        <input type="hidden" name="status" value={selectedLesson.status} />

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={selectedLesson.status === 'PUBLISHED' ? 'secondary' : 'outline'}>
            {selectedLesson.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
          </Badge>
          {selectedLesson.preview ? <Badge tone="secondary">Превью</Badge> : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Название урока</span>
              <Input name="title" defaultValue={selectedLesson.title} placeholder="Название урока" required />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Краткое описание</span>
              <Textarea name="summary" rows={4} defaultValue={selectedLesson.summary ?? ''} placeholder="Короткий контекст для автора и ученика" />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Тип урока</span>
            <Select name="lessonType" defaultValue={selectedLesson.lessonType}>
              {Object.entries(lessonTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </label>
        </div>

        <LessonBlockEditor name="content" defaultValue={selectedLesson.content} />

        <div className="flex justify-end border-t border-border/70 pt-4">
          <Button type="submit">Сохранить изменения</Button>
        </div>
      </form>
    </div>
  );
}
