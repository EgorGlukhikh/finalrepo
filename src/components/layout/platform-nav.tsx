import type { ReactNode } from 'react';

import { BookIcon, BookOpenIcon, EyeIcon } from '@/components/branding';

import { NavLink } from './nav-link';

const items: Array<{
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}> = [
  {
    href: '/app',
    label: 'Мои курсы',
    exact: true,
    icon: <BookOpenIcon size={16} />,
  },
  {
    href: '/courses',
    label: 'Каталог',
    icon: <BookIcon size={16} />,
  },
  {
    href: '/app/profile',
    label: 'Профиль',
    disabled: true,
    icon: <EyeIcon size={16} />,
  },
];

export function PlatformNav() {
  return (
    <nav className="space-y-1">
      <p className="px-3 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Личный кабинет
      </p>
      {items.map((item) => (
        <NavLink key={item.label} href={item.href} exact={item.exact} disabled={item.disabled} icon={item.icon}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
