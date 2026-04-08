import { notFound } from 'next/navigation';

import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, Button, Card, EmptyState, Label, Select, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import {
  formatAdminCurrency,
  formatAdminDate,
  getEnrollmentSourceLabel,
  getEnrollmentSourceTone,
  getEnrollmentStatusLabel,
  getEnrollmentStatusTone,
  getRoleLabel,
  getRoleTone,
} from '@/modules/admin/format';
import { listCoursesForAdmin } from '@/modules/courses';
import { grantAccessAction, revokeAccessAction } from '@/modules/enrollments/actions';
import { getUserDetails } from '@/modules/users';

type AdminUserDetailsPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function AdminUserDetailsPage({ params }: AdminUserDetailsPageProps) {
  const { userId } = await params;
  const [user, courses] = await Promise.all([getUserDetails(userId), listCoursesForAdmin()]);

  if (!user) {
    notFound();
  }

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Пользователи"
          title={user.name ?? user.email}
          description="Точка для ручной выдачи доступа и проверки, какие курсы уже открыты пользователю."
          actions={
            <ActionLink href="/admin/users" variant="outline">
              К списку
            </ActionLink>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <Stack gap="md">
            {user.enrollments.length === 0 ? (
              <EmptyState title="Пока нет доступов" description="Здесь появятся курсы, как только пользователю выдадут доступ или он приобретет курс." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Курс</TableHeaderCell>
                    <TableHeaderCell>Источник</TableHeaderCell>
                    <TableHeaderCell>Статус</TableHeaderCell>
                    <TableHeaderCell>Создан</TableHeaderCell>
                    <TableHeaderCell>Действия</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{enrollment.course.title}</div>
                          <div className="text-xs text-muted-foreground">{formatAdminCurrency(enrollment.course.priceAmount)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge tone={getEnrollmentSourceTone(enrollment.accessSource)}>
                          {getEnrollmentSourceLabel(enrollment.accessSource)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge tone={getEnrollmentStatusTone(enrollment.status)}>{getEnrollmentStatusLabel(enrollment.status)}</Badge>
                      </TableCell>
                      <TableCell>{formatAdminDate(enrollment.createdAt)}</TableCell>
                      <TableCell>
                        {enrollment.accessSource === 'FREE' ? (
                          <span className="text-xs text-muted-foreground">Free-доступ определяется типом курса</span>
                        ) : enrollment.status === 'ACTIVE' ? (
                          <form action={revokeAccessAction}>
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="courseId" value={enrollment.course.id} />
                            <input type="hidden" name="returnPath" value={`/admin/users/${user.id}`} />
                            <Button type="submit" size="sm" variant="danger">
                              Отозвать
                            </Button>
                          </form>
                        ) : (
                          <span className="text-xs text-muted-foreground">Доступ уже отозван</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Stack>

          <Stack gap="md">
            <Card padding="lg">
              <Stack gap="md">
                <div className="space-y-1">
                  <h2 className="text-section font-semibold tracking-tight text-foreground">Карточка пользователя</h2>
                  <p className="text-sm text-muted-foreground">Базовая информация без попытки строить “богатый профиль”.</p>
                </div>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Email</dt>
                    <dd className="mt-1 text-foreground">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Роль</dt>
                    <dd className="mt-1">
                      <Badge tone={getRoleTone(user.role)}>{getRoleLabel(user.role)}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Зарегистрирован</dt>
                    <dd className="mt-1 text-foreground">{formatAdminDate(user.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Всего доступов</dt>
                    <dd className="mt-1 text-foreground">{user.enrollmentsCount}</dd>
                  </div>
                </dl>
              </Stack>
            </Card>

            <Card padding="lg">
              <Stack gap="md">
                <div className="space-y-1">
                  <h2 className="text-section font-semibold tracking-tight text-foreground">Выдать доступ вручную</h2>
                  <p className="text-sm text-muted-foreground">Ручной доступ полезен для поддержки, тестирования и точечных договоренностей.</p>
                </div>
                <form action={grantAccessAction} className="space-y-4">
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="returnPath" value={`/admin/users/${user.id}`} />
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Курс</Label>
                    <Select id="courseId" name="courseId" defaultValue={courses[0]?.id} required>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Button type="submit" variant="secondary" className="w-full" disabled={courses.length === 0}>
                    Выдать доступ
                  </Button>
                </form>
              </Stack>
            </Card>
          </Stack>
        </div>
      </Stack>
    </Section>
  );
}
