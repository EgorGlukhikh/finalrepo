import type { CourseAccessType, CourseStatus, EnrollmentAccessSource, EnrollmentStatus } from '@prisma/client';

import type { CourseListItem } from '@/modules/courses';
import type { UserSummary } from '@/modules/users';

export type EnrollmentSummary = {
  id: string;
  status: EnrollmentStatus;
  accessSource: EnrollmentAccessSource;
  createdAt: Date;
  updatedAt: Date;
  course: Pick<
    CourseListItem,
    'id' | 'title' | 'slug' | 'shortDescription' | 'coverImageUrl' | 'status' | 'accessType' | 'priceAmount' | 'publishedAt'
  >;
};

export type CourseAccessSummary = {
  userId: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  status: CourseStatus;
  accessType: CourseAccessType;
  priceAmount: number | null;
  hasAccess: boolean;
  enrollmentStatus: EnrollmentStatus | null;
  enrollmentAccessSource: EnrollmentAccessSource | null;
};

export type AdminEnrollmentListItem = {
  id: string;
  status: EnrollmentStatus;
  accessSource: EnrollmentAccessSource;
  createdAt: Date;
  updatedAt: Date;
  user: UserSummary;
  course: Pick<CourseListItem, 'id' | 'title' | 'slug' | 'accessType' | 'status' | 'priceAmount'>;
};

export type AdminEnrollmentFilters = {
  userQuery?: string;
  courseQuery?: string;
};
