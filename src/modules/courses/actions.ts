'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/modules/auth/access';

import {
  createCourse,
  createLessonDraft,
  createModule,
  deleteCourse,
  deleteLesson,
  duplicateCourse,
  setCourseStatus,
  updateCourse,
  updateLesson,
} from './service';
import { getFallbackBuilderLessonId } from './builder';

const courseStatusValues = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
const lessonStatusValues = ['DRAFT', 'PUBLISHED'] as const;
const lessonTypeValues = ['REGULAR', 'ASSIGNMENT', 'TEST', 'WEBINAR'] as const;

function readFormString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function readOptionalNumber(formData: FormData, key: string) {
  const raw = readFormString(formData, key);

  if (!raw) {
    return null;
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    throw new Error('COURSE_PRICE_INVALID');
  }

  return Math.trunc(value);
}

function readFreeFlag(formData: FormData) {
  const raw = formData.get('isFree');
  return raw === 'on' || raw === 'true' || raw === '1';
}

function isCourseStatus(value: string): value is (typeof courseStatusValues)[number] {
  return courseStatusValues.includes(value as (typeof courseStatusValues)[number]);
}

function isLessonStatus(value: string): value is (typeof lessonStatusValues)[number] {
  return lessonStatusValues.includes(value as (typeof lessonStatusValues)[number]);
}

function isLessonType(value: string): value is (typeof lessonTypeValues)[number] {
  return lessonTypeValues.includes(value as (typeof lessonTypeValues)[number]);
}

function readOptionalJson(formData: FormData, key: string) {
  const raw = readFormString(formData, key);

  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new Error('COURSE_CONTENT_INVALID');
  }
}

export async function createCourseAction(formData: FormData) {
  const session = await requireAdmin('/admin/courses');
  const isFree = readFreeFlag(formData);

  const course = await createCourse({
    title: readFormString(formData, 'title'),
    slug: readFormString(formData, 'slug'),
    shortDescription: readFormString(formData, 'shortDescription') || undefined,
    description: readFormString(formData, 'description') || undefined,
    coverImageUrl: readFormString(formData, 'coverImageUrl') || undefined,
    accessType: isFree ? 'FREE' : 'PAID',
    priceAmount: isFree ? null : readOptionalNumber(formData, 'priceAmount'),
    ownerId: session.user.id,
  });

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  revalidatePath(`/courses/${course.slug}`);
  redirect(`/admin/courses/${course.id}`);
}

export async function setCourseStatusAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const status = readFormString(formData, 'status');
  const returnPath = readFormString(formData, 'returnPath') || '/admin/courses';
  const revalidationTarget = returnPath.split('?')[0] || '/admin/courses';

  if (!courseId || (status !== 'PUBLISHED' && status !== 'DRAFT' && status !== 'ARCHIVED')) {
    throw new Error('COURSE_STATUS_INPUT_INVALID');
  }

  const course = await setCourseStatus(courseId, status);
  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath(revalidationTarget);
  revalidatePath('/courses');
  revalidatePath(`/courses/${course.slug}`);
  redirect(returnPath);
}

export async function duplicateCourseAction(formData: FormData) {
  const session = await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');

  if (!courseId) {
    throw new Error('COURSE_ID_REQUIRED');
  }

  const course = await duplicateCourse(courseId, session.user.id);
  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  redirect(`/admin/courses/${course.id}`);
}

export async function deleteCourseAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const returnPath = readFormString(formData, 'returnPath') || '/admin/courses';
  const revalidationTarget = returnPath.split('?')[0] || '/admin/courses';

  if (!courseId) {
    throw new Error('COURSE_ID_REQUIRED');
  }

  const deleted = await deleteCourse(courseId);
  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  revalidatePath(`/courses/${deleted.slug}`);
  revalidatePath(revalidationTarget);
  redirect(returnPath);
}

export async function createModuleAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const title = readFormString(formData, 'title');

  if (!courseId || !title) {
    throw new Error('MODULE_INPUT_INVALID');
  }

  const course = await createModule({
    courseId,
    title,
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  redirect(`/admin/courses/${course.id}`);
}

export async function createLessonDraftAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const moduleId = readFormString(formData, 'moduleId');
  const lessonType = readFormString(formData, 'lessonType');

  if (!courseId || !moduleId || !isLessonType(lessonType)) {
    throw new Error('LESSON_INPUT_INVALID');
  }

  const created = await createLessonDraft({
    moduleId,
    lessonType,
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${created.course.id}`);
  redirect(`/admin/courses/${created.course.id}?lessonId=${created.lessonId}`);
}

export async function updateLessonAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const lessonId = readFormString(formData, 'lessonId');
  const returnPath = readFormString(formData, 'returnPath') || `/admin/courses/${courseId}?lessonId=${lessonId}`;
  const status = readFormString(formData, 'status');
  const lessonType = readFormString(formData, 'lessonType');

  if (!courseId || !lessonId || !isLessonStatus(status) || !isLessonType(lessonType)) {
    throw new Error('LESSON_INPUT_INVALID');
  }

  const course = await updateLesson({
    lessonId,
    title: readFormString(formData, 'title'),
    summary: readFormString(formData, 'summary') || undefined,
    status,
    lessonType,
    content: readOptionalJson(formData, 'content'),
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  redirect(returnPath);
}

export async function setLessonStatusAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const lessonId = readFormString(formData, 'lessonId');
  const status = readFormString(formData, 'status');

  if (!courseId || !lessonId || !isLessonStatus(status)) {
    throw new Error('LESSON_STATUS_INPUT_INVALID');
  }

  const course = await updateLesson({
    lessonId,
    status,
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  redirect(`/admin/courses/${course.id}?lessonId=${lessonId}`);
}

export async function deleteLessonAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const lessonId = readFormString(formData, 'lessonId');

  if (!courseId || !lessonId) {
    throw new Error('LESSON_INPUT_INVALID');
  }

  const course = await deleteLesson(lessonId);
  const nextLessonId = getFallbackBuilderLessonId(course);

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  redirect(nextLessonId ? `/admin/courses/${course.id}?lessonId=${nextLessonId}` : `/admin/courses/${course.id}`);
}

export async function updateCourseSettingsAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const isFree = readFreeFlag(formData);
  const status = readFormString(formData, 'status');

  if (!courseId || !isCourseStatus(status)) {
    throw new Error('COURSE_ID_REQUIRED');
  }

  const course = await updateCourse({
    courseId,
    title: readFormString(formData, 'title'),
    slug: readFormString(formData, 'slug'),
    shortDescription: readFormString(formData, 'shortDescription') || undefined,
    description: readFormString(formData, 'description') || undefined,
    coverImageUrl: readFormString(formData, 'coverImageUrl') || undefined,
    status,
    accessType: isFree ? 'FREE' : 'PAID',
    priceAmount: isFree ? null : readOptionalNumber(formData, 'priceAmount'),
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  revalidatePath(`/admin/courses/${course.id}/settings`);
  revalidatePath('/courses');
  revalidatePath(`/courses/${course.slug}`);
  redirect(`/admin/courses/${course.id}/settings`);
}
