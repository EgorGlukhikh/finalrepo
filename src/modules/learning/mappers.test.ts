import { describe, expect, it } from 'vitest';

import { findContinueLesson, getLearningNeighbors } from './mappers';
import type { LearningModuleState } from './types';

const modules: LearningModuleState[] = [
  {
    id: 'module_1',
    title: 'Введение',
    sortOrder: 1,
    published: true,
    publishedAt: null,
    completedLessonsCount: 1,
    totalLessonsCount: 2,
    progressPercent: 50,
    lessons: [
      {
        id: 'lesson_1',
        slug: 'lesson-1',
        title: 'Первый урок',
        sortOrder: 1,
        lessonType: 'REGULAR',
        status: 'PUBLISHED',
        preview: false,
        summary: null,
        content: null,
        publishedAt: null,
        href: '/app/courses/test-course/lessons/lesson_1',
        canAccess: true,
        isLocked: false,
        isCurrent: false,
        isCompleted: true,
        progressStatus: 'COMPLETED',
        progressPercent: 100,
        startedAt: null,
        completedAt: null,
        blocks: [],
      },
      {
        id: 'lesson_2',
        slug: 'lesson-2',
        title: 'Второй урок',
        sortOrder: 2,
        lessonType: 'REGULAR',
        status: 'PUBLISHED',
        preview: false,
        summary: null,
        content: null,
        publishedAt: null,
        href: '/app/courses/test-course/lessons/lesson_2',
        canAccess: true,
        isLocked: false,
        isCurrent: false,
        isCompleted: false,
        progressStatus: 'IN_PROGRESS',
        progressPercent: 35,
        startedAt: null,
        completedAt: null,
        blocks: [],
      },
    ],
  },
  {
    id: 'module_2',
    title: 'Практика',
    sortOrder: 2,
    published: true,
    publishedAt: null,
    completedLessonsCount: 0,
    totalLessonsCount: 1,
    progressPercent: 0,
    lessons: [
      {
        id: 'lesson_3',
        slug: 'lesson-3',
        title: 'Третий урок',
        sortOrder: 1,
        lessonType: 'ASSIGNMENT',
        status: 'PUBLISHED',
        preview: false,
        summary: null,
        content: null,
        publishedAt: null,
        href: '/app/courses/test-course/lessons/lesson_3',
        canAccess: true,
        isLocked: false,
        isCurrent: false,
        isCompleted: false,
        progressStatus: null,
        progressPercent: 0,
        startedAt: null,
        completedAt: null,
        blocks: [],
      },
    ],
  },
];

describe('learning mappers', () => {
  it('finds previous and next lessons from the real flattened structure', () => {
    expect(getLearningNeighbors(modules, 'lesson_2')).toEqual({
      previousLesson: {
        id: 'lesson_1',
        title: 'Первый урок',
        slug: 'lesson-1',
        href: '/app/courses/test-course/lessons/lesson_1',
        moduleTitle: 'Введение',
      },
      nextLesson: {
        id: 'lesson_3',
        title: 'Третий урок',
        slug: 'lesson-3',
        href: '/app/courses/test-course/lessons/lesson_3',
        moduleTitle: 'Практика',
      },
    });
  });

  it('picks the first accessible unfinished lesson as continue target', () => {
    expect(findContinueLesson('test-course', modules)).toEqual({
      id: 'lesson_2',
      title: 'Второй урок',
      slug: 'lesson-2',
      href: '/app/courses/test-course/lessons/lesson_2',
      moduleTitle: 'Введение',
    });
  });
});
