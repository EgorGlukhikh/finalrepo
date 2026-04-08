import { z } from 'zod';

export const createCoursePurchaseSchema = z.object({
  userId: z.string().cuid(),
  courseId: z.string().cuid(),
});

export const robokassaResultSchema = z.object({
  merchantLogin: z.string().trim().min(1),
  outSum: z.string().trim().min(1),
  invId: z.coerce.number().int().positive(),
  signatureValue: z.string().trim().min(1),
});

export type CreateCoursePurchaseInput = z.infer<typeof createCoursePurchaseSchema>;
export type RobokassaResultInput = z.infer<typeof robokassaResultSchema>;
