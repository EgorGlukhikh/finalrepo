import type { Metadata } from 'next';

import { BookOpenIcon, CourseCard, IconChip, SearchIcon } from '@/components/branding';
import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, Card, EmptyState } from '@/components/ui';
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
  const featuredCourse = courses[0] ?? null;
  const remainingCourses = courses.slice(1);

  return (
    <Section padding="lg">
      <Stack gap="xl">
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
          <>
            {featuredCourse ? (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_23rem]">
                <Card padding="lg" tone="highlight" className="min-h-72">
                  {(() => {
                    const isEnrolled = enrolledCourseIds.has(featuredCourse.id);
                    const isFree = featuredCourse.accessType === 'FREE';
                    const ctaHref = isEnrolled
                      ? buildAppCoursePath(featuredCourse.slug)
                      : isFree && session?.user
                        ? buildAppCoursePath(featuredCourse.slug)
                        : buildPublicCoursePath(featuredCourse.slug);
                    const ctaLabel = isEnrolled ? 'Продолжить обучение' : isFree ? 'Начать обучение' : 'Купить курс';

                    return (
                      <Stack gap="lg" className="h-full">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge tone={featuredCourse.accessType === 'FREE' ? 'success' : 'secondary'}>
                                {accessLabel(featuredCourse.accessType)}
                              </Badge>
                              <Badge tone="outline">{featuredCourse.modulesCount} модулей</Badge>
                            </div>
                            <h2 className="text-page-title font-semibold tracking-[-0.05em] text-foreground">
                              {featuredCourse.title}
                            </h2>
                          </div>
                          <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                        </div>
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                          {featuredCourse.shortDescription ?? 'Подробности курса доступны на отдельной странице.'}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          <Badge tone="outline">{featuredCourse.lessonsCount} уроков</Badge>
                          <Badge tone="outline">
                            {isFree ? 'Бесплатно' : featuredCourse.priceAmount !== null ? `${featuredCourse.priceAmount} ₽` : 'Цена уточняется'}
                          </Badge>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center gap-3">
                          <ActionLink href={ctaHref}>{ctaLabel}</ActionLink>
                          <ActionLink href={buildPublicCoursePath(featuredCourse.slug)} variant="secondary">
                            Открыть страницу курса
                          </ActionLink>
                        </div>
                      </Stack>
                    );
                  })()}
                </Card>
                <Card padding="lg" tone="muted" className="h-fit">
                  <Stack gap="md">
                    <div className="flex items-center gap-3">
                      <IconChip icon={<SearchIcon size={17} />} tone="muted" className="size-9" />
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          Как выбирать
                        </div>
                        <div className="text-sm font-semibold text-foreground">Ориентир по каталогу</div>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      Бесплатные курсы можно начать сразу, а платные открываются после подтвержденной оплаты. Если доступ уже открыт,
                      каталог сразу ведет обратно в обучение.
                    </p>
                  </Stack>
                </Card>
              </div>
            ) : null}

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="space-y-4">
                {remainingCourses.map((course) => {
                  const isEnrolled = enrolledCourseIds.has(course.id);
                  const isFree = course.accessType === 'FREE';
                  const ctaHref = isEnrolled
                    ? buildAppCoursePath(course.slug)
                    : isFree && session?.user
                      ? buildAppCoursePath(course.slug)
                      : buildPublicCoursePath(course.slug);
                  const ctaLabel = isEnrolled ? 'Продолжить обучение' : isFree ? 'Начать обучение' : 'Купить курс';

                  return (
                    <Card key={course.id} padding="lg">
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                        <Stack gap="sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>{accessLabel(course.accessType)}</Badge>
                            <Badge tone="outline">{course.modulesCount} модулей</Badge>
                            <Badge tone="outline">{course.lessonsCount} уроков</Badge>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[-0.04em] text-foreground">{course.title}</h3>
                            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                              {course.shortDescription ?? 'Подробности курса доступны на отдельной странице.'}
                            </p>
                          </div>
                        </Stack>
                        <div className="flex flex-col items-start gap-3 lg:items-end">
                          <span className="text-sm text-muted-foreground">
                            {isFree ? 'Бесплатно' : course.priceAmount !== null ? `${course.priceAmount} ₽` : 'Цена уточняется'}
                          </span>
                          <ActionLink href={ctaHref} variant="secondary">
                            {ctaLabel}
                          </ActionLink>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <Stack gap="md">
                {courses.slice(0, 2).map((course) => {
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
                      featured={course.id === featuredCourse?.id}
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
              </Stack>
            </div>
          </>
        )}
      </Stack>
    </Section>
  );
}
