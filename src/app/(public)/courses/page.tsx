import type { Metadata } from 'next';

import { Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, CourseCard, IconChip } from '@/components/branding';
import { ActionLink } from '@/components/layout';
import { ContentArea, HeaderBar, PageLayout, Panel } from '@/components/product';
import { Badge, EmptyState } from '@/components/ui';
import { getAuthSession } from '@/modules/auth/session';
import { listPublishedCourses } from '@/modules/courses';
import { buildAppCoursePath, buildPublicCoursePath } from '@/modules/courses/paths';
import { getUserEnrollments } from '@/modules/enrollments';

export const metadata: Metadata = {
  title: 'Каталог курсов',
  description: 'Каталог Академии риэлторов: выберите программу, посмотрите, что внутри, и начните с того формата, который подходит вам сейчас.',
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

function priceLabel(accessType: string, priceAmount: number | null) {
  if (accessType === 'FREE' || priceAmount === null) {
    return 'Без оплаты';
  }

  return `${priceAmount} ₽`;
}

function buildCourseAction({
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
    href: isEnrolled
      ? buildAppCoursePath(slug)
      : isFree && sessionUserId
        ? buildAppCoursePath(slug)
        : buildPublicCoursePath(slug),
    label: isEnrolled ? 'Вернуться к курсу' : 'Посмотреть программу',
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
  const listCourses = courses.slice(featuredCourse ? 1 : 0);

  return (
    <PageLayout>
      <HeaderBar
        eyebrow="Каталог"
        title="Выберите курс, который подходит вам по задаче и темпу"
        description="Здесь можно спокойно посмотреть программы, понять формат и открыть ту, с которой удобно начать прямо сейчас."
      />

      {courses.length === 0 ? (
        <Stack gap="4">
          <EmptyState title="Каталог пока пуст" description="Как только появятся опубликованные курсы, они будут показаны здесь." />
          <HStack justify="center">
            <ActionLink href="/">Вернуться на главную</ActionLink>
          </HStack>
        </Stack>
      ) : (
        <Stack gap="8">
          {featuredCourse ? (
            <Panel tone="highlight" minH={{ base: 'auto', xl: '22rem' }}>
              {(() => {
                const action = buildCourseAction({
                  courseId: featuredCourse.id,
                  slug: featuredCourse.slug,
                  accessType: featuredCourse.accessType,
                  sessionUserId: session?.user?.id,
                  enrolledCourseIds,
                });

                return (
                  <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" alignItems="stretch">
                    <Stack gap="6" h="full" justify="space-between">
                      <Stack gap="5" maxW="3xl">
                        <HStack justify="space-between" align="start" gap="4">
                          <HStack gap="2" flexWrap="wrap">
                            <Badge tone={featuredCourse.accessType === 'FREE' ? 'success' : 'secondary'}>
                              {accessLabel(featuredCourse.accessType)}
                            </Badge>
                            <Badge tone="outline">{priceLabel(featuredCourse.accessType, featuredCourse.priceAmount)}</Badge>
                          </HStack>
                          <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                        </HStack>

                        <Stack gap="3">
                          <Heading as="h2" textStyle="pageTitle" maxW="3xl">
                            {featuredCourse.title}
                          </Heading>
                          <Text textStyle="body" color="fg.muted" maxW="2xl">
                            {featuredCourse.shortDescription ??
                              'На странице курса можно посмотреть программу, понять, что внутри, и решить, подходит ли вам этот формат.'}
                          </Text>
                        </Stack>
                      </Stack>

                      <HStack gap="3" flexWrap="wrap">
                        <ActionLink href={action.href}>{action.label}</ActionLink>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {featuredCourse.modulesCount} модулей и {featuredCourse.lessonsCount} уроков
                        </Text>
                      </HStack>
                    </Stack>

                    <Panel tone="inset" h="full">
                      <Stack gap="4">
                        <Text textStyle="overline" color="fg.subtle">
                          Что важно знать
                        </Text>
                        <Stack gap="3">
                          <Text textStyle="bodyMuted" color="fg.muted">
                            Бесплатный курс можно открыть сразу после входа в аккаунт.
                          </Text>
                          <Text textStyle="bodyMuted" color="fg.muted">
                            На платной программе сначала доступна страница курса с программой, а полный доступ открывается после оплаты.
                          </Text>
                          <Text textStyle="bodyMuted" color="fg.muted">
                            Если вы уже начали учиться, курс откроется прямо в личном кабинете.
                          </Text>
                        </Stack>
                      </Stack>
                    </Panel>
                  </SimpleGrid>
                );
              })()}
            </Panel>
          ) : null}

          <ContentArea>
            <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5">
              {listCourses.map((course) => {
                const action = buildCourseAction({
                  courseId: course.id,
                  slug: course.slug,
                  accessType: course.accessType,
                  sessionUserId: session?.user?.id,
                  enrolledCourseIds,
                });

                return (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={
                      course.shortDescription ??
                      'Откройте курс и посмотрите программу, чтобы быстро понять, подходит ли вам эта тема.'
                    }
                    status={accessLabel(course.accessType)}
                    meta={[priceLabel(course.accessType, course.priceAmount)]}
                    footer={
                      <HStack justify="space-between" gap="3" flexWrap="wrap">
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {course.modulesCount} модулей и {course.lessonsCount} уроков
                        </Text>
                        <ActionLink href={action.href} variant="secondary">
                          {action.label}
                        </ActionLink>
                      </HStack>
                    }
                  />
                );
              })}
            </SimpleGrid>
          </ContentArea>
        </Stack>
      )}
    </PageLayout>
  );
}
