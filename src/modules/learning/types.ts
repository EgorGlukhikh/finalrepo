import type {
  CourseAccessType,
  CourseStatus,
  EnrollmentAccessSource,
  EnrollmentStatus,
  LessonProgressStatus,
  LessonStatus,
  LessonType,
  UserRole,
} from '@prisma/client';
import type { LessonBlock } from '@/modules/courses/lesson-blocks';
export type { LessonBlock } from '@/modules/courses/lesson-blocks';

export type LearningCourseView = {
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
};

export type LearningLessonReference = {
  id: string;
  title: string;
  slug: string;
  href: string;
  moduleTitle: string;
};

export type LearningLessonState = {
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
  href: string | null;
  canAccess: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  progressStatus: LessonProgressStatus | null;
  progressPercent: number;
  startedAt: Date | null;
  completedAt: Date | null;
  blocks: LessonBlock[];
};

export type LearningModuleState = {
  id: string;
  title: string;
  sortOrder: number;
  published: boolean;
  publishedAt: Date | null;
  lessons: LearningLessonState[];
  totalLessonsCount: number;
  completedLessonsCount: number;
  progressPercent: number;
};

export type LearningCourseTree = {
  course: LearningCourseView;
  viewerRole: UserRole | null;
  canAccess: boolean;
  enrollmentStatus: EnrollmentStatus | null;
  enrollmentAccessSource: EnrollmentAccessSource | null;
  modules: LearningModuleState[];
  totalLessonsCount: number;
  completedLessonsCount: number;
  progressPercent: number;
  isCompleted: boolean;
  selectedLessonId: string | null;
  continueLesson: LearningLessonReference | null;
};

export type LearningCourseSummary = {
  course: LearningCourseView;
  progressPercent: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isCompleted: boolean;
  canAccess: boolean;
  enrollmentStatus: EnrollmentStatus | null;
  enrollmentAccessSource: EnrollmentAccessSource | null;
  continueLesson: LearningLessonReference | null;
};

export type LearningLessonView = {
  course: LearningCourseTree['course'];
  tree: LearningCourseTree;
  lesson: LearningLessonState;
  previousLesson: LearningLessonReference | null;
  nextLesson: LearningLessonReference | null;
};
