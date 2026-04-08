'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/modules/auth/access';

import { grantAccess, revokeAccess } from './service';

function readFormString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

export async function grantAccessAction(formData: FormData) {
  await requireAdmin('/admin/enrollments');
  const userId = readFormString(formData, 'userId');
  const courseId = readFormString(formData, 'courseId');
  const returnPath = readFormString(formData, 'returnPath') || '/admin/enrollments';
  const revalidationTarget = returnPath.split('?')[0] || '/admin/enrollments';

  await grantAccess({
    userId,
    courseId,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/enrollments');
  revalidatePath('/admin/users');
  revalidatePath(revalidationTarget);
  redirect(returnPath);
}

export async function revokeAccessAction(formData: FormData) {
  await requireAdmin('/admin/enrollments');
  const userId = readFormString(formData, 'userId');
  const courseId = readFormString(formData, 'courseId');
  const returnPath = readFormString(formData, 'returnPath') || '/admin/enrollments';
  const revalidationTarget = returnPath.split('?')[0] || '/admin/enrollments';

  await revokeAccess({
    userId,
    courseId,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/enrollments');
  revalidatePath('/admin/users');
  revalidatePath(revalidationTarget);
  redirect(returnPath);
}
