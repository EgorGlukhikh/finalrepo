import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import { formatAdminCurrency, formatAdminDate, getOrderStatusLabel, getOrderStatusTone } from '@/modules/admin/format';
import { listOrders } from '@/modules/billing';

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Админка"
          title="Заказы и платежи"
          description="Только операционный обзор: пользователь, курс, сумма, статус и переход в детали. Без отчетности и бухгалтерского слоя."
        />

        {orders.length === 0 ? (
          <EmptyState title="Пока нет заказов" description="Как только появятся платные покупки, они появятся здесь." />
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
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{order.course.title}</div>
                      <div className="text-xs text-muted-foreground">{order.course.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{order.user.name ?? 'Без имени'}</div>
                      <div className="text-xs text-muted-foreground">{order.user.email}</div>
                    </div>
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
      </Stack>
    </Section>
  );
}
