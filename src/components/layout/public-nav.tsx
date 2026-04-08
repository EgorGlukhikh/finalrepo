import { BookIcon } from '@/components/branding';

import { NavLink } from './nav-link';

export function PublicNav() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <nav className="hidden items-center gap-2 md:flex">
        <NavLink href="/courses" icon={<BookIcon size={16} />}>
          Курсы
        </NavLink>
        <NavLink href="/app" exact>
          Кабинет
        </NavLink>
      </nav>
    </div>
  );
}
