import type {
  CourseAccessType,
  CourseStatus,
  EnrollmentAccessSource,
  EnrollmentStatus,
  LessonStatus,
  LessonType,
} from '@prisma/client';

import type { UserSummary } from '@/modules/users';

export type CourseListItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  coverImageUrl: string | null;
  status: CourseStatus;
  accessType: CourseAccessType;
  priceAmount: number | null;
  modulesCount: number;
  lessonsCount: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CourseLessonNode = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  lessonType: LessonType;
  status: LessonStatus;
  preview: boolean;
  summary: string | null;
  content: unknown;
  publishedAt: Date | null;
};

export type CourseModuleNode = {
  id: string;
  title: string;
  sortOrder: number;
  published: boolean;
  publishedAt: Date | null;
  lessons: CourseLessonNode[];
};

export type CourseStructure = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  coverImageUrl: string | null;
  status: CourseStatus;
  accessType: CourseAccessType;
  priceAmount: number | null;
  publishedAt: Date | null;
  owner: UserSummary | null;
  modules: CourseModuleNode[];
  createdAt: Date;
  updatedAt: Date;
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
