import { Box, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { BookIcon, BookOpenIcon, CourseCard, IconChip, StatCard } from '@/components/branding';
import { ActionLink, Section } from '@/components/layout';
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
    summaries.length > 0 ? Math.round(summaries.reduce((sum, course) => sum + course.progressPercent, 0) / summaries.length) : 0;
  const activeSummary = summaries.find((course) => !course.isCompleted) ?? summaries[0] ?? null;

  return (
    <Section padding="lg">
      <Stack gap="12">
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" alignItems="start">
          <Box
            layerStyle="panelHighlight"
            borderRadius="3xl"
            px={{ base: '6', md: '8' }}
            py={{ base: '7', md: '8' }}
          >
            {activeSummary ? (
              <Stack gap="8" maxW="3xl">
                <HStack align="start" justify="space-between" gap="4">
                  <Stack gap="4">
                    <Text textStyle="overline" color="fg.subtle">
                      Личный кабинет
                    </Text>
                    <Heading textStyle="pageTitle" maxW="2xl">
                      Продолжайте обучение без лишнего поиска.
                    </Heading>
                    <Text textStyle="body" color="fg.muted" maxW="2xl">
                      Главный фокус этого экрана — вернуть вас в текущий курс и сразу показать, какой следующий шаг уже
                      ждёт в маршруте.
                    </Text>
                  </Stack>
                  <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                </HStack>

                <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
                  <Box layerStyle="panel" borderRadius="2xl" p="5">
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
                      <Text textStyle="bodyMuted" color="fg.muted">
                        {activeSummary.course.shortDescription ??
                          'Рабочий учебный маршрут с понятной структурой уроков и устойчивым прогрессом.'}
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
                  </Box>

                  <Stack gap="4">
                    <StatCard
                      eyebrow="Сводка"
                      label="Активные курсы"
                      value={summaries.length}
                      description="Только зачисленные программы"
                    />
                    <StatCard
                      label="Средний прогресс"
                      value={`${progressAverage}%`}
                      description="По всем текущим маршрутам"
                      tone="primary"
                    />
                    <StatCard
                      label="Завершено"
                      value={completedCount}
                      description="Курсы, которые уже закрыты полностью"
                      tone="success"
                    />
                  </Stack>
                </SimpleGrid>
              </Stack>
            ) : (
              <Stack gap="6" maxW="3xl">
                <Text textStyle="overline" color="fg.subtle">
                  Личный кабинет
                </Text>
                <Heading textStyle="pageTitle" maxW="2xl">
                  Всё обучение начнётся отсюда, когда вы откроете первый курс.
                </Heading>
                <Text textStyle="body" color="fg.muted" maxW="2xl">
                  Здесь появятся активные маршруты, прогресс и точка быстрого возврата в обучение.
                </Text>
                <HStack>
                  <ActionLink href="/courses">Открыть каталог</ActionLink>
                </HStack>
              </Stack>
            )}
          </Box>

          <Box layerStyle="panelElevated" borderRadius="3xl" p="6">
            <Stack gap="5">
              <HStack align="start" gap="3">
                <IconChip icon={<BookIcon size={17} />} tone="muted" />
                <Stack gap="1">
                  <Text textStyle="overline" color="fg.subtle">
                    Ваш маршрут
                  </Text>
                  <Heading as="h2" textStyle="h4">
                    Быстрый ориентир
                  </Heading>
                </Stack>
              </HStack>

              <Text textStyle="bodyMuted" color="fg.muted">
                Сначала — текущий курс и точка продолжения. Дальше — остальные программы, к которым у вас уже открыт
                доступ.
              </Text>

              <Stack gap="3">
                {summaries.slice(0, 3).map((summary) => (
                  <Box key={summary.course.id} layerStyle="panel" borderRadius="2xl" p="4">
                    <Stack gap="2">
                      <Text textStyle="bodyStrong" color="fg.default">
                        {summary.course.title}
                      </Text>
                      <HStack justify="space-between" gap="3">
                        <Text textStyle="caption" color="fg.muted">
                          {summary.progressPercent}% выполнено
                        </Text>
                        <Text textStyle="caption" color="fg.muted">
                          {summary.totalLessonsCount} уроков
                        </Text>
                      </HStack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        </SimpleGrid>

        {summaries.length === 0 ? (
          <Stack gap="4">
            <EmptyState
              title="Пока нет зачисленных курсов"
              description="После зачисления курсы появятся здесь и будут собраны в спокойный список без перегруженного dashboard-поведения."
            />
            <HStack justify="center">
              <ActionLink href="/courses">Перейти в каталог</ActionLink>
            </HStack>
          </Stack>
        ) : (
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" alignItems="start">
            <Box layerStyle="panelElevated" borderRadius="3xl" p={{ base: '5', md: '6' }}>
              <Stack gap="6">
                <Stack gap="2">
                  <Text textStyle="overline" color="fg.subtle">
                    Мои курсы
                  </Text>
                  <Heading as="h2" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }} maxW="3xl">
                    Все программы, к которым у вас уже открыт доступ
                  </Heading>
                </Stack>

                <Stack gap="4">
                  {summaries.map((summary) => {
                    const continueHref = summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`;

                    return (
                      <Box key={summary.course.id} layerStyle="panel" borderRadius="2xl" p="5">
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5" alignItems="center">
                          <Stack gap="3">
                            <HStack gap="2" flexWrap="wrap">
                              <Text textStyle="overline" color={summary.isCompleted ? 'status.success' : 'fg.muted'}>
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

                          <Stack gap="3" align={{ base: 'start', lg: 'end' }}>
                            <Box textAlign={{ base: 'left', lg: 'right' }}>
                              <Text textStyle="pageTitle" fontSize="2xl">
                                {summary.progressPercent}%
                              </Text>
                              <Text textStyle="caption" color="fg.muted">
                                текущий прогресс
                              </Text>
                            </Box>
                            <ActionLink href={continueHref} variant="secondary">
                              {summary.isCompleted ? 'Открыть курс' : 'Продолжить'}
                            </ActionLink>
                          </Stack>
                        </SimpleGrid>
                      </Box>
                    );
                  })}
                </Stack>
              </Stack>
            </Box>

            <Stack gap="4">
              {summaries.slice(0, 2).map((summary) => (
                <CourseCard
                  key={summary.course.id}
                  featured={summary.course.id === activeSummary?.course.id}
                  title={summary.course.title}
                  description={summary.course.shortDescription ?? 'Подробности курса доступны внутри учебного маршрута.'}
                  status={formatCompletionLabel(summary.isCompleted)}
                  progress={summary.progressPercent}
                  meta={[`${summary.totalLessonsCount} уроков`, summary.canAccess ? 'Доступ открыт' : 'Доступ ограничен']}
                  footer={
                    <HStack justify="space-between" gap="3" flexWrap="wrap">
                      <Text textStyle="bodyMuted" color="fg.muted">
                        {summary.completedLessonsCount} из {summary.totalLessonsCount} завершено
                      </Text>
                      <ActionLink href={summary.continueLesson?.href ?? `/app/courses/${summary.course.slug}`} variant="secondary">
                        {summary.isCompleted ? 'Пересмотреть' : 'Продолжить'}
                      </ActionLink>
                    </HStack>
                  }
                />
              ))}
            </Stack>
          </SimpleGrid>
        )}
      </Stack>
    </Section>
  );
}
