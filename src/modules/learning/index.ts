export {
  canUserAccessCourse,
  canUserAccessLesson,
  completeLesson,
  getContinueLearningTarget,
  getCourseLearningTree,
  getEnrolledCourseSummaries,
  getLessonForUser,
  getNextLesson,
  getPreviousLesson,
} from './service';
export { normalizeLessonBlocks } from './mappers';
export type {
  LessonBlock,
  LearningCourseSummary,
  LearningCourseTree,
  LearningLessonReference,
  LearningLessonState,
  LearningLessonView,
  LearningModuleState,
} from './types';
