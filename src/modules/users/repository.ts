import { db } from '@/lib/db';

export async function getUserById(userId: string) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email: normalizeEmail(email),
    },
  });
}

export async function listUsersForAdmin() {
  return db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
