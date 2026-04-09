import { Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { HeaderBar, PageLayout } from '@/components/product';
import { Badge, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import { formatAdminDate, getRoleLabel, getRoleTone } from '@/modules/admin/format';
import { listUsers } from '@/modules/users';

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Админка"
        title="Пользователи"
        help="Пользователи, роли и доступ к курсам."
      />

      {users.length === 0 ? (
        <EmptyState title="Пользователей пока нет" description="Зарегистрированные пользователи появятся здесь." />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Пользователь</TableHeaderCell>
              <TableHeaderCell>Роль</TableHeaderCell>
              <TableHeaderCell>Доступы</TableHeaderCell>
              <TableHeaderCell>Создан</TableHeaderCell>
              <TableHeaderCell>Действия</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      {user.name ?? 'Без имени'}
                    </Text>
                    <Text textStyle="caption" color="fg.muted">
                      {user.email}
                    </Text>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Badge tone={getRoleTone(user.role)}>{getRoleLabel(user.role)}</Badge>
                </TableCell>
                <TableCell>{user.enrollmentsCount}</TableCell>
                <TableCell>{formatAdminDate(user.createdAt)}</TableCell>
                <TableCell>
                  <ActionLink href={`/admin/users/${user.id}`} variant="secondary">
                    Открыть
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
