'use client';

import { useState } from 'react';

import { Button, Input, Select, Textarea } from '@/components/ui';
import type { CourseStructure } from '@/modules/courses';

type CourseSettingsFormProps = {
  course: CourseStructure;
  action: (formData: FormData) => void | Promise<void>;
};

export function CourseSettingsForm({ course, action }: CourseSettingsFormProps) {
  const [isFree, setIsFree] = useState(course.accessType === 'FREE');

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="courseId" value={course.id} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Название курса</span>
            <Input name="title" defaultValue={course.title} required />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Slug</span>
            <Input name="slug" defaultValue={course.slug} required />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Короткое описание</span>
            <Textarea name="shortDescription" rows={3} defaultValue={course.shortDescription ?? ''} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Описание курса</span>
            <Textarea name="description" rows={8} defaultValue={course.description ?? ''} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Обложка</span>
            <Input name="coverImageUrl" defaultValue={course.coverImageUrl ?? ''} placeholder="https://..." />
          </label>
        </div>

        <div className="space-y-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Статус курса</span>
            <Select name="status" defaultValue={course.status}>
              <option value="DRAFT">Черновик</option>
              <option value="PUBLISHED">Опубликован</option>
              <option value="ARCHIVED">Архив</option>
            </Select>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4">
            <input
              name="isFree"
              type="checkbox"
              checked={isFree}
              onChange={(event) => setIsFree(event.currentTarget.checked)}
              className="mt-1 size-4 rounded border-border"
            />
            <span className="space-y-1">
              <span className="block text-sm font-medium text-foreground">Этот курс бесплатный</span>
              <span className="block text-sm text-muted-foreground">Если курс бесплатный, цена выключается и биллинг не участвует.</span>
            </span>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Цена, ₽</span>
            <Input
              name="priceAmount"
              type="number"
              min="1"
              step="1"
              defaultValue={course.priceAmount ?? ''}
              disabled={isFree}
              placeholder={isFree ? 'Не требуется' : 'Например, 9900'}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end border-t border-border/70 pt-4">
        <Button type="submit">Сохранить настройки</Button>
      </div>
    </form>
  );
}
