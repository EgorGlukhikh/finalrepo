import type { CourseLessonNode, CourseModuleNode, CourseStructure } from './types';

export type BuilderLessonSelection = {
  lesson: CourseLessonNode;
  module: CourseModuleNode;
};

export function buildBuilderLessonHref(courseId: string, lessonId: string) {
  return `/admin/courses/${courseId}?lessonId=${lessonId}`;
}

export function getBuilderSelection(course: CourseStructure, selectedLessonId?: string | null): BuilderLessonSelection | null {
  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      if (selectedLessonId && lesson.id === selectedLessonId) {
        return {
          lesson,
          module: courseModule,
        };
      }
    }
  }

  const firstModule = course.modules.find((courseModule) => courseModule.lessons.length > 0);

  if (!firstModule) {
    return null;
  }

  return {
    module: firstModule,
    lesson: firstModule.lessons[0],
  };
}

export function getFallbackBuilderLessonId(course: CourseStructure) {
  return getBuilderSelection(course)?.lesson.id ?? null;
}
