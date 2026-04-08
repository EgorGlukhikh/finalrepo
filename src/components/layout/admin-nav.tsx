import { NavLink } from './nav-link';

const items: Array<{
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
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
    href: '/admin/orders',
    label: 'Заказы',
    disabled: true,
  },
  {
    href: '/admin/users',
    label: 'Пользователи',
    disabled: true,
  },
];

export function AdminNav() {
  return (
    <nav className="space-y-1">
      <p className="px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Админка
      </p>
      {items.map((item) => (
        <NavLink key={item.label} href={item.href} exact={item.exact} disabled={item.disabled}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
