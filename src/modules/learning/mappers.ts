import type { EnrollmentAccessSource, EnrollmentStatus, LessonProgressStatus, UserRole } from '@prisma/client';

import type { CourseModuleNode, CourseStructure } from '@/modules/courses';
import type { LessonProgressNode } from '@/modules/progress';

import type {
  LessonBlock,
  LearningCourseSummary,
  LearningCourseTree,
  LearningLessonState,
  LearningModuleState,
} from './types';

type ProgressLookup = Map<string, LessonProgressNode>;

export function normalizeLessonBlocks(content: unknown): LessonBlock[] {
  if (!content) {
    return [];
  }

  if (typeof content === 'string') {
    return [
      {
        type: 'text',
        text: content,
      },
    ];
  }

  if (Array.isArray(content)) {
    return content.flatMap((item) => normalizeLessonBlocks(item));
  }

  if (typeof content !== 'object') {
    return [];
  }

  const record = content as Record<string, unknown>;
  const blocks = Array.isArray(record.blocks) ? record.blocks : null;

  if (blocks) {
    return blocks.flatMap((item) => normalizeLessonBlocks(item));
  }

  const type = typeof record.type === 'string' ? record.type : null;

  switch (type) {
    case 'text': {
      const text = typeof record.text === 'string' ? record.text : typeof record.value === 'string' ? record.value : '';

      return text
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'text',
              text,
              tone: record.tone === 'muted' ? 'muted' : 'default',
            },
          ]
        : [];
    }
    case 'video': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'video',
              url,
              title: typeof record.title === 'string' ? record.title : undefined,
              caption: typeof record.caption === 'string' ? record.caption : undefined,
            },
          ]
        : [];
    }
    case 'file': {
      const url = typeof record.url === 'string' ? record.url : '';
      const title = typeof record.title === 'string' ? record.title : 'Файл';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'file',
              url,
              title,
              description: typeof record.description === 'string' ? record.description : undefined,
            },
          ]
        : [];
    }
    case 'image': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'image',
              url,
              alt: typeof record.alt === 'string' ? record.alt : typeof record.title === 'string' ? record.title : 'Изображение',
              caption: typeof record.caption === 'string' ? record.caption : undefined,
            },
          ]
        : [];
    }
    case 'embed': {
      const url = typeof record.url === 'string' ? record.url : typeof record.src === 'string' ? record.src : '';

      return url
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'embed',
              url,
              title: typeof record.title === 'string' ? record.title : undefined,
              description: typeof record.description === 'string' ? record.description : undefined,
            },
          ]
        : [];
    }
    case 'callout': {
      const text = typeof record.text === 'string' ? record.text : '';

      return text
        ? [
            {
              id: typeof record.id === 'string' ? record.id : undefined,
              type: 'callout',
              text,
              title: typeof record.title === 'string' ? record.title : undefined,
              tone:
                record.tone === 'success' || record.tone === 'warning' || record.tone === 'info'
                  ? record.tone
                  : 'info',
            },
          ]
        : [];
    }
    case 'checklist': {
      const items = Array.isArray(record.items) ? record.items : [];

      return [
        {
          id: typeof record.id === 'string' ? record.id : undefined,
          type: 'checklist',
          items: items
            .map((item) => {
              if (!item || typeof item !== 'object') {
                return null;
              }

              const itemRecord = item as Record<string, unknown>;
              const label = typeof itemRecord.label === 'string' ? itemRecord.label : typeof itemRecord.text === 'string' ? itemRecord.text : '';

              if (!label) {
                return null;
              }

              return {
                id: typeof itemRecord.id === 'string' ? itemRecord.id : undefined,
                label,
                checked: Boolean(itemRecord.checked),
              };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null),
        },
      ];
    }
    default: {
      const text = typeof record.text === 'string' ? record.text : '';

      return text
        ? [
            {
              type: 'text',
              text,
            },
          ]
        : [];
    }
  }
}

export function buildLearningLessonHref(courseSlug: string, lessonId: string) {
  return `/app/courses/${courseSlug}/lessons/${lessonId}`;
}

export function isLessonCompleted(status: LessonProgressStatus | null) {
  return status === 'COMPLETED';
}

export function mapLearningLessonState(params: {
  courseSlug: string;
  lesson: CourseStructure['modules'][number]['lessons'][number];
  selectedLessonId?: string | null;
  canAccess: boolean;
  progress: LessonProgressNode | null;
  visible: boolean;
}): LearningLessonState | null {
  const { courseSlug, lesson, selectedLessonId, canAccess, progress, visible } = params;

  if (!visible) {
    return null;
  }

  const progressStatus = progress?.status ?? null;
  const progressPercent = progress?.progressPercent ?? (progressStatus === 'COMPLETED' ? 100 : 0);
  const completed = isLessonCompleted(progressStatus);
  const current = selectedLessonId === lesson.id;
  const accessible = canAccess || lesson.preview;

  return {
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
    href: accessible ? buildLearningLessonHref(courseSlug, lesson.id) : null,
    canAccess: accessible,
    isLocked: !accessible,
    isCurrent: current,
    isCompleted: completed,
    progressStatus,
    progressPercent,
    startedAt: progress?.startedAt ?? null,
    completedAt: progress?.completedAt ?? null,
    blocks: normalizeLessonBlocks(lesson.content),
  };
}

export function mapLearningModuleState(params: {
  courseSlug: string;
  module: CourseModuleNode;
  selectedLessonId?: string | null;
  canAccess: boolean;
  progressLookup: ProgressLookup;
  visibleAdminDrafts?: boolean;
}): LearningModuleState | null {
  const { courseSlug, module, selectedLessonId, canAccess, progressLookup, visibleAdminDrafts = false } = params;
  const lessons = module.lessons
    .map((lesson) =>
      mapLearningLessonState({
        courseSlug,
        lesson,
        selectedLessonId,
        canAccess,
        progress: progressLookup.get(lesson.id) ?? null,
        visible: visibleAdminDrafts || lesson.status === 'PUBLISHED',
      }),
    )
    .filter((lesson): lesson is LearningLessonState => lesson !== null);

  if (lessons.length === 0) {
    return null;
  }

  const completedLessonsCount = lessons.filter((lesson) => lesson.isCompleted).length;
  const totalLessonsCount = lessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return {
    id: module.id,
    title: module.title,
    sortOrder: module.sortOrder,
    published: module.published,
    publishedAt: module.publishedAt,
    lessons,
    completedLessonsCount,
    totalLessonsCount,
    progressPercent,
  };
}

export function mapLearningTree(params: {
  course: CourseStructure;
  selectedLessonId?: string | null;
  canAccess: boolean;
  viewerRole: UserRole | null;
  progressLookup: ProgressLookup;
  visibleAdminDrafts?: boolean;
}): LearningCourseTree {
  const { course, selectedLessonId, canAccess, viewerRole, progressLookup, visibleAdminDrafts = false } = params;
  const modules = course.modules
    .map((courseModule) =>
      mapLearningModuleState({
        courseSlug: course.slug,
        module: courseModule,
        selectedLessonId,
        canAccess,
        progressLookup,
        visibleAdminDrafts,
      }),
    )
    .filter((module): module is LearningModuleState => module !== null);

  const flattenedLessons = modules.flatMap((module) => module.lessons);
  const totalLessonsCount = flattenedLessons.length;
  const completedLessonsCount = flattenedLessons.filter((lesson) => lesson.isCompleted).length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
  const continueLesson = findContinueLesson(course.slug, modules);

  return {
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      shortDescription: course.shortDescription,
      description: course.description,
      coverImageUrl: course.coverImageUrl,
      status: course.status,
      accessType: course.accessType,
      priceAmount: course.priceAmount,
      publishedAt: course.publishedAt,
    },
    viewerRole,
    canAccess,
    enrollmentStatus: null,
    enrollmentAccessSource: null,
    modules,
    totalLessonsCount,
    completedLessonsCount,
    progressPercent,
    isCompleted: totalLessonsCount > 0 && completedLessonsCount === totalLessonsCount,
    selectedLessonId: selectedLessonId ?? null,
    continueLesson,
  };
}

export function attachEnrollmentState(
  tree: LearningCourseTree,
  enrollment: { status: EnrollmentStatus | null; accessSource: EnrollmentAccessSource | null } | null,
): LearningCourseTree {
  return {
    ...tree,
    enrollmentStatus: enrollment?.status ?? null,
    enrollmentAccessSource: enrollment?.accessSource ?? null,
  };
}

export function flattenLearningLessons(modules: LearningModuleState[]) {
  return modules.flatMap((courseModule) =>
    courseModule.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: courseModule.title,
    })),
  );
}

export function findLearningLessonById(modules: LearningModuleState[], lessonId: string) {
  for (const courseModule of modules) {
    const lesson = courseModule.lessons.find((item) => item.id === lessonId);

    if (lesson) {
      return {
        ...lesson,
        moduleTitle: courseModule.title,
      };
    }
  }

  return null;
}

export function findLearningIndex(modules: LearningModuleState[], lessonId: string) {
  const lessons = flattenLearningLessons(modules);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);

  return index >= 0 ? index : null;
}

export function getLearningNeighbors(modules: LearningModuleState[], lessonId: string) {
  const lessons = flattenLearningLessons(modules);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);

  if (index < 0) {
    return {
      previousLesson: null,
      nextLesson: null,
    };
  }

  return {
    previousLesson:
      index > 0
        ? {
            id: lessons[index - 1].id,
            title: lessons[index - 1].title,
            slug: lessons[index - 1].slug,
            href: lessons[index - 1].href ?? '',
            moduleTitle: lessons[index - 1].moduleTitle,
          }
        : null,
    nextLesson:
      index < lessons.length - 1
        ? {
            id: lessons[index + 1].id,
            title: lessons[index + 1].title,
            slug: lessons[index + 1].slug,
            href: lessons[index + 1].href ?? '',
            moduleTitle: lessons[index + 1].moduleTitle,
          }
        : null,
  };
}

export function findContinueLesson(courseSlug: string, modules: LearningModuleState[]) {
  const lessons = flattenLearningLessons(modules);
  const nextLesson = lessons.find((lesson) => !lesson.isCompleted && lesson.canAccess);
  const fallbackLesson = lessons[lessons.length - 1] ?? null;
  const lesson = nextLesson ?? fallbackLesson;

  if (!lesson) {
    return null;
  }

  return {
    id: lesson.id,
    title: lesson.title,
    slug: lesson.slug,
    href: lesson.href ?? buildLearningLessonHref(courseSlug, lesson.id),
    moduleTitle: lesson.moduleTitle,
  };
}

export function mapLearningSummary(tree: LearningCourseTree): LearningCourseSummary {
  return {
    course: tree.course,
    progressPercent: tree.progressPercent,
    completedLessonsCount: tree.completedLessonsCount,
    totalLessonsCount: tree.totalLessonsCount,
    isCompleted: tree.isCompleted,
    canAccess: tree.canAccess,
    enrollmentStatus: tree.enrollmentStatus,
    enrollmentAccessSource: tree.enrollmentAccessSource,
    continueLesson: tree.continueLesson,
  };
}
