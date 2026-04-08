'use client';

import { useState } from 'react';

import { Stack } from '@/components/layout';
import { Badge, Button, Input, Label } from '@/components/ui';
import { Card } from '@/components/ui/card';

type CourseCreateCardProps = {
  action: (formData: FormData) => void | Promise<void>;
};

export function CourseCreateCard({ action }: CourseCreateCardProps) {
  const [isFree, setIsFree] = useState(false);

  return (
    <Card padding="lg">
      <Stack gap="lg">
        <div className="space-y-2">
          <Badge tone={isFree ? 'success' : 'primary'}>{isFree ? 'Бесплатный курс' : 'Платный курс'}</Badge>
          <div className="space-y-1">
            <h2 className="text-section font-semibold tracking-tight text-foreground">Новый курс</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Короткая стартовая форма. После создания курс открывается в конструкторе, где собирается структура модулей и уроков.
            </p>
          </div>
        </div>

        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" required />
          </div>

          <div className="rounded-xl border border-border bg-surface-muted/45 p-4">
            <label className="flex items-start gap-3">
              <input
                id="isFree"
                name="isFree"
                type="checkbox"
                checked={isFree}
                onChange={(event) => setIsFree(event.currentTarget.checked)}
                className="mt-1 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
              />
              <span className="space-y-1">
                <span className="block text-sm font-medium text-foreground">Этот курс бесплатный</span>
                <span className="block text-sm text-muted-foreground">
                  Бесплатные курсы не создают заказ и открываются без Robokassa.
                </span>
              </span>
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceAmount">Цена, ₽</Label>
            <Input
              id="priceAmount"
              name="priceAmount"
              type="number"
              min="1"
              step="1"
              disabled={isFree}
              placeholder={isFree ? 'Не требуется' : 'Например, 9900'}
            />
          </div>

          <Button type="submit" className="w-full">
            Создать и открыть конструктор
          </Button>
        </form>
      </Stack>
    </Card>
  );
}
