import { NavLink } from './nav-link';

const items: Array<{
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
}> = [
  {
    href: '/app',
    label: 'Мои курсы',
    exact: true,
  },
  {
    href: '/courses',
    label: 'Каталог',
  },
  {
    href: '/app/profile',
    label: 'Профиль',
    disabled: true,
  },
];

export function PlatformNav() {
  return (
    <nav className="space-y-1">
      <p className="px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Личный кабинет
      </p>
      {items.map((item) => (
        <NavLink key={item.label} href={item.href} exact={item.exact} disabled={item.disabled}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
