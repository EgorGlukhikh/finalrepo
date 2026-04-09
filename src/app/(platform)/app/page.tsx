import { Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Panel } from '@/components/product';
import { EmptyState } from '@/components/ui';
import { requireUser } from '@/modules/auth/access';
import { getEnrolledCourseSummaries } from '@/modules/learning';

function formatCompletionLabel(isCompleted: boolean) {
  return isCompleted ? 'Завершён' : 'В процессе';
}

export default async function PlatformHomePage() {
  const session = await requireUser('/app');
  const summaries = await getEnrolledCourseSummaries(session.user.id);
  const completedCount = summaries.filter((course) => course.isCompleted).length;
  const progressAverage =
    summaries.length > 0
      ? Math.round(summaries.reduce((sum, course) => sum + course.progressPercent, 0) / summaries.length)
      : 0;
  const activeSummary = summaries.find((course) => !course.isCompleted) ?? summaries[0] ?? null;

  if (!activeSummary) {
    return (
      <Stack gap="8">
        <Panel tone="highlight" p={{ base: '7', md: '8' }}>
          <Stack gap="5" maxW="3xl">
            <Text textStyle="overline" color="fg.subtle">
              Личный кабинет
            </Text>
            <Heading textStyle="pageTitle" maxW="2xl">
              Всё обучение начнётся отсюда, когда вы откроете первый курс.
            </Heading>
            <Text textStyle="body" color="fg.muted" maxW="2xl">
              Здесь появятся активные маршруты, прогресс и быстрый возврат к следующему уроку.
            </Text>
            <HStack>
              <ActionLink href="/courses">Открыть каталог</ActionLink>
            </HStack>
          </Stack>
        </Panel>

        <EmptyState
          title="Пока нет зачисленных курсов"
          description="После зачисления курсы появятся здесь и будут собраны в спокойный рабочий список без перегруженного dashboard-поведения."
        />
      </Stack>
    );
  }

  return (
    <Stack gap="10">
      <Grid gap={{ base: '6', xl: '8' }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.2fr) 20rem' }} alignItems="start">
        <GridItem>
          <Panel tone="highlight" p={{ base: '7', md: '8' }}>
            <Stack gap="6" maxW="3xl">
              <Text textStyle="overline" color="fg.subtle">
                Личный кабинет
              </Text>
              <Heading textStyle="pageTitle" maxW="3xl">
                Продолжайте обучение без лишнего поиска и второстепенных панелей.
              </Heading>
              <Text textStyle="body" color="fg.muted" maxW="2xl">
                Главный фокус этого экрана — вернуть вас в текущий курс и сразу показать следующий шаг внутри учебного маршрута.
              </Text>

              <Panel tone="default" p="6">
                <Stack gap="4">
                  <HStack gap="3" flexWrap="wrap">
                    <Text textStyle="overline" color="fg.brand">
                      Текущий курс
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {activeSummary.completedLessonsCount} из {activeSummary.totalLessonsCount} уроков завершено
                    </Text>
                  </HStack>
                  <Heading as="h2" textStyle="sectionTitle">
                    {activeSummary.course.title}
                  </Heading>
                  <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                    {activeSummary.course.shortDescription ?? 'Рабочий учебный маршрут с понятной структурой уроков и устойчивым прогрессом.'}
                  </Text>
                  <HStack gap="3" flexWrap="wrap" pt="1">
                    <ActionLink href={activeSummary.continueLesson?.href ?? `/app/courses/${activeSummary.course.slug}`}>
                      {activeSummary.isCompleted ? 'Открыть курс' : 'Продолжить обучение'}
                    </ActionLink>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      {activeSummary.progressPercent}% маршрута уже пройдено
                    </Text>
                  </HStack>
                </Stack>
              </Panel>
            </Stack>
          </Panel>
        </GridItem>

        <GridItem>
          <Panel tone="muted" p="6">
            <Stack gap="4">
              <Text textStyle="overline" color="fg.subtle">
                Сводка
              </Text>
              <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
                <MetricRow label="Активные курсы" value={String(summaries.length)} />
                <MetricRow label="Средний прогресс" value={`${progressAverage}%`} />
                <MetricRow label="Завершено" value={String(completedCount)} />
              </Stack>
            </Stack>
          </Panel>
        </GridItem>
      </Grid>

      <Panel tone="elevated" p={{ base: '6', md: '7' }}>
        <Stack gap="6">
          <Stack gap="3">
            <Text textStyle="overline" color="fg.subtle">
              Мои курсы
            </Text>
            <Heading as="h2" textStyle="sectionTitle">
              Все программы, к которым у вас уже открыт доступ
            </Heading>
          </Stack>

          <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
            {summaries.map((summary) => {
              const continueHref = summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`;

              return (
                <Grid
                  key={summary.course.id}
                  templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) 10rem auto' }}
                  gap="5"
                  py="5"
                  borderBottomWidth="1px"
                  borderColor="border.subtle"
                  alignItems="center"
                >
                  <Stack gap="2">
                    <HStack gap="2" flexWrap="wrap">
                      <Text textStyle="overline" color={summary.isCompleted ? 'status.success' : 'fg.subtle'}>
                        {formatCompletionLabel(summary.isCompleted)}
                      </Text>
                      <Text textStyle="caption" color="fg.muted">
                        {summary.completedLessonsCount} из {summary.totalLessonsCount} уроков
                      </Text>
                    </HStack>
                    <Heading as="h3" textStyle="h4">
                      {summary.course.title}
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                      {summary.course.shortDescription ?? 'Учебный маршрут без лишнего шума и вторичных панелей.'}
                    </Text>
                  </Stack>

                  <Stack gap="1" align={{ base: 'start', lg: 'end' }}>
                    <Text textStyle="pageTitle" fontSize="2xl">
                      {summary.progressPercent}%
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      текущий прогресс
                    </Text>
                  </Stack>

                  <ActionLink href={continueHref} variant="secondary" alignSelf={{ base: 'start', lg: 'center' }}>
                    {summary.isCompleted ? 'Открыть курс' : 'Продолжить'}
                  </ActionLink>
                </Grid>
              );
            })}
          </Stack>
        </Stack>
      </Panel>
    </Stack>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <HStack justify="space-between" py="3" borderBottomWidth="1px" borderColor="border.subtle">
      <Text textStyle="bodyMuted" color="fg.muted">
        {label}
      </Text>
      <Text textStyle="bodyStrong" color="fg.default">
        {value}
      </Text>
    </HStack>
  );
}
