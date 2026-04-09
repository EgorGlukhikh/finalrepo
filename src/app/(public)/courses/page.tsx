import type { Metadata } from 'next';

import { Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, CourseCard, IconChip, SearchIcon } from '@/components/branding';
import { ActionLink } from '@/components/layout';
import { ContentArea, HeaderBar, PageLayout, Panel, Sidebar, SplitPageLayout } from '@/components/product';
import { Badge, EmptyState } from '@/components/ui';
import { getAuthSession } from '@/modules/auth/session';
import { listPublishedCourses } from '@/modules/courses';
import { buildAppCoursePath, buildPublicCoursePath } from '@/modules/courses/paths';
import { getUserEnrollments } from '@/modules/enrollments';

export const metadata: Metadata = {
  title: 'Каталог курсов',
  description: 'Каталог курсов Академии риэлторов: бесплатные и платные программы для обучения.',
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

function buildCourseCta({
  courseId,
  slug,
  accessType,
  sessionUserId,
  enrolledCourseIds,
}: {
  courseId: string;
  slug: string;
  accessType: string;
  sessionUserId?: string;
  enrolledCourseIds: Set<string>;
}) {
  const isEnrolled = enrolledCourseIds.has(courseId);
  const isFree = accessType === 'FREE';

  return {
    isEnrolled,
    isFree,
    href: isEnrolled
      ? buildAppCoursePath(slug)
      : isFree && sessionUserId
        ? buildAppCoursePath(slug)
        : buildPublicCoursePath(slug),
    label: isEnrolled ? 'Продолжить обучение' : isFree ? 'Начать обучение' : 'Открыть страницу курса',
  };
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
    <PageLayout>
      <HeaderBar
        eyebrow="Каталог"
        title="Курсы для риэлторов"
        description="Открывайте бесплатные курсы сразу, а платные — через страницу курса."
      />

      {courses.length === 0 ? (
        <Stack gap="4">
          <EmptyState
            title="Каталог пока пуст"
            description="Опубликованные курсы появятся здесь."
          />
          <HStack justify="center">
            <ActionLink href="/">Вернуться на главную</ActionLink>
          </HStack>
        </Stack>
      ) : (
        <Stack gap="8">
          {featuredCourse ? (
            <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
              <Panel tone="highlight" minH={{ base: 'auto', xl: '22rem' }}>
                {(() => {
                  const cta = buildCourseCta({
                    courseId: featuredCourse.id,
                    slug: featuredCourse.slug,
                    accessType: featuredCourse.accessType,
                    sessionUserId: session?.user?.id,
                    enrolledCourseIds,
                  });

                  return (
                    <Stack gap="6" h="full">
                      <HStack align="start" justify="space-between" gap="4">
                        <Stack gap="4" maxW="2xl">
                          <HStack gap="2" flexWrap="wrap">
                            <Badge tone={featuredCourse.accessType === 'FREE' ? 'success' : 'secondary'}>
                              {accessLabel(featuredCourse.accessType)}
                            </Badge>
                            <Badge tone="outline">{featuredCourse.modulesCount} модулей</Badge>
                          </HStack>
                          <Heading as="h2" textStyle="pageTitle" maxW="2xl">
                            {featuredCourse.title}
                          </Heading>
                          <Text textStyle="body" color="fg.muted" maxW="2xl">
                            {featuredCourse.shortDescription ?? 'Откройте курс, чтобы посмотреть программу и условия доступа.'}
                          </Text>
                        </Stack>
                        <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                      </HStack>

                      <HStack gap="2.5" flexWrap="wrap">
                        <Badge tone="outline">{featuredCourse.lessonsCount} уроков</Badge>
                        <Badge tone="outline">
                          {cta.isFree
                            ? 'Без оплаты'
                            : featuredCourse.priceAmount !== null
                              ? `${featuredCourse.priceAmount} ₽`
                              : 'Цена уточняется'}
                        </Badge>
                      </HStack>

                      <HStack gap="3" flexWrap="wrap" mt="auto">
                        <ActionLink href={cta.href}>{cta.label}</ActionLink>
                        <ActionLink href={buildPublicCoursePath(featuredCourse.slug)} variant="secondary">
                          Открыть страницу курса
                        </ActionLink>
                      </HStack>
                    </Stack>
                  );
                })()}
              </Panel>

              <Panel tone="muted">
                <Stack gap="5">
                  <HStack align="start" gap="3">
                    <IconChip icon={<SearchIcon size={17} />} tone="muted" />
                    <Stack gap="1">
                      <Text textStyle="overline" color="fg.subtle">
                        Доступ
                      </Text>
                      <Heading as="h2" textStyle="h4">
                        Бесплатные курсы открываются сразу
                      </Heading>
                    </Stack>
                  </HStack>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    Для платных программ сначала откройте страницу курса и подтвердите покупку.
                  </Text>
                </Stack>
              </Panel>
            </SimpleGrid>
          ) : null}

          <SplitPageLayout
            sidebar={
              <Sidebar>
                <Stack gap="4">
                  {courses.slice(0, 2).map((course) => {
                    const cta = buildCourseCta({
                      courseId: course.id,
                      slug: course.slug,
                      accessType: course.accessType,
                      sessionUserId: session?.user?.id,
                      enrolledCourseIds,
                    });

                    return (
                      <CourseCard
                        key={course.id}
                        featured={course.id === featuredCourse?.id}
                        title={course.title}
                        description={
                          course.shortDescription ?? 'Откройте курс, чтобы посмотреть программу и условия доступа.'
                        }
                        status={accessLabel(course.accessType)}
                        meta={[`${course.modulesCount} модулей`, `${course.lessonsCount} уроков`]}
                        footer={
                          <HStack justify="space-between" gap="3" flexWrap="wrap">
                            <Text textStyle="bodyMuted" color="fg.muted">
                              {cta.isFree
                                ? 'Без оплаты'
                                : course.priceAmount !== null
                                  ? `${course.priceAmount} ₽`
                                  : 'Цена уточняется'}
                            </Text>
                            <ActionLink href={cta.href} variant="secondary">
                              {cta.label}
                            </ActionLink>
                          </HStack>
                        }
                      />
                    );
                  })}
                </Stack>
              </Sidebar>
            }
            content={
              <ContentArea>
                <Stack gap="4">
                  {remainingCourses.map((course) => {
                    const cta = buildCourseCta({
                      courseId: course.id,
                      slug: course.slug,
                      accessType: course.accessType,
                      sessionUserId: session?.user?.id,
                      enrolledCourseIds,
                    });

                    return (
                      <Panel key={course.id}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5" alignItems="center">
                          <Stack gap="3" minW="0">
                            <HStack gap="2" flexWrap="wrap">
                              <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>
                                {accessLabel(course.accessType)}
                              </Badge>
                              <Badge tone="outline">{course.modulesCount} модулей</Badge>
                              <Badge tone="outline">{course.lessonsCount} уроков</Badge>
                            </HStack>
                            <Heading as="h3" textStyle="h4">
                              {course.title}
                            </Heading>
                            <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                              {course.shortDescription ?? 'Откройте курс, чтобы посмотреть программу и условия доступа.'}
                            </Text>
                          </Stack>

                          <Stack gap="3" align={{ base: 'start', lg: 'end' }}>
                            <Text textStyle="bodyStrong" color="fg.default">
                              {cta.isFree
                                ? 'Без оплаты'
                                : course.priceAmount !== null
                                  ? `${course.priceAmount} ₽`
                                  : 'Цена уточняется'}
                            </Text>
                            <ActionLink href={cta.href} variant="secondary">
                              {cta.label}
                            </ActionLink>
                          </Stack>
                        </SimpleGrid>
                      </Panel>
                    );
                  })}
                </Stack>
              </ContentArea>
            }
          />
        </Stack>
      )}
    </PageLayout>
  );
}
