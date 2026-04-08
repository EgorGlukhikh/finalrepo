import { CourseCard } from '@/components/branding';
import { ActionLink } from '@/components/layout';
import { Badge } from '@/components/ui';
import { Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { listAdminCourses } from '@/modules/courses';
import { CourseEditorForm } from '@/modules/courses/components';
import { createCourseAction } from '@/modules/courses/actions';

function accessLabel(accessType: string) {
  switch (accessType) {
    case 'FREE':
      return 'Бесплатный';
    case 'PAID':
      return 'Платный';
    case 'PRIVATE':
      return 'Закрытый';
    default:
      return accessType;
  }
}

export default async function AdminCoursesPage() {
  const courses = await listAdminCourses();

  return (
    <Section padding="lg">
      <Stack gap="xl">
        <SectionHeader
          eyebrow="Админка"
          title="Курсы"
          description="Создание и базовое редактирование курсов. Бесплатный режим и цена управляются в одном потоке, без раздвоения форм."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <CourseEditorForm
            action={createCourseAction}
            submitLabel="Создать курс"
            title="Новый курс"
            description="Заполните базовые данные курса и выберите, будет ли он бесплатным или платным."
          />

          <Stack gap="md">
            <SectionHeader eyebrow="Список" title="Существующие курсы" description="Последние изменения и быстрый переход к редактированию." />

            {courses.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
                Пока нет созданных курсов.
              </div>
            ) : (
              <Grid className="gap-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.shortDescription ?? 'Описание пока не заполнено.'}
                    status={accessLabel(course.accessType)}
                    meta={[`${course.modulesCount} модулей`, `${course.lessonsCount} уроков`]}
                    footer={
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>
                          {course.accessType === 'FREE' ? 'Без оплаты' : `${course.priceAmount ?? 0} ₽`}
                        </Badge>
                        <ActionLink href={`/admin/courses/${course.id}`} variant="secondary">
                          Редактировать
                        </ActionLink>
                      </div>
                    }
                  />
                ))}
              </Grid>
            )}
          </Stack>
        </div>
      </Stack>
    </Section>
  );
}
