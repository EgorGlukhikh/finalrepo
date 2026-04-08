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

export async function courseSlugExists(slug: string) {
  const course = await db.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  return Boolean(course);
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

export async function deleteCourseRecord(courseId: string) {
  return db.course.delete({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      slug: true,
    },
  });
}

export async function duplicateCourseTreeRecord(sourceCourseId: string, data: { slug: string; title: string; ownerId?: string | null }) {
  return db.$transaction(async (tx) => {
    const source = await tx.course.findUnique({
      where: {
        id: sourceCourseId,
      },
      select: courseStructureSelect,
    });

    if (!source) {
      return null;
    }

    const createdCourse = await tx.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: source.shortDescription,
        description: source.description,
        coverImageUrl: source.coverImageUrl,
        status: 'DRAFT',
        accessType: source.accessType,
        priceAmount: source.priceAmount,
        publishedAt: null,
        owner: data.ownerId
          ? {
              connect: {
                id: data.ownerId,
              },
            }
          : source.owner
            ? {
                connect: {
                  id: source.owner.id,
                },
              }
            : undefined,
      },
      select: {
        id: true,
      },
    });

    for (const moduleRow of source.modules) {
      const createdModule = await tx.courseModule.create({
        data: {
          courseId: createdCourse.id,
          title: moduleRow.title,
          sortOrder: moduleRow.sortOrder,
          published: false,
          publishedAt: null,
        },
        select: {
          id: true,
        },
      });

      for (const lessonRow of moduleRow.lessons) {
        await tx.lesson.create({
          data: {
            moduleId: createdModule.id,
            slug: lessonRow.slug,
            title: lessonRow.title,
            sortOrder: lessonRow.sortOrder,
            lessonType: lessonRow.lessonType,
            status: 'DRAFT',
            preview: lessonRow.preview,
            summary: lessonRow.summary,
            content: lessonRow.content ?? Prisma.JsonNull,
            publishedAt: null,
          },
        });
      }
    }

    return createdCourse;
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

export async function deleteLessonRecord(lessonId: string) {
  return db.lesson.delete({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
    },
  });
}
