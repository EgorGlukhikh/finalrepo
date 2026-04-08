import type { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

export const enrollmentSummarySelect = {
  id: true,
  status: true,
  accessSource: true,
  createdAt: true,
  updatedAt: true,
  course: {
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      coverImageUrl: true,
      status: true,
      accessType: true,
      priceAmount: true,
      publishedAt: true,
    },
  },
} satisfies Prisma.EnrollmentSelect;

export type EnrollmentSummaryRow = Prisma.EnrollmentGetPayload<{
  select: typeof enrollmentSummarySelect;
}>;

export const adminEnrollmentSelect = {
  id: true,
  status: true,
  accessSource: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  },
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
} satisfies Prisma.EnrollmentSelect;

export type AdminEnrollmentRow = Prisma.EnrollmentGetPayload<{
  select: typeof adminEnrollmentSelect;
}>;

export async function listUserEnrollmentRows(userId: string) {
  return db.enrollment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: enrollmentSummarySelect,
  });
}

export async function findEnrollmentRow(userId: string, courseId: string) {
  return db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    select: {
      id: true,
      status: true,
      accessSource: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function upsertEnrollmentRow(
  userId: string,
  courseId: string,
  accessSource: 'FREE' | 'PURCHASE' | 'MANUAL',
) {
  return db.enrollment.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      status: 'ACTIVE',
      accessSource,
    },
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      course: {
        connect: {
          id: courseId,
        },
      },
      status: 'ACTIVE',
      accessSource,
    },
    select: {
      id: true,
      status: true,
      accessSource: true,
      createdAt: true,
      updatedAt: true,
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          coverImageUrl: true,
          status: true,
          accessType: true,
          priceAmount: true,
          publishedAt: true,
        },
      },
    },
  });
}

export async function listEnrollmentRowsForAdmin(filters?: { userQuery?: string; courseQuery?: string }) {
  const userQuery = filters?.userQuery?.trim();
  const courseQuery = filters?.courseQuery?.trim();

  return db.enrollment.findMany({
    where: {
      ...(userQuery
        ? {
            OR: [
              {
                user: {
                  email: {
                    contains: userQuery,
                    mode: 'insensitive',
                  },
                },
              },
              {
                user: {
                  name: {
                    contains: userQuery,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {}),
      ...(courseQuery
        ? {
            course: {
              OR: [
                {
                  title: {
                    contains: courseQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  slug: {
                    contains: courseQuery,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          }
        : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: adminEnrollmentSelect,
  });
}

export async function upsertFreeEnrollment(userId: string, courseId: string) {
  return upsertEnrollmentRow(userId, courseId, 'FREE');
}

export async function upsertPurchaseEnrollment(userId: string, courseId: string) {
  return upsertEnrollmentRow(userId, courseId, 'PURCHASE');
}

export async function upsertManualEnrollment(userId: string, courseId: string) {
  return upsertEnrollmentRow(userId, courseId, 'MANUAL');
}

export async function revokeEnrollmentRow(userId: string, courseId: string) {
  return db.enrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    data: {
      status: 'REVOKED',
    },
    select: adminEnrollmentSelect,
  });
}
