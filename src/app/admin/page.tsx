import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ActionBar, ContentArea, HeaderBar, PageLayout, Panel, Sidebar, SplitPageLayout } from '@/components/product';
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
    <PageLayout>
      <HeaderBar
        eyebrow="Админка"
        title="Операционный контур платформы"
        description="Курсы, доступы, пользователи и оплаты собраны в одном спокойном рабочем экране. Аналитика помогает ориентироваться, но не превращает админку в BI-систему."
      />

      <SplitPageLayout
        sidebar={
          <Sidebar>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="6">
              <OverviewCard
                href="/admin/courses"
                title="Курсы"
                value={courses.length}
                description="Публикация, доступ и вход в course workspace без лишних промежуточных форм."
              />
              <OverviewCard
                href="/admin/users"
                title="Пользователи"
                value={users.length}
                description="Роли, просмотры профилей и ручное управление доступом."
              />
              <OverviewCard
                href="/admin/enrollments"
                title="Доступ"
                value={enrollments.length}
                description="Активные и отозванные доступы с понятным источником: free, paid или manual."
              />
              <OverviewCard
                href="/admin/orders"
                title="Заказы"
                value={orders.length}
                description="Статусы оплат, связанные курсы и короткий платежный обзор без бухгалтерской перегрузки."
              />
            </SimpleGrid>
          </Sidebar>
        }
        content={
          <ContentArea>
            <Panel tone="highlight" p={{ base: '7', md: '8' }}>
              <SimpleGrid columns={{ base: 1, xl: 2 }} gap="8">
                <Stack gap="5" maxW="2xl">
                  <Text textStyle="overline" color="fg.subtle">
                    Рабочая зона
                  </Text>
                  <Heading textStyle="pageTitle" maxW="xl">
                    Всё, что влияет на доступ, выручку и публикацию курсов.
                  </Heading>
                  <Text textStyle="body" color="fg.muted" maxW="2xl">
                    На этой панели важнее ясность, чем плотность. Сначала ключевые сигналы по системе, затем прямые входы в операционные разделы.
                  </Text>
                </Stack>

                <Panel tone="muted">
                  <Stack gap="4">
                    <Text textStyle="overline" color="fg.subtle">
                      Фокус дня
                    </Text>
                    <Text textStyle="body" color="fg.default">
                      Если нужно быстро понять состояние продукта, начните с аналитики ниже. Если нужно действовать, откройте нужный раздел и работайте уже внутри него.
                    </Text>
                  </Stack>
                </Panel>
              </SimpleGrid>
            </Panel>

            <AdminAnalyticsOverview analytics={analytics} />
          </ContentArea>
        }
      />
    </PageLayout>
  );
}

function OverviewCard({
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
    <Panel tone="default" minH="15rem">
      <Stack gap="5" h="full">
        <Stack gap="3">
          <Text textStyle="overline" color="fg.subtle">
            {title}
          </Text>
          <Heading as="h2" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
            {value}
          </Heading>
          <Text textStyle="bodyMuted" color="fg.muted" maxW="lg">
            {description}
          </Text>
        </Stack>

        <ActionBar pt="2" mt="auto">
          <ActionLink href={href} variant="secondary">
            Открыть раздел
          </ActionLink>
        </ActionBar>
      </Stack>
    </Panel>
  );
}
