import type { AdminUserDetails, AdminUserListItem } from './types';

import { getUserDetailsRowById, listUsersForAdmin } from './repository';

function mapAdminUserListItem(row: Awaited<ReturnType<typeof listUsersForAdmin>>[number]): AdminUserListItem {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    image: row.image,
    role: row.role,
    createdAt: row.createdAt,
    enrollmentsCount: row._count.enrollments,
  };
}

export async function listUsers(): Promise<AdminUserListItem[]> {
  const rows = await listUsersForAdmin();
  return rows.map(mapAdminUserListItem);
}

export async function getUserDetails(userId: string): Promise<AdminUserDetails | null> {
  const row = await getUserDetailsRowById(userId);

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    image: row.image,
    role: row.role,
    createdAt: row.createdAt,
    enrollmentsCount: row._count.enrollments,
    enrollments: row.enrollments.map((enrollment) => ({
      id: enrollment.id,
      status: enrollment.status,
      accessSource: enrollment.accessSource,
      createdAt: enrollment.createdAt,
      course: {
        id: enrollment.course.id,
        title: enrollment.course.title,
        slug: enrollment.course.slug,
        accessType: enrollment.course.accessType,
        status: enrollment.course.status,
        priceAmount: enrollment.course.priceAmount,
      },
    })),
  };
}
