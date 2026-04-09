import { Grid, GridItem, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Panel } from '@/components/product';
import { getAdminDashboardAnalytics } from '@/modules/analytics';
import { AdminAnalyticsOverview } from '@/modules/analytics/components';
import { listOrders } from '@/modules/billing';
import { listCoursesForAdmin } from '@/modules/courses';
import { listEnrollments } from '@/modules/enrollments';
import { listUsers } from '@/modules/users';

export default async function AdminHomePage() {
  const [courses, users, enrollments, orders, analytics] = await Promise.all([
    listCoursesForAdmin(),
    listUsers(),
    listEnrollments(),
    listOrders(),
    getAdminDashboardAnalytics(),
  ]);

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
                Один рабочий экран для курсов, доступов, пользователей и заказов.
              </Heading>
              <Text textStyle="body" color="fg.muted" maxW="2xl">
                Здесь важно не количество блоков, а скорость ориентирования. Сначала ключевые сигналы по системе, затем короткий путь в нужный операционный раздел.
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" pt="2">
                <QuickAccessCard
                  href="/admin/courses"
                  title="Курсы"
                  value={courses.length}
                  description="Публикация, workspace и структура программ."
                />
                <QuickAccessCard
                  href="/admin/users"
                  title="Пользователи"
                  value={users.length}
                  description="Роли, профили и ручное управление доступом."
                />
                <QuickAccessCard
                  href="/admin/enrollments"
                  title="Доступ"
                  value={enrollments.length}
                  description="Активные и отозванные доступы с понятным источником."
                />
                <QuickAccessCard
                  href="/admin/orders"
                  title="Заказы"
                  value={orders.length}
                  description="Платежи, статусы и связанные курсы."
                />
              </SimpleGrid>
            </Stack>
          </Panel>
        </GridItem>

        <GridItem>
          <Panel tone="muted" p="6">
            <Stack gap="4">
              <Text textStyle="overline" color="fg.subtle">
                Фокус дня
              </Text>
              <Text textStyle="body" color="fg.default">
                Если нужно быстро понять общее состояние платформы, начните с аналитики ниже. Если нужно действовать, открывайте раздел и работайте уже внутри него.
              </Text>
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
  description,
}: {
  href: string;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <Panel tone="default" p="5">
      <Stack gap="4" h="full">
        <Stack gap="2">
          <Text textStyle="overline" color="fg.subtle">
            {title}
          </Text>
          <HStack align="end" gap="3">
            <Heading as="h2" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
              {value}
            </Heading>
          </HStack>
          <Text textStyle="bodyMuted" color="fg.muted" maxW="lg">
            {description}
          </Text>
        </Stack>

        <ActionLink href={href} variant="secondary" alignSelf="start" mt="auto">
          Открыть раздел
        </ActionLink>
      </Stack>
    </Panel>
  );
}
