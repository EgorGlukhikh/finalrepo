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
    description: course.shortDescription ?? course.description ?? 'Программа курса, структура модулей и условия доступа.',
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
                <Stack gap="1">
                  <Text textStyle="overline" color="fg.subtle">
                    Сводка
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    Короткий ориентир перед стартом или покупкой курса.
                  </Text>
                </Stack>

                <Stack gap="3">
                  <SummaryRow label="Модулей" value={tree.modules.length} />
                  <SummaryRow label="Уроков" value={tree.totalLessonsCount} />
                  <SummaryRow label="Статус" value={course.status === 'PUBLISHED' ? 'Готов к просмотру' : 'Черновик'} />
                </Stack>

                <ActionLink href={buildCatalogPath()} variant="outline" w="full">
                  Вернуться в каталог
                </ActionLink>
              </Stack>
            </Panel>

            <Panel>
              <Stack gap="3">
                <Text textStyle="overline" color="fg.subtle">
                  Что дальше
                </Text>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Бесплатный курс можно начать сразу после зачисления. Платный курс открывается только после подтверждённой оплаты.
                </Text>
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
                      <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>
                        {accessLabel(course.accessType)}
                      </Badge>
                      <Badge tone="outline">{tree.totalLessonsCount} уроков</Badge>
                      <Badge tone="outline">{course.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}</Badge>
                    </HStack>

                    <Stack gap="3">
                      <Text textStyle="overline" color="fg.subtle">
                        Курс
                      </Text>
                      <Heading textStyle="pageTitle" maxW="3xl">
                        {course.title}
                      </Heading>
                      <Text textStyle="body" color="fg.muted" maxW="3xl">
                        {course.description ?? course.shortDescription ?? 'Подробности курса и программа показаны ниже.'}
                      </Text>
                    </Stack>
                  </Stack>

                  <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <Panel tone="muted" p="4">
                    <Stack gap="2">
                      <Text textStyle="caption" color="fg.muted">
                        Формат доступа
                      </Text>
                      <Text textStyle="bodyStrong" color="fg.default">
                        {accessLabel(course.accessType)}
                      </Text>
                    </Stack>
                  </Panel>
                  <Panel tone="muted" p="4">
                    <Stack gap="2">
                      <Text textStyle="caption" color="fg.muted">
                        Стоимость
                      </Text>
                      <Text textStyle="bodyStrong" color="fg.default">
                        {moneyLabel(course.priceAmount)}
                      </Text>
                    </Stack>
                  </Panel>
                </SimpleGrid>

                {isEnrolled ? (
                  <ActionBar>
                    <ActionLink href={buildAppCoursePath(course.slug)}>Продолжить обучение</ActionLink>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      У вас уже есть доступ к этому курсу.
                    </Text>
                  </ActionBar>
                ) : session?.user ? (
                  course.accessType === 'FREE' ? (
                    <form action={enrollFreeCourseAction}>
                      <Stack gap="3" align="start">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <Button type="submit">Начать обучение</Button>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          Бесплатный курс откроет личный маршрут обучения сразу после зачисления.
                        </Text>
                      </Stack>
                    </form>
                  ) : (
                    <form action={purchasePaidCourseAction}>
                      <Stack gap="3" align="start">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <Button type="submit" disabled={!billingAvailable}>
                          Купить курс
                        </Button>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {billingAvailable
                            ? 'После оплаты доступ откроется автоматически.'
                            : 'Оплата временно недоступна. Проверьте Robokassa-конфигурацию перед запуском платного доступа.'}
                        </Text>
                      </Stack>
                    </form>
                  )
                ) : (
                  <HStack gap="3" flexWrap="wrap">
                    <ActionLink href={signInHref}>Войти и продолжить</ActionLink>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      После входа вы сможете начать бесплатный курс или перейти к оплате платного.
                    </Text>
                  </HStack>
                )}
              </Stack>
            </Panel>

            <CourseCurriculum
              title="Программа курса"
              description="На публичной странице видны модули и уроки, но содержимое защищённых уроков остаётся скрытым."
              modules={tree.modules}
              mode="preview"
            />
          </ContentArea>
        }
      />
    </PageLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: number | string }) {
  return (
    <HStack justify="space-between" gap="4">
      <Text textStyle="bodyMuted" color="fg.muted">
        {label}
      </Text>
      <Text textStyle="bodyStrong" color="fg.default">
        {value}
      </Text>
    </HStack>
  );
}
