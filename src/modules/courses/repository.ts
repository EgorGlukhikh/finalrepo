import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

export const courseListSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  coverImageUrl: true,
  status: true,
  accessType: true,
  priceAmount: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  modules: {
    select: {
      lessons: {
        select: {
          id: true,
        },
      },
    },
  },
} satisfies Prisma.CourseSelect;

export type CourseListRow = Prisma.CourseGetPayload<{
  select: typeof courseListSelect;
}>;

export const courseStructureSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  description: true,
  coverImageUrl: true,
  status: true,
  accessType: true,
  priceAmount: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  },
  modules: {
    orderBy: {
      sortOrder: 'asc',
    },
    select: {
      id: true,
      title: true,
      sortOrder: true,
      published: true,
      publishedAt: true,
      lessons: {
        orderBy: {
          sortOrder: 'asc',
        },
        select: {
          id: true,
          slug: true,
          title: true,
          sortOrder: true,
          lessonType: true,
          status: true,
          preview: true,
          summary: true,
          content: true,
          publishedAt: true,
        },
      },
    },
  },
} satisfies Prisma.CourseSelect;

export type CourseStructureRow = Prisma.CourseGetPayload<{
  select: typeof courseStructureSelect;
}>;

export const courseAccessSelect = {
  id: true,
  title: true,
  slug: true,
  status: true,
  accessType: true,
  priceAmount: true,
  owner: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  },
} satisfies Prisma.CourseSelect;

export type CourseAccessRow = Prisma.CourseGetPayload<{
  select: typeof courseAccessSelect;
}>;

export const lessonAccessContextSelect = {
  id: true,
  slug: true,
  title: true,
  lessonType: true,
  status: true,
  module: {
    select: {
      id: true,
      courseId: true,
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          accessType: true,
          priceAmount: true,
        },
      },
    },
  },
} satisfies Prisma.LessonSelect;

export type LessonAccessContextRow = Prisma.LessonGetPayload<{
  select: typeof lessonAccessContextSelect;
}>;

export async function listPublishedCourseRows() {
  return db.course.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: courseListSelect,
  });
}

export async function listCourseRows() {
  return db.course.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    select: courseListSelect,
  });
}

export async function findCourseStructureRowBySlug(slug: string) {
  return db.course.findUnique({
    where: {
      slug,
    },
    select: courseStructureSelect,
  });
}

export async function findCourseStructureRowById(courseId: string) {
  return db.course.findUnique({
    where: {
      id: courseId,
    },
    select: courseStructureSelect,
  });
}

export async function findCourseAccessRowById(courseId: string) {
  return db.course.findUnique({
    where: {
      id: courseId,
    },
    select: courseAccessSelect,
  });
}

export async function findCourseAccessRowBySlug(slug: string) {
  return db.course.findUnique({
    where: {
      slug,
    },
    select: courseAccessSelect,
  });
}

export async function findLessonAccessContextRowById(lessonId: string) {
  return db.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: lessonAccessContextSelect,
  });
}

export async function createCourseRecord(data: Prisma.CourseCreateInput) {
  return db.course.create({
    data,
    select: {
      id: true,
    },
  });
}

export async function findModuleCourseIdByModuleId(moduleId: string) {
  const courseModule = await db.courseModule.findUnique({
    where: {
      id: moduleId,
    },
    select: {
      courseId: true,
    },
  });

  return courseModule?.courseId ?? null;
}

export async function findLessonCourseIdByLessonId(lessonId: string) {
  const lesson = await db.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      module: {
        select: {
          courseId: true,
        },
      },
    },
  });

  return lesson?.module?.courseId ?? null;
}

export async function updateCourseRecord(courseId: string, data: Prisma.CourseUpdateInput) {
  return db.course.update({
    where: {
      id: courseId,
    },
    data,
    select: {
      id: true,
    },
  });
}

export async function nextModuleSortOrder(courseId: string) {
  const result = await db.courseModule.aggregate({
    where: {
      courseId,
    },
    _max: {
      sortOrder: true,
    },
  });

  return (result._max.sortOrder ?? -1) + 1;
}

export async function nextLessonSortOrder(moduleId: string) {
  const result = await db.lesson.aggregate({
    where: {
      moduleId,
    },
    _max: {
      sortOrder: true,
    },
  });

  return (result._max.sortOrder ?? -1) + 1;
}

export async function createModuleRecord(data: Prisma.CourseModuleCreateInput) {
  return db.courseModule.create({
    data,
    select: {
      id: true,
    },
  });
}

export async function updateModuleRecord(moduleId: string, data: Prisma.CourseModuleUpdateInput) {
  return db.courseModule.update({
    where: {
      id: moduleId,
    },
    data,
    select: {
      id: true,
    },
  });
}

export async function createLessonRecord(data: Prisma.LessonCreateInput) {
  return db.lesson.create({
    data,
    select: {
      id: true,
    },
  });
}

export async function updateLessonRecord(lessonId: string, data: Prisma.LessonUpdateInput) {
  return db.lesson.update({
    where: {
      id: lessonId,
    },
    data,
    select: {
      id: true,
    },
  });
}
