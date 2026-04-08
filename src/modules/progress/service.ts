import { LessonProgressStatus } from '@prisma/client';

import { getLessonAccessContextRowById } from '@/modules/courses/queries';

import {
  upsertLessonProgressRow,
  type LessonProgressRow,
} from './repository';
import { findLessonProgressRow as getLessonProgressRow, listUserProgressRows as listProgressRows } from './queries';
import type { LessonProgressNode } from './types';

function mapProgressRow(row: LessonProgressRow): LessonProgressNode {
  return {
    id: row.id,
    userId: row.userId,
    lessonId: row.lessonId,
    status: row.status,
    progressPercent: row.progressPercent,
    startedAt: row.startedAt,
    completedAt: row.completedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    lesson: {
      id: row.lesson.id,
      slug: row.lesson.slug,
      title: row.lesson.title,
      sortOrder: row.lesson.sortOrder,
      lessonType: row.lesson.lessonType,
      module: {
        id: row.lesson.module.id,
        title: row.lesson.module.title,
        sortOrder: row.lesson.module.sortOrder,
        course: {
          id: row.lesson.module.course.id,
          title: row.lesson.module.course.title,
          slug: row.lesson.module.course.slug,
        },
      },
    },
  };
}

export async function getUserLessonProgress(userId: string) {
  const rows = await listProgressRows(userId);
  return rows.map(mapProgressRow);
}

export async function getLessonProgressForUser(userId: string, lessonId: string) {
  const row = await getLessonProgressRow(userId, lessonId);
  return row ? mapProgressRow(row) : null;
}

export async function markLessonStarted(userId: string, lessonId: string) {
  await ensureLessonExists(lessonId);

  const existing = await getLessonProgressRow(userId, lessonId);

  if (existing?.status === LessonProgressStatus.COMPLETED) {
    return mapProgressRow(existing);
  }

  const row = await upsertLessonProgressRow(userId, lessonId, {
    status: LessonProgressStatus.IN_PROGRESS,
    progressPercent: existing?.progressPercent ?? 0,
    startedAt: existing?.startedAt ?? new Date(),
    completedAt: null,
  });

  return mapProgressRow(row);
}

export async function markLessonCompleted(userId: string, lessonId: string) {
  await ensureLessonExists(lessonId);

  const existing = await getLessonProgressRow(userId, lessonId);
  const completedAt = new Date();

  const row = await upsertLessonProgressRow(userId, lessonId, {
    status: LessonProgressStatus.COMPLETED,
    progressPercent: 100,
    startedAt: existing?.startedAt ?? completedAt,
    completedAt,
  });

  return mapProgressRow(row);
}

async function ensureLessonExists(lessonId: string) {
  const lesson = await getLessonAccessContextRowById(lessonId);

  if (!lesson) {
    throw new Error('LESSON_NOT_FOUND');
  }
}
