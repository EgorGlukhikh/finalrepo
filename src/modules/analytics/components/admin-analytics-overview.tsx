import { Heading, SimpleGrid, Stack, Stat, Text } from '@chakra-ui/react';

import { Panel } from '@/components/product';
import { formatAdminCurrency } from '@/modules/admin/format';

import type { AdminDashboardAnalytics } from '../types';

type AdminAnalyticsOverviewProps = {
  analytics: AdminDashboardAnalytics;
};

function formatCount(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function AdminAnalyticsOverview({ analytics }: AdminAnalyticsOverviewProps) {
  return (
    <Stack gap="6">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
        <MetricCard label="Пользователи" value={formatCount(analytics.business.totalUsers)} description="Все зарегистрированные аккаунты платформы." />
        <MetricCard label="Активные доступы" value={formatCount(analytics.business.totalEnrollments)} description="Enrollment-записи со статусом ACTIVE." />
        <MetricCard
          label="Оплаченные заказы"
          value={formatCount(analytics.business.totalPaidOrders)}
          description="Подтверждённые покупки платных курсов."
          tone="primary"
        />
        <MetricCard
          label="Выручка"
          value={formatAdminCurrency(analytics.business.totalRevenue)}
          description="Сумма всех оплаченных заказов."
          tone="success"
        />
      </SimpleGrid>

      <Panel tone="muted" p="6">
        <Stack gap="6">
          <Stack gap="2" maxW="2xl">
            <Text textStyle="overline" color="fg.subtle">
              Простая воронка
            </Text>
            <Heading as="h2" textStyle="sectionTitle">
              От первого доступа до завершённого урока
            </Heading>
            <Text textStyle="bodyMuted" color="fg.muted">
              Метрики считаются только из enrollments, orders и lesson progress. Без отдельной event-системы и без тяжёлого
              аналитического слоя.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <MetricCard label="Курс открыт" value={formatCount(analytics.funnel.courseOpened)} description="У пользователя появился активный доступ." />
            <MetricCard label="Курс начат" value={formatCount(analytics.funnel.courseStarted)} description="Есть хотя бы один старт урока внутри курса." />
            <MetricCard label="Урок начат" value={formatCount(analytics.funnel.lessonStarted)} description="Уроки в статусе IN_PROGRESS или COMPLETED." />
            <MetricCard label="Урок завершён" value={formatCount(analytics.funnel.lessonCompleted)} description="Уроки со статусом COMPLETED." />
          </SimpleGrid>
        </Stack>
      </Panel>
    </Stack>
  );
}

function MetricCard({
  label,
  value,
  description,
  tone = 'default',
}: {
  label: string;
  value: string;
  description: string;
  tone?: 'default' | 'primary' | 'success';
}) {
  const toneColorMap = {
    default: 'fg.default',
    primary: 'fg.brand',
    success: 'status.success',
  } as const;

  return (
    <Panel tone="default" p="5">
      <Stat.Root>
        <Stack gap="3">
          <Stat.Label textStyle="label" color="fg.muted">
            {label}
          </Stat.Label>
          <Stat.ValueText textStyle="pageTitle" fontSize="3xl" color={toneColorMap[tone]}>
            {value}
          </Stat.ValueText>
          <Stat.HelpText textStyle="bodyMuted" color="fg.muted">
            {description}
          </Stat.HelpText>
        </Stack>
      </Stat.Root>
    </Panel>
  );
}
