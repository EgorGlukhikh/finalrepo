import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, IconChip } from '@/components/branding';
import { ActionLink } from '@/components/layout';
import { ActionBar, ContentArea, PageLayout, Panel, Sidebar, SplitPageLayout } from '@/components/product';
import { Badge, Button } from '@/components/ui';
import { getAuthSession } from '@/modules/auth/session';
import { isRobokassaConfigured, purchasePaidCourseAction } from '@/modules/billing';
import { getCourseBySlug } from '@/modules/courses';
import { buildAppCoursePath, buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';
import { getCourseLearningTree } from '@/modules/learning';
import { enrollFreeCourseAction } from '@/modules/learning/actions';
import { CourseCurriculum } from '@/modules/learning/components';

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Курс не найден',
      description: 'Страница курса недоступна.',
    };
  }

  return {
    title: course.title,
    description: course.shortDescription ?? course.description ?? 'Программа курса и условия доступа.',
    alternates: {
      canonical: buildPublicCoursePath(course.slug),
    },
  };
}

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

function moneyLabel(amount: number | null) {
  return amount === null ? 'Без оплаты' : `${amount} ₽`;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const session = await getAuthSession();
  const tree = await getCourseLearningTree({ slug }, session?.user.id ?? null, { view: 'public' });

  if (!tree) {
    notFound();
  }

  const course = tree.course;
  const isEnrolled = tree.enrollmentStatus === 'ACTIVE';
  const billingAvailable = isRobokassaConfigured();
  const signInHref = `/sign-in?callbackUrl=${encodeURIComponent(buildPublicCoursePath(slug))}`;

  return (
    <PageLayout>
      <SplitPageLayout
        sidebar={
          <Sidebar>
            <Panel tone="muted">
              <Stack gap="4">
                <Text textStyle="overline" color="fg.subtle">
                  Коротко о курсе
                </Text>

                <Stack gap="3">
                  <Text textStyle="bodyMuted" color="fg.muted">
                    {tree.modules.length} модулей и {tree.totalLessonsCount} уроков в понятной последовательности.
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    {course.accessType === 'FREE'
                      ? 'Этот курс можно открыть сразу после входа в аккаунт.'
                      : 'Сейчас можно посмотреть программу, а полный доступ откроется после оплаты.'}
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    Если вы уже начинали обучение, курс откроется с вашего обычного маршрута в личном кабинете.
                  </Text>
                </Stack>

                <ActionLink href={buildCatalogPath()} variant="outline" w="full">
                  Вернуться в каталог
                </ActionLink>
              </Stack>
            </Panel>
          </Sidebar>
        }
        content={
          <ContentArea>
            <Panel tone="highlight">
              <Stack gap="6">
                <HStack align="start" justify="space-between" gap="4">
                  <Stack gap="4" maxW="3xl">
                    <HStack gap="2" flexWrap="wrap">
                      <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>{accessLabel(course.accessType)}</Badge>
                      <Badge tone="outline">{moneyLabel(course.priceAmount)}</Badge>
                    </HStack>

                    <Stack gap="3">
                      <Text textStyle="overline" color="fg.subtle">
                        Курс
                      </Text>
                      <Heading textStyle="pageTitle" maxW="3xl">
                        {course.title}
                      </Heading>
                      <Text textStyle="body" color="fg.muted" maxW="3xl">
                        {course.description ?? course.shortDescription ?? 'Здесь собрана программа курса и весь маршрут обучения по шагам.'}
                      </Text>
                    </Stack>
                  </Stack>

                  <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <Panel tone="inset" p="4">
                    <Stack gap="2">
                      <Text textStyle="caption" color="fg.muted">
                        Что внутри
                      </Text>
                      <Text textStyle="bodyStrong" color="fg.default">
                        {tree.modules.length} модулей и {tree.totalLessonsCount} уроков
                      </Text>
                    </Stack>
                  </Panel>
                  <Panel tone="inset" p="4">
                    <Stack gap="2">
                      <Text textStyle="caption" color="fg.muted">
                        Как открывается доступ
                      </Text>
                      <Text textStyle="bodyStrong" color="fg.default">
                        {course.accessType === 'FREE' ? 'Сразу после входа' : 'После подтвержденной оплаты'}
                      </Text>
                    </Stack>
                  </Panel>
                </SimpleGrid>

                {isEnrolled ? (
                  <ActionBar>
                    <ActionLink href={buildAppCoursePath(course.slug)}>Вернуться к курсу</ActionLink>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      У вас уже открыт доступ. Можно сразу продолжить с того места, где вы остановились.
                    </Text>
                  </ActionBar>
                ) : session?.user ? (
                  course.accessType === 'FREE' ? (
                    <form action={enrollFreeCourseAction}>
                      <Stack gap="3" align="start">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <Button type="submit">Открыть курс</Button>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          После этого курс появится в личном кабинете и можно будет сразу перейти к первому уроку.
                        </Text>
                      </Stack>
                    </form>
                  ) : (
                    <form action={purchasePaidCourseAction}>
                      <Stack gap="3" align="start">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <Button type="submit" disabled={!billingAvailable}>
                          Перейти к оплате
                        </Button>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {billingAvailable
                            ? 'После оплаты доступ к курсу откроется автоматически.'
                            : 'Оплата временно недоступна. Проверьте настройку Robokassa перед запуском платного доступа.'}
                        </Text>
                      </Stack>
                    </form>
                  )
                ) : (
                  <HStack gap="3" flexWrap="wrap">
                    <ActionLink href={signInHref}>Войти и открыть курс</ActionLink>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      После входа можно сразу начать бесплатный курс или перейти к оплате платной программы.
                    </Text>
                  </HStack>
                )}
              </Stack>
            </Panel>

            <CourseCurriculum
              title="Программа курса"
              description="Здесь видно, как устроен курс по шагам. Полное содержимое откроется после получения доступа."
              modules={tree.modules}
              mode="preview"
            />
          </ContentArea>
        }
      />
    </PageLayout>
  );
}
