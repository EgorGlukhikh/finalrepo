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

export async function upsertFreeEnrollment(userId: string, courseId: string) {
  return db.enrollment.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      status: 'ACTIVE',
      accessSource: 'FREE',
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
      accessSource: 'FREE',
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
