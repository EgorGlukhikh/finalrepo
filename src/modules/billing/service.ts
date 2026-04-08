import { CourseAccessType, OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { env } from '@/lib/env';
import { getCourseAccessRowById } from '@/modules/courses/queries';
import { buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';
import { enrollUserInPaidCourse } from '@/modules/enrollments';
import { findEnrollmentRow } from '@/modules/enrollments/queries';

import {
  createOrReusePendingOrderRow,
  updateOrderStatusRow,
  upsertPaymentEventRow,
} from './repository';
import { buildRobokassaSignature, normalizeAmount, normalizeSignature } from './helpers';
import { findOrderDetailRowById, findOrderRowById, listOrderRows } from './queries';
import { robokassaResultSchema, type RobokassaResultInput } from './schemas';
import type { OrderState, RobokassaCheckoutIntent, RobokassaResultPayload } from './types';
import type { AdminOrderDetails, AdminOrderListItem } from './types';

function assertRobokassaConfigured() {
  if (!env.ROBOKASSA_MERCHANT_LOGIN || !env.ROBOKASSA_PASSWORD_1 || !env.ROBOKASSA_PASSWORD_2) {
    throw new Error('ROBOKASSA_NOT_CONFIGURED');
  }
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

function mapAdminOrderListItem(row: Awaited<ReturnType<typeof listOrderRows>>[number]): AdminOrderListItem {
  return {
    id: row.id,
    status: row.status,
    amount: row.amount,
    currency: row.currency,
    paidAt: row.paidAt,
    createdAt: row.createdAt,
    course: {
      id: row.course.id,
      slug: row.course.slug,
      title: row.course.title,
    },
    user: {
      id: row.user.id,
      name: row.user.name,
      email: row.user.email,
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

  const order = await createOrReusePendingOrderRow({
    userId,
    courseId,
    amount: course.priceAmount,
    currency: 'RUB',
  });

  const outSum = normalizeAmount(order.amount);
  const signatureValue = buildRobokassaSignature(
    [env.ROBOKASSA_MERCHANT_LOGIN, outSum, order.id],
    env.ROBOKASSA_PASSWORD_1,
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

export async function listOrders(): Promise<AdminOrderListItem[]> {
  const rows = await listOrderRows();
  return rows.map(mapAdminOrderListItem);
}

export async function getOrderDetails(orderId: number): Promise<AdminOrderDetails | null> {
  const row = await findOrderDetailRowById(orderId);

  if (!row) {
    return null;
  }

  return {
    ...mapAdminOrderListItem(row),
    updatedAt: row.updatedAt,
    events: row.events.map((event) => ({
      id: event.id,
      orderId: event.orderId,
      eventType: event.eventType,
      signatureValue: event.signatureValue,
      verified: event.verified,
      receivedAt: event.receivedAt,
      processedAt: event.processedAt,
    })),
  };
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

  if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PAID) {
    throw new Error('ORDER_NOT_PAYABLE');
  }

  if (parsed.merchantLogin !== env.ROBOKASSA_MERCHANT_LOGIN) {
    throw new Error('ROBOKASSA_LOGIN_MISMATCH');
  }

  const expectedOutSum = normalizeAmount(order.amount);

  if (parsed.outSum !== expectedOutSum) {
    throw new Error('ORDER_AMOUNT_MISMATCH');
  }

  const expectedSignature = buildRobokassaSignature(
    [parsed.merchantLogin, parsed.outSum, parsed.invId],
    env.ROBOKASSA_PASSWORD_2,
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
  revalidatePath(buildCatalogPath());
  revalidatePath(buildPublicCoursePath(order.course.slug));
  revalidatePath('/app');
  revalidatePath(`/app/courses/${order.course.slug}`);

  return {
    orderId: order.id,
    courseId: order.course.id,
    courseSlug: order.course.slug,
    responseText: `OK${order.id}`,
  };
}

export async function recordRobokassaRedirectEvent(input: {
  orderId: number;
  eventType: 'SUCCESS' | 'FAIL';
  payload: Record<string, string>;
}) {
  const order = await findOrderRowById(input.orderId);

  if (!order) {
    return null;
  }

  const signatureValue = normalizeSignature(`${input.eventType}:${input.orderId}`);

  await upsertPaymentEventRow({
    orderId: input.orderId,
    eventType: input.eventType,
    signatureValue,
    payload: input.payload,
    verified: false,
    processedAt: null,
  });

  return order;
}
