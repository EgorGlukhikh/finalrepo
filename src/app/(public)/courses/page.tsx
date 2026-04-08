import type { Metadata } from 'next';

import { CourseCard } from '@/components/branding';
import { ActionLink, Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { EmptyState } from '@/components/ui';
import { getAuthSession } from '@/modules/auth/session';
import { listPublishedCourses } from '@/modules/courses';
import { buildAppCoursePath, buildPublicCoursePath } from '@/modules/courses/paths';
import { getUserEnrollments } from '@/modules/enrollments';

export const metadata: Metadata = {
  title: 'Каталог курсов',
  description:
    'Каталог Академии риэлторов: бесплатные и платные курсы с понятной структурой, описанием и прямым входом в обучение.',
};

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
  const session = await getAuthSession();
  const courses = await listPublishedCourses();
  const enrollments = session?.user ? await getUserEnrollments(session.user.id) : [];
  const enrolledCourseIds = new Set(
    enrollments.filter((enrollment) => enrollment.status === 'ACTIVE').map((enrollment) => enrollment.course.id),
  );

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Каталог"
          title="Курсы для риэлторов"
          description="Публичный каталог доступных программ. Бесплатные курсы можно начать сразу, а платные открываются после подтвержденной оплаты."
        />

        {courses.length === 0 ? (
          <Stack gap="md">
            <EmptyState
              title="Пока нет опубликованных курсов"
              description="Когда курсы появятся, они отобразятся здесь в спокойном и структурированном виде."
            />
            <div className="flex justify-center">
              <ActionLink href="/">Вернуться на главную</ActionLink>
            </div>
          </Stack>
        ) : (
          <Grid className="gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);
              const isFree = course.accessType === 'FREE';
              const ctaHref = isEnrolled
                ? buildAppCoursePath(course.slug)
                : isFree && session?.user
                  ? buildAppCoursePath(course.slug)
                  : buildPublicCoursePath(course.slug);
              const ctaLabel = isEnrolled ? 'Продолжить обучение' : isFree ? 'Начать обучение' : 'Купить курс';

              return (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.shortDescription ?? 'Подробности курса доступны на отдельной странице.'}
                  status={accessLabel(course.accessType)}
                  meta={[`${course.modulesCount} модулей`, `${course.lessonsCount} уроков`]}
                  footer={
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        {isFree ? 'Бесплатно' : course.priceAmount !== null ? `${course.priceAmount} ₽` : 'Цена уточняется'}
                      </span>
                      <ActionLink href={ctaHref} variant="secondary">
                        {ctaLabel}
                      </ActionLink>
                    </div>
                  }
                />
              );
            })}
          </Grid>
        )}
      </Stack>
    </Section>
  );
}
