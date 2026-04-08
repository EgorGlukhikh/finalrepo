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
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });
}

export async function getUserDetailsRowById(userId: string) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
      enrollments: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          status: true,
          accessSource: true,
          createdAt: true,
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              accessType: true,
              status: true,
              priceAmount: true,
            },
          },
        },
      },
    },
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
