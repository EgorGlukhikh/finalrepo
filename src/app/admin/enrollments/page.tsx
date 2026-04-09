import { Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ActionBar, HeaderBar, PageLayout, Panel } from '@/components/product';
import { Badge, Button, EmptyState, FormField, Input, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
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
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Админка"
        title="Доступ и зачисления"
        description="Здесь видно, почему пользователь имеет доступ: free, paid или manual. Отзыв не дублирует биллинг и не придумывает лишнюю permission-систему."
      />

      <Panel tone="muted">
        <form>
          <Stack gap="4">
            <FormField id="user" label="Пользователь">
              <Input id="user" name="user" defaultValue={userQuery} placeholder="Фильтр по email или имени" />
            </FormField>
            <FormField id="course" label="Курс">
              <Input id="course" name="course" defaultValue={courseQuery} placeholder="Фильтр по курсу или slug" />
            </FormField>
            <ActionBar>
              <Button type="submit" variant="secondary">
                Применить
              </Button>
            </ActionBar>
          </Stack>
        </form>
      </Panel>

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
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      {enrollment.user.name ?? 'Без имени'}
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {enrollment.user.email}
                    </Text>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      {enrollment.course.title}
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {getAccessTypeLabel(enrollment.course.accessType)}
                    </Text>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Badge tone={getEnrollmentSourceTone(enrollment.accessSource)}>{getEnrollmentSourceLabel(enrollment.accessSource)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge tone={getEnrollmentStatusTone(enrollment.status)}>{getEnrollmentStatusLabel(enrollment.status)}</Badge>
                </TableCell>
                <TableCell>{formatAdminDate(enrollment.createdAt)}</TableCell>
                <TableCell>
                  <ActionBar>
                    <ActionLink href={`/admin/users/${enrollment.user.id}`} variant="ghost">
                      Пользователь
                    </ActionLink>
                    {enrollment.accessSource === 'FREE' ? (
                      <Text textStyle="caption" color="fg.muted">
                        Free-доступ нельзя отозвать точечно
                      </Text>
                    ) : enrollment.status === 'ACTIVE' ? (
                      <form action={revokeAccessAction}>
                        <input type="hidden" name="userId" value={enrollment.user.id} />
                        <input type="hidden" name="courseId" value={enrollment.course.id} />
                        <input type="hidden" name="returnPath" value={returnPath} />
                        <Button type="submit" variant="danger">
                          Отозвать
                        </Button>
                      </form>
                    ) : null}
                  </ActionBar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageLayout>
  );
}
