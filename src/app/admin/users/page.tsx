import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import { formatAdminDate, getRoleLabel, getRoleTone } from '@/modules/admin/format';
import { listUsers } from '@/modules/users';

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Админка"
          title="Пользователи"
          description="Операционный список пользователей без лишнего профайл-шума: роль, дата регистрации и доступы к курсам."
        />

        {users.length === 0 ? (
          <EmptyState title="Пользователей пока нет" description="Когда в системе появятся пользователи, они появятся здесь." />
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
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{user.name ?? 'Без имени'}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
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
      </Stack>
    </Section>
  );
}
