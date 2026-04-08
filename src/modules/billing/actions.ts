'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireUser } from '@/modules/auth/access';
import { buildPublicCoursePath } from '@/modules/courses/paths';

import { createPaidCoursePurchaseIntent } from './service';

export async function purchasePaidCourseAction(formData: FormData) {
  const courseId = String(formData.get('courseId') ?? '');
  const courseSlug = String(formData.get('courseSlug') ?? '');

  if (!courseId || !courseSlug) {
    throw new Error('COURSE_PURCHASE_INPUT_INVALID');
  }

  const session = await requireUser(buildPublicCoursePath(courseSlug));
  const intent = await createPaidCoursePurchaseIntent(session.user.id, courseId);

  revalidatePath(buildPublicCoursePath(courseSlug));
  redirect(intent.checkoutUrl);
}
