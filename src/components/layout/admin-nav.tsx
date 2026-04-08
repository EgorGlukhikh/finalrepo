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

export function AdminNav() {
  return (
    <nav className="space-y-1">
      <p className="px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Админка</p>
      {items.map((item) => (
        <NavLink key={item.label} href={item.href} exact={item.exact}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
