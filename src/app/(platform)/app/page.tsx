import { BookIcon, BookOpenIcon, CourseCard, IconChip, StatCard } from '@/components/branding';
import { ActionLink, Section, Stack } from '@/components/layout';
import { EmptyState } from '@/components/ui';
import { requireUser } from '@/modules/auth/access';
import { getEnrolledCourseSummaries } from '@/modules/learning';

function formatCompletionLabel(isCompleted: boolean) {
  return isCompleted ? 'Завершен' : 'В процессе';
}

export default async function PlatformHomePage() {
  const session = await requireUser('/app');
  const summaries = await getEnrolledCourseSummaries(session.user.id);
  const completedCount = summaries.filter((course) => course.isCompleted).length;
  const progressAverage =
    summaries.length > 0 ? Math.round(summaries.reduce((sum, course) => sum + course.progressPercent, 0) / summaries.length) : 0;
  const activeSummary = summaries.find((course) => !course.isCompleted) ?? summaries[0] ?? null;

  return (
    <Section padding="lg">
      <Stack gap="xl">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_22rem] xl:items-start">
          <div className="rounded-[2rem] border border-border/70 bg-linear-to-br from-surface via-surface to-primary-soft/55 p-6 shadow-panel ring-1 ring-white/60 sm:p-8">
            {activeSummary ? (
              <Stack gap="lg" className="max-w-3xl">
                <div className="flex items-start justify-between gap-4">
                  <Stack gap="sm">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Личный кабинет
                    </div>
                    <h1 className="text-display font-semibold tracking-[-0.06em] text-foreground">
                      Продолжайте обучение без лишнего поиска.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                      Главный фокус этого экрана — вернуть вас в текущий курс и показать, какой следующий шаг уже ждет в маршруте.
                    </p>
                  </Stack>
                  <IconChip icon={<BookOpenIcon size={18} />} tone="primary" className="hidden sm:inline-flex" />
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
                  <div className="rounded-[1.5rem] border border-border/70 bg-surface/90 p-5 shadow-card">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Текущий курс
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {activeSummary.completedLessonsCount} из {activeSummary.totalLessonsCount} уроков завершено
                      </span>
                    </div>
                    <h2 className="mt-4 text-section font-semibold tracking-[-0.04em] text-foreground">
                      {activeSummary.course.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {activeSummary.course.shortDescription ?? 'Рабочий учебный маршрут с понятной структурой уроков и устойчивым прогрессом.'}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <ActionLink href={activeSummary.continueLesson?.href ?? `/app/courses/${activeSummary.course.slug}`}>
                        {activeSummary.isCompleted ? 'Открыть курс' : 'Продолжить обучение'}
                      </ActionLink>
                      <span className="text-sm text-muted-foreground">
                        {activeSummary.progressPercent}% маршрута уже пройдено
                      </span>
                    </div>
                  </div>

                  <Stack gap="md">
                    <StatCard eyebrow="Сводка" label="Активные курсы" value={summaries.length} description="Только зачисленные программы" />
                    <StatCard label="Средний прогресс" value={`${progressAverage}%`} description="По всем текущим маршрутам" tone="primary" />
                    <StatCard label="Завершено" value={completedCount} description="Курсы, которые уже закрыты полностью" tone="success" />
                  </Stack>
                </div>
              </Stack>
            ) : (
              <Stack gap="lg" className="max-w-3xl">
                <div className="space-y-3">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Личный кабинет
                  </div>
                  <h1 className="text-display font-semibold tracking-[-0.06em] text-foreground">
                    Все обучение начнется отсюда, когда вы откроете первый курс.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                    Здесь появятся активные маршруты, прогресс и точка быстрого возврата в обучение.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ActionLink href="/courses">Открыть каталог</ActionLink>
                </div>
              </Stack>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-border/70 bg-surface-elevated/88 p-5 shadow-card ring-1 ring-white/60">
            <Stack gap="md">
              <div className="flex items-center gap-3">
                <IconChip icon={<BookIcon size={17} />} tone="muted" className="size-9" />
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Ваш маршрут</div>
                  <div className="text-sm font-semibold text-foreground">Быстрый ориентир</div>
                </div>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Сначала — текущий курс и точка продолжения. Дальше — остальные программы, к которым у вас уже есть доступ.
              </p>
              <div className="space-y-3">
                {summaries.slice(0, 3).map((summary) => (
                  <div key={summary.course.id} className="rounded-2xl border border-border/70 bg-surface/90 p-4">
                    <div className="text-sm font-semibold tracking-[-0.03em] text-foreground">{summary.course.title}</div>
                    <div className="mt-2 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                      <span>{summary.progressPercent}% выполнено</span>
                      <span>{summary.totalLessonsCount} уроков</span>
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
          </div>
        </div>

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
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-[1.75rem] border border-border/70 bg-surface/88 p-5 shadow-card ring-1 ring-white/60 sm:p-6">
              <Stack gap="lg">
                <div className="space-y-2">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Мои курсы</div>
                  <h2 className="text-page-title font-semibold tracking-[-0.05em] text-foreground">
                    Все программы, к которым у вас уже открыт доступ
                  </h2>
                </div>
                <div className="space-y-4">
                  {summaries.map((summary) => {
                    const continueHref = summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`;

                    return (
                      <div
                        key={summary.course.id}
                        className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-surface-elevated/88 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
                      >
                        <Stack gap="sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground ring-1 ring-border/70">
                              {formatCompletionLabel(summary.isCompleted)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {summary.completedLessonsCount} из {summary.totalLessonsCount} уроков
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[-0.04em] text-foreground">{summary.course.title}</h3>
                            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                              {summary.course.shortDescription ?? 'Учебный маршрут без лишнего шума и вторичных панелей.'}
                            </p>
                          </div>
                        </Stack>
                        <div className="flex flex-col items-start gap-3 lg:items-end">
                          <div className="text-right">
                            <div className="text-2xl font-semibold tracking-[-0.05em] text-foreground">{summary.progressPercent}%</div>
                            <div className="text-sm text-muted-foreground">текущий прогресс</div>
                          </div>
                          <ActionLink href={continueHref} variant="secondary">
                            {summary.isCompleted ? 'Открыть курс' : 'Продолжить'}
                          </ActionLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Stack>
            </div>

            <Stack gap="md">
              {summaries.slice(0, 2).map((summary) => (
                <CourseCard
                  key={summary.course.id}
                  featured={summary.course.id === activeSummary?.course.id}
                  title={summary.course.title}
                  description={summary.course.shortDescription ?? 'Подробности курса доступны внутри маршрута обучения.'}
                  status={formatCompletionLabel(summary.isCompleted)}
                  progress={summary.progressPercent}
                  meta={[`${summary.totalLessonsCount} уроков`, summary.canAccess ? 'Доступ открыт' : 'Доступ ограничен']}
                  footer={
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        {summary.completedLessonsCount} из {summary.totalLessonsCount} завершено
                      </span>
                      <ActionLink href={summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`} variant="secondary">
                        {summary.isCompleted ? 'Пересмотреть' : 'Продолжить'}
                      </ActionLink>
                    </div>
                  }
                />
              ))}
            </Stack>
          </div>
        )}
      </Stack>
    </Section>
  );
}
