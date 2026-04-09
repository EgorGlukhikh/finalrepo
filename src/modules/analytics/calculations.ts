import { LessonProgressStatus } from '@prisma/client';

import type {
  AdminDashboardAnalytics,
  CourseAnalytics,
  CourseAnalyticsSource,
  DashboardAnalyticsSource,
  LessonAnalytics,
} from './types';

function buildPairKey(userId: string, courseId: string) {
  return `${courseId}:${userId}`;
}

function roundPercent(value: number) {
  return Math.round(value);
}

export function calculateAdminDashboardAnalytics(source: DashboardAnalyticsSource): AdminDashboardAnalytics {
  const activeEnrollmentKeys = new Set(
    source.activeEnrollmentPairs.map((pair) => buildPairKey(pair.userId, pair.courseId)),
  );
  const startedCourseKeys = new Set(
    source.startedCoursePairs
      .map((pair) => buildPairKey(pair.userId, pair.courseId))
      .filter((key) => activeEnrollmentKeys.has(key)),
  );

  return {
    business: {
      totalCourses: source.totalCourses,
      totalUsers: source.totalUsers,
      totalEnrollments: source.totalEnrollments,
      totalPaidOrders: source.totalPaidOrders,
      totalRevenue: source.totalRevenue,
    },
    funnel: {
      courseOpened: activeEnrollmentKeys.size,
      courseStarted: startedCourseKeys.size,
      lessonStarted: source.lessonStartedCount,
      lessonCompleted: source.lessonCompletedCount,
    },
  };
}

export function calculateCourseAnalytics(source: CourseAnalyticsSource): CourseAnalytics {
  const activeUsers = new Set(source.activeEnrollmentUserIds);
  const publishedLessonIds = new Set(source.publishedLessonIds);
  const startedUsers = new Set<string>();
  const completedByUser = new Map<string, Set<string>>();
  const lessonMetrics = new Map<string, LessonAnalytics>();

  for (const progress of source.progressRows) {
    if (!activeUsers.has(progress.userId)) {
      continue;
    }

    const lessonMetric = lessonMetrics.get(progress.lessonId) ?? {
      lessonId: progress.lessonId,
      startsCount: 0,
      completionsCount: 0,
    };

    if (progress.status === LessonProgressStatus.IN_PROGRESS || progress.status === LessonProgressStatus.COMPLETED) {
      lessonMetric.startsCount += 1;

      if (publishedLessonIds.has(progress.lessonId)) {
        startedUsers.add(progress.userId);
      }
    }

    if (progress.status === LessonProgressStatus.COMPLETED) {
      lessonMetric.completionsCount += 1;

      if (publishedLessonIds.has(progress.lessonId)) {
        const completedLessons = completedByUser.get(progress.userId) ?? new Set<string>();
        completedLessons.add(progress.lessonId);
        completedByUser.set(progress.userId, completedLessons);
      }
    }

    lessonMetrics.set(progress.lessonId, lessonMetric);
  }

  const studentsCount = activeUsers.size;
  const publishedLessonsCount = publishedLessonIds.size;
  let completionsCount = 0;
  let totalProgressPercent = 0;

  for (const userId of activeUsers) {
    const completedLessons = completedByUser.get(userId)?.size ?? 0;
    const userProgressPercent =
      publishedLessonsCount > 0 ? roundPercent((completedLessons / publishedLessonsCount) * 100) : 0;

    totalProgressPercent += userProgressPercent;

    if (publishedLessonsCount > 0 && completedLessons >= publishedLessonsCount) {
      completionsCount += 1;
    }
  }

  return {
    courseId: source.courseId,
    studentsCount,
    startedStudentsCount: startedUsers.size,
    completionsCount,
    completionRate: studentsCount > 0 ? roundPercent((completionsCount / studentsCount) * 100) : 0,
    averageProgress: studentsCount > 0 ? roundPercent(totalProgressPercent / studentsCount) : 0,
    publishedLessonsCount,
    lessonMetrics: Array.from(lessonMetrics.values()).sort((left, right) => left.lessonId.localeCompare(right.lessonId)),
  };
}
