import { notFound } from 'next/navigation';

import { DataList, HStack, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ContentArea, HeaderBar, PageLayout, SettingsPanel, SplitPageLayout } from '@/components/product';
import { Badge, Button, EmptyState, FormField, HelpTooltip, Select, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
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
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Пользователи"
        title={user.name ?? user.email}
        help="Карточка пользователя показывает текущие доступы и позволяет выдать курс вручную."
        actions={
          <ActionLink href="/admin/users" variant="outline">
            К списку
          </ActionLink>
        }
      />

      <SplitPageLayout
        content={
          <ContentArea gap="4">
            {user.enrollments.length === 0 ? (
              <EmptyState title="Пока нет доступов" description="Здесь появятся курсы, как только пользователю выдадут доступ или он приобретёт курс." />
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
                        <Stack gap="1">
                          <Text textStyle="bodyStrong" color="fg.default">
                            {enrollment.course.title}
                          </Text>
                          <Text textStyle="caption" color="fg.muted">
                            {formatAdminCurrency(enrollment.course.priceAmount)}
                          </Text>
                        </Stack>
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
                          <Text textStyle="caption" color="fg.muted">
                            Free-доступ определяется типом курса
                          </Text>
                        ) : enrollment.status === 'ACTIVE' ? (
                          <form action={revokeAccessAction}>
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="courseId" value={enrollment.course.id} />
                            <input type="hidden" name="returnPath" value={`/admin/users/${user.id}`} />
                            <Button type="submit" variant="danger">
                              Отозвать
                            </Button>
                          </form>
                        ) : (
                          <Text textStyle="caption" color="fg.muted">
                            Доступ уже отозван
                          </Text>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ContentArea>
        }
        sidebar={
          <Stack gap="4">
            <SettingsPanel>
              <Stack gap="4">
                <Stack gap="1">
                  <HStack gap="2" align="center">
                    <Text textStyle="sectionTitle" color="fg.default">
                      Карточка пользователя
                    </Text>
                    <HelpTooltip content="Основные данные учетной записи без отдельного профиля." label="Пояснение к карточке пользователя" />
                  </HStack>
                </Stack>

                <DataList.Root orientation="horizontal" gap="3">
                  <DataList.Item>
                    <DataList.ItemLabel>Email</DataList.ItemLabel>
                    <DataList.ItemValue>{user.email}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Роль</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Badge tone={getRoleTone(user.role)}>{getRoleLabel(user.role)}</Badge>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Зарегистрирован</DataList.ItemLabel>
                    <DataList.ItemValue>{formatAdminDate(user.createdAt)}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Всего доступов</DataList.ItemLabel>
                    <DataList.ItemValue>{user.enrollmentsCount}</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Stack>
            </SettingsPanel>

            <SettingsPanel>
              <Stack gap="4">
                <Stack gap="1">
                  <HStack gap="2" align="center">
                    <Text textStyle="sectionTitle" color="fg.default">
                      Выдать доступ вручную
                    </Text>
                    <HelpTooltip
                      content="Используйте ручную выдачу для поддержки, тестирования и согласованных исключений."
                      label="Пояснение к ручной выдаче доступа"
                    />
                  </HStack>
                </Stack>

                <form action={grantAccessAction}>
                  <Stack gap="4">
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="returnPath" value={`/admin/users/${user.id}`} />
                    <FormField id="courseId" label="Курс">
                      <Select id="courseId" name="courseId" defaultValue={courses[0]?.id} required>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                    <Button type="submit" variant="secondary" w="full" disabled={courses.length === 0}>
                      Выдать доступ
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </SettingsPanel>
          </Stack>
        }
      />
    </PageLayout>
  );
}
