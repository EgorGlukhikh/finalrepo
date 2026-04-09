import { notFound } from 'next/navigation';

import { DataList, HStack, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ContentArea, HeaderBar, PageLayout, SettingsPanel, SplitPageLayout } from '@/components/product';
import { Badge, EmptyState, HelpTooltip, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import {
  formatAdminCurrency,
  formatAdminDate,
  getOrderStatusLabel,
  getOrderStatusTone,
  getPaymentEventLabel,
} from '@/modules/admin/format';
import { getOrderDetails } from '@/modules/billing';

type AdminOrderDetailsPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function AdminOrderDetailsPage({ params }: AdminOrderDetailsPageProps) {
  const { orderId } = await params;
  const order = await getOrderDetails(Number(orderId));

  if (!order) {
    notFound();
  }

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Заказы"
        title={`Заказ #${order.id}`}
        help="Здесь видны статус заказа и входящие события оплаты, связанные с callback и redirect."
        actions={
          <ActionLink href="/admin/orders" variant="outline">
            К списку
          </ActionLink>
        }
      />

      <SplitPageLayout
        sidebar={
          <SettingsPanel>
            <Stack gap="4">
              <Stack gap="1">
                <HStack gap="2" align="center">
                  <Text textStyle="sectionTitle" color="fg.default">
                    Сводка
                  </Text>
                  <HelpTooltip content="Карточка заказа для операционной проверки, без бухгалтерской отчетности." label="Пояснение к сводке заказа" />
                </HStack>
              </Stack>
              <DataList.Root orientation="horizontal" gap="3">
                <DataList.Item>
                  <DataList.ItemLabel>Статус</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Badge tone={getOrderStatusTone(order.status)}>{getOrderStatusLabel(order.status)}</Badge>
                  </DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Сумма</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminCurrency(order.amount)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Пользователь</DataList.ItemLabel>
                  <DataList.ItemValue>{order.user.name ?? order.user.email}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Курс</DataList.ItemLabel>
                  <DataList.ItemValue>{order.course.title}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Создан</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminDate(order.createdAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Оплачен</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminDate(order.paidAt)}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            </Stack>
          </SettingsPanel>
        }
        content={
          <ContentArea gap="4">
            {order.events.length === 0 ? (
              <EmptyState title="Событий пока нет" description="Когда Robokassa пришлёт callback или redirect, они появятся здесь." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Событие</TableHeaderCell>
                    <TableHeaderCell>Подпись</TableHeaderCell>
                    <TableHeaderCell>Проверено</TableHeaderCell>
                    <TableHeaderCell>Получено</TableHeaderCell>
                    <TableHeaderCell>Обработано</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{getPaymentEventLabel(event.eventType)}</TableCell>
                      <TableCell>
                        <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                          {event.signatureValue}
                        </Text>
                      </TableCell>
                      <TableCell>{event.verified ? 'Да' : 'Нет'}</TableCell>
                      <TableCell>{formatAdminDate(event.receivedAt)}</TableCell>
                      <TableCell>{formatAdminDate(event.processedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ContentArea>
        }
      />
    </PageLayout>
  );
}
