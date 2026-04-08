import type { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

export const lessonProgressSelect = {
  id: true,
  userId: true,
  lessonId: true,
  status: true,
  progressPercent: true,
  startedAt: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
  lesson: {
    select: {
      id: true,
      slug: true,
      title: true,
      sortOrder: true,
      lessonType: true,
      module: {
        select: {
          id: true,
          title: true,
          sortOrder: true,
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.LessonProgressSelect;

export type LessonProgressRow = Prisma.LessonProgressGetPayload<{
  select: typeof lessonProgressSelect;
}>;

export async function listUserProgressRows(userId: string) {
  return db.lessonProgress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    select: lessonProgressSelect,
  });
}

export async function findLessonProgressRow(userId: string, lessonId: string) {
  return db.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    select: lessonProgressSelect,
  });
}

export async function upsertLessonProgressRow(
  userId: string,
  lessonId: string,
  data: Pick<Prisma.LessonProgressUncheckedCreateInput, 'status' | 'progressPercent' | 'startedAt' | 'completedAt'>,
) {
  return db.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: data,
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      lesson: {
        connect: {
          id: lessonId,
        },
      },
      ...data,
    },
    select: lessonProgressSelect,
  });
}
