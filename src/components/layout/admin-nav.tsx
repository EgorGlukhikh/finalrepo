import { HStack, Stack, Text } from '@chakra-ui/react';

import { NavLink } from './nav-link';

const items: Array<{
  href: string;
  label: string;
  exact?: boolean;
}> = [
  {
    href: '/admin',
    label: 'Панель',
    exact: true,
  },
  {
    href: '/admin/courses',
    label: 'Курсы',
  },
  {
    href: '/admin/users',
    label: 'Пользователи',
  },
  {
    href: '/admin/enrollments',
    label: 'Доступ',
  },
  {
    href: '/admin/orders',
    label: 'Заказы',
  },
];

type AdminNavProps = {
  orientation?: 'horizontal' | 'vertical';
};

export function AdminNav({ orientation = 'vertical' }: AdminNavProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Stack as="nav" gap="3" align="stretch">
      <Text textStyle="overline" color="fg.subtle" px={isHorizontal ? '0' : '1'}>
        Админка
      </Text>
      {isHorizontal ? (
        <HStack gap="2" flexWrap="wrap">
          {items.map((item) => (
            <NavLink key={item.label} href={item.href} exact={item.exact}>
              {item.label}
            </NavLink>
          ))}
        </HStack>
      ) : (
        <Stack gap="1">
          {items.map((item) => (
            <NavLink key={item.label} href={item.href} exact={item.exact}>
              {item.label}
            </NavLink>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
