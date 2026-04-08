import { Prisma } from '@prisma/client';

import type {
  CreateCourseInput,
  CreateLessonInput,
  CreateModuleInput,
  UpdateCourseInput,
  UpdateLessonInput,
  UpdateModuleInput,
} from './schemas';
import {
  createCourseRecord,
  createLessonRecord,
  createModuleRecord,
  listPublishedCourseRows,
  nextLessonSortOrder,
  nextModuleSortOrder,
  updateCourseRecord,
  updateLessonRecord,
  updateModuleRecord,
} from './repository';
import { mapCourseListItem, mapCourseStructure } from './mappers';
import type { CourseAccessSummary, CourseListItem, CourseModuleNode, CourseStructure } from './types';
import {
  getCourseAccessRowById,
  getCourseStructureRowById,
  getCourseStructureRowBySlug,
  getLessonCourseIdByLessonId,
  getModuleCourseIdByModuleId,
} from './queries';
import { findEnrollmentRow } from '@/modules/enrollments/queries';
import {
  createCourseSchema,
  createLessonSchema,
  createModuleSchema,
  updateCourseSchema,
  updateLessonSchema,
  updateModuleSchema,
} from './schemas';

export async function listPublishedCourses(): Promise<CourseListItem[]> {
  const rows = await listPublishedCourseRows();
  return rows.map(mapCourseListItem);
}

export async function getCourseBySlug(
  slug: string,
  options?: { publishedOnly?: boolean },
): Promise<CourseStructure | null> {
  const row = await getCourseStructureRowBySlug(slug);

  if (!row) {
    return null;
  }

  if (options?.publishedOnly !== false && row.status !== 'PUBLISHED') {
    return null;
  }

  return mapCourseStructure(row);
}

export async function getCourseModules(
  input: { courseId: string } | { slug: string },
  options?: { publishedOnly?: boolean },
): Promise<CourseModuleNode[]> {
  const course = 'courseId' in input ? await getCourseStructureById(input.courseId) : await getCourseBySlug(input.slug, options);

  return course?.modules ?? [];
}

export async function getCourseStructureById(courseId: string): Promise<CourseStructure | null> {
  const row = await getCourseStructureRowById(courseId);
  return row ? mapCourseStructure(row) : null;
}

export async function createCourse(input: CreateCourseInput): Promise<CourseStructure> {
  const parsed = createCourseSchema.parse(input);
  const created = await createCourseRecord({
    title: parsed.title,
    slug: parsed.slug,
    shortDescription: parsed.shortDescription,
    description: parsed.description,
    coverImageUrl: parsed.coverImageUrl,
    status: parsed.status ?? 'DRAFT',
    accessType: parsed.accessType ?? 'PAID',
    priceAmount: parsed.priceAmount ?? null,
    publishedAt: parsed.status === 'PUBLISHED' ? new Date() : null,
    owner: parsed.ownerId
      ? {
          connect: {
            id: parsed.ownerId,
          },
        }
      : undefined,
  });

  const structure = await getCourseStructureById(created.id);

  if (!structure) {
    throw new Error('COURSE_CREATE_FAILED');
  }

  return structure;
}

export async function updateCourse(input: UpdateCourseInput): Promise<CourseStructure> {
  const parsed = updateCourseSchema.parse(input);

  await updateCourseRecord(parsed.courseId, {
    title: parsed.title,
    slug: parsed.slug,
    shortDescription: parsed.shortDescription,
    description: parsed.description,
    coverImageUrl: parsed.coverImageUrl,
    status: parsed.status,
    accessType: parsed.accessType,
    priceAmount: parsed.priceAmount ?? null,
    publishedAt:
      parsed.status === 'PUBLISHED'
        ? parsed.publishedAt ?? new Date()
        : parsed.publishedAt === null
          ? null
          : parsed.publishedAt,
    owner: parsed.ownerId
      ? {
          connect: {
            id: parsed.ownerId,
          },
        }
      : undefined,
  });

  const structure = await getCourseStructureById(parsed.courseId);

  if (!structure) {
    throw new Error('COURSE_UPDATE_FAILED');
  }

  return structure;
}

export async function createModule(input: CreateModuleInput): Promise<CourseStructure> {
  const parsed = createModuleSchema.parse(input);
  const sortOrder = parsed.sortOrder ?? (await nextModuleSortOrder(parsed.courseId));

  await createModuleRecord({
    course: {
      connect: {
        id: parsed.courseId,
      },
    },
    title: parsed.title,
    sortOrder,
    published: parsed.published ?? false,
    publishedAt: parsed.published ? parsed.publishedAt ?? new Date() : parsed.publishedAt ?? null,
  });

  const structure = await getCourseStructureById(parsed.courseId);

  if (!structure) {
    throw new Error('MODULE_CREATE_FAILED');
  }

  return structure;
}

export async function updateModule(input: UpdateModuleInput): Promise<CourseStructure> {
  const parsed = updateModuleSchema.parse(input);
  const existingCourseId = await getModuleCourseIdByModuleId(parsed.moduleId);

  if (!existingCourseId) {
    throw new Error('MODULE_NOT_FOUND');
  }

  await updateModuleRecord(parsed.moduleId, {
    course: parsed.courseId
      ? {
          connect: {
            id: parsed.courseId,
          },
        }
      : undefined,
    title: parsed.title,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
    publishedAt:
      parsed.published === true
        ? parsed.publishedAt ?? new Date()
        : parsed.publishedAt === null
          ? null
          : parsed.publishedAt,
  });

  const structure = await getCourseStructureById(parsed.courseId ?? existingCourseId);

  if (!structure) {
    throw new Error('MODULE_UPDATE_FAILED');
  }

  return structure;
}

export async function createLesson(input: CreateLessonInput): Promise<CourseStructure> {
  const parsed = createLessonSchema.parse(input);
  const sortOrder = parsed.sortOrder ?? (await nextLessonSortOrder(parsed.moduleId));

  await createLessonRecord({
    module: {
      connect: {
        id: parsed.moduleId,
      },
    },
    slug: parsed.slug,
    title: parsed.title,
    sortOrder,
    lessonType: parsed.lessonType,
    status: parsed.status ?? 'DRAFT',
    preview: parsed.preview ?? false,
    summary: parsed.summary,
    content: parsed.content as Prisma.InputJsonValue | undefined,
    publishedAt: parsed.status === 'PUBLISHED' ? parsed.publishedAt ?? new Date() : parsed.publishedAt ?? null,
  });

  const courseId = await getModuleCourseIdByModuleId(parsed.moduleId);

  if (!courseId) {
    throw new Error('LESSON_CREATE_FAILED');
  }

  const structure = await getCourseStructureById(courseId);

  if (!structure) {
    throw new Error('LESSON_CREATE_FAILED');
  }

  return structure;
}

export async function updateLesson(input: UpdateLessonInput): Promise<CourseStructure> {
  const parsed = updateLessonSchema.parse(input);
  const existingCourseId = await getLessonCourseIdByLessonId(parsed.lessonId);

  if (!existingCourseId) {
    throw new Error('LESSON_NOT_FOUND');
  }

  await updateLessonRecord(parsed.lessonId, {
    module: parsed.moduleId
      ? {
          connect: {
            id: parsed.moduleId,
          },
        }
      : undefined,
    slug: parsed.slug,
    title: parsed.title,
    sortOrder: parsed.sortOrder,
    lessonType: parsed.lessonType,
    status: parsed.status,
    preview: parsed.preview,
    summary: parsed.summary,
    content: parsed.content as Prisma.InputJsonValue | undefined,
    publishedAt:
      parsed.status === 'PUBLISHED'
        ? parsed.publishedAt ?? new Date()
        : parsed.publishedAt === null
          ? null
          : parsed.publishedAt,
  });

  const nextCourseId = parsed.moduleId ? await getModuleCourseIdByModuleId(parsed.moduleId) : existingCourseId;

  if (!nextCourseId) {
    throw new Error('LESSON_UPDATE_FAILED');
  }

  const structure = await getCourseStructureById(nextCourseId);

  if (!structure) {
    throw new Error('LESSON_UPDATE_FAILED');
  }

  return structure;
}

export async function getCourseAccessForUser(userId: string, courseId: string): Promise<CourseAccessSummary> {
  const course = await getCourseAccessRowById(courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  const enrollment = await findEnrollmentRow(userId, courseId);

  const hasAccess = course.status === 'PUBLISHED' && (course.accessType === 'FREE' || enrollment?.status === 'ACTIVE');

  return {
    userId,
    courseId: course.id,
    courseSlug: course.slug,
    courseTitle: course.title,
    status: course.status,
    accessType: course.accessType,
    priceAmount: course.priceAmount,
    hasAccess,
    enrollmentStatus: enrollment?.status ?? null,
    enrollmentAccessSource: enrollment?.accessSource ?? null,
  };
}
