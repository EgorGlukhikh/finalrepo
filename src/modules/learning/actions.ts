'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireUser } from '@/modules/auth/access';
import { enrollUserInFreeCourse } from '@/modules/enrollments';

import { completeLesson, getNextLesson } from './service';

export async function enrollFreeCourseAction(formData: FormData) {
  const courseId = String(formData.get('courseId') ?? '');
  const courseSlug = String(formData.get('courseSlug') ?? '');

  if (!courseId || !courseSlug) {
    throw new Error('COURSE_ENROLLMENT_INPUT_INVALID');
  }

  const session = await requireUser(`/courses/${courseSlug}`);
  const enrollment = await enrollUserInFreeCourse(session.user.id, courseId);

  revalidatePath('/app');
  revalidatePath('/courses');
  revalidatePath(`/courses/${enrollment.course.slug}`);
  revalidatePath(`/app/courses/${enrollment.course.slug}`);

  redirect(`/app/courses/${enrollment.course.slug}`);
}

export async function completeLessonAction(formData: FormData) {
  const lessonId = String(formData.get('lessonId') ?? '');
  const courseId = String(formData.get('courseId') ?? '');
  const courseSlug = String(formData.get('courseSlug') ?? '');

  if (!lessonId || !courseId || !courseSlug) {
    throw new Error('LESSON_COMPLETION_INPUT_INVALID');
  }

  const session = await requireUser(`/app/courses/${courseSlug}/lessons/${lessonId}`);

  await completeLesson(session.user.id, lessonId);

  const nextLesson = await getNextLesson(session.user.id, courseId, lessonId);

  revalidatePath('/app');
  revalidatePath(`/app/courses/${courseSlug}`);
  revalidatePath(`/app/courses/${courseSlug}/lessons/${lessonId}`);

  redirect(nextLesson?.href ?? `/app/courses/${courseSlug}`);
}
