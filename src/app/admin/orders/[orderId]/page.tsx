import { notFound } from 'next/navigation';

import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, Card, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
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
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Заказы"
          title={`Заказ #${order.id}`}
          description="Базовая карточка платежа и история входящих payment events."
          actions={
            <ActionLink href="/admin/orders" variant="outline">
              К списку
            </ActionLink>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
          <Card padding="lg">
            <Stack gap="md">
              <div className="space-y-1">
                <h2 className="text-section font-semibold tracking-tight text-foreground">Сводка</h2>
                <p className="text-sm text-muted-foreground">Короткий операционный срез без финансового отчета.</p>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Статус</dt>
                  <dd className="mt-1">
                    <Badge tone={getOrderStatusTone(order.status)}>{getOrderStatusLabel(order.status)}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Сумма</dt>
                  <dd className="mt-1 text-foreground">{formatAdminCurrency(order.amount)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Пользователь</dt>
                  <dd className="mt-1 text-foreground">{order.user.name ?? order.user.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Курс</dt>
                  <dd className="mt-1 text-foreground">{order.course.title}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Создан</dt>
                  <dd className="mt-1 text-foreground">{formatAdminDate(order.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Оплачен</dt>
                  <dd className="mt-1 text-foreground">{formatAdminDate(order.paidAt)}</dd>
                </div>
              </dl>
            </Stack>
          </Card>

          {order.events.length === 0 ? (
            <EmptyState title="Событий пока нет" description="Когда Robokassa пришлет callback или redirect, они появятся здесь." />
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
                    <TableCell className="font-mono text-xs">{event.signatureValue}</TableCell>
                    <TableCell>{event.verified ? 'Да' : 'Нет'}</TableCell>
                    <TableCell>{formatAdminDate(event.receivedAt)}</TableCell>
                    <TableCell>{formatAdminDate(event.processedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Stack>
    </Section>
  );
}
