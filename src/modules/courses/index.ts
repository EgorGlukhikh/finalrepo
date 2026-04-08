export {
  createCourse,
  createLesson,
  createModule,
  getCourseAccessForUser,
  getCourseBySlug,
  getCourseModules,
  getCourseStructureById,
  listPublishedCourses,
  updateCourse,
  updateLesson,
  updateModule,
} from './service';
export type {
  CourseAccessSummary,
  CourseListItem,
  CourseModuleNode,
  CourseStructure,
} from './types';
