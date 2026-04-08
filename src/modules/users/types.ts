import type { UserRole } from '@prisma/client';

export type UserSummary = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
};

export type AdminUserListItem = UserSummary & {
  createdAt: Date;
  enrollmentsCount: number;
};

export type AdminUserEnrollmentItem = {
  id: string;
  status: 'ACTIVE' | 'REVOKED';
  accessSource: 'FREE' | 'PURCHASE' | 'MANUAL';
  createdAt: Date;
  course: {
    id: string;
    title: string;
    slug: string;
    accessType: 'FREE' | 'PAID' | 'PRIVATE';
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    priceAmount: number | null;
  };
};

export type AdminUserDetails = UserSummary & {
  createdAt: Date;
  enrollmentsCount: number;
  enrollments: AdminUserEnrollmentItem[];
};
