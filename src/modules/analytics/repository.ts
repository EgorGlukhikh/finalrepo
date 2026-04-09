import { db } from '@/lib/db';

export async function countUsersForAnalytics() {
  return db.user.count();
}

export async function countCoursesForAnalytics() {
  return db.course.count();
}

export async function countActiveEnrollmentRowsForAnalytics() {
  return db.enrollment.count({
    where: {
      status: 'ACTIVE',
      user: {
        role: 'USER',
      },
    },
  });
}

export async function countPaidOrdersForAnalytics() {
  return db.order.count({
    where: {
      status: 'PAID',
      user: {
        role: 'USER',
      },
    },
  });
}

export async function sumPaidRevenueForAnalytics() {
  const result = await db.order.aggregate({
    where: {
      status: 'PAID',
      user: {
        role: 'USER',
      },
    },
    _sum: {
      amount: true,
    },
  });

  return result._sum.amount ?? 0;
}

export async function listActiveEnrollmentPairsForAnalytics(courseId?: string) {
  return db.enrollment.findMany({
    where: {
      status: 'ACTIVE',
      user: {
        role: 'USER',
      },
      ...(courseId ? { courseId } : {}),
    },
    select: {
      userId: true,
      courseId: true,
    },
  });
}

export async function listStartedCoursePairsForAnalytics() {
  return db.lessonProgress.findMany({
    where: {
      status: {
        in: ['IN_PROGRESS', 'COMPLETED'],
      },
      user: {
        role: 'USER',
      },
    },
    select: {
      userId: true,
      lesson: {
        select: {
          module: {
            select: {
              courseId: true,
            },
          },
        },
      },
    },
  });
}

export async function countStartedLessonsForAnalytics() {
  return db.lessonProgress.count({
    where: {
      status: {
        in: ['IN_PROGRESS', 'COMPLETED'],
      },
      user: {
        role: 'USER',
      },
    },
  });
}

export async function countCompletedLessonsForAnalytics() {
  return db.lessonProgress.count({
    where: {
      status: 'COMPLETED',
      user: {
        role: 'USER',
      },
    },
  });
}

export async function listPublishedLessonIdsForCourseAnalytics(courseId: string) {
  return db.lesson.findMany({
    where: {
      module: {
        courseId,
      },
      status: 'PUBLISHED',
    },
    select: {
      id: true,
    },
  });
}

export async function listLessonProgressRowsForCourseAnalytics(courseId: string) {
  return db.lessonProgress.findMany({
    where: {
      lesson: {
        module: {
          courseId,
        },
      },
      status: {
        in: ['IN_PROGRESS', 'COMPLETED'],
      },
      user: {
        role: 'USER',
      },
    },
    select: {
      userId: true,
      lessonId: true,
      status: true,
    },
  });
}
