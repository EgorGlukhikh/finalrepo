'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/modules/auth/access';

import { createCourse, updateCourse } from './service';

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
