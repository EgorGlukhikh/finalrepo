import { calculateAdminDashboardAnalytics, calculateCourseAnalytics } from './calculations';
import {
  countActiveEnrollmentRowsForAnalytics,
  countCompletedLessonsForAnalytics,
  countPaidOrdersForAnalytics,
  countStartedLessonsForAnalytics,
  countUsersForAnalytics,
  listActiveEnrollmentPairsForAnalytics,
  listLessonProgressRowsForCourseAnalytics,
  listPublishedLessonIdsForCourseAnalytics,
  listStartedCoursePairsForAnalytics,
  sumPaidRevenueForAnalytics,
} from './repository';
import type { CourseAnalytics } from './types';

export async function getAdminDashboardAnalytics() {
  const [
    totalUsers,
    totalEnrollments,
    totalPaidOrders,
    totalRevenue,
    activeEnrollmentPairs,
    startedCourseRows,
    lessonStartedCount,
    lessonCompletedCount,
  ] = await Promise.all([
    countUsersForAnalytics(),
    countActiveEnrollmentRowsForAnalytics(),
    countPaidOrdersForAnalytics(),
    sumPaidRevenueForAnalytics(),
    listActiveEnrollmentPairsForAnalytics(),
    listStartedCoursePairsForAnalytics(),
    countStartedLessonsForAnalytics(),
    countCompletedLessonsForAnalytics(),
  ]);

  return calculateAdminDashboardAnalytics({
    totalUsers,
    totalEnrollments,
    totalPaidOrders,
    totalRevenue,
    activeEnrollmentPairs,
    startedCoursePairs: startedCourseRows.map((row) => ({
      userId: row.userId,
      courseId: row.lesson.module.courseId,
    })),
    lessonStartedCount,
    lessonCompletedCount,
  });
}

export async function getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
  const [activeEnrollmentPairs, publishedLessonRows, progressRows] = await Promise.all([
    listActiveEnrollmentPairsForAnalytics(courseId),
    listPublishedLessonIdsForCourseAnalytics(courseId),
    listLessonProgressRowsForCourseAnalytics(courseId),
  ]);

  return calculateCourseAnalytics({
    courseId,
    activeEnrollmentUserIds: activeEnrollmentPairs.map((row) => row.userId),
    publishedLessonIds: publishedLessonRows.map((row) => row.id),
    progressRows,
  });
}
