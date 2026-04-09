import { UserRole } from '@prisma/client';

import { getCourseAccessForUser, getCourseBySlug, getCourseStructureById } from '@/modules/courses';
import { getLessonAccessContextRowById } from '@/modules/courses/queries';
import { enrollUserInFreeCourse, getEnrollmentForUser, getUserEnrollments } from '@/modules/enrollments';
import { getUserLessonProgress, markLessonCompleted, markLessonStarted } from '@/modules/progress';
import { getUserById } from '@/modules/users';

import { attachEnrollmentState, findLearningLessonById, getLearningNeighbors, mapLearningSummary, mapLearningTree } from './mappers';
import type {
  LearningCourseSummary,
  LearningCourseTree,
  LearningLessonReference,
  LearningLessonView,
  LearningModuleState,
} from './types';

type CourseLookup = { courseId: string } | { slug: string };

type TreeOptions = {
  selectedLessonId?: string | null;
  view?: 'public' | 'learner';
};

function buildProgressLookup(rows: Awaited<ReturnType<typeof getUserLessonProgress>>) {
  return new Map(rows.map((row) => [row.lessonId, row]));
}

async function resolveCourse(lookup: CourseLookup, view: TreeOptions['view']) {
  if ('courseId' in lookup) {
    return getCourseStructureById(lookup.courseId);
  }

  return view === 'public' ? getCourseBySlug(lookup.slug) : getCourseBySlug(lookup.slug, { publishedOnly: false });
}

function getLessonReference(modules: LearningModuleState[], lessonId: string, courseSlug: string): LearningLessonReference | null {
  for (const courseModule of modules) {
    const lesson = courseModule.lessons.find((item) => item.id === lessonId);

    if (lesson) {
      return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        href: lesson.href ?? `/app/courses/${courseSlug}/lessons/${lesson.id}`,
        moduleTitle: courseModule.title,
      };
    }
  }

  return null;
}

function pickCurrentLessonId(tree: LearningCourseTree, lessonId?: string | null) {
  if (lessonId) {
    return lessonId;
  }

  if (tree.continueLesson) {
    return tree.continueLesson.id;
  }

  return tree.modules[0]?.lessons[0]?.id ?? null;
}

export async function getCourseLearningTree(
  lookup: CourseLookup,
  viewerId?: string | null,
  options: TreeOptions = {},
): Promise<LearningCourseTree | null> {
  const course = await resolveCourse(lookup, options.view);

  if (!course) {
    return null;
  }

  const viewer = viewerId ? await getUserById(viewerId) : null;
  const progressRows = viewerId ? await getUserLessonProgress(viewerId) : [];
  const progressLookup = buildProgressLookup(progressRows);
  const accessSummary = viewerId ? await getCourseAccessForUser(viewerId, course.id) : null;
  let enrollmentSummary = viewerId ? await getEnrollmentForUser(viewerId, course.id) : null;

  if (
    viewerId &&
    options.view !== 'public' &&
    viewer?.role !== UserRole.ADMIN &&
    course.accessType === 'FREE' &&
    accessSummary?.hasAccess &&
    !enrollmentSummary
  ) {
    await enrollUserInFreeCourse(viewerId, course.id);
    enrollmentSummary = await getEnrollmentForUser(viewerId, course.id);
  }

  const hasAccess = accessSummary?.hasAccess ?? false;
  const visibleAdminDrafts = viewer?.role === UserRole.ADMIN && options.view !== 'public';

  const baseTree = mapLearningTree({
    course,
    selectedLessonId: options.selectedLessonId ?? null,
    canAccess: hasAccess,
    viewerRole: viewer?.role ?? null,
    progressLookup,
    visibleAdminDrafts,
  });

  const tree = attachEnrollmentState(
    baseTree,
    accessSummary
      ? {
          status: enrollmentSummary?.status ?? accessSummary.enrollmentStatus,
          accessSource: enrollmentSummary?.accessSource ?? accessSummary.enrollmentAccessSource,
        }
      : null,
  );

  return {
    ...tree,
    selectedLessonId: pickCurrentLessonId(tree, options.selectedLessonId ?? null),
  };
}

export async function getEnrolledCourseSummaries(userId: string): Promise<LearningCourseSummary[]> {
  const enrollments = await getUserEnrollments(userId);
  const summaries = await Promise.all(
    enrollments
      .filter((enrollment) => enrollment.status === 'ACTIVE')
      .map(async (enrollment) => {
      const tree = await getCourseLearningTree({ slug: enrollment.course.slug }, userId, {
        view: 'learner',
      });

      if (!tree) {
        return null;
      }

      return mapLearningSummary(tree);
      }),
  );

  return summaries.filter((summary): summary is LearningCourseSummary => summary !== null);
}

export async function getContinueLearningTarget(userId: string, courseId: string) {
  const tree = await getCourseLearningTree({ courseId }, userId, { view: 'learner' });

  return tree?.continueLesson ?? null;
}

export async function canUserAccessCourse(userId: string, courseId: string) {
  const access = await getCourseAccessForUser(userId, courseId);
  return access.hasAccess;
}

export async function canUserAccessLesson(userId: string, lessonId: string) {
  const lesson = await getLessonAccessContextRowById(lessonId);

  if (!lesson) {
    return false;
  }

  const access = await getCourseAccessForUser(userId, lesson.module.courseId);
  const viewer = await getUserById(userId);

  return access.hasAccess && (lesson.status === 'PUBLISHED' || viewer?.role === UserRole.ADMIN);
}

export async function getLessonForUser(courseId: string, lessonId: string, userId: string): Promise<LearningLessonView | null> {
  const tree = await getCourseLearningTree({ courseId }, userId, {
    selectedLessonId: lessonId,
    view: 'learner',
  });

  if (!tree || !tree.canAccess) {
    return null;
  }

  const selectedLesson = getLessonReference(tree.modules, lessonId, tree.course.slug);

  if (!selectedLesson) {
    return null;
  }

  await markLessonStarted(userId, lessonId);

  const refreshedTree = await getCourseLearningTree({ courseId }, userId, {
    selectedLessonId: lessonId,
    view: 'learner',
  });

  if (!refreshedTree) {
    return null;
  }

  const lesson = findLearningLessonById(refreshedTree.modules, lessonId);

  if (!lesson) {
    return null;
  }

  const neighbors = getLearningNeighbors(refreshedTree.modules, lessonId);

  return {
    course: refreshedTree.course,
    tree: refreshedTree,
    lesson,
    previousLesson: neighbors.previousLesson,
    nextLesson: neighbors.nextLesson,
  };
}

export async function getNextLesson(userId: string, courseId: string, lessonId: string) {
  const tree = await getCourseLearningTree({ courseId }, userId, { view: 'learner' });

  if (!tree) {
    return null;
  }

  const neighbors = getLearningNeighbors(tree.modules, lessonId);
  return neighbors.nextLesson;
}

export async function getPreviousLesson(userId: string, courseId: string, lessonId: string) {
  const tree = await getCourseLearningTree({ courseId }, userId, { view: 'learner' });

  if (!tree) {
    return null;
  }

  const neighbors = getLearningNeighbors(tree.modules, lessonId);
  return neighbors.previousLesson;
}

export async function completeLesson(userId: string, lessonId: string) {
  return markLessonCompleted(userId, lessonId);
}
