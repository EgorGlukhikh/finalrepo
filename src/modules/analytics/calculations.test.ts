import { LessonProgressStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { calculateAdminDashboardAnalytics, calculateCourseAnalytics } from './calculations';

describe('calculateAdminDashboardAnalytics', () => {
  it('builds a simple funnel from existing enrollment and progress data', () => {
    const analytics = calculateAdminDashboardAnalytics({
      totalUsers: 12,
      totalEnrollments: 5,
      totalPaidOrders: 3,
      totalRevenue: 120000,
      activeEnrollmentPairs: [
        { userId: 'u1', courseId: 'c1' },
        { userId: 'u2', courseId: 'c1' },
        { userId: 'u3', courseId: 'c2' },
      ],
      startedCoursePairs: [
        { userId: 'u1', courseId: 'c1' },
        { userId: 'u1', courseId: 'c1' },
        { userId: 'u4', courseId: 'c9' },
      ],
      lessonStartedCount: 8,
      lessonCompletedCount: 5,
    });

    expect(analytics.business.totalUsers).toBe(12);
    expect(analytics.funnel.courseOpened).toBe(3);
    expect(analytics.funnel.courseStarted).toBe(1);
    expect(analytics.funnel.lessonStarted).toBe(8);
    expect(analytics.funnel.lessonCompleted).toBe(5);
  });
});

describe('calculateCourseAnalytics', () => {
  it('calculates students, completions, average progress and lesson metrics for active learners', () => {
    const analytics = calculateCourseAnalytics({
      courseId: 'course-1',
      activeEnrollmentUserIds: ['u1', 'u2', 'u3'],
      publishedLessonIds: ['l1', 'l2'],
      progressRows: [
        { userId: 'u1', lessonId: 'l1', status: LessonProgressStatus.COMPLETED },
        { userId: 'u1', lessonId: 'l2', status: LessonProgressStatus.COMPLETED },
        { userId: 'u2', lessonId: 'l1', status: LessonProgressStatus.IN_PROGRESS },
        { userId: 'u9', lessonId: 'l1', status: LessonProgressStatus.COMPLETED },
      ],
    });

    expect(analytics.studentsCount).toBe(3);
    expect(analytics.startedStudentsCount).toBe(2);
    expect(analytics.completionsCount).toBe(1);
    expect(analytics.completionRate).toBe(33);
    expect(analytics.averageProgress).toBe(33);
    expect(analytics.publishedLessonsCount).toBe(2);
    expect(analytics.lessonMetrics).toEqual([
      {
        lessonId: 'l1',
        startsCount: 2,
        completionsCount: 1,
      },
      {
        lessonId: 'l2',
        startsCount: 1,
        completionsCount: 1,
      },
    ]);
  });
});
