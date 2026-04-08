import { LessonType } from '@prisma/client';

import { Badge, Button, Card, Input, Label, Select, Separator } from '@/components/ui';
import { Inline, Stack } from '@/components/layout';
import type { CourseStructure } from '@/modules/courses';
import { formatAdminCurrency, formatAdminDate, getAccessTypeLabel, getAccessTypeTone, getCourseStatusLabel, getCourseStatusTone } from '@/modules/admin/format';

type CourseBuilderWorkspaceProps = {
  course: CourseStructure;
  createModuleAction: (formData: FormData) => void | Promise<void>;
  createLessonAction: (formData: FormData) => void | Promise<void>;
};

const lessonTypeLabels: Record<LessonType, string> = {
  REGULAR: 'Обычный урок',
  ASSIGNMENT: 'Задание',
  TEST: 'Тест',
  WEBINAR: 'Вебинар',
};

export function CourseBuilderWorkspace({
  course,
  createModuleAction,
  createLessonAction,
}: CourseBuilderWorkspaceProps) {
  const lessonsCount = course.modules.reduce((count, courseModule) => count + courseModule.lessons.length, 0);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <Card padding="md" className="xl:sticky xl:top-24 xl:self-start">
        <Stack gap="lg">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Структура курса</p>
            <h2 className="text-section font-semibold tracking-tight text-foreground">{course.title}</h2>
            <p className="text-sm text-muted-foreground">
              Добавление уроков остаётся контекстным: новый урок создаётся только внутри выбранного модуля.
            </p>
          </div>

          <form action={createModuleAction} className="space-y-3 rounded-xl border border-border bg-surface-muted/40 p-4">
            <input type="hidden" name="courseId" value={course.id} />
            <div className="space-y-2">
              <Label htmlFor="module-title">+ Модуль</Label>
              <Input id="module-title" name="title" placeholder="Например, Введение в профессию" required />
            </div>
            <Button type="submit" variant="secondary" className="w-full">
              Добавить модуль
            </Button>
          </form>

          <div className="space-y-3">
            {course.modules.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                Пока нет модулей. Начните с верхней кнопки “+ Модуль”.
              </div>
            ) : (
              course.modules.map((courseModule) => (
                <details
                  key={courseModule.id}
                  open
                  className="group overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <summary className="cursor-pointer list-none px-4 py-3">
                    <div className="space-y-2">
                      <Inline justify="between" align="center" className="gap-2">
                        <h3 className="min-w-0 text-sm font-semibold text-foreground">{courseModule.title}</h3>
                        <Badge tone={courseModule.published ? 'secondary' : 'outline'}>
                          {courseModule.published ? 'Опубликован' : 'Черновик'}
                        </Badge>
                      </Inline>
                      <p className="text-xs text-muted-foreground">{courseModule.lessons.length} уроков</p>
                    </div>
                  </summary>
                  <div className="space-y-3 border-t border-border px-3 py-3">
                    <div className="space-y-2">
                      {courseModule.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="rounded-lg border border-border/70 bg-background px-3 py-2 transition-colors duration-200 ease-[var(--ease-standard)] group-hover:border-border"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {lessonTypeLabels[lesson.lessonType]} · {lesson.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
                              </p>
                            </div>
                            {lesson.preview ? <Badge tone="secondary">Превью</Badge> : null}
                          </div>
                        </div>
                      ))}
                    </div>

                    <details className="rounded-lg border border-dashed border-border p-3">
                      <summary className="cursor-pointer list-none text-sm font-medium text-foreground">+ Урок</summary>
                      <form action={createLessonAction} className="mt-3 space-y-3">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="moduleId" value={courseModule.id} />

                        <div className="space-y-2">
                          <Label htmlFor={`lesson-title-${courseModule.id}`}>Название урока</Label>
                          <Input
                            id={`lesson-title-${courseModule.id}`}
                            name="title"
                            placeholder="Например, Первый контакт с клиентом"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`lesson-slug-${courseModule.id}`}>Slug</Label>
                          <Input id={`lesson-slug-${courseModule.id}`} name="slug" placeholder="pervyy-kontakt" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`lesson-type-${courseModule.id}`}>Тип урока</Label>
                          <Select id={`lesson-type-${courseModule.id}`} name="lessonType" required defaultValue="REGULAR">
                            {Object.entries(lessonTypeLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </Select>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Урок появляется только после выбора типа. Это сохраняет конструктор структурным, а не превращает его в длинную форму.
                        </p>

                        <Button type="submit" size="sm" variant="secondary">
                          Создать урок
                        </Button>
                      </form>
                    </details>
                  </div>
                </details>
              ))
            )}
          </div>
        </Stack>
      </Card>

      <Stack gap="lg">
        <Card padding="lg">
          <Stack gap="md">
            <div className="space-y-2">
              <Inline justify="between" align="center" className="gap-2">
                <h2 className="text-section font-semibold tracking-tight text-foreground">Рабочая область курса</h2>
                <Inline className="gap-2">
                  <Badge tone={getCourseStatusTone(course.status)}>{getCourseStatusLabel(course.status)}</Badge>
                  <Badge tone={getAccessTypeTone(course.accessType)}>{getAccessTypeLabel(course.accessType)}</Badge>
                </Inline>
              </Inline>
              <p className="text-sm text-muted-foreground">
                Админка заводит в конструктор, а редактирование дальше идёт через структуру модулей и уроков, без отдельного “редактора-анкеты”.
              </p>
            </div>

            <Separator />

            <dl className="grid gap-4 md:grid-cols-2">
              <Metric label="Slug" value={course.slug} />
              <Metric label="Цена" value={course.accessType === 'PAID' ? formatAdminCurrency(course.priceAmount) : 'Без оплаты'} />
              <Metric label="Модули" value={String(course.modules.length)} />
              <Metric label="Уроки" value={String(lessonsCount)} />
              <Metric label="Обновлен" value={formatAdminDate(course.updatedAt)} />
              <Metric label="Публикация" value={formatAdminDate(course.publishedAt)} />
            </dl>
          </Stack>
        </Card>

        <Card padding="lg">
          <Stack gap="md">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Описание курса</h3>
              <p className="text-sm text-muted-foreground">
                Это поле показываем как справочный контур. Полноценное редактирование содержимого курса остаётся внутри builder-потока.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background px-4 py-4 text-sm leading-7 text-foreground/90">
              {course.description ?? course.shortDescription ?? 'Описание пока не заполнено.'}
            </div>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
