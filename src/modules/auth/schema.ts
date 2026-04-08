import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Укажите email')
  .email('Укажите корректный email')
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, 'Пароль должен содержать не менее 8 символов')
  .max(72, 'Пароль слишком длинный');

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(80, 'Имя слишком длинное')
    .optional()
    .or(z.literal(''))
    .transform((value) => (typeof value === 'string' ? value.trim() : '') || undefined),
  email: emailSchema,
  password: passwordSchema,
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
