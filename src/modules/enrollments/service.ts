import { CourseAccessType } from '@prisma/client';

import { grantFreeEnrollmentSchema, type GrantFreeEnrollmentInput } from './schemas';
import { getCourseAccessRowById } from '@/modules/courses/queries';
import { findEnrollmentRow, listUserEnrollmentRows } from './queries';
import {
  type EnrollmentSummaryRow,
  upsertFreeEnrollment,
  upsertPurchaseEnrollment,
} from './repository';
import type { EnrollmentSummary } from './types';

export async function enrollUserInFreeCourse(userId: string, courseId: string) {
  const course = await getCourseAccessRowById(courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  if (course.status !== 'PUBLISHED' || course.accessType !== CourseAccessType.FREE) {
    throw new Error('COURSE_NOT_FREE');
  }

  return upsertFreeEnrollment(userId, courseId);
}

export async function enrollUserInPaidCourse(userId: string, courseId: string) {
  const course = await getCourseAccessRowById(courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  if (course.status !== 'PUBLISHED' || course.accessType !== CourseAccessType.PAID) {
    throw new Error('COURSE_NOT_PAID');
  }

  return upsertPurchaseEnrollment(userId, courseId);
}

export async function getUserEnrollments(userId: string): Promise<EnrollmentSummary[]> {
  const rows = await listUserEnrollmentRows(userId);

  return rows.map((row: EnrollmentSummaryRow) => ({
    id: row.id,
    status: row.status,
    accessSource: row.accessSource,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    course: {
      id: row.course.id,
      title: row.course.title,
      slug: row.course.slug,
      shortDescription: row.course.shortDescription,
      coverImageUrl: row.course.coverImageUrl,
      status: row.course.status,
      accessType: row.course.accessType,
      priceAmount: row.course.priceAmount,
      publishedAt: row.course.publishedAt,
    },
  }));
}

export async function getEnrollmentForUser(userId: string, courseId: string) {
  return findEnrollmentRow(userId, courseId);
}

export async function grantFreeEnrollment(input: GrantFreeEnrollmentInput) {
  const parsed = grantFreeEnrollmentSchema.parse(input);
  return enrollUserInFreeCourse(parsed.userId, parsed.courseId);
}
