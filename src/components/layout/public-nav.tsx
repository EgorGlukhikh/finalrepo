import { NavLink } from './nav-link';

export function PublicNav() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <nav className="hidden items-center gap-1 md:flex">
        <NavLink href="/courses" disabled>
          Курсы
        </NavLink>
        <NavLink href="/design-system">Система</NavLink>
      </nav>
    </div>
  );
}
