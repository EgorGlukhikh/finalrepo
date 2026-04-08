import { cn } from '@/lib/cn';

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
    <nav className={cn(isHorizontal ? 'flex flex-wrap items-center gap-2' : 'space-y-1')}>
      <p
        className={cn(
          'text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground',
          isHorizontal ? 'pr-2' : 'px-3 pb-1',
        )}
      >
        Админка
      </p>
      {items.map((item) => (
        <NavLink
          key={item.label}
          href={item.href}
          exact={item.exact}
          className={cn(isHorizontal ? 'min-h-9 px-3 py-1.5' : undefined)}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
