import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Session } from 'next-auth';

const { redirectMock } = vi.hoisted(() => ({
  redirectMock: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock('./session', () => ({
  getAuthSession: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: redirectMock,
}));

import { requireAdmin, requireGuest, requireUser } from './access';
import { getAuthSession } from './session';

const mockGetAuthSession = vi.mocked(getAuthSession);

function buildSession(role: 'USER' | 'ADMIN' = 'USER'): Session {
  return {
    user: {
      id: 'user_1',
      name: 'Test User',
      email: 'test@example.com',
      image: null,
      role,
    },
    expires: '2099-01-01T00:00:00.000Z',
  };
}

beforeEach(() => {
  redirectMock.mockClear();
  mockGetAuthSession.mockReset();
});

describe('auth access guards', () => {
  it('redirects anonymous users to sign in from requireUser', async () => {
    mockGetAuthSession.mockResolvedValueOnce(null);

    await expect(requireUser('/app')).rejects.toThrow('REDIRECT:/sign-in?callbackUrl=%2Fapp');
  });

  it('redirects non-admin users away from admin routes', async () => {
    mockGetAuthSession.mockResolvedValueOnce(buildSession('USER'));

    await expect(requireAdmin('/admin')).rejects.toThrow('REDIRECT:/app');
  });

  it('allows admins through requireAdmin', async () => {
    const session = buildSession('ADMIN');
    mockGetAuthSession.mockResolvedValueOnce(session);

    await expect(requireAdmin('/admin')).resolves.toMatchObject(session);
  });

  it('lets anonymous visitors through requireGuest', async () => {
    mockGetAuthSession.mockResolvedValueOnce(null);

    await expect(requireGuest('/app')).resolves.toBeUndefined();
  });
});
