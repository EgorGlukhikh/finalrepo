import { ActionLink, Inline, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, Button, EmptyState, Input, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import {
  formatAdminDate,
  getAccessTypeLabel,
  getEnrollmentSourceLabel,
  getEnrollmentSourceTone,
  getEnrollmentStatusLabel,
  getEnrollmentStatusTone,
} from '@/modules/admin/format';
import { listEnrollments } from '@/modules/enrollments';
import { revokeAccessAction } from '@/modules/enrollments/actions';

type AdminEnrollmentsPageProps = {
  searchParams?: Promise<{
    user?: string;
    course?: string;
  }>;
};

export default async function AdminEnrollmentsPage({ searchParams }: AdminEnrollmentsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const userQuery = resolvedSearchParams.user ?? '';
  const courseQuery = resolvedSearchParams.course ?? '';
  const enrollments = await listEnrollments({
    userQuery,
    courseQuery,
  });
  const returnPath = `/admin/enrollments?user=${encodeURIComponent(userQuery)}&course=${encodeURIComponent(courseQuery)}`;

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Админка"
          title="Доступ и зачисления"
          description="Здесь видно, почему пользователь имеет доступ: free, paid или manual. Отзыв не дублирует биллинг и не придумывает лишнюю permission-систему."
        />

        <form className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <Input name="user" defaultValue={userQuery} placeholder="Фильтр по email или имени" />
          <Input name="course" defaultValue={courseQuery} placeholder="Фильтр по курсу или slug" />
          <Button type="submit" variant="secondary">
            Применить
          </Button>
        </form>

        {enrollments.length === 0 ? (
          <EmptyState title="Совпадений нет" description="Попробуйте снять фильтры или дождитесь первых enrollments." />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Пользователь</TableHeaderCell>
                <TableHeaderCell>Курс</TableHeaderCell>
                <TableHeaderCell>Источник</TableHeaderCell>
                <TableHeaderCell>Статус</TableHeaderCell>
                <TableHeaderCell>Создан</TableHeaderCell>
                <TableHeaderCell>Действия</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{enrollment.user.name ?? 'Без имени'}</div>
                      <div className="text-xs text-muted-foreground">{enrollment.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{enrollment.course.title}</div>
                      <div className="text-xs text-muted-foreground">{getAccessTypeLabel(enrollment.course.accessType)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge tone={getEnrollmentSourceTone(enrollment.accessSource)}>{getEnrollmentSourceLabel(enrollment.accessSource)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge tone={getEnrollmentStatusTone(enrollment.status)}>{getEnrollmentStatusLabel(enrollment.status)}</Badge>
                  </TableCell>
                  <TableCell>{formatAdminDate(enrollment.createdAt)}</TableCell>
                  <TableCell>
                    <Inline className="gap-2">
                      <ActionLink href={`/admin/users/${enrollment.user.id}`} variant="ghost">
                        Пользователь
                      </ActionLink>
                      {enrollment.accessSource === 'FREE' ? (
                        <span className="text-xs text-muted-foreground">Free-доступ нельзя отозвать точечно</span>
                      ) : enrollment.status === 'ACTIVE' ? (
                        <form action={revokeAccessAction}>
                          <input type="hidden" name="userId" value={enrollment.user.id} />
                          <input type="hidden" name="courseId" value={enrollment.course.id} />
                          <input type="hidden" name="returnPath" value={returnPath} />
                          <Button type="submit" size="sm" variant="danger">
                            Отозвать
                          </Button>
                        </form>
                      ) : null}
                    </Inline>
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
