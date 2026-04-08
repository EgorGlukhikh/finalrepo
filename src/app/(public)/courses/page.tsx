import { ActionLink } from '@/components/layout';
import { CourseCard } from '@/components/branding';
import { EmptyState } from '@/components/ui';
import { Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { listPublishedCourses } from '@/modules/courses';

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

export default async function CoursesCatalogPage() {
  const courses = await listPublishedCourses();

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Каталог"
          title="Курсы"
          description="Публичный список доступных программ. Здесь пользователь выбирает курс и переходит к подробной странице."
        />

        {courses.length === 0 ? (
          <Stack gap="md">
            <EmptyState
              title="Пока нет опубликованных курсов"
              description="Когда появятся курсы, они отобразятся здесь в спокойном и структурированном виде."
            />
            <div className="flex justify-center">
              <ActionLink href="/">Вернуться на главную</ActionLink>
            </div>
          </Stack>
        ) : (
          <Grid className="gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.shortDescription ?? 'Подробности курса появятся на странице курса.'}
                status={accessLabel(course.accessType)}
                meta={[`${course.modulesCount} модулей`, `${course.lessonsCount} уроков`]}
                footer={
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                      {course.priceAmount !== null ? `${course.priceAmount} ₽` : 'Доступ после зачисления'}
                    </span>
                    <ActionLink href={`/courses/${course.slug}`} variant="secondary">
                      Открыть
                    </ActionLink>
                  </div>
                }
              />
            ))}
          </Grid>
        )}
      </Stack>
    </Section>
  );
}
