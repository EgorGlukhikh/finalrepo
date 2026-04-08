import { notFound } from 'next/navigation';

import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { formatAdminDate } from '@/modules/admin/format';
import { getCourseStructureById } from '@/modules/courses';
import { updateCourseSettingsAction } from '@/modules/courses/actions';
import { CourseSettingsForm } from '@/modules/courses/components';

type AdminCourseSettingsPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function AdminCourseSettingsPage({ params }: AdminCourseSettingsPageProps) {
  const { courseId } = await params;
  const course = await getCourseStructureById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <Section padding="lg">
      <Stack gap="xl">
        <SectionHeader
          eyebrow="Настройки курса"
          title={course.title}
          description="Builder отвечает только за структуру и контент уроков. Метаданные курса живут отдельно."
          actions={
            <ActionLink href={`/admin/courses/${course.id}`} variant="outline">
              Вернуться в builder
            </ActionLink>
          }
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <CourseSettingsForm course={course} action={updateCourseSettingsAction} />

          <div className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-card">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Служебная сводка</p>
              <h2 className="text-base font-semibold text-foreground">Мета-информация курса</h2>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Создан</dt>
                <dd className="mt-1 text-foreground">{formatAdminDate(course.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Обновлен</dt>
                <dd className="mt-1 text-foreground">{formatAdminDate(course.updatedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Публикация</dt>
                <dd className="mt-1 text-foreground">{formatAdminDate(course.publishedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Модулей</dt>
                <dd className="mt-1 text-foreground">{course.modules.length}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Уроков</dt>
                <dd className="mt-1 text-foreground">{course.modules.reduce((total, courseModule) => total + courseModule.lessons.length, 0)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
