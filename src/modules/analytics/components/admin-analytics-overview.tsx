import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { StatCard } from '@/components/branding';
import { Card } from '@/components/ui';
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
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="6">
        <StatCard
          label="Пользователи"
          value={formatCount(analytics.business.totalUsers)}
          description="Все зарегистрированные аккаунты платформы."
        />
        <StatCard
          label="Активные доступы"
          value={formatCount(analytics.business.totalEnrollments)}
          description="Enrollment-записи со статусом ACTIVE."
        />
        <StatCard
          label="Оплаченные заказы"
          value={formatCount(analytics.business.totalPaidOrders)}
          description="Подтверждённые покупки платных курсов."
          tone="primary"
        />
        <StatCard
          label="Выручка"
          value={formatAdminCurrency(analytics.business.totalRevenue)}
          description="Сумма всех оплаченных заказов."
          tone="success"
        />
      </SimpleGrid>

      <Card padding="lg" tone="muted">
        <Stack gap="6">
          <Stack gap="2" maxW="2xl">
            <Text textStyle="overline" color="fg.subtle">
              Простая воронка
            </Text>
            <Heading as="h2" textStyle="sectionTitle">
              От первого доступа до завершённого урока
            </Heading>
            <Text textStyle="bodyMuted" color="fg.muted">
              Метрики считаются только из enrollments, orders и lesson progress. Без отдельной event-системы и без
              тяжёлого аналитического слоя.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4">
            <StatCard
              label="Курс открыт"
              value={formatCount(analytics.funnel.courseOpened)}
              description="У пользователя появился активный доступ."
            />
            <StatCard
              label="Курс начат"
              value={formatCount(analytics.funnel.courseStarted)}
              description="Есть хотя бы один старт урока внутри курса."
            />
            <StatCard
              label="Урок начат"
              value={formatCount(analytics.funnel.lessonStarted)}
              description="Уроки в статусе IN_PROGRESS или COMPLETED."
            />
            <StatCard
              label="Урок завершён"
              value={formatCount(analytics.funnel.lessonCompleted)}
              description="Уроки со статусом COMPLETED."
            />
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
}
