import { Heading, SimpleGrid, Stack, Stat, Text } from '@chakra-ui/react';

import { Panel } from '@/components/product';
import { HelpTooltip } from '@/components/ui';
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
        <MetricCard
          label="Пользователи"
          value={formatCount(analytics.business.totalUsers)}
          description="Все зарегистрированные аккаунты на платформе."
        />
        <MetricCard
          label="Активные доступы"
          value={formatCount(analytics.business.totalEnrollments)}
          description="Доступы со статусом ACTIVE."
        />
        <MetricCard
          label="Оплаченные заказы"
          value={formatCount(analytics.business.totalPaidOrders)}
          description="Подтвержденные оплаты по курсам."
          tone="primary"
        />
        <MetricCard
          label="Выручка"
          value={formatAdminCurrency(analytics.business.totalRevenue)}
          description="Сумма подтвержденных платежей."
          tone="success"
        />
      </SimpleGrid>

      <Panel tone="muted" p="6" borderRadius="md">
        <Stack gap="6">
          <Stack gap="2" maxW="2xl">
            <Text textStyle="overline" color="fg.subtle">
              Пульс обучения
            </Text>
            <Heading as="h2" textStyle="sectionTitle">
              От первого входа до завершенного урока
            </Heading>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <MetricCard
              label="Курс открыт"
              value={formatCount(analytics.funnel.courseOpened)}
              description="Пользователь получил доступ к курсу."
            />
            <MetricCard
              label="Курс начат"
              value={formatCount(analytics.funnel.courseStarted)}
              description="Есть хотя бы один старт урока внутри курса."
            />
            <MetricCard
              label="Урок начат"
              value={formatCount(analytics.funnel.lessonStarted)}
              description="Уроки в статусе IN_PROGRESS или COMPLETED."
            />
            <MetricCard
              label="Урок завершен"
              value={formatCount(analytics.funnel.lessonCompleted)}
              description="Уроки со статусом COMPLETED."
            />
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
    <Panel tone="default" p="5" borderRadius="md">
      <Stat.Root>
        <Stack gap="3">
          <Stat.Label textStyle="label" color="fg.muted">
            <SimpleGrid columns={2} gap="2" alignItems="center" w="fit-content">
              <Text as="span" textStyle="label" color="fg.muted">
                {label}
              </Text>
              <HelpTooltip content={description} label={`Пояснение к метрике ${label}`} placement="top-start" />
            </SimpleGrid>
          </Stat.Label>
          <Stat.ValueText textStyle="pageTitle" fontSize="3xl" color={toneColorMap[tone]}>
            {value}
          </Stat.ValueText>
        </Stack>
      </Stat.Root>
    </Panel>
  );
}
