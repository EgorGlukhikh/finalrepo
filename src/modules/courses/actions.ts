'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/modules/auth/access';

import { createCourse, updateCourse } from './service';
import { createLesson, createModule, deleteCourse, duplicateCourse, setCourseStatus } from './service';

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

export async function updateCourseAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');

  if (!courseId) {
    throw new Error('COURSE_ID_REQUIRED');
  }

  const isFree = readFreeFlag(formData);
  const course = await updateCourse({
    courseId,
    title: readFormString(formData, 'title') || undefined,
    slug: readFormString(formData, 'slug') || undefined,
    shortDescription: readFormString(formData, 'shortDescription') || undefined,
    description: readFormString(formData, 'description') || undefined,
    coverImageUrl: readFormString(formData, 'coverImageUrl') || undefined,
    accessType: isFree ? 'FREE' : 'PAID',
    priceAmount: isFree ? null : readOptionalNumber(formData, 'priceAmount'),
  });

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  revalidatePath(`/courses/${course.slug}`);
  revalidatePath(`/admin/courses/${course.id}`);
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

export async function createLessonAction(formData: FormData) {
  await requireAdmin('/admin/courses');
  const courseId = readFormString(formData, 'courseId');
  const moduleId = readFormString(formData, 'moduleId');
  const title = readFormString(formData, 'title');
  const slug = readFormString(formData, 'slug');
  const lessonType = readFormString(formData, 'lessonType');

  if (
    !courseId ||
    !moduleId ||
    !title ||
    !slug ||
    (lessonType !== 'REGULAR' && lessonType !== 'ASSIGNMENT' && lessonType !== 'TEST' && lessonType !== 'WEBINAR')
  ) {
    throw new Error('LESSON_INPUT_INVALID');
  }

  const course = await createLesson({
    moduleId,
    title,
    slug,
    lessonType,
  });

  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${course.id}`);
  redirect(`/admin/courses/${course.id}`);
}
