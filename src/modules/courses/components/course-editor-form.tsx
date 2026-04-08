'use client';

import { useState, type ReactNode } from 'react';

import { Badge, Button, Input, Label, Textarea } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/layout';

import type { CourseStructure } from '../types';

type CourseEditorFormProps = {
  course?: CourseStructure | null;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  title: string;
  description: string;
  footer?: ReactNode;
};

export function CourseEditorForm({ course, action, submitLabel, title, description, footer }: CourseEditorFormProps) {
  const [isFree, setIsFree] = useState(course?.accessType === 'FREE');

  return (
    <Card padding="lg">
      <Stack gap="lg">
        <div className="space-y-2">
          <Badge tone={isFree ? 'success' : 'secondary'}>{isFree ? 'Бесплатный курс' : 'Платный курс'}</Badge>
          <div className="space-y-1">
            <h2 className="text-page-title font-semibold tracking-tight text-foreground">{title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        </div>

        <form action={action} className="space-y-6">
          {course ? <input type="hidden" name="courseId" value={course.id} /> : null}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Название" name="title" defaultValue={course?.title ?? ''} required />
            <Field label="Slug" name="slug" defaultValue={course?.slug ?? ''} required />
          </div>

          <Field label="Короткое описание" name="shortDescription" defaultValue={course?.shortDescription ?? ''} multiline />
          <Field label="Описание" name="description" defaultValue={course?.description ?? ''} multiline rows={6} />
          <Field label="Обложка" name="coverImageUrl" defaultValue={course?.coverImageUrl ?? ''} />

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
            <div className="space-y-2 rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center gap-3">
                <input
                  id="isFree"
                  name="isFree"
                  type="checkbox"
                  defaultChecked={course?.accessType === 'FREE'}
                  onChange={(event) => setIsFree(event.currentTarget.checked)}
                  className="size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
                />
                <Label htmlFor="isFree" className="text-sm font-medium text-foreground">
                  Этот курс бесплатный
                </Label>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Если включить переключатель, цена будет скрыта и доступ к курсу откроется без оплаты.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceAmount">Цена, ₽</Label>
              <Input
                id="priceAmount"
                name="priceAmount"
                type="number"
                min="1"
                step="1"
                defaultValue={course?.priceAmount ?? ''}
                disabled={isFree}
                placeholder={isFree ? 'Не нужна' : 'Например, 9900'}
              />
              <p className="text-xs text-muted-foreground">{isFree ? 'Для бесплатного курса цена не используется.' : 'Только для платного доступа.'}</p>
            </div>
          </div>

          {footer}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">{submitLabel}</Button>
            <span className="text-sm text-muted-foreground">{isFree ? 'Курс будет доступен сразу после публикации.' : 'Доступ появится только после подтверждённой оплаты.'}</span>
          </div>
        </form>
      </Stack>
    </Card>
  );
}

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
};

function Field({ label, name, defaultValue, required, multiline, rows }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {multiline ? (
        <Textarea id={name} name={name} defaultValue={defaultValue} required={required} rows={rows} />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} required={required} />
      )}
    </div>
  );
}
