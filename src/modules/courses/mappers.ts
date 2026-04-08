import type { CourseListRow, CourseStructureRow } from './repository';
import type { CourseListItem, CourseModuleNode, CourseStructure } from './types';

function countLessons(row: CourseListRow) {
  return row.modules.reduce((modulesCount: number, module: CourseListRow['modules'][number]) => {
    return modulesCount + module.lessons.length;
  }, 0);
}

export function mapCourseListItem(row: CourseListRow): CourseListItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    coverImageUrl: row.coverImageUrl,
    status: row.status,
    accessType: row.accessType,
    priceAmount: row.priceAmount,
    modulesCount: row.modules.length,
    lessonsCount: countLessons(row),
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapModuleNode(row: CourseStructureRow['modules'][number]): CourseModuleNode {
  return {
    id: row.id,
    title: row.title,
    sortOrder: row.sortOrder,
    published: row.published,
    publishedAt: row.publishedAt,
    lessons: row.lessons.map((lesson: CourseStructureRow['modules'][number]['lessons'][number]) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      sortOrder: lesson.sortOrder,
      lessonType: lesson.lessonType,
      status: lesson.status,
      preview: lesson.preview,
      summary: lesson.summary,
      content: lesson.content,
      publishedAt: lesson.publishedAt,
    })),
  };
}

export function mapCourseStructure(row: CourseStructureRow): CourseStructure {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    description: row.description,
    coverImageUrl: row.coverImageUrl,
    status: row.status,
    accessType: row.accessType,
    priceAmount: row.priceAmount,
    publishedAt: row.publishedAt,
    owner: row.owner
      ? {
          id: row.owner.id,
          name: row.owner.name,
          email: row.owner.email,
          image: row.owner.image,
          role: row.owner.role,
        }
      : null,
    modules: row.modules.map(mapModuleNode),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
