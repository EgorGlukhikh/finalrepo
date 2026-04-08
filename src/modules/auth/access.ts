import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

import { getAuthSession } from './session';

function buildSignInUrl(callbackUrl: string) {
  return `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export async function requireGuest(redirectTo = '/app') {
  const session = await getAuthSession();

  if (session?.user) {
    redirect(redirectTo);
  }
}

export async function requireUser(callbackUrl = '/app') {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(buildSignInUrl(callbackUrl));
  }

  return session;
}

export async function requireAdmin(callbackUrl = '/admin') {
  const session = await requireUser(callbackUrl);

  if (session.user.role !== UserRole.ADMIN) {
    redirect('/app');
  }

  return session;
}
