import type { LessonProgressStatus, LessonType } from '@prisma/client';

export type LessonProgressSummary = {
  id: string;
  userId: string;
  lessonId: string;
  status: LessonProgressStatus;
  progressPercent: number;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LessonProgressLessonSummary = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  lessonType: LessonType;
};

export type LessonProgressCourseSummary = {
  id: string;
  title: string;
  slug: string;
};

export type LessonProgressNode = LessonProgressSummary & {
  lesson: LessonProgressLessonSummary & {
    module: {
      id: string;
      title: string;
      sortOrder: number;
      course: LessonProgressCourseSummary;
    };
  };
};
