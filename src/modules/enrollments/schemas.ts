import { z } from 'zod';

export const grantFreeEnrollmentSchema = z.object({
  userId: z.string().cuid(),
  courseId: z.string().cuid(),
});

export type GrantFreeEnrollmentInput = z.infer<typeof grantFreeEnrollmentSchema>;
