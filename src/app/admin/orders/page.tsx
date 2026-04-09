import { Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { HeaderBar, PageLayout } from '@/components/product';
import { Badge, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import { formatAdminCurrency, formatAdminDate, getOrderStatusLabel, getOrderStatusTone } from '@/modules/admin/format';
import { listOrders } from '@/modules/billing';

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Админка"
        title="Заказы и платежи"
        help="Список заказов, статусов оплаты и переходов к деталям."
      />

      {orders.length === 0 ? (
        <EmptyState title="Пока нет заказов" description="Платные заказы появятся здесь после первых покупок." />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Заказ</TableHeaderCell>
              <TableHeaderCell>Курс</TableHeaderCell>
              <TableHeaderCell>Пользователь</TableHeaderCell>
              <TableHeaderCell>Сумма</TableHeaderCell>
              <TableHeaderCell>Статус</TableHeaderCell>
              <TableHeaderCell>Создан</TableHeaderCell>
              <TableHeaderCell>Действия</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      {order.course.title}
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {order.course.slug}
                    </Text>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      {order.user.name ?? 'Без имени'}
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {order.user.email}
                    </Text>
                  </Stack>
                </TableCell>
                <TableCell>{formatAdminCurrency(order.amount)}</TableCell>
                <TableCell>
                  <Badge tone={getOrderStatusTone(order.status)}>{getOrderStatusLabel(order.status)}</Badge>
                </TableCell>
                <TableCell>{formatAdminDate(order.createdAt)}</TableCell>
                <TableCell>
                  <ActionLink href={`/admin/orders/${order.id}`} variant="secondary">
                    Детали
                  </ActionLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageLayout>
  );
}
