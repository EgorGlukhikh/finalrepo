import { ActionLink, Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { Card } from '@/components/ui';
import { listOrders } from '@/modules/billing';
import { listCoursesForAdmin } from '@/modules/courses';
import { listEnrollments } from '@/modules/enrollments';
import { listUsers } from '@/modules/users';

export default async function AdminHomePage() {
  const [courses, users, enrollments, orders] = await Promise.all([
    listCoursesForAdmin(),
    listUsers(),
    listEnrollments(),
    listOrders(),
  ]);

  return (
    <Section padding="lg">
      <Stack gap="xl">
        <SectionHeader
          eyebrow="Админка"
          title="Операционная панель"
          description="Рабочий контур для управления курсами, доступами, пользователями и оплатами. Без лишнего шума и декоративных дашбордов."
        />

        <Grid cols={2} gap="lg" className="xl:grid-cols-2">
          <OverviewCard
            href="/admin/courses"
            title="Курсы"
            value={courses.length}
            description="Список курсов, публикация и переход в конструктор."
          />
          <OverviewCard
            href="/admin/users"
            title="Пользователи"
            value={users.length}
            description="Роли, пользователи и ручная выдача доступа."
          />
          <OverviewCard
            href="/admin/enrollments"
            title="Доступ"
            value={enrollments.length}
            description="Активные и отозванные доступы с понятным источником."
          />
          <OverviewCard
            href="/admin/orders"
            title="Заказы"
            value={orders.length}
            description="Статусы платежей и базовый операционный обзор."
          />
        </Grid>
      </Stack>
    </Section>
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
    <Card padding="lg">
      <Stack gap="md">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <ActionLink href={href} variant="secondary">
          Открыть раздел
        </ActionLink>
      </Stack>
    </Card>
  );
}
