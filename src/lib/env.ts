import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().default(''),
  NEXTAUTH_URL: z.string().trim().default(''),
  NEXTAUTH_SECRET: z.string().default(''),
  ROBOKASSA_MERCHANT_LOGIN: z.string().default(''),
  ROBOKASSA_PASSWORD_1: z.string().default(''),
  ROBOKASSA_PASSWORD_2: z.string().default(''),
  ROBOKASSA_PAYMENT_URL: z.string().url().default('https://auth.robokassa.ru/Merchant/Index.aspx'),
  ROBOKASSA_IS_TEST: z
    .union([z.literal('0'), z.literal('1'), z.boolean()])
    .transform((value) => value === true || value === '1')
    .default(false),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  ROBOKASSA_MERCHANT_LOGIN: process.env.ROBOKASSA_MERCHANT_LOGIN,
  ROBOKASSA_PASSWORD_1: process.env.ROBOKASSA_PASSWORD_1,
  ROBOKASSA_PASSWORD_2: process.env.ROBOKASSA_PASSWORD_2,
  ROBOKASSA_PAYMENT_URL: process.env.ROBOKASSA_PAYMENT_URL,
  ROBOKASSA_IS_TEST: process.env.ROBOKASSA_IS_TEST,
});
