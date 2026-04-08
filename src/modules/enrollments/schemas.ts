import { z } from 'zod';

export const grantFreeEnrollmentSchema = z.object({
  userId: z.string().cuid(),
  courseId: z.string().cuid(),
});

export type GrantFreeEnrollmentInput = z.infer<typeof grantFreeEnrollmentSchema>;

export const grantManualEnrollmentSchema = grantFreeEnrollmentSchema;
export const revokeEnrollmentSchema = grantFreeEnrollmentSchema;

export type GrantManualEnrollmentInput = z.infer<typeof grantManualEnrollmentSchema>;
export type RevokeEnrollmentInput = z.infer<typeof revokeEnrollmentSchema>;
