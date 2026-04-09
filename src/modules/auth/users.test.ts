import { Prisma } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/users', () => ({
  getUserByEmail: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      create: vi.fn(),
    },
  },
}));

vi.mock('./password', () => ({
  comparePassword: vi.fn(),
  hashPassword: vi.fn(),
}));

import { db } from '@/lib/db';
import { getUserByEmail } from '@/modules/users';

import { hashPassword } from './password';
import { registerUser } from './users';

const mockGetUserByEmail = vi.mocked(getUserByEmail);
const mockCreateUser = vi.mocked(db.user.create);
const mockHashPassword = vi.mocked(hashPassword);

function buildUniqueConstraintError() {
  return new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
    code: 'P2002',
    clientVersion: '6.0.0',
  });
}

beforeEach(() => {
  mockGetUserByEmail.mockReset();
  mockCreateUser.mockReset();
  mockHashPassword.mockReset();
  mockHashPassword.mockResolvedValue('hashed-password');
});

describe('registerUser', () => {
  it('maps concurrent unique-email races to EMAIL_TAKEN', async () => {
    mockGetUserByEmail.mockResolvedValueOnce(null);
    mockCreateUser.mockRejectedValueOnce(buildUniqueConstraintError());

    await expect(
      registerUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      }),
    ).rejects.toMatchObject({ code: 'EMAIL_TAKEN', status: 409 });
  });
});
