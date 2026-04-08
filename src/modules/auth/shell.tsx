import type { ReactNode } from 'react';
import type { Session } from 'next-auth';
import { UserRole } from '@prisma/client';

import { getAuthSession } from './session';
import { requireAdmin, requireUser } from './access';
import { GuestActions } from './components/guest-actions';
import { SessionMenu, type SessionMenuView } from './components/session-menu';

type SessionUser = NonNullable<Session['user']>;

function buildSessionMenuView(user: SessionUser, homeHref: string, homeLabel: string): SessionMenuView {
  return {
    displayName: user.name ?? user.email ?? 'Профиль',
    roleLabel: user.role === UserRole.ADMIN ? 'Админ' : 'Ученик',
    homeHref,
    homeLabel,
    showAdminLink: user.role === UserRole.ADMIN && homeHref !== '/admin',
  };
}

export async function getPublicHeaderActions(): Promise<ReactNode> {
  const session = await getAuthSession();

  if (!session?.user) {
    return <GuestActions />;
  }

  return <SessionMenu view={buildSessionMenuView(session.user, '/app', 'Кабинет')} />;
}

export async function getPlatformHeaderActions(): Promise<ReactNode> {
  const session = await requireUser('/app');

  return <SessionMenu view={buildSessionMenuView(session.user, '/app', 'Кабинет')} />;
}

export async function getAdminHeaderActions(): Promise<ReactNode> {
  const session = await requireAdmin('/admin');

  return <SessionMenu view={buildSessionMenuView(session.user, '/admin', 'Панель')} />;
}
