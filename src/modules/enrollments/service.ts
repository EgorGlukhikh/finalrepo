import { CourseAccessType } from '@prisma/client';

import {
  grantFreeEnrollmentSchema,
  grantManualEnrollmentSchema,
  revokeEnrollmentSchema,
  type GrantFreeEnrollmentInput,
  type GrantManualEnrollmentInput,
  type RevokeEnrollmentInput,
} from './schemas';
import { getCourseAccessRowById } from '@/modules/courses/queries';
import { findEnrollmentRow, listEnrollmentRowsForAdmin, listUserEnrollmentRows } from './queries';
import {
  revokeEnrollmentRow,
  type EnrollmentSummaryRow,
  upsertManualEnrollment,
  upsertFreeEnrollment,
  upsertPurchaseEnrollment,
} from './repository';
import type { AdminEnrollmentFilters, AdminEnrollmentListItem, EnrollmentSummary } from './types';

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

export async function listEnrollments(filters?: AdminEnrollmentFilters): Promise<AdminEnrollmentListItem[]> {
  const rows = await listEnrollmentRowsForAdmin(filters);

  return rows.map((row) => ({
    id: row.id,
    status: row.status,
    accessSource: row.accessSource,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    user: {
      id: row.user.id,
      name: row.user.name,
      email: row.user.email,
      image: row.user.image,
      role: row.user.role,
    },
    course: {
      id: row.course.id,
      title: row.course.title,
      slug: row.course.slug,
      accessType: row.course.accessType,
      status: row.course.status,
      priceAmount: row.course.priceAmount,
    },
  }));
}

export async function grantAccess(input: GrantManualEnrollmentInput) {
  const parsed = grantManualEnrollmentSchema.parse(input);
  const course = await getCourseAccessRowById(parsed.courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  return upsertManualEnrollment(parsed.userId, parsed.courseId);
}

export async function revokeAccess(input: RevokeEnrollmentInput) {
  const parsed = revokeEnrollmentSchema.parse(input);
  const course = await getCourseAccessRowById(parsed.courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  if (course.accessType === CourseAccessType.FREE) {
    throw new Error('FREE_COURSE_ACCESS_CANNOT_BE_REVOKED');
  }

  return revokeEnrollmentRow(parsed.userId, parsed.courseId);
}
