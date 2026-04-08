import { notFound } from 'next/navigation';

import { ActionLink } from '@/components/layout';
import { Badge, Button, Card } from '@/components/ui';
import { Section, SectionHeader, Stack } from '@/components/layout';
import { getAuthSession } from '@/modules/auth/session';
import { enrollFreeCourseAction } from '@/modules/learning/actions';
import { getCourseLearningTree } from '@/modules/learning';
import { purchasePaidCourseAction } from '@/modules/billing';
import { CourseCurriculum } from '@/modules/learning/components';

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
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
  const signInHref = `/sign-in?callbackUrl=${encodeURIComponent(`/courses/${slug}`)}`;

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Курс"
          title={course.title}
          description={course.shortDescription ?? course.description ?? 'Подробности курса и программа показаны ниже.'}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>{accessLabel(course.accessType)}</Badge>
              <Badge tone="outline">{tree.totalLessonsCount} уроков</Badge>
            </div>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <Stack gap="lg">
            <Card padding="lg">
              <Stack gap="lg">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>{accessLabel(course.accessType)}</Badge>
                    <Badge tone="outline">{course.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}</Badge>
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                    {course.description ?? course.shortDescription ?? 'Краткое описание курса появится здесь.'}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card padding="sm">
                    <div className="text-sm text-muted-foreground">Формат</div>
                    <div className="mt-2 text-sm font-medium text-foreground">{accessLabel(course.accessType)}</div>
                  </Card>
                  <Card padding="sm">
                    <div className="text-sm text-muted-foreground">Стоимость</div>
                    <div className="mt-2 text-sm font-medium text-foreground">{moneyLabel(course.priceAmount)}</div>
                  </Card>
                </div>

                {isEnrolled ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <ActionLink href={`/app/courses/${course.slug}`}>Продолжить обучение</ActionLink>
                    <span className="text-sm text-muted-foreground">У вас уже есть доступ к этому курсу.</span>
                  </div>
                ) : session?.user ? (
                  course.accessType === 'FREE' ? (
                    <form action={enrollFreeCourseAction} className="flex flex-wrap items-center gap-3">
                      <input type="hidden" name="courseId" value={course.id} />
                      <input type="hidden" name="courseSlug" value={course.slug} />
                      <Button type="submit">Начать обучение</Button>
                      <span className="text-sm text-muted-foreground">Бесплатный курс откроет личный маршрут обучения после зачисления.</span>
                    </form>
                  ) : (
                    <form action={purchasePaidCourseAction} className="flex flex-wrap items-center gap-3">
                      <input type="hidden" name="courseId" value={course.id} />
                      <input type="hidden" name="courseSlug" value={course.slug} />
                      <Button type="submit">Купить курс</Button>
                      <span className="text-sm text-muted-foreground">После оплаты доступ откроется автоматически.</span>
                    </form>
                  )
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <ActionLink href={signInHref}>Войти и продолжить</ActionLink>
                    <span className="text-sm text-muted-foreground">
                      После входа вы сможете начать бесплатный курс или перейти к оплате платного.
                    </span>
                  </div>
                )}
              </Stack>
            </Card>

            <CourseCurriculum
              title="Программа курса"
              description="На публичной странице видны модули и уроки, но содержимое защищённых уроков остаётся скрытым."
              modules={tree.modules}
              mode="preview"
            />
          </Stack>

          <Card padding="md" className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Сводка</p>
              <p className="text-sm text-muted-foreground">Короткая сводка курса для быстрого просмотра.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Модулей</span>
                <span className="text-sm font-medium text-foreground">{tree.modules.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Уроков</span>
                <span className="text-sm font-medium text-foreground">{tree.totalLessonsCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Статус</span>
                <span className="text-sm font-medium text-foreground">
                  {course.status === 'PUBLISHED' ? 'Готов к просмотру' : 'Черновик'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Stack>
    </Section>
  );
}
