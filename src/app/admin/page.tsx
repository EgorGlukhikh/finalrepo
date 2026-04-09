import { Grid, GridItem, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Panel } from '@/components/product';
import { HelpTooltip } from '@/components/ui';
import { getAdminDashboardAnalytics } from '@/modules/analytics';
import { AdminAnalyticsOverview } from '@/modules/analytics/components';

export default async function AdminHomePage() {
  const analytics = await getAdminDashboardAnalytics();

  return (
    <Stack gap="10">
      <Grid gap={{ base: '6', xl: '8' }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.2fr) 20rem' }} alignItems="start">
        <GridItem>
          <Panel tone="highlight" p={{ base: '7', md: '8' }}>
            <Stack gap="6" maxW="3xl">
              <Text textStyle="overline" color="fg.subtle">
                Админка
              </Text>
              <Heading textStyle="pageTitle" maxW="3xl">
                Курсы, пользователи, доступ и платежи
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" pt="2">
                <QuickAccessCard
                  href="/admin/courses"
                  title="Курсы"
                  value={analytics.business.totalCourses}
                  help="Список курсов, публикация и переход в конструктор."
                />
                <QuickAccessCard
                  href="/admin/users"
                  title="Пользователи"
                  value={analytics.business.totalUsers}
                  help="Учетные записи, роли и доступ к курсам."
                />
                <QuickAccessCard
                  href="/admin/enrollments"
                  title="Доступ"
                  value={analytics.business.totalEnrollments}
                  help="Активные и отозванные доступы с источником выдачи."
                />
                <QuickAccessCard
                  href="/admin/orders"
                  title="Заказы"
                  value={analytics.business.totalPaidOrders}
                  help="Оплаченные заказы и переход к деталям платежа."
                />
              </SimpleGrid>
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
                <MetricRow label="Пользователи" value={String(analytics.business.totalUsers)} />
                <MetricRow label="Активные доступы" value={String(analytics.business.totalEnrollments)} />
                <MetricRow label="Оплаченные заказы" value={String(analytics.business.totalPaidOrders)} />
              </Stack>
            </Stack>
          </Panel>
        </GridItem>
      </Grid>

      <AdminAnalyticsOverview analytics={analytics} />
    </Stack>
  );
}

function QuickAccessCard({
  href,
  title,
  value,
  help,
}: {
  href: string;
  title: string;
  value: number;
  help: string;
}) {
  return (
    <Panel tone="default" p="5">
      <Stack gap="4" h="full">
        <Stack gap="2">
          <HStack gap="2" align="center">
            <Text textStyle="overline" color="fg.subtle">
              {title}
            </Text>
            <HelpTooltip content={help} label={`Пояснение для раздела ${title}`} />
          </HStack>
          <HStack align="end" gap="3">
            <Heading as="h2" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
              {value}
            </Heading>
          </HStack>
        </Stack>

        <ActionLink href={href} variant="secondary" alignSelf="start" mt="auto">
          Открыть раздел
        </ActionLink>
      </Stack>
    </Panel>
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
