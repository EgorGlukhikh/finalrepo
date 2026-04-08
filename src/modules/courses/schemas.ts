import { CourseAccessType, CourseStatus, LessonStatus, LessonType } from '@prisma/client';
import { z } from 'zod';

const trimmedText = (max: number) =>
  z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }, z.string().max(max).optional());

const slugSchema = z
  .string()
  .trim()
  .min(2, 'Slug must contain at least 2 characters')
  .max(120, 'Slug is too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can contain only lowercase latin letters, numbers, and hyphens');

const contentSchema = z.unknown().optional();

export const courseBillingSchema = z
  .object({
    accessType: z.nativeEnum(CourseAccessType).default(CourseAccessType.PAID),
    priceAmount: z.coerce.number().int().positive().nullable().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.accessType === CourseAccessType.FREE && value.priceAmount !== null && value.priceAmount !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Free courses must not have a price',
        path: ['priceAmount'],
      });
    }

    if (value.accessType === CourseAccessType.PAID && value.priceAmount == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Paid courses require a price',
        path: ['priceAmount'],
      });
    }

    if (value.accessType === CourseAccessType.PRIVATE && value.priceAmount != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Private courses should not have a price',
        path: ['priceAmount'],
      });
    }
  });

export const createCourseSchema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: slugSchema,
  shortDescription: trimmedText(300),
  description: trimmedText(10_000),
  coverImageUrl: z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    },
    z.string().url().optional(),
  ),
  status: z.nativeEnum(CourseStatus).optional(),
  accessType: z.nativeEnum(CourseAccessType).optional(),
  priceAmount: z.coerce.number().int().positive().nullable().optional(),
  ownerId: z.string().cuid().optional(),
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  courseId: z.string().cuid(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const createModuleSchema = z.object({
  courseId: z.string().cuid(),
  title: z.string().trim().min(2).max(200),
  sortOrder: z.coerce.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateModuleSchema = createModuleSchema.partial().extend({
  moduleId: z.string().cuid(),
});

export const createLessonSchema = z.object({
  moduleId: z.string().cuid(),
  title: z.string().trim().min(2).max(200),
  slug: slugSchema,
  sortOrder: z.coerce.number().int().nonnegative().optional(),
  lessonType: z.nativeEnum(LessonType),
  status: z.nativeEnum(LessonStatus).optional(),
  preview: z.boolean().optional(),
  summary: trimmedText(1000),
  content: contentSchema,
  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateLessonSchema = createLessonSchema.partial().extend({
  lessonId: z.string().cuid(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
