import crypto from 'node:crypto';
import { CourseAccessType, OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { env } from '@/lib/env';
import { getCourseAccessRowById } from '@/modules/courses/queries';
import { enrollUserInPaidCourse } from '@/modules/enrollments';
import { findEnrollmentRow } from '@/modules/enrollments/queries';

import {
  createOrderRow,
  findOrderForPurchase,
  updateOrderStatusRow,
  upsertPaymentEventRow,
} from './repository';
import { findOrderRowById } from './queries';
import { robokassaResultSchema, type RobokassaResultInput } from './schemas';
import type { OrderState, RobokassaCheckoutIntent, RobokassaResultPayload } from './types';

function assertRobokassaConfigured() {
  if (!env.ROBOKASSA_MERCHANT_LOGIN || !env.ROBOKASSA_PASSWORD_1 || !env.ROBOKASSA_PASSWORD_2) {
    throw new Error('ROBOKASSA_NOT_CONFIGURED');
  }
}

function normalizeAmount(amount: number) {
  return amount.toFixed(2);
}

function buildSignatureBase(parts: Array<string | number>, password: string) {
  return `${parts.join(':')}:${password}`;
}

function md5(value: string) {
  return crypto.createHash('md5').update(value).digest('hex');
}

function normalizeSignature(signature: string) {
  return signature.trim().toLowerCase();
}

function mapOrderRow(row: NonNullable<Awaited<ReturnType<typeof findOrderRowById>>>) : OrderState {
  return {
    id: row.id,
    status: row.status,
    amount: row.amount,
    currency: row.currency,
    paidAt: row.paidAt,
    course: {
      id: row.course.id,
      slug: row.course.slug,
      title: row.course.title,
    },
    user: {
      id: row.user.id,
    },
  };
}

export function isRobokassaConfigured() {
  return Boolean(env.ROBOKASSA_MERCHANT_LOGIN && env.ROBOKASSA_PASSWORD_1 && env.ROBOKASSA_PASSWORD_2);
}

export async function createPaidCoursePurchaseIntent(userId: string, courseId: string): Promise<RobokassaCheckoutIntent> {
  assertRobokassaConfigured();

  const course = await getCourseAccessRowById(courseId);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  if (course.status !== 'PUBLISHED' || course.accessType !== CourseAccessType.PAID || course.priceAmount == null) {
    throw new Error('COURSE_NOT_PURCHASABLE');
  }

  const enrollment = await findEnrollmentRow(userId, courseId);

  if (enrollment?.status === 'ACTIVE') {
    throw new Error('COURSE_ALREADY_ACCESSIBLE');
  }

  const existingOrder = await findOrderForPurchase(userId, courseId);
  const order =
    existingOrder && existingOrder.amount === course.priceAmount
      ? existingOrder
      : await createOrderRow({
          user: {
            connect: {
              id: userId,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
          amount: course.priceAmount,
          currency: 'RUB',
          status: OrderStatus.PENDING,
        });

  const outSum = normalizeAmount(order.amount);
  const signatureValue = md5(
    buildSignatureBase([env.ROBOKASSA_MERCHANT_LOGIN, outSum, order.id], env.ROBOKASSA_PASSWORD_1),
  );

  const checkoutUrl = new URL(env.ROBOKASSA_PAYMENT_URL);
  checkoutUrl.searchParams.set('MerchantLogin', env.ROBOKASSA_MERCHANT_LOGIN);
  checkoutUrl.searchParams.set('OutSum', outSum);
  checkoutUrl.searchParams.set('InvId', String(order.id));
  checkoutUrl.searchParams.set('Description', `Курс «${course.title}»`);
  checkoutUrl.searchParams.set('SignatureValue', signatureValue);

  if (env.ROBOKASSA_IS_TEST) {
    checkoutUrl.searchParams.set('IsTest', '1');
  }

  return {
    orderId: order.id,
    courseId: course.id,
    courseSlug: course.slug,
    courseTitle: course.title,
    amount: order.amount,
    currency: order.currency,
    checkoutUrl: checkoutUrl.toString(),
  };
}

export async function getOrderById(orderId: number) {
  const row = await findOrderRowById(orderId);
  return row ? mapOrderRow(row) : null;
}

export async function handleRobokassaResult(input: RobokassaResultInput | RobokassaResultPayload) {
  assertRobokassaConfigured();

  const parsed = robokassaResultSchema.parse({
    merchantLogin: input.merchantLogin,
    outSum: input.outSum,
    invId: input.invId,
    signatureValue: input.signatureValue,
  });
  const order = await findOrderRowById(parsed.invId);

  if (!order) {
    throw new Error('ORDER_NOT_FOUND');
  }

  if (order.course.status !== 'PUBLISHED' || order.course.accessType !== CourseAccessType.PAID) {
    throw new Error('ORDER_NOT_PAYABLE');
  }

  if (parsed.merchantLogin !== env.ROBOKASSA_MERCHANT_LOGIN) {
    throw new Error('ROBOKASSA_LOGIN_MISMATCH');
  }

  const expectedOutSum = normalizeAmount(order.amount);

  if (parsed.outSum !== expectedOutSum) {
    throw new Error('ORDER_AMOUNT_MISMATCH');
  }

  const expectedSignature = md5(
    buildSignatureBase([parsed.merchantLogin, parsed.outSum, parsed.invId], env.ROBOKASSA_PASSWORD_2),
  );

  if (normalizeSignature(parsed.signatureValue) !== expectedSignature) {
    throw new Error('ROBOKASSA_SIGNATURE_INVALID');
  }

  await upsertPaymentEventRow({
    orderId: order.id,
    eventType: 'RESULT',
    signatureValue: normalizeSignature(parsed.signatureValue),
    payload: parsed,
    verified: true,
    processedAt: new Date(),
  });

  if (order.status !== OrderStatus.PAID) {
    await updateOrderStatusRow(order.id, {
      status: OrderStatus.PAID,
      paidAt: new Date(),
    });
  }

  await enrollUserInPaidCourse(order.user.id, order.course.id);
  revalidatePath('/courses');
  revalidatePath(`/courses/${order.course.slug}`);
  revalidatePath('/app');
  revalidatePath(`/app/courses/${order.course.slug}`);

  return {
    orderId: order.id,
    courseId: order.course.id,
    courseSlug: order.course.slug,
    responseText: `OK${order.id}`,
  };
}
