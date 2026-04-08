import { StatCard } from '@/components/branding';
import { Grid, Stack } from '@/components/layout';
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
    <Stack gap="lg">
      <Grid cols={4} gap="lg">
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
          description="Подтвержденные покупки платных курсов."
          tone="primary"
        />
        <StatCard
          label="Выручка"
          value={formatAdminCurrency(analytics.business.totalRevenue)}
          description="Сумма всех оплаченных заказов."
          tone="success"
        />
      </Grid>

      <Card padding="lg">
        <Stack gap="md">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Простая воронка</p>
            <p className="text-sm text-muted-foreground">
              Считается только из access, orders и lesson progress. Без внешнего event-трекинга.
            </p>
          </div>

          <Grid cols={4} gap="md">
            <StatCard label="Курс открыт" value={formatCount(analytics.funnel.courseOpened)} description="У пользователя появился активный доступ." />
            <StatCard label="Курс начат" value={formatCount(analytics.funnel.courseStarted)} description="Есть хотя бы один старт урока внутри курса." />
            <StatCard label="Урок начат" value={formatCount(analytics.funnel.lessonStarted)} description="Уроки в статусе IN_PROGRESS или COMPLETED." />
            <StatCard label="Урок завершен" value={formatCount(analytics.funnel.lessonCompleted)} description="Уроки со статусом COMPLETED." />
          </Grid>
        </Stack>
      </Card>
    </Stack>
  );
}
