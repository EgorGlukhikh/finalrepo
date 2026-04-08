export {
  enrollUserInFreeCourse,
  enrollUserInPaidCourse,
  grantAccess,
  grantFreeEnrollment,
  getEnrollmentForUser,
  listEnrollments,
  revokeAccess,
  getUserEnrollments,
} from './service';
export type { AdminEnrollmentFilters, AdminEnrollmentListItem, EnrollmentSummary } from './types';
