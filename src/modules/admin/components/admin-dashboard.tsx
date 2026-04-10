import {
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Panel } from '@/components/product';
import { HelpTooltip } from '@/components/ui';
import type { AdminDashboardAnalytics } from '@/modules/analytics';

import { AdminAnalyticsOverview } from '@/modules/analytics/components';

type AdminDashboardProps = {
  analytics: AdminDashboardAnalytics;
};

const numberFormatter = new Intl.NumberFormat('ru-RU');

export function AdminDashboard({ analytics }: AdminDashboardProps) {
  return (
    <Stack gap="10">
      <Stack gap="6">
        <Stack gap="3" maxW="3xl">
          <Text textStyle="overline" color="fg.subtle">
            Админка
          </Text>
          <Heading textStyle="pageTitle">Обзор платформы</Heading>
          <Text textStyle="body" color="fg.muted">
            Главные цифры, состояние операций и темп обучения. Все, что нужно для спокойного контроля.
          </Text>
        </Stack>
        <HStack gap="3" flexWrap="wrap">
          <ActionLink href="/admin/courses" variant="primary">
            Создать курс
          </ActionLink>
          <ActionLink href="/admin/orders" variant="secondary">
            Открыть отчеты по оплатам
          </ActionLink>
        </HStack>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="5">
        <KpiCard
          label="Курсы"
          value={numberFormatter.format(analytics.business.totalCourses)}
          hint="Все курсы, включая опубликованные и черновики."
          href="/admin/courses"
        />
        <KpiCard
          label="Пользователи"
          value={numberFormatter.format(analytics.business.totalUsers)}
          hint="Все зарегистрированные аккаунты платформы."
          href="/admin/users"
        />
        <KpiCard
          label="Активные заказы"
          value={numberFormatter.format(analytics.business.totalPaidOrders)}
          hint="Подтвержденные оплаты по курсам."
          href="/admin/orders"
        />
        <KpiCard
          label="Ошибки"
          value="0"
          hint="Появится после подключения мониторинга."
        />
      </SimpleGrid>

      <Grid gap={{ base: '6', xl: '8' }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.2fr) 20rem' }}>
        <GridItem>
          <Panel tone="muted" p={{ base: '6', md: '7' }} borderRadius="md">
            <Stack gap="4">
              <Stack gap="2">
                <Text textStyle="overline" color="fg.subtle">
                  Последние события
                </Text>
                <Heading as="h2" textStyle="sectionTitle" fontSize={{ base: 'xl', md: '2xl' }}>
                  Пока без активности
                </Heading>
              </Stack>
              <Text textStyle="body" color="fg.muted" maxW="2xl">
                Как только появятся первые оплаты, изменения курсов или обращения, вы увидите их здесь.
              </Text>
              <ActionLink href="/admin/orders" variant="outline" alignSelf="start">
                Перейти к оплатам
              </ActionLink>
            </Stack>
          </Panel>
        </GridItem>

        <GridItem>
          <Panel tone="default" p={{ base: '6', md: '7' }} borderRadius="md">
            <Stack gap="5">
              <Stack gap="2">
                <Text textStyle="overline" color="fg.subtle">
                  Состояние сервисов
                </Text>
                <Heading as="h3" textStyle="sectionTitle" fontSize="xl">
                  Мониторинг не подключен
                </Heading>
              </Stack>
              <VStack align="stretch" gap="3">
                <StatusRow label="API платформы" status="Не подключено" />
                <StatusRow label="Платежи" status="Не подключено" />
                <StatusRow label="Очереди" status="Не подключено" />
                <StatusRow label="Почта" status="Не подключено" />
              </VStack>
              <Text textStyle="bodyMuted" color="fg.subtle">
                Подключите мониторинг, и здесь появится статус в реальном времени.
              </Text>
            </Stack>
          </Panel>
        </GridItem>
      </Grid>

      <AdminAnalyticsOverview analytics={analytics} />
    </Stack>
  );
}

function KpiCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint: string;
  href?: string;
}) {
  return (
    <Panel tone="default" p="5" borderRadius="md">
      <Stack gap="4" h="full">
        <HStack gap="2" align="center">
          <Text textStyle="overline" color="fg.subtle">
            {label}
          </Text>
          <HelpTooltip content={hint} label={`Пояснение для метрики ${label}`} />
        </HStack>
        <Heading as="h3" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
          {value}
        </Heading>
        {href ? (
          <ActionLink href={href} variant="ghost" alignSelf="start" mt="auto">
            Открыть раздел
          </ActionLink>
        ) : null}
      </Stack>
    </Panel>
  );
}

function StatusRow({ label, status }: { label: string; status: string }) {
  return (
    <HStack justify="space-between" py="2">
      <Text textStyle="bodyStrong" color="fg.default">
        {label}
      </Text>
      <Text textStyle="bodyMuted" color="fg.subtle">
        {status}
      </Text>
    </HStack>
  );
}
