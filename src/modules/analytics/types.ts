import type { LessonProgressStatus } from '@prisma/client';

export type EnrollmentCoursePair = {
  userId: string;
  courseId: string;
};

export type DashboardAnalyticsSource = {
  totalCourses: number;
  totalUsers: number;
  totalEnrollments: number;
  totalPaidOrders: number;
  totalRevenue: number;
  activeEnrollmentPairs: EnrollmentCoursePair[];
  startedCoursePairs: EnrollmentCoursePair[];
  lessonStartedCount: number;
  lessonCompletedCount: number;
};

export type LessonProgressAnalyticsRow = {
  userId: string;
  lessonId: string;
  status: LessonProgressStatus;
};

export type CourseAnalyticsSource = {
  courseId: string;
  activeEnrollmentUserIds: string[];
  publishedLessonIds: string[];
  progressRows: LessonProgressAnalyticsRow[];
};

export type BusinessMetrics = {
  totalCourses: number;
  totalUsers: number;
  totalEnrollments: number;
  totalPaidOrders: number;
  totalRevenue: number;
};

export type FunnelMetrics = {
  courseOpened: number;
  courseStarted: number;
  lessonStarted: number;
  lessonCompleted: number;
};

export type AdminDashboardAnalytics = {
  business: BusinessMetrics;
  funnel: FunnelMetrics;
};

export type LessonAnalytics = {
  lessonId: string;
  startsCount: number;
  completionsCount: number;
};

export type CourseAnalytics = {
  courseId: string;
  studentsCount: number;
  startedStudentsCount: number;
  completionsCount: number;
  completionRate: number;
  averageProgress: number;
  publishedLessonsCount: number;
  lessonMetrics: LessonAnalytics[];
};
