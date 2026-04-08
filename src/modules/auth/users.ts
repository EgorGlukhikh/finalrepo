import { UserRole } from '@prisma/client';

import { db } from '@/lib/db';

import { AuthError } from './errors';
import { comparePassword, hashPassword } from './password';
import { signInSchema, signUpSchema, type SignInInput, type SignUpInput } from './schema';

export async function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email: normalizeEmail(email),
    },
  });
}

export async function registerUser(input: SignUpInput) {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    throw new AuthError('INVALID_INPUT', 'Проверьте данные формы', 400);
  }

  const email = normalizeEmail(parsed.data.email);
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AuthError('EMAIL_TAKEN', 'Пользователь с таким email уже существует', 409);
  }

  return db.user.create({
    data: {
      email,
      name: parsed.data.name ?? null,
      passwordHash: await hashPassword(parsed.data.password),
      role: UserRole.USER,
    },
  });
}

export async function validateCredentials(input: SignInInput) {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return null;
  }

  const user = await findUserByEmail(parsed.data.email);

  if (!user) {
    return null;
  }

  const passwordMatches = await comparePassword(parsed.data.password, user.passwordHash);

  return passwordMatches ? user : null;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
