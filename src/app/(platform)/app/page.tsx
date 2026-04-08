import { ActionLink } from '@/components/layout';
import { CourseCard, StatCard } from '@/components/branding';
import { EmptyState } from '@/components/ui';
import { Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { getAuthSession } from '@/modules/auth/session';
import { getEnrolledCourseSummaries } from '@/modules/learning';

function formatCompletionLabel(isCompleted: boolean) {
  return isCompleted ? 'Завершен' : 'В процессе';
}

export default async function PlatformHomePage() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const summaries = await getEnrolledCourseSummaries(session.user.id);
  const completedCount = summaries.filter((course) => course.isCompleted).length;
  const progressAverage =
    summaries.length > 0 ? Math.round(summaries.reduce((sum, course) => sum + course.progressPercent, 0) / summaries.length) : 0;

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Мои курсы"
          title="Личный кабинет"
          description="Сюда попадают все зачисленные курсы, текущий прогресс и точка продолжения обучения."
        />

        <Grid className="gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Курсов" value={summaries.length} description="Активные зачисления" />
          <StatCard label="Завершено" value={completedCount} description="Полностью пройденные курсы" />
          <StatCard label="Средний прогресс" value={`${progressAverage}%`} description="Сводка по текущим маршрутам" />
        </Grid>

        {summaries.length === 0 ? (
          <Stack gap="md">
            <EmptyState
              title="Пока нет зачисленных курсов"
              description="После зачисления курсы появятся здесь и будут собраны в спокойный, ориентированный на обучение список."
            />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ActionLink href="/courses">Перейти в каталог</ActionLink>
            </div>
          </Stack>
        ) : (
          <Grid className="gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {summaries.map((summary) => {
              const continueHref = summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`;

              return (
                <CourseCard
                  key={summary.course.id}
                  title={summary.course.title}
                  description={summary.course.shortDescription ?? 'Учебный маршрут без лишнего шума и лишних панелей.'}
                  status={formatCompletionLabel(summary.isCompleted)}
                  progress={summary.progressPercent}
                  meta={[
                    `${summary.totalLessonsCount} уроков`,
                    summary.canAccess ? 'Доступ открыт' : 'Доступ ограничен',
                  ]}
                  footer={
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        {summary.completedLessonsCount} из {summary.totalLessonsCount} завершено
                      </span>
                      <ActionLink href={continueHref} variant="secondary">
                        {summary.isCompleted ? 'Пересмотреть' : 'Продолжить'}
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
