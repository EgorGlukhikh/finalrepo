import { Prisma, UserRole } from '@prisma/client';

import { getUserByEmail } from '@/modules/users';
import { db } from '@/lib/db';

import { AuthError } from './errors';
import { comparePassword, hashPassword } from './password';
import { signInSchema, signUpSchema, type SignInInput, type SignUpInput } from './schema';

export async function registerUser(input: SignUpInput) {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    throw new AuthError('INVALID_INPUT', 'РџСЂРѕРІРµСЂСЊС‚Рµ РґР°РЅРЅС‹Рµ С„РѕСЂРјС‹', 400);
  }

  const email = parsed.data.email.trim().toLowerCase();
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new AuthError('EMAIL_TAKEN', 'РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЃ С‚Р°РєРёРј email СѓР¶Рµ СЃСѓС‰РµСЃС‚РІСѓРµС‚', 409);
  }

  try {
    return await db.user.create({
      data: {
        email,
        name: parsed.data.name ?? null,
        passwordHash: await hashPassword(parsed.data.password),
        role: UserRole.USER,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AuthError('EMAIL_TAKEN', 'Пользователь с таким email уже существует', 409);
    }

    throw error;
  }
}

export async function validateCredentials(input: SignInInput) {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return null;
  }

  const user = await getUserByEmail(parsed.data.email);

  if (!user) {
    return null;
  }

  const passwordMatches = await comparePassword(parsed.data.password, user.passwordHash);

  return passwordMatches ? user : null;
}
